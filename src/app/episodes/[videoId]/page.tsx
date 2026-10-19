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

  return {
    title: `${video.title} — PodLab Media`,
    description: `Épisode « Discussion Informelle » · ${VIDEO_THEMES[video.theme]} · PodLab Media, 1er Média Business d'Afrique francophone (128 000 abonnés, 1 million d'écoutes par trimestre). Fiche de synthèse PDF incluse.`,
    openGraph: {
      title: video.title,
      description: `Discussion Informelle · ${VIDEO_THEMES[video.theme]} — PodLab Media`,
      type: "video.other",
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

  // Données structurées VideoObject (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: `Épisode « Discussion Informelle » · Thématique : ${VIDEO_THEMES[video.theme]} — PodLab Media, 1er Média Business d'Afrique francophone.`,
    thumbnailUrl: [video.thumbnail],
    embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
    url: video.youtubeUrl,
    isFamilyFriendly: true,
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
