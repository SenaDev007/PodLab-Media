import { NextResponse } from "next/server";
import { z } from "zod";
import {
  listInvitationBookings,
  findInvitationConflict,
  createInvitationBooking,
} from "@/lib/store";

// ─── GET /api/invitations ────────────────────────────────────────────────────
// Planning VIP (page /invitation : créneaux déjà réservés).
export async function GET() {
  try {
    const invitations = await listInvitationBookings();
    return NextResponse.json({ invitations });
  } catch (e) {
    console.error("[invitations GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// ─── POST /api/invitations ───────────────────────────────────────────────────
// Réservation directe du passage à l'antenne — sans échange d'e-mails :
// la référence de confirmation est générée immédiatement.
const schema = z.object({
  city: z.enum(["cotonou", "abidjan"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  slot: z.string().min(3),
  guestName: z.string().min(2, "Nom complet requis"),
  role: z.string().optional().nullable(),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Numéro de téléphone requis"),
  topic: z.string().optional().nullable(),
  format: z.enum(["standard", "long", "sur-mesure"]),
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

    // Conflit de créneau ? (même studio, même date, même créneau VIP)
    const conflict = await findInvitationConflict(d.city, d.date, d.slot);
    if (conflict) {
      return NextResponse.json(
        { error: "Ce créneau VIP vient d'être pris. Choisissez-en un autre." },
        { status: 409 }
      );
    }

    const invitation = await createInvitationBooking({
      city: d.city,
      date: d.date,
      slot: d.slot,
      guestName: d.guestName,
      role: d.role ?? null,
      email: d.email,
      phone: d.phone,
      topic: d.topic ?? null,
      format: d.format,
    });

    return NextResponse.json({ ok: true, invitation });
  } catch (e) {
    console.error("[invitations POST]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
