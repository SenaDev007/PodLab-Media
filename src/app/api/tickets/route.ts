import { NextResponse } from "next/server";
import { z } from "zod";
import { listTickets, createTicket } from "@/lib/store";
import { EVENTS } from "@/lib/data-mock";
import { requireAdmin } from "@/lib/admin-guard";

// GET /api/tickets — Ventes de billets (back-office — session admin requise)
export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const tickets = await listTickets();
    return NextResponse.json({ tickets });
  } catch (e) {
    console.error("[tickets GET]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST /api/tickets — Achat de billets événements
const schema = z.object({
  eventId: z.string().min(2),
  quantity: z.number().int().min(1).max(10),
  buyerName: z.string().min(2, "Nom complet requis"),
  email: z.string().email("Email invalide"),
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

    const event = EVENTS.find((e) => e.id === d.eventId);
    if (!event) {
      return NextResponse.json({ error: "Événement introuvable" }, { status: 404 });
    }
    if (event.seatsLeft < d.quantity) {
      return NextResponse.json(
        { error: `Il ne reste que ${event.seatsLeft} place(s).` },
        { status: 409 }
      );
    }

    const purchase = await createTicket({
      eventId: event.id,
      eventName: event.title,
      quantity: d.quantity,
      buyerName: d.buyerName,
      email: d.email,
      amount: event.price * d.quantity,
    });

    return NextResponse.json({ ok: true, purchase });
  } catch (e) {
    console.error("[tickets POST]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
