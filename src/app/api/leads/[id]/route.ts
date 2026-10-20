import { NextResponse } from "next/server";
import { z } from "zod";
import { updateLead, listLeads } from "@/lib/store";

// PATCH /api/leads/[id] — Déplacement Kanban / marquage priorité (back-office CRM)
// + prise de RDV depuis le tunnel sponsoring (cahier des charges §3.3 :
// « intégration directe de calendrier pour prise de RDV avec la régie »).
const schema = z.object({
  status: z.enum(["nouveau", "kit_envoye", "rdv_cale", "devis", "signe"]).optional(),
  highPriority: z.boolean().optional(),
  rdvSlot: z.string().min(3).max(120).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    const { status, highPriority, rdvSlot } = parsed.data;

    if (rdvSlot) {
      // RDV régie commerciale : la carte passe en « RDV Calé » dans le CRM,
      // le créneau choisi est journalisé dans le message du lead.
      const all = await listLeads();
      const existing = all.find((l) => l.id === id);
      const mergedMessage = [
        existing?.message ?? "",
        `RDV régie commerciale : ${rdvSlot} (visio ou téléphone, appel de 30 min)`,
      ]
        .filter(Boolean)
        .join(" — ");

      const lead = await updateLead(id, {
        status: "rdv_cale",
        message: mergedMessage,
        ...(highPriority !== undefined ? { highPriority } : {}),
      });
      return NextResponse.json({ ok: true, lead, rdvSlot });
    }

    const lead = await updateLead(id, {
      ...(status !== undefined ? { status } : {}),
      ...(highPriority !== undefined ? { highPriority } : {}),
    });
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    console.error("[leads PATCH]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
