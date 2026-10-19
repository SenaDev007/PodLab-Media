import { listSubscribers } from "@/lib/store";

// GET /api/subscribers/export — Export CSV de la base audience (back-office)
function escapeCsv(v: string | null | undefined): string {
  const s = v ?? "";
  return `"${s.replace(/"/g, '""')}"`;
}

function toIsoDate(createdAt: string | Date): string {
  const d = createdAt instanceof Date ? createdAt : new Date(createdAt);
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  try {
    const subscribers = await listSubscribers();

    const header = "Email;Nom;Segment;Source;Date d'inscription";
    const rows = subscribers.map((s) =>
      [
        escapeCsv(s.email),
        escapeCsv(s.name),
        escapeCsv(s.segment),
        escapeCsv(s.source),
        escapeCsv(toIsoDate(s.createdAt)),
      ].join(";")
    );
    // BOM UTF-8 pour les accents dans Excel
    const csv = "\uFEFF" + [header, ...rows].join("\r\n");

    const date = new Date().toISOString().slice(0, 10);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="podlab-audience-${date}.csv"`,
      },
    });
  } catch (e) {
    console.error("[subscribers export]", e);
    return new Response("Erreur serveur", { status: 500 });
  }
}
