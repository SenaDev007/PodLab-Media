/**
 * Génération de l'image de fond professionnelle du hero section — PodLab Media
 * Scène : studio podcast premium, monochrome, cinématique (cohérent avec le design system)
 * Taille API valide : multiples de 32, 512-2880px, max 2^22 pixels.
 */
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

const PROMPT = `Cinematic black and white photograph of a premium podcast recording studio at night, two elegant Black African business executives in tailored suits sitting across a wooden table recording a business podcast interview, professional broadcast microphones on boom arms, dramatic low-key studio lighting with soft rim light, dark moody atmosphere, acoustic panels and studio LED strips glowing softly in background bokeh, shallow depth of field, high contrast monochrome photography, dark charcoal tones, very dark background suitable for white text overlay, shot on cinema camera, ultra detailed, professional editorial photography`;

const OUT = '/home/z/my-project/public/hero-studio-bg.png';

async function main() {
  console.log('⏳ Génération de l\'image de fond du hero (2048x1024)...');
  const zai = await ZAI.create();

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await zai.images.generations.create({
        prompt: PROMPT,
        size: '2048x1024',
      });

      const base64 = response?.data?.[0]?.base64;
      if (!base64) throw new Error('Réponse API invalide : pas de base64');

      const buffer = Buffer.from(base64, 'base64');
      fs.writeFileSync(OUT, buffer);
      console.log(`✅ Image sauvegardée : ${OUT} (${(buffer.length / 1024).toFixed(0)} Ko, tentative ${attempt})`);
      return;
    } catch (err) {
      lastError = err;
      console.error(`Tentative ${attempt} échouée : ${err.message}`);
      if (attempt < 3) await new Promise(r => setTimeout(r, 1500 * attempt));
    }
  }
  throw lastError;
}

main().catch(err => {
  console.error('❌ Échec définitif :', err.message);
  process.exit(1);
});
