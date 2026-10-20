// ═══════════════════════════════════════════════════════════════════════════
// Passe 2 — Récolte des durées réelles par recoupement des écrans de fin.
// Chaque page watch expose ~12 vidéos « endScreenVideoRenderer » avec
// lengthInSeconds → en visitant les 75 pages, on recoupe la majorité des
// durées du catalogue. Fusion dans scripts/videos-enriched.json.
// Usage : node scripts/harvest-durations.mjs   (reprise tolérée)
// ═══════════════════════════════════════════════════════════════════════════
import fs from "node:fs";

const CATALOG = JSON.parse(
  fs.readFileSync("/home/z/my-project/scripts/videos-data.json", "utf8")
).filter((v) => v.id && !v.error);

const ENRICHED = "/home/z/my-project/scripts/videos-enriched.json";
const PARTIAL = "/home/z/my-project/scripts/harvest.partial.jsonl";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

function extractInitialData(html) {
  const m = html.match(/var ytInitialData = (\{.+?\});<\/script>/s);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

/** Marche récursive — tout nœud portant lengthInSeconds (tous renderers). */
function harvestDurations(data) {
  const out = {};
  (function walk(node) {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const n of node) walk(n);
      return;
    }
    for (const v of Object.values(node)) {
      if (v && typeof v === "object" && "lengthInSeconds" in v && v.videoId) {
        const sec = Number(v.lengthInSeconds);
        if (Number.isFinite(sec) && sec > 0) out[v.videoId] = sec;
      }
      walk(v);
    }
  })(data);
  return out;
}

async function fetchPage(id) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(
        `https://www.youtube.com/watch?v=${id}&hl=fr&persist_hl=1`,
        { headers: { "User-Agent": UA, "Accept-Language": "fr-FR,fr;q=0.9" } }
      );
      if (res.status === 429) {
        console.log(`  ⏳ 429 — pause 15 s`);
        await new Promise((r) => setTimeout(r, 15000));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (attempt === 3) throw e;
      await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
    }
  }
  throw new Error("unreachable");
}

async function main() {
  const durations = {};
  const processed = new Set();

  if (fs.existsSync(PARTIAL)) {
    for (const line of fs.readFileSync(PARTIAL, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try {
        const rec = JSON.parse(line);
        processed.add(rec.id);
        Object.assign(durations, rec.found);
      } catch {}
    }
    console.log(`⟳ Reprise : ${processed.size} page(s) déjà traitée(s).`);
  }

  let done = 0;
  for (const v of CATALOG) {
    if (processed.has(v.id)) continue;
    try {
      const html = await fetchPage(v.id);
      const data = extractInitialData(html);
      const found = data ? harvestDurations(data) : {};
      Object.assign(durations, found);
      fs.appendFileSync(PARTIAL, JSON.stringify({ id: v.id, found }) + "\n");
    } catch (e) {
      console.log(`  ✗ ${v.id} : ${e.message}`);
    }
    done++;
    if (done % 10 === 0) console.log(`  … ${done} page(s), ${Object.keys(durations).length} durées récoltées`);
    await new Promise((r) => setTimeout(r, 700));
  }

  // Fusion dans videos-enriched.json
  const enriched = JSON.parse(fs.readFileSync(ENRICHED, "utf8"));
  let filled = 0;
  for (const item of enriched) {
    if (durations[item.videoId] && !item.durationSeconds) {
      item.durationSeconds = durations[item.videoId];
      filled++;
    }
  }
  fs.writeFileSync(ENRICHED, JSON.stringify(enriched, null, 2));

  const withDur = enriched.filter((e) => e.durationSeconds).length;
  console.log(
    `\n✅ Durées récoltées : ${Object.keys(durations).length} vidéos croisées, ` +
      `${filled} complétées — total catalogue : ${withDur}/${enriched.length}`
  );
  fs.rmSync(PARTIAL, { force: true });
}

main().catch((e) => {
  console.error("❌", e);
  process.exit(1);
});
