import { db } from "@/lib/db";
import {
  isDocType,
  isSheetSectionKind,
  sectionId,
  defaultSheetFor,
  type DocSheetData,
  type DocType,
  type SheetSection,
} from "@/lib/doc-sheets";
import type { PodLabVideo } from "@/types/podlab";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Service des fiches PDF (côté serveur uniquement)
// Persistance Prisma (DocSheet), assainissement des entrées back-office et
// résolution du contenu utilisé par la génération publique : fiche
// personnalisée publiée → sinon contenu par défaut calculé.
// ═══════════════════════════════════════════════════════════════════════════

const MAX_TITLE = 220;
const MAX_SUBTITLE = 320;
const MAX_TEXT = 6000;
const MAX_NOTE = 300;
const MAX_SECTIONS = 24;

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.slice(0, max) : "";
}

/** Assainit une fiche soumise par le back-office (jamais de confiance aveugle). */
export function sanitizeSheet(input: {
  docType?: unknown;
  scopeKey?: unknown;
  title?: unknown;
  subtitle?: unknown;
  sections?: unknown;
  showContact?: unknown;
  footerNote?: unknown;
  published?: unknown;
}): DocSheetData | null {
  const docType = String(input.docType ?? "");
  if (!isDocType(docType)) return null;
  const scopeKey = String(input.scopeKey ?? "").slice(0, 64);

  let sections: SheetSection[] = [];
  if (Array.isArray(input.sections)) {
    sections = (input.sections as unknown[])
      .slice(0, MAX_SECTIONS)
      .map((raw, i): SheetSection | null => {
        const s = (raw ?? {}) as Record<string, unknown>;
        const kind = String(s.kind ?? "");
        if (!isSheetSectionKind(kind)) return null;
        const items = Array.isArray(s.items)
          ? (s.items as unknown[]).map((x) => str(x, 400)).filter(Boolean).slice(0, 40)
          : undefined;
        const guests = Array.isArray(s.guests)
          ? (s.guests as unknown[])
              .map((g) => {
                const o = (g ?? {}) as Record<string, unknown>;
                return { name: str(o.name, 120), role: str(o.role, 200) };
              })
              .filter((g) => g.name)
              .slice(0, 24)
          : undefined;
        const stats = Array.isArray(s.stats)
          ? (s.stats as unknown[])
              .map((g) => {
                const o = (g ?? {}) as Record<string, unknown>;
                return { value: str(o.value, 48), label: str(o.label, 160) };
              })
              .filter((g) => g.value)
              .slice(0, 8)
          : undefined;
        const bars = Array.isArray(s.bars)
          ? (s.bars as unknown[])
              .map((g) => {
                const o = (g ?? {}) as Record<string, unknown>;
                const pct = Number(o.pct);
                return { label: str(o.label, 160), pct: Number.isFinite(pct) ? Math.min(100, Math.max(0, Math.round(pct))) : 0 };
              })
              .filter((g) => g.label)
              .slice(0, 12)
          : undefined;
        const tableHeaders = Array.isArray(s.tableHeaders)
          ? (s.tableHeaders as unknown[]).map((x) => str(x, 120)).filter(Boolean).slice(0, 6)
          : undefined;
        const tableWidths = Array.isArray(s.tableWidths)
          ? (s.tableWidths as unknown[]).map((x) => {
              const n = Number(x);
              return Number.isFinite(n) && n > 0 ? Math.min(10, n) : 1;
            })
          : undefined;
        return {
          id: str(s.id, 80) || sectionId(`s${i}`),
          kind,
          label: str(s.label, 120),
          enabled: s.enabled !== false,
          text: s.text !== undefined ? str(s.text, MAX_TEXT) : undefined,
          items,
          quoteText: s.quoteText !== undefined ? str(s.quoteText, 900) : undefined,
          quoteAuthor: s.quoteAuthor !== undefined ? str(s.quoteAuthor, 200) : undefined,
          guests,
          stats,
          bars,
          tableHeaders,
          tableWidths,
          calloutValue: s.calloutValue !== undefined ? str(s.calloutValue, 48) : undefined,
        };
      })
      .filter((s): s is SheetSection => s !== null);
  }

  return {
    docType,
    scopeKey,
    title: str(input.title, MAX_TITLE),
    subtitle: str(input.subtitle, MAX_SUBTITLE),
    sections,
    showContact: input.showContact !== false,
    footerNote: str(input.footerNote, MAX_NOTE),
    published: input.published !== false,
  };
}

/** Convertit une ligne Prisma en DocSheetData (JSON sections tolérant). */
function fromRow(row: {
  docType: string;
  scopeKey: string;
  title: string;
  subtitle: string;
  sections: string;
  showContact: boolean;
  footerNote: string;
  published: boolean;
  updatedAt: Date;
}): DocSheetData | null {
  if (!isDocType(row.docType)) return null;
  let sections: unknown;
  try {
    sections = JSON.parse(row.sections || "[]");
  } catch {
    sections = [];
  }
  const sheet = sanitizeSheet({
    docType: row.docType,
    scopeKey: row.scopeKey,
    title: row.title,
    subtitle: row.subtitle,
    sections,
    showContact: row.showContact,
    footerNote: row.footerNote,
    published: row.published,
  });
  return sheet ? { ...sheet, updatedAt: row.updatedAt.toISOString() } : null;
}

/** Fiche personnalisée enregistrée (publiée ou non) — null si absente. */
export async function getDocSheet(
  docType: DocType,
  scopeKey: string
): Promise<DocSheetData | null> {
  const row = await db.docSheet.findUnique({
    where: { docType_scopeKey: { docType, scopeKey } },
  });
  return row ? fromRow(row) : null;
}

/** Index des fiches personnalisées d'un type (badges back-office). */
export async function listDocSheets(docType: DocType) {
  const rows = await db.docSheet.findMany({ where: { docType } });
  return rows.map((r) => ({
    scopeKey: r.scopeKey,
    title: r.title,
    published: r.published,
    updatedAt: r.updatedAt.toISOString(),
  }));
}

/** Enregistre (upsert) la fiche éditée depuis le back-office. */
export async function upsertDocSheet(sheet: DocSheetData): Promise<DocSheetData> {
  const now = new Date();
  const row = await db.docSheet.upsert({
    where: { docType_scopeKey: { docType: sheet.docType, scopeKey: sheet.scopeKey } },
    update: {
      title: sheet.title,
      subtitle: sheet.subtitle,
      sections: JSON.stringify(sheet.sections),
      showContact: sheet.showContact,
      footerNote: sheet.footerNote,
      published: sheet.published,
    },
    create: {
      docType: sheet.docType,
      scopeKey: sheet.scopeKey,
      title: sheet.title,
      subtitle: sheet.subtitle,
      sections: JSON.stringify(sheet.sections),
      showContact: sheet.showContact,
      footerNote: sheet.footerNote,
      published: sheet.published,
    },
  });
  return { ...sheet, updatedAt: (row?.updatedAt ?? now).toISOString() };
}

/** Supprime la personnalisation — retour au contenu par défaut calculé. */
export async function deleteDocSheet(
  docType: DocType,
  scopeKey: string
): Promise<boolean> {
  try {
    await db.docSheet.delete({
      where: { docType_scopeKey: { docType, scopeKey } },
    });
    return true;
  } catch {
    return false; // déjà absente — idempotent
  }
}

/**
 * Contenu réellement utilisé par la génération publique :
 * fiche personnalisée PUBLIÉE si elle existe, sinon contenu par défaut.
 * (Une fiche enregistrée mais dépubliée agit comme un brouillon.)
 */
export async function resolveDocSheet(
  docType: DocType,
  scopeKey: string,
  video: PodLabVideo | null
): Promise<DocSheetData> {
  const saved = await getDocSheet(docType, scopeKey);
  if (saved && saved.published) return saved;
  return defaultSheetFor(docType, scopeKey, video);
}
