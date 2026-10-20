import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/podlab/app-shell";
import { EpisodeDetail } from "@/components/podlab/episodes/episode-detail";
import { VIDEOS, VIDEO_THEMES } from "@/lib/videos";

// ─── Fiche d'épisode SEO (SSG) — cahier des charges §3.1 ──────────────────────
// 75 pages statiques générées au build : « les conversations de haut niveau
// restent invisibles sur Google faute de fiches épisodes optimisées » —
// ce module corrige ce goulot d'étranglement.

interface Params {
  params: Promise<{ videoId: string }>;
}

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ videoId: v.videoId }));
}

function getVideo(videoId: string) {
  return VIDEOS.find((v) => v.videoId === videoId);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { videoId } = await params;
  const video = getVideo(videoId);
  if (!video) return { title: "Épisode introuvable — PodLab Media" };

  // Description réelle YouTube (si disponible) — unique par épisode pour Google.
  // Coupure propre : 2 premières phrases, sans liens, max ~158 caractères.
  const descSentences = video.description
    ?.replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .match(/[^.!?…]+[.!?…]*/g)
    ?.slice(0, 2)
    .join(" ") ?? "";
  const realDesc = descSentences.slice(0, 158).trim();
  const description =
    (realDesc && realDesc.length > 60
      ? realDesc
      : `Épisode « Discussion Informelle » · ${VIDEO_THEMES[video.theme]} · PodLab Media, 1er Média Business d'Afrique francophone (128 000 abonnés, 1 million d'écoutes par trimestre). Fiche de synthèse PDF incluse.`) +
    " — PodLab Media";

  return {
    title: `${video.title} — PodLab Media`,
    description,
    openGraph: {
      title: video.title,
      description: description.slice(0, 200),
      type: "video.other" as const,
      ...(video.publishedAt
        ? { publishedTime: new Date(`${video.publishedAt}T12:00:00Z`).toISOString() }
        : {}),
      images: [{ url: video.thumbnail }],
    },
  };
}

export default async function EpisodePage({ params }: Params) {
  const { videoId } = await params;
  const video = getVideo(videoId);
  if (!video) notFound();

  const related = VIDEOS.filter(
    (v) => v.theme === video.theme && v.videoId !== video.videoId
  ).slice(0, 3);

  // Données structurées VideoObject (SEO) — métadonnées réelles YouTube
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description:
      video.description?.replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim().slice(0, 300) ||
      `Épisode « Discussion Informelle » · Thématique : ${VIDEO_THEMES[video.theme]} — PodLab Media, 1er Média Business d'Afrique francophone.`,
    thumbnailUrl: [video.thumbnail],
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    url: video.youtubeUrl,
    isFamilyFriendly: true,
    ...(video.publishedAt
      ? { uploadDate: new Date(`${video.publishedAt}T12:00:00Z`).toISOString() }
      : {}),
    ...(video.durationSeconds
      ? {
          duration: `PT${Math.floor(video.durationSeconds / 60)}M${video.durationSeconds % 60}S`,
        }
      : {}),
    ...(video.views ? { interactionStatistic: { "@type": "InteractionCounter", interactionType: { "@type": "WatchAction" }, userInteractionCount: video.views } } : {}),
    publisher: {
      "@type": "Organization",
      name: "PodLab Media",
      url: "https://www.youtube.com/@podlabmedia",
    },
  };

  return (
    <AppShell active="accueil">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EpisodeDetail video={video} related={related} />
    </AppShell>
  );
}
