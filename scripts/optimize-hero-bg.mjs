/**
 * Optimisation web de l'image de fond du hero — PodLab Media
 * PNG généré (2048x1024) → WebP (meilleure compression, fond photographique)
 * + version 1280px pour mobile (poids réduit).
 */
import sharp from 'sharp';
import fs from 'fs';

const SRC = '/home/z/my-project/public/hero-studio-bg.png';

async function main() {
  const meta = await sharp(SRC).metadata();
  console.log(`Source : ${SRC} — ${meta.width}x${meta.height}`);

  // 1. WebP haute qualité (desktop, 2048px de large)
  await sharp(SRC)
    .webp({ quality: 78, effort: 6 })
    .toFile('/home/z/my-project/public/hero-studio-bg.webp');

  // 2. WebP mobile (1280px de large — écrans mobiles ~2x-3x DPR)
  await sharp(SRC)
    .resize({ width: 1280 })
    .webp({ quality: 72, effort: 6 })
    .toFile('/home/z/my-project/public/hero-studio-bg-mobile.webp');

  for (const f of [
    'public/hero-studio-bg.png',
    'public/hero-studio-bg.webp',
    'public/hero-studio-bg-mobile.webp',
  ]) {
    const kb = (fs.statSync(`/home/z/my-project/${f}`).size / 1024).toFixed(0);
    console.log(`✓ ${f} — ${kb} Ko`);
  }
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
