import type { MetadataRoute } from "next";
import { VIDEOS } from "@/lib/videos";

// ─── Sitemap — fiches d'épisodes SEO + pages institutionnelles ───────────────
// Le domaine de production peut être défini via NEXT_PUBLIC_SITE_URL.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://podlab-media.vercel.app"
  ).replace(/\/+$/, "");

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/studios`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/sponsoring`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/evenements`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...VIDEOS.map((v) => ({
      url: `${base}/episodes/${v.videoId}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
