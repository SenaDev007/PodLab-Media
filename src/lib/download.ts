// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Téléchargement de fichiers côté client
// Les PDF « métier » (Kit Média, fiches d'épisodes) sont générés par le
// backend (routes /api/pdf/*) : cette aide télécharge leur blob avec repli
// gracieux si l'appel réseau échoue.
// ═══════════════════════════════════════════════════════════════════════════

/** Déclenche le téléchargement navigateur d'un blob. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Récupère un PDF servi par une route /api/pdf/* (lève si non-200). */
export async function fetchPdfBlob(url: string): Promise<Blob> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`PDF indisponible (HTTP ${res.status})`);
  }
  const blob = await res.blob();
  if (!blob.size) throw new Error("PDF vide");
  return blob;
}

/** Télécharge un PDF backend ; renvoie false si indisponible (→ repli client). */
export async function downloadBackendPdf(
  url: string,
  filename: string
): Promise<boolean> {
  try {
    const blob = await fetchPdfBlob(url);
    downloadBlob(blob, filename);
    return true;
  } catch {
    return false;
  }
}
