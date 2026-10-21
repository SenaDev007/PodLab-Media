import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { parseUserAgent, translateCountry } from "@/lib/analytics-utils";

export const dynamic = "force-dynamic";

/**
 * POST /api/track — télémétrie d'audience du site public.
 * Identique à WinAgro : upsert ActiveSession (heartbeat) + insert PageView,
 * avec capture UTM et géolocalisation (en-têtes Vercel).
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, referrer, sessionToken, utmSource, utmMedium, utmCampaign } =
      body ?? {};

    if (!sessionToken || !path) {
      return NextResponse.json(
        { success: false, error: "Token et chemin requis." },
        { status: 400 }
      );
    }

    const uaString = request.headers.get("user-agent");
    const rawCountry = request.headers.get("x-vercel-ip-country");
    const rawCity = request.headers.get("x-vercel-ip-city");

    const { deviceType, browser } = parseUserAgent(uaString);
    const country = translateCountry(rawCountry);
    const city = rawCity ? decodeURIComponent(rawCity) : "Inconnu";

    const now = new Date();

    await db.activeSession.upsert({
      where: { token: sessionToken },
      update: {
        lastSeen: now,
        deviceType,
        browser,
        country,
        city,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      },
      create: {
        token: sessionToken,
        lastSeen: now,
        createdAt: now,
        deviceType,
        browser,
        country,
        city,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      },
    });

    await db.pageView.create({
      data: {
        timestamp: now,
        sessionToken,
        path: String(path).slice(0, 200),
        referrer: referrer || null,
        userAgent: uaString || null,
        deviceType,
        browser,
        country,
        city,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
