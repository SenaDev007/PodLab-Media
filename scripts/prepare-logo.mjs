// Prépare le logo PodLab pour l'embarquement dans les PDF serveur :
// 1. Ré-échantillonne le logo 181x81 → 3x (543x243) pour un rendu net à l'impression
// 2. Vérifie la transparence (logo blanc sur fond transparent attendu)
// 3. Génère src/lib/logo-base64.ts avec la data URI
import sharp from "sharp";
import fs from "node:fs";

const SRC = "public/logo-podlab.png";
const OUT = "src/lib/logo-base64.ts";

const meta = await sharp(SRC).metadata();
console.log("logo source:", meta.width, "x", meta.height, "alpha:", meta.hasAlpha, "format:", meta.format);

const buf = await sharp(SRC)
  .resize({ width: meta.width * 3, kernel: "lanczos3" })
  .png({ compressionLevel: 9, palette: true, colors: 16, effort: 10 })
  .toBuffer();

console.log("logo optimisé:", buf.length, "octets");
const b64 = buf.toString("base64");
console.log("base64:", b64.length, "caractères");

const ts = `// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Logo officiel embarqué (génération PDF côté serveur)
// Auto-généré depuis public/logo-podlab.png (scripts/prepare-logo.mjs).
// Embarqué en base64 : lisible dans les fonctions serverless Vercel,
// où le dossier public/ n'est pas accessible via fs.
// ═══════════════════════════════════════════════════════════════════════════

export const LOGO_PODLAB_BASE64 = "${b64}" as const;

/** Dimensions natives du PNG embarqué (points pdf-lib). */
export const LOGO_PODLAB_SIZE = { width: ${meta.width * 3}, height: ${meta.height * 3} } as const;
`;

fs.writeFileSync(OUT, ts);
console.log("écrit:", OUT);
