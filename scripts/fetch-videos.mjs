// Récupère les métadonnées réelles des vidéos PodLab Media via l'API oEmbed YouTube.
// Sortie : /home/z/my-project/scripts/videos-data.json
const IDS = [
  "ffsMdUO5dqw","hTCraS5qU34","v2bdmOuogvY","5qNXELZfCu0","Fzw4I2M5Nz0","MRn9vTGoT74",
  "IfIhhB_Z5us","x-3JodohGP0","TSzxqWtgqF4","x37QkXpaVKM","_ccQXbS71Zs","J04QN8m5gqA",
  "eW08xU1hf1A","0_mxbi5pHZY","_3gZ2IXeg1s","56nmEWSUYMw","ursfTiR8MbE","H9KzvG32N04",
  "M8is_gvx46M","0XQRGskW-nE","JngieFjqOG8","Av7KHSdVEZY","u5p5v-3XhNc","97Pwlm4pNIY",
  "kO0pi8plsX8","W632rC9VhI0","3P1oL6ReFJ0","hqGxOPRhWPY","sv3pMXULrSk","7Ec0vtM1k98",
  "Ts_NX8YAiKo","VLwOCxBu8uU","33OSU4rh4SA","CDJX4Y7TuNI","Y6ny6DKFD-8","Zrn3EHMw4aw",
  "jllYfJBMLSA","KETjRHucqbo","_bSXkAnGOmA","n391rT7I1GA","2pc-MCNP4QI","IGET1L2pWRc",
  "MzX4uUpSrzM","xmcyahI_d6s","07UPhsoutTk","FmQp8ShPSZ8","Wfy2oKUzqkE","anFA8KKDkcc",
  "27gLHkYqNfA","vrMxGPRiFvs","0xocLvQCOgM","59cWlAws2-U","LacEC_HFG3A","L5QAmcmeb2w",
  "kM5amDE4Fbk","bl7k6PbA9os","cDKKgloOQLA","O-1IeHwz8UM","Cay9Fe3W7IQ","ZOuhkvn66mU",
  "QUR66Uv-i90","EhPptDYXMIA","HjrjO-BhU94","Gn206I4UBPE","NG0kX0uRqck","HON6Dup5B_c",
  "2W0bj2JDmDg","RD453L9h_Vo","YzQxx0O7h7I","LPdFb9fUI6w","k_6rWpJDsJs","VowKTxQyyuA",
  "8MO_QzB9T04","ozrySoegUCA","WDpakVcKRY0",
];

async function fetchOne(id) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (res.status === 404) return { id, error: "404" };
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      return {
        id,
        title: j.title,
        author: j.author_name,
        authorUrl: j.author_url,
        thumbnail: j.thumbnail_url,
        width: j.width,
        height: j.height,
      };
    } catch (e) {
      if (attempt === 2) return { id, error: String(e.message || e) };
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
  }
}

async function main() {
  const out = [];
  const BATCH = 8;
  for (let i = 0; i < IDS.length; i += BATCH) {
    const chunk = IDS.slice(i, i + BATCH);
    const results = await Promise.all(chunk.map(fetchOne));
    out.push(...results);
    console.log(`[${Math.min(i + BATCH, IDS.length)}/${IDS.length}] ok=${out.filter((v) => v.title).length}`);
    await new Promise((r) => setTimeout(r, 350));
  }
  const fs = await import("node:fs");
  fs.writeFileSync(
    "/home/z/my-project/scripts/videos-data.json",
    JSON.stringify(out, null, 2)
  );
  const failed = out.filter((v) => !v.title);
  console.log(`\nTerminé : ${out.length - failed.length}/${out.length} vidéos récupérées.`);
  if (failed.length) console.log("Échecs :", failed.map((f) => f.id).join(", "));
}

main();
