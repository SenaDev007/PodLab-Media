import { NextResponse } from "next/server";
import { z } from "zod";
import { updateTicket, deleteTicket } from "@/lib/store";
import { requireAdmin } from "@/lib/admin-guard";

export const dynamic = "force-dynamic";

// PATCH /api/tickets/[id] — gestion back-office d'une vente de billets :
// statut payé / remboursé / annulé (workflow billetterie).
const schema = z.object({
  status: z.enum(["paye", "rembourse", "annule"]),
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
      return NextResponse.json({ error: "Statut invalide." }, { status: 400 });
    }
    const ticket = await updateTicket(id, parsed.data);
    return NextResponse.json({ ok: true, ticket });
  } catch (e) {
    console.error("[tickets PATCH]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE /api/tickets/[id] — suppression d'un achat (test, doublon…)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  try {
    const { id } = await params;
    await deleteTicket(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[tickets DELETE]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
