import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { channelFromReferrer } from "@/lib/analytics-utils";

export const dynamic = "force-dynamic";

/**
 * GET /api/analytics — agrégats d'audience pour le tableau de bord.
 * Protégé back-office. Mêmes agrégats que WinAgro : courbe 30 jours,
 * pages les plus vues, canaux d'acquisition, campagnes UTM, appareils,
 * navigateurs, géographie, visiteurs en ligne et conversion e-mail.
 */
export async function GET(request: Request) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const since = new Date();
  since.setDate(since.getDate() - 30);
  since.setHours(0, 0, 0, 0);

  const [views, sessions] = await Promise.all([
    db.pageView.findMany({
      where: { timestamp: { gte: since } },
      select: {
        timestamp: true,
        path: true,
        referrer: true,
        deviceType: true,
        browser: true,
        country: true,
        utmSource: true,
        utmCampaign: true,
        sessionToken: true,
      },
    }),
    db.activeSession.findMany({
      where: { lastSeen: { gte: since } },
      select: { token: true, lastSeen: true, deviceType: true, country: true },
    }),
  ]);

  // ─── Courbe des 30 derniers jours ────────────────────────────────────────
  const days: Array<{ date: string; views: number; visitors: number }> = [];
  const byDay = new Map<string, { views: number; tokens: Set<string> }>();
  for (const v of views) {
    const key = v.timestamp.toISOString().slice(0, 10);
    const d = byDay.get(key) ?? { views: 0, tokens: new Set<string>() };
    d.views += 1;
    d.tokens.add(v.sessionToken);
    byDay.set(key, d);
  }
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const e = byDay.get(key);
    days.push({
      date: key,
      views: e?.views ?? 0,
      visitors: e?.tokens.size ?? 0,
    });
  }

  const count = (getKey: (v: (typeof views)[number]) => string | null) => {
    const m = new Map<string, number>();
    for (const v of views) {
      const k = getKey(v);
      if (!k) continue;
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return [...m.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([label, count]) => ({ label, count }));
  };

  const topPages = count((v) => v.path);
  const devices = count((v) => v.deviceType);
  const browsers = count((v) => v.browser);
  const countries = count((v) => v.country);
  const channels = count((v) => channelFromReferrer(v.referrer));
  const campaigns = count((v) =>
    v.utmCampaign ? `${v.utmCampaign} (${v.utmSource ?? "?"})` : null
  );

  // ─── Visiteurs en ligne (heartbeat < 5 min) ──────────────────────────────
  const fiveMinAgo = Date.now() - 5 * 60_000;
  const live = sessions.filter((s) => s.lastSeen.getTime() >= fiveMinAgo).length;

  // ─── Tunnels de conversion first-party (30 j) ────────────────────────────
  const [subscribers30, leads30, bookings30, tickets30] = await Promise.all([
    db.subscriber.count({ where: { createdAt: { gte: since } } }),
    db.lead.count({ where: { createdAt: { gte: since } } }),
    db.booking.count({ where: { createdAt: { gte: since } } }),
    db.ticketPurchase.count({ where: { createdAt: { gte: since } } }),
  ]);

  const uniqueVisitors = new Set(views.map((v) => v.sessionToken)).size;

  return NextResponse.json({
    days,
    totals: {
      views: views.length,
      uniqueVisitors,
      live,
      subscribers30,
      leads30,
      bookings30,
      tickets30,
    },
    topPages: topPages.slice(0, 10),
    channels: channels.slice(0, 8),
    campaigns: campaigns.slice(0, 8),
    devices: devices.slice(0, 5),
    browsers: browsers.slice(0, 6),
    countries: countries.slice(0, 10),
    funnel: [
      { label: "Visiteurs uniques", value: uniqueVisitors },
      { label: "Abonnés newsletter", value: subscribers30 },
      { label: "Leads sponsoring", value: leads30 },
      { label: "Réservations studio", value: bookings30 },
      { label: "Billets achetés", value: tickets30 },
    ],
  });
}
