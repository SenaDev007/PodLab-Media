// ═══════════════════════════════════════════════════════════════════════════
// Intégration e-mailing / CRM — Brevo (cahier des charges §5)
// Active la synchronisation des abonnés « PodLab Business Brief » vers un
// outil d'e-mailing professionnel. Pilotée par variables d'environnement :
//   • BREVO_API_KEY  — clé API Brevo (https://app.brevo.com/settings/keys/api)
//   • BREVO_LIST_ID  — identifiant de la liste « PodLab Business Brief »
// Sans ces clés : mode silencieux (skipped) — l'inscription reste dans la
// base locale (SQLite/PostgreSQL) et reste exportable en CSV Mailchimp/Brevo
// depuis le back-office → aucune inscription n'est jamais perdue.
// ═══════════════════════════════════════════════════════════════════════════

const BREVO_ENDPOINT = "https://api.brevo.com/v3/contacts";

export interface BrevoResult {
  synced: boolean;
  skipped: boolean;
  error?: string;
}

export function brevoConfigured(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
}

/**
 * Synchronise un contact vers Brevo (création ou mise à jour).
 * Ne lève JAMAIS d'exception — une panne Brevo ne doit pas bloquer
 * l'inscription locale.
 */
export async function syncSubscriberToBrevo(params: {
  email: string;
  name?: string | null;
  segment?: string;
}): Promise<BrevoResult> {
  const { email, name, segment } = params;

  if (!brevoConfigured()) {
    return { synced: false, skipped: true };
  }

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY as string,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        // updateEnabled : met à jour si le contact existe déjà (idempotent)
        updateEnabled: true,
        listIds: [Number(process.env.BREVO_LIST_ID)],
        attributes: {
          PRENOM: name ?? "",
          CENTRE_INTERET: segment ?? "general",
          DOUBLE_OPTIN: true,
        },
      }),
      signal: AbortSignal.timeout(6000),
    });

    if (res.ok || res.status === 204) return { synced: true, skipped: false };

    // 400 « contact already exists » sans updateEnabled géré ci-dessus ;
    // les autres codes sont journalisés sans faire échouer l'inscription.
    const body = await res.text().catch(() => "");
    console.warn("[brevo] statut", res.status, body.slice(0, 200));
    return { synced: false, skipped: false, error: `HTTP ${res.status}` };
  } catch (e) {
    console.warn("[brevo] indisponible :", (e as Error).message);
    return { synced: false, skipped: false, error: (e as Error).message };
  }
}