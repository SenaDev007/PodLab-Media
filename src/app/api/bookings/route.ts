import { NextResponse } from "next/server";
import { z } from "zod";
import {
  listBookings,
  findBookingConflict,
  createBooking,
} from "@/lib/store";
import { getPrice } from "@/lib/pricing";
import { STUDIO_FORMULAS } from "@/lib/data-mock";

// GET /api/bookings — Planning des studios (back-office)
export async function GET() {
  try {
    const bookings = await listBookings();
    return NextResponse.json({ bookings });
  } catch (e) {
    console.error("[bookings GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/bookings — Réservation d'un créneau studio + simulation paiement
const schema = z.object({
  city: z.enum(["cotonou", "abidjan"]),
  formula: z.enum(["audio", "video4k", "cle-en-main"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide"),
  slot: z.string().min(3),
  clientName: z.string().min(2, "Nom complet requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(6, "Numéro de téléphone requis"),
  paymentMethod: z.enum(["mobile-money", "carte"]),
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

    // Conflit de créneau ? (même studio, même date, même slot)
    const conflict = await findBookingConflict(d.city, d.date, d.slot);
    if (conflict) {
      return NextResponse.json(
        { error: "Ce créneau vient d'être réservé. Choisissez-en un autre." },
        { status: 409 }
      );
    }

    // Prix serveur = source de vérité
    const amount = getPrice(d.city, d.formula);
    const formulaLabel =
      STUDIO_FORMULAS.find((f) => f.id === d.formula)?.name ?? d.formula;

    const booking = await createBooking({
      city: d.city,
      formula: d.formula,
      formulaLabel,
      date: d.date,
      slot: d.slot,
      clientName: d.clientName,
      email: d.email,
      phone: d.phone,
      paymentMethod: d.paymentMethod,
      amount,
    });

    return NextResponse.json({ ok: true, booking });
  } catch (e) {
    console.error("[bookings POST]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
