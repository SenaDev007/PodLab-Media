import { NextResponse } from "next/server";
import { z } from "zod";
import { updateBooking, deleteBooking } from "@/lib/store";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

// PATCH /api/bookings/[id] — gestion back-office d'une session studio :
// workflow (confirme → termine / annule), reprogrammation (date, créneau),
// correction des coordonnées client.
const schema = z.object({
  status: z.enum(["confirme", "termine", "annule"]).optional(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date invalide")
    .optional(),
  slot: z.string().min(3).max(60).optional(),
  clientName: z.string().min(2).max(120).optional(),
  email: z.string().email("Email invalide").optional(),
  phone: z.string().min(6).max(40).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const { id } = await params;
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Requête invalide" },
        { status: 400 }
      );
    }
    const booking = await updateBooking(id, parsed.data);
    return NextResponse.json({ ok: true, booking });
  } catch (e) {
    console.error("[bookings PATCH]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/bookings/[id] — suppression d'une réservation (back-office)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deleteBooking(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[bookings DELETE]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
