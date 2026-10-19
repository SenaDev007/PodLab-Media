import { NextResponse } from "next/server";
import { z } from "zod";
import { updateLead } from "@/lib/store";

// PATCH /api/leads/[id] — Déplacement Kanban / marquage priorité (back-office CRM)
const schema = z.object({
  status: z.enum(["nouveau", "kit_envoye", "rdv_cale", "devis", "signe"]).optional(),
  highPriority: z.boolean().optional(),
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

    const lead = await updateLead(id, parsed.data);
    return NextResponse.json({ ok: true, lead });
  } catch (e) {
    console.error("[leads PATCH]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
