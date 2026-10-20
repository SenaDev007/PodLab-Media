import {
  PDFDocument,
  PDFFont,
  PDFImage,
  PDFPage,
  StandardFonts,
  rgb,
} from "pdf-lib";
import { LOGO_PODLAB_BASE64, LOGO_PODLAB_SIZE } from "@/lib/logo-base64";
import { highlightsFor } from "@/lib/episode-highlights";
import { VIDEO_THEMES } from "@/lib/videos";
import { CONTACT, SOCIALS } from "@/lib/brand";
import type { PodLabVideo } from "@/types/podlab";

// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Génération PDF professionnelle (côté serveur)
//
// Kit Média B2B et fiches de synthèse d'épisodes produits par le backend
// (routes /api/pdf/*) avec le logo officiel embarqué, une mise en page
// éditoriale A4 cohérente avec le design system monochrome du site :
// noir pur, blanc, gammes zinc, filets fins et petites capitales.
// ═══════════════════════════════════════════════════════════════════════════

const A4 = { w: 595.28, h: 841.89 };
const M = 48; // marge latérale
const BAND_H = 100; // bandeau d'en-tête noir pleine largeur
const FOOT_BASE = 56; // ligne de base du pied de page

// Palette monochrome (design system PodLab)
const INK = rgb(0, 0, 0);
const PAPER = rgb(1, 1, 1);
const Z100 = rgb(0.957, 0.957, 0.961); // #f4f4f5
const Z200 = rgb(0.894, 0.894, 0.906); // #e4e4e7
const Z400 = rgb(0.631, 0.631, 0.667); // #a1a1aa
const Z500 = rgb(0.443, 0.443, 0.478); // #71717a
const Z600 = rgb(0.322, 0.322, 0.357); // #52525b
const Z800 = rgb(0.153, 0.153, 0.165); // #27272a

// ─── Sanitisation WinAnsi (Helvetica StandardFonts) ────────────────────────
// Les polices standard pdf-lib encodent en WinAnsi : accents français OK,
// mais on normalise les caractères typographiques pour éviter tout rejet.
function sanitize(s: string): string {
  return s
    .replace(/[\u2018\u2019\u02BC]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014\u2212]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u00A0\u202F\u2009]/g, " ")
    .replace(/[^\x20-\x7E\u00A1-\u00FF]/g, "?");
}

/** Découpe un texte en lignes tenant dans `maxWidth` pour la police donnée. */
function wrap(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number
): string[] {
  const words = sanitize(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    if (font.widthOfTextAtSize(w, size) > maxWidth) {
      // Mot unique plus large que la colonne : coupe dure
      let chunk = "";
      for (const ch of w) {
        if (font.widthOfTextAtSize(chunk + ch, size) > maxWidth) {
          lines.push(chunk);
          chunk = ch;
        } else {
          chunk += ch;
        }
      }
      line = chunk;
    } else {
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

/** Texte en petites capitales espacées (tracking éditorial). */
function drawTracked(
  page: PDFPage,
  text: string,
  x: number,
  y: number,
  opts: { font: PDFFont; size: number; color: ReturnType<typeof rgb>; tracking?: number }
) {
  const t = opts.tracking ?? 1.6;
  let cx = x;
  for (const ch of text.toUpperCase()) {
    page.drawText(ch, { x: cx, y, size: opts.size, font: opts.font, color: opts.color });
    cx += opts.font.widthOfTextAtSize(ch, opts.size) + t;
  }
  return cx - x - t;
}

/** Largeur totale (tracking inclus) d'un texte espacé. */
function trackedWidth(text: string, font: PDFFont, size: number, tracking = 1.6) {
  let w = 0;
  for (const ch of text.toUpperCase()) {
    w += font.widthOfTextAtSize(ch, size) + tracking;
  }
  return Math.max(0, w - tracking);
}

interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

interface BarRow {
  label: string;
  pct: number;
}

interface TableSpec {
  headers: string[];
  widths: number[];
  rows: string[][];
}

// ─── Moteur de mise en page ─────────────────────────────────────────────────
class ProPdf {
  doc: PDFDocument;
  page!: PDFPage;
  regular: PDFFont;
  bold: PDFFont;
  oblique: PDFFont;
  logo: PDFImage;
  y: number;
  pages: PDFPage[] = [];
  footerNote?: string;

  private constructor(
    doc: PDFDocument,
    regular: PDFFont,
    bold: PDFFont,
    oblique: PDFFont,
    logo: PDFImage
  ) {
    this.doc = doc;
    this.regular = regular;
    this.bold = bold;
    this.oblique = oblique;
    this.logo = logo;
    this.y = 0;
  }

  static async create(
    kickerRight: string,
    titleRight: string
  ): Promise<ProPdf> {
    const doc = await PDFDocument.create();
    const regular = await doc.embedFont(StandardFonts.Helvetica);
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const oblique = await doc.embedFont(StandardFonts.HelveticaOblique);
    const logo = await doc.embedPng(Buffer.from(LOGO_PODLAB_BASE64, "base64"));
    doc.setTitle("PodLab Media — " + titleRight);
    doc.setAuthor("PodLab Media");
    doc.setSubject(kickerRight);
    doc.setCreator("PodLab Media — Backend PDF");
    const p = new ProPdf(doc, regular, bold, oblique, logo);
    p.addPage(kickerRight, titleRight);
    return p;
  }

  /** Nouvelle page A4 avec bandeau noir + logo officiel. */
  addPage(kickerRight: string, titleRight: string) {
    this.page = this.doc.addPage([A4.w, A4.h]);
    this.pages.push(this.page);

    // Bandeau noir pleine largeur
    this.page.drawRectangle({
      x: 0,
      y: A4.h - BAND_H,
      width: A4.w,
      height: BAND_H,
      color: INK,
    });

    // Logo officiel PodLab (blanc, canal alpha) — hauteur 34 pt
    const logoH = 34;
    const logoW = logoH * (LOGO_PODLAB_SIZE.width / LOGO_PODLAB_SIZE.height);
    this.page.drawImage(this.logo, {
      x: M,
      y: A4.h - BAND_H / 2 - logoH / 2 + 2,
      width: logoW,
      height: logoH,
    });

    // Bloc droit : kicker espacé + titre du document
    const kw = trackedWidth(kickerRight, this.regular, 7, 1.8);
    drawTracked(this.page, kickerRight, A4.w - M - kw, A4.h - 52, {
      font: this.regular,
      size: 7,
      color: Z400,
      tracking: 1.8,
    });
    const tLines = wrap(titleRight, this.bold, 13, A4.w - 2 * M - logoW - 120);
    let ty = A4.h - 42;
    for (const ln of tLines.slice(-2)) {
      const lw = this.bold.widthOfTextAtSize(ln, 13);
      this.page.drawText(ln, {
        x: A4.w - M - lw,
        y: ty,
        size: 13,
        font: this.bold,
        color: PAPER,
      });
      ty -= 16;
    }

    // Curseur de contenu
    this.y = A4.h - BAND_H - 38;
  }

  /** Passe à une nouvelle page si l'espace restant est insuffisant. */
  ensure(needed: number, kickerRight: string, titleRight: string) {
    if (this.y - needed < FOOT_BASE + 24) {
      this.addPage(kickerRight, titleRight);
    }
  }

  /** Grand titre + sous-titre sous le bandeau. */
  title(main: string, subtitle?: string) {
    for (const ln of wrap(main, this.bold, 21, A4.w - 2 * M)) {
      this.page.drawText(ln, { x: M, y: this.y, size: 21, font: this.bold, color: INK });
      this.y -= 26;
    }
    if (subtitle) {
      for (const ln of wrap(subtitle, this.regular, 10.5, A4.w - 2 * M)) {
        this.page.drawText(ln, { x: M, y: this.y, size: 10.5, font: this.regular, color: Z500 });
        this.y -= 15;
      }
    }
    this.y -= 14;
  }

  /** Intertitre numéroté — petites capitales espacées + filet. */
  kicker(num: string, label: string, kickerRight: string, titleRight: string) {
    this.ensure(46, kickerRight, titleRight);
    this.y -= 8;
    drawTracked(this.page, `${num} · ${label}`, M, this.y, {
      font: this.bold,
      size: 8,
      color: Z600,
      tracking: 1.4,
    });
    this.y -= 9;
    this.page.drawLine({
      start: { x: M, y: this.y },
      end: { x: A4.w - M, y: this.y },
      thickness: 0.6,
      color: Z200,
    });
    this.y -= 18;
  }

  /** Paragraphe courant. */
  para(
    text: string,
    opts: { size?: number; color?: ReturnType<typeof rgb>; font?: PDFFont; lead?: number; indent?: number } = {}
  ) {
    const size = opts.size ?? 9.5;
    const font = opts.font ?? this.regular;
    const color = opts.color ?? Z800;
    const lead = opts.lead ?? 13.5;
    const indent = opts.indent ?? 0;
    for (const ln of wrap(text, font, size, A4.w - 2 * M - indent)) {
      this.page.drawText(ln, { x: M + indent, y: this.y, size, font, color });
      this.y -= lead;
    }
  }

  /** Puce avec retrait suspendu. */
  bullets(items: string[], kickerRight: string, titleRight: string) {
    for (const raw of items) {
      const lines = wrap(`•  ${raw}`, this.regular, 9.5, A4.w - 2 * M - 10);
      this.ensure(lines.length * 13.5 + 6, kickerRight, titleRight);
      lines.forEach((ln, i) => {
        this.page.drawText(ln, {
          x: M + (i === 0 ? 0 : 11),
          y: this.y,
          size: 9.5,
          font: this.regular,
          color: Z800,
        });
        this.y -= 13.5;
      });
      this.y -= 4;
    }
    this.y += 4;
  }

  /** Rangée de 4 encadrés statistiques. */
  statRow(items: StatItem[], kickerRight: string, titleRight: string) {
    const gap = 10;
    const w = (A4.w - 2 * M - gap * (items.length - 1)) / items.length;
    const h = 64;
    this.ensure(h + 8, kickerRight, titleRight);
    items.forEach((it, i) => {
      const x = M + i * (w + gap);
      this.page.drawRectangle({
        x,
        y: this.y - h,
        width: w,
        height: h,
        color: PAPER,
        borderColor: Z200,
        borderWidth: 0.8,
      });
      const vLines = wrap(it.value, this.bold, 17, w - 14);
      let vy = this.y - 24;
      for (const ln of vLines) {
        this.page.drawText(ln, { x: x + 10, y: vy, size: 17, font: this.bold, color: INK });
        vy -= 19;
      }
      const base = vy + 19 - 4;
      for (const ln of wrap(it.label, this.regular, 7.5, w - 16)) {
        this.page.drawText(ln, { x: x + 10, y: base - 12, size: 7.5, font: this.regular, color: Z500 });
      }
    });
    this.y -= h + 18;
  }

  /** Barres de répartition (profil d'audience). */
  bars(rows: BarRow[], kickerRight: string, titleRight: string) {
    const labelW = 168;
    const valueW = 44;
    const trackW = A4.w - 2 * M - labelW - valueW - 14;
    for (const r of rows) {
      this.ensure(24, kickerRight, titleRight);
      for (const ln of wrap(r.label, this.regular, 9, labelW)) {
        this.page.drawText(ln, { x: M, y: this.y - 8, size: 9, font: this.regular, color: Z600 });
        this.y -= 11;
      }
      const barY = this.y + 11 - 10;
      this.page.drawRectangle({
        x: M + labelW + 6,
        y: barY,
        width: trackW,
        height: 9,
        color: Z200,
      });
      this.page.drawRectangle({
        x: M + labelW + 6,
        y: barY,
        width: Math.max(2, (trackW * r.pct) / 100),
        height: 9,
        color: INK,
      });
      const val = `${r.pct} %`;
      this.page.drawText(val, {
        x: A4.w - M - valueW + 6,
        y: barY - 0.5,
        size: 9,
        font: this.bold,
        color: INK,
      });
      this.y -= 15;
    }
    this.y -= 6;
  }

  /** Encadré de mise en avant (chiffre clé + texte). */
  callout(
    value: string,
    text: string,
    kickerRight: string,
    titleRight: string
  ) {
    const h = 66;
    this.ensure(h + 8, kickerRight, titleRight);
    this.page.drawRectangle({
      x: M,
      y: this.y - h,
      width: A4.w - 2 * M,
      height: h,
      color: INK,
    });
    const vw = Math.max(...value.split(" ").map((w) => this.bold.widthOfTextAtSize(w, 24)));
    this.page.drawText(value, { x: M + 18, y: this.y - h / 2 - 8, size: 24, font: this.bold, color: PAPER });
    for (const ln of wrap(text, this.regular, 8.8, A4.w - 2 * M - vw - 58)) {
      this.page.drawText(ln, { x: M + vw + 40, y: this.y - 26, size: 8.8, font: this.regular, color: Z200 });
      this.y -= 12;
    }
    this.y -= h - 12;
    this.y -= 14;
  }

  /** Tableau éditorial avec en-tête noir et zébrage. */
  table(spec: TableSpec, kickerRight: string, titleRight: string) {
    const { headers, widths, rows } = spec;
    const total = widths.reduce((a, b) => a + b, 0);
    const scale = (A4.w - 2 * M) / total;

    const drawRow = (cells: string[], opts: { bold?: boolean; dark?: boolean; alt?: boolean }) => {
      const cellLines = cells.map((c, i) =>
        wrap(c, opts.bold ? this.bold : this.regular, 8.4, widths[i] * scale - 14)
      );
      const rowH = Math.max(...cellLines.map((l) => l.length)) * 11 + 12;
      this.ensure(rowH + 2, kickerRight, titleRight);

      if (opts.dark) {
        this.page.drawRectangle({ x: M, y: this.y - rowH, width: A4.w - 2 * M, height: rowH, color: INK });
      } else if (opts.alt) {
        this.page.drawRectangle({ x: M, y: this.y - rowH, width: A4.w - 2 * M, height: rowH, color: Z100 });
      }
      this.page.drawLine({
        start: { x: M, y: this.y - rowH },
        end: { x: A4.w - M, y: this.y - rowH },
        thickness: 0.5,
        color: opts.dark ? INK : Z200,
      });

      let cx = M;
      cellLines.forEach((lines, i) => {
        let ly = this.y - 16;
        for (const ln of lines) {
          this.page.drawText(ln, {
            x: cx + 7,
            y: ly,
            size: 8.4,
            font: opts.bold ? this.bold : this.regular,
            color: opts.dark ? PAPER : opts.bold ? INK : Z800,
          });
          ly -= 11;
        }
        cx += widths[i] * scale;
      });
      this.y -= rowH;
    };

    drawRow(headers, { bold: true, dark: true });
    rows.forEach((r, i) => drawRow(r, { alt: i % 2 === 1 }));
    this.page.drawLine({
      start: { x: M, y: this.y },
      end: { x: A4.w - M, y: this.y },
      thickness: 0.5,
      color: Z200,
    });
    this.y -= 20;
  }

  /** Bloc coordonnées finales. */
  contactBlock(kickerRight: string, titleRight: string) {
    const h = 118;
    this.ensure(h + 8, kickerRight, titleRight);
    this.page.drawRectangle({
      x: M,
      y: this.y - h,
      width: A4.w - 2 * M,
      height: h,
      color: PAPER,
      borderColor: INK,
      borderWidth: 1,
    });
    const col2X = A4.w / 2 + 10;
    const rowsL: Array<[string, string]> = [
      ["Téléphone / WhatsApp", `${CONTACT.phoneDisplay} · ${CONTACT.whatsappDisplay}`],
      ["Email", CONTACT.email],
      ["Studios", "Cotonou (Bénin) · Abidjan (Côte d'Ivoire)"],
    ];
    const rowsR: Array<[string, string]> = [
      ["YouTube", SOCIALS.youtubeHandle],
      ["Instagram / TikTok", `${SOCIALS.instagramHandle} · ${SOCIALS.tiktokHandle}`],
      ["Réponse", "Sous 24 h ouvrées — devis détaillé sur demande"],
    ];
    let ly = this.y - 30;
    rowsL.forEach(([k, v]) => {
      this.page.drawText(k.toUpperCase(), { x: M + 16, y: ly, size: 6.5, font: this.bold, color: Z500 });
      this.page.drawText(v, { x: M + 16, y: ly - 12, size: 9, font: this.regular, color: INK });
      ly -= 34;
    });
    ly = this.y - 30;
    rowsR.forEach(([k, v]) => {
      this.page.drawText(k.toUpperCase(), { x: col2X, y: ly, size: 6.5, font: this.bold, color: Z500 });
      this.page.drawText(v, { x: col2X, y: ly - 12, size: 9, font: this.regular, color: INK });
      ly -= 34;
    });
    this.y -= h + 20;
  }

  /** Pied de page sur toutes les pages + note éventuelle de personnalisation. */
  drawAllFooters() {
    const total = this.pages.length;
    this.pages.forEach((page, i) => {
      page.drawLine({
        start: { x: M, y: FOOT_BASE + 18 },
        end: { x: A4.w - M, y: FOOT_BASE + 18 },
        thickness: 0.6,
        color: Z200,
      });
      const contact = `PodLab Media · ${CONTACT.email} · ${CONTACT.phoneDisplay} · Cotonou — Abidjan · ${SOCIALS.youtubeHandle}`;
      page.drawText(contact, { x: M, y: FOOT_BASE, size: 7, font: this.regular, color: Z500 });
      const pg = `Page ${i + 1} / ${total}`;
      const pw = this.regular.widthOfTextAtSize(pg, 7);
      page.drawText(pg, { x: A4.w - M - pw, y: FOOT_BASE, size: 7, font: this.regular, color: Z500 });
      if (this.footerNote) {
        for (const ln of wrap(this.footerNote, this.oblique, 7, A4.w - 2 * M - pw - 24)) {
          page.drawText(ln, { x: M, y: FOOT_BASE - 11, size: 7, font: this.oblique, color: Z400 });
          break; // une seule ligne max
        }
      }
    });
  }

  async save(): Promise<Uint8Array> {
    this.drawAllFooters();
    return this.doc.save();
  }
}

// ─── Document 1 : Kit Média & Grille Tarifaire (annonceurs) ──────────────────

const KIT = { kicker: "Kit Média 2026", title: "Média & grille tarifaire — annonceurs" } as const;

export async function buildKitMediaPdf(): Promise<Uint8Array> {
  const pdf = await ProPdf.create(KIT.kicker, KIT.title);

  pdf.title(
    "Le 1er média business d'Afrique francophone.",
    "128 000 décideurs abonnés · 1 million d'écoutes par trimestre · 894 vidéos publiées · 2 studios 4K Broadcast internationaux"
  );

  pdf.kicker("01", "L'audience PodLab en bref", KIT.kicker, KIT.title);
  pdf.statRow(
    [
      { value: "128 000", label: "décideurs abonnés YouTube" },
      { value: "1 M+", label: "écoutes par trimestre" },
      { value: "894", label: "vidéos publiées" },
      { value: "78 %", label: "cadres, dirigeants & investisseurs" },
    ],
    KIT.kicker,
    KIT.title
  );

  pdf.kicker("02", "Profil des auditeurs", KIT.kicker, KIT.title);
  pdf.bars(
    [
      { label: "Dirigeants & fondateurs d'entreprise", pct: 34 },
      { label: "Cadres supérieurs & consultants", pct: 27 },
      { label: "Investisseurs & professionnels de la finance", pct: 17 },
      { label: "Créatifs, artistes & créateurs de contenu", pct: 13 },
      { label: "Étudiants en business & autres curieux", pct: 9 },
    ],
    KIT.kicker,
    KIT.title
  );
  pdf.para(
    "Moyennes internes constatées sur les 12 derniers mois (YouTube Analytics + base newsletter PodLab Business Brief). 14 pays d'écoute : Côte d'Ivoire, Bénin, Sénégal, Togo, Cameroun et France en tête.",
    { size: 7.5, color: Z500, font: pdf.oblique }
  );

  pdf.kicker("03", "Niveau d'attention — notre actif le plus rare", KIT.kicker, KIT.title);
  pdf.callout(
    "62 %",
    "de taux de complétion moyen des vidéos PodLab — là où les formats interview longs s'arrêtent en général autour de 45 %. Une audience qui écoute jusqu'au bout, donc expose durablement votre marque.",
    KIT.kicker,
    KIT.title
  );

  pdf.kicker("04", "Nos formats pour annonceurs", KIT.kicker, KIT.title);
  pdf.bullets(
    [
      "Mentions orales naturelles intégrées aux épisodes (Finance & Investissement, Success Stories, Entrepreneuriat, Showbiz)",
      "Intégration produit en plateau 4K + déclinaison extraits Shorts / Reels",
      "Relais newsletter B2B « PodLab Business Brief » — audience 100 % professionnelle",
      "Masterclasses & enregistrements publics : speaking, stand, billetterie partenaire",
      "Épisode dédié « Marque Story » produit en studio clé en main (script, tournage, montage)",
    ],
    KIT.kicker,
    KIT.title
  );

  pdf.kicker("05", "Grille tarifaire indicative (F CFA)", KIT.kicker, KIT.title);
  pdf.table(
    {
      headers: ["Format", "Contenu", "Tarif"],
      widths: [2.4, 4.6, 1.7],
      rows: [
        ["Mention orale épisode", "60 à 90 secondes intégrées au fil d'un épisode existant", "dès 250 000"],
        ["Sponsoring Success Stories", "Package 4 épisodes ciblés + relais newsletter", "sur devis"],
        ["Épisode dédié « Marque Story »", "Interview de marque produite clé en main", "sur devis"],
        ["Pack studio — Audio Master", "3 h d'enregistrement, ingénieur du son dédié", "75 000"],
        ["Pack studio — Podcasting Vidéo 4K", "3 caméras 4K, éclairage cinématique, 3 h", "150 000"],
        ["Pack Production Clé en Main", "Journée complète : tournage + montage + extraits", "350 000"],
        ["Événements & masterclasses", "Speaking, stand, billetterie partenaire", "sur devis"],
      ],
    },
    KIT.kicker,
    KIT.title
  );

  pdf.kicker("06", "Pourquoi PodLab plutôt qu'ailleurs ?", KIT.kicker, KIT.title);
  pdf.bullets(
    [
      "CPM PodLab : 2 500 F CFA pour 1 000 écoutes qualifiées — contre ~10 000 F CFA en équivalent TV / presse, soit 4 fois moins cher.",
      "2 heures de temps d'attention moyen par épisode : votre message est écouté, pas survolé.",
      "Un environnement premium : nos plateaux 4K de Cotonou et Abidjan valorisent l'image de votre marque.",
    ],
    KIT.kicker,
    KIT.title
  );

  pdf.kicker("07", "Travaillons ensemble", KIT.kicker, KIT.title);
  pdf.contactBlock(KIT.kicker, KIT.title);
  pdf.para(
    "Qualifiez votre objectif et débloquez le kit complet en ligne : " +
      (process.env.NEXT_PUBLIC_SITE_URL ?? "https://podlab-media.vercel.app")
        .replace(/^https?:\/\//, "")
        .replace(/\/+$/, "") +
      "/sponsoring",
    { size: 8.5, color: Z600 }
  );

  return pdf.save();
}

// ─── Document 2 : Fiche de synthèse d'épisode (captation email) ──────────────

export async function buildEpisodePdf(
  video: PodLabVideo,
  opts: { email?: string } = {}
): Promise<Uint8Array> {
  const EP = {
    kicker: "Fiche de synthèse",
    title: `Discussion Informelle · ${VIDEO_THEMES[video.theme]}`,
  } as const;

  const pdf = await ProPdf.create(EP.kicker, EP.title);
  pdf.footerNote = opts.email
    ? `Fiche générée pour ${opts.email} le ${new Date().toLocaleDateString("fr-FR")} — les prochaines synthèses arriveront par email.`
    : undefined;

  pdf.title(video.title, `Émission « Discussion Informelle » · Chaîne officielle PodLab ${SOCIALS.youtubeHandle}`);

  pdf.kicker("01", "L'essentiel de cet épisode", EP.kicker, EP.title);
  pdf.bullets(highlightsFor(video.theme), EP.kicker, EP.title);

  pdf.kicker("02", "Comment utiliser cette fiche", EP.kicker, EP.title);
  pdf.para(
    "Lisez-la en 5 minutes avant votre réunion, votre investissement ou votre prise de décision. Repérez les leçons directement transposables à votre contexte, puis approfondissez en regardant l'épisode complet — les passages clés y sont cités."
  );
  pdf.para(
    `Épisode complet : ${video.youtubeUrl}`,
    { size: 8.5, color: Z600 }
  );

  pdf.kicker("03", "Aller plus loin avec PodLab", EP.kicker, EP.title);
  pdf.bullets(
    [
      "Abonnez-vous au PodLab Business Brief : l'analyse business de chaque épisode, chaque dimanche à 8h.",
      "Nos studios 4K de Cotonou et Abidjan accueillent vos propres formats — réservation en ligne.",
      `Suivez-nous : Instagram ${SOCIALS.instagramHandle} · TikTok ${SOCIALS.tiktokHandle} · Facebook ${SOCIALS.facebookHandle}.`,
    ],
    EP.kicker,
    EP.title
  );

  pdf.contactBlock(EP.kicker, EP.title);
  return pdf.save();
}
