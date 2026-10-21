import { NextResponse } from "next/server";
import { z } from "zod";
import { updateLead, listLeads, deleteLead, BUDGET_LABELS } from "@/lib/store";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

// PATCH /api/leads/[id] — gestion back-office CRM d'un lead : déplacement
// Kanban, priorité, édition complète de la fiche (société, contact, budget,
// coordonnées, notes, kit média) + prise de RDV depuis le tunnel sponsoring
// (cahier des charges §3.3 : calendrier intégré avec la régie).
const schema = z.object({
  status: z.enum(["nouveau", "kit_envoye", "rdv_cale", "devis", "signe"]).optional(),
  highPriority: z.boolean().optional(),
  rdvSlot: z.string().min(3).max(120).optional(),
  // Édition complète (back-office)
  company: z.string().min(2, "Nom de l'entreprise requis").max(120).optional(),
  contactName: z.string().min(2, "Nom du contact requis").max(120).optional(),
  email: z.string().email("Email invalide").optional(),
  phone: z.string().max(40).optional().nullable(),
  budgetRange: z.enum(["A", "B", "C"]).optional(),
  message: z.string().max(4000).optional().nullable(),
  mediaKitSent: z.boolean().optional(),
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
    const {
      status,
      highPriority,
      rdvSlot,
      company,
      contactName,
      email,
      phone,
      budgetRange,
      message,
      mediaKitSent,
    } = parsed.data;

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
      ...(company !== undefined ? { company } : {}),
      ...(contactName !== undefined ? { contactName } : {}),
      ...(email !== undefined ? { email } : {}),
      ...(phone !== undefined ? { phone } : {}),
      ...(budgetRange !== undefined
        ? { budgetRange, budgetLabel: BUDGET_LABELS[budgetRange] ?? "" }
        : {}),
      ...(message !== undefined ? { message } : {}),
      ...(mediaKitSent !== undefined ? { mediaKitSent } : {}),
    });
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    console.error("[leads PATCH]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/leads/[id] — suppression d'un lead (back-office — session admin)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deleteLead(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[leads DELETE]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
