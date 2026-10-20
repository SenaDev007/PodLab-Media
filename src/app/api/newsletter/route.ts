import { NextResponse } from "next/server";
import { z } from "zod";
import { upsertSubscriber } from "@/lib/store";
import { syncSubscriberToBrevo, brevoConfigured } from "@/lib/brevo";

// POST /api/newsletter — Inscription au « PodLab Business Brief »
// • Consentement explicite requis (double opt-in Brevo actif côté outil).
// • Synchronisation e-mailing (Brevo) pilotée par BREVO_API_KEY/BREVO_LIST_ID :
//   sans clés, l'abonné est bien enregistré en base locale (exportable en CSV).
const schema = z.object({
  email: z.string().email("Adresse email invalide"),
  name: z.string().optional().nullable(),
  segment: z.string().default("general"),
  source: z.string().default("newsletter"),
  consent: z.boolean().refine((v) => v === true, {
    message: "Le consentement est requis.",
  }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const isConsent = issue?.path?.[0] === "consent";
      return NextResponse.json(
        {
          error: isConsent
            ? "Cochez la case de consentement pour recevoir le Business Brief."
            : "Adresse email invalide.",
        },
        { status: 400 }
      );
    }
    const { email, name, segment, source } = parsed.data;

    // 1) Enregistrement local — source de vérité (jamais perdue)
    const subscriber = await upsertSubscriber({ email, name, segment, source });

    // 2) Synchronisation outil d'e-mailing (best effort, non bloquant)
    const brevo = await syncSubscriberToBrevo({ email, name, segment });

    return NextResponse.json({
      ok: true,
      subscriber,
      crm: brevo.synced
        ? "Synchronisé avec notre outil d'e-mailing (Brevo)."
        : brevo.skipped
          ? "Enregistré en base — synchronisation e-mailing active dès la configuration de la clé Brevo."
          : "Enregistré en base — la synchronisation e-mailing sera retentée.",
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
