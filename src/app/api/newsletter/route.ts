import { NextResponse } from "next/server";
import { z } from "zod";
import { upsertSubscriber } from "@/lib/store";

// POST /api/newsletter — Inscription au « PodLab Business Brief »
const schema = z.object({
  email: z.string().email("Adresse email invalide"),
  name: z.string().optional().nullable(),
  segment: z.string().default("general"),
  source: z.string().default("newsletter"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }
    const { email, name, segment, source } = parsed.data;

    const subscriber = await upsertSubscriber({ email, name, segment, source });

    return NextResponse.json({
      ok: true,
      subscriber,
      message: "Bienvenue dans le PodLab Business Brief — inscription confirmée.",
    });
  } catch (e) {
    console.error("[newsletter]", e);
    return NextResponse.json(
      { error: "Erreur serveur, réessayez." },
      { status: 500 }
    );
  }
}
