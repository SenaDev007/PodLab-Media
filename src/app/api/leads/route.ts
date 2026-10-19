import { NextResponse } from "next/server";
import { z } from "zod";
import { listLeads, createLead } from "@/lib/store";

// GET /api/leads — Liste du pipeline CRM (tri : haute priorité puis date)
export async function GET() {
  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch (e) {
    console.error("[leads GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/leads — Création d'un lead Sponsoring (tunnel /sponsoring)
const schema = z.object({
  company: z.string().min(2, "Nom de l'entreprise requis"),
  contactName: z.string().min(2, "Nom du contact requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional().nullable(),
  budgetRange: z.enum(["A", "B", "C"]),
  message: z.string().optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Formulaire invalide" },
        { status: 400 }
      );
    }
    const d = parsed.data;

    const lead = await createLead({
      company: d.company,
      contactName: d.contactName,
      email: d.email,
      phone: d.phone ?? null,
      budgetRange: d.budgetRange,
      message: d.message ?? null,
    });

    return NextResponse.json({
      ok: true,
      lead,
      highPriority: lead.highPriority,
      // Règle métier : budget > 1 000 000 F CFA → priorité commerciale haute
      message: lead.highPriority
        ? "Demande enregistrée — priorité commerciale haute. Un conseiller senior vous rappelle sous 24h."
        : "Demande enregistrée. Kit Média envoyé automatiquement à votre email.",
    });
  } catch (e) {
    console.error("[leads POST]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
