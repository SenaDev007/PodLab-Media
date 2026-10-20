// ═══════════════════════════════════════════════════════════════════════════
// Enrichissement réel du catalogue PodLab — extraction depuis les pages watch
// YouTube (méthode ytInitialData) : date de publication, vues, durée (par
// recoupement des listes « associées » entre pages), description intégrale.
// Sortie : scripts/videos-enriched.json
// Usage : node scripts/enrich-videos.mjs   (tolérance : reprises, throttle)
// ═══════════════════════════════════════════════════════════════════════════
import fs from "node:fs";

const CATALOG = JSON.parse(
  fs.readFileSync("/home/z/my-project/scripts/videos-data.json", "utf8")
).filter((v) => v.id && !v.error);

const OUT = "/home/z/my-project/scripts/videos-enriched.json";
const PARTIAL = "/home/z/my-project/scripts/videos-enriched.partial.jsonl";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

// ─── Parsing des données ytInitialData ──────────────────────────────────────
function extractInitialData(html) {
  const m = html.match(/var ytInitialData = (\{.+?\});<\/script>/s);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    return null;
  }
}

/** Parcours récursif — collecte des nœuds par clé. */
function collectByKey(root, keyName, acc = []) {
  if (!root || typeof root !== "object") return acc;
  if (Array.isArray(root)) {
    for (const item of root) collectByKey(item, keyName, acc);
    return acc;
  }
  for (const [k, v] of Object.entries(root)) {
    if (k === keyName) acc.push(v);
    collectByKey(v, keyName, acc);
  }
  return acc;
}

const MONTHS = {
  "janv.": 1, "févr.": 2, mars: 3, "avr.": 4, mai: 5, juin: 6,
  "juil.": 7, août: 8, "sept.": 9, "oct.": 10, "nov.": 11, "déc.": 12,
};

function parseFrenchDate(text) {
  if (!text) return null;
  const t = text.replace(/\u202f|\u00a0/g, " ").toLowerCase();
  // « Sortie le 18 oct. 2026 » / « Première diffusion le 3 sept. 2025 »
  const abs = t.match(/(\d{1,2})\s+([a-zéû.]+)\s+(\d{4})/);
  if (abs) {
    const month = MONTHS[abs[2]] ?? MONTHS[abs[2].replace(/\.$/, ".")];
    if (month) {
      return new Date(Date.UTC(+abs[3], month - 1, +abs[1])).toISOString().slice(0, 10);
    }
  }
  // « il y a 3 jours / semaines / mois / ans » (approximation depuis aujourd'hui)
  const rel = t.match(/il y a (\d+) (jour|semaine|mois|an)/);
  if (rel) {
    const n = +rel[1];
    const d = new Date();
    if (rel[2].startsWith("jour")) d.setDate(d.getDate() - n);
    else if (rel[2].startsWith("semaine")) d.setDate(d.getDate() - n * 7);
    else if (rel[2].startsWith("mois")) d.setMonth(d.getMonth() - n);
    else d.setFullYear(d.getFullYear() - n);
    return d.toISOString().slice(0, 10);
  }
  return null;
}

function parseViews(text) {
  if (!text) return null;
  const m = text.replace(/\u202f|\u00a0|\s/g, "").match(/(\d+)/);
  return m ? +m[1] : null;
}

function parseDuration(node) {
  if (!node) return null;
  const simple = node.simpleText; // « 26:53 » / « 1:02:33 »
  if (simple) {
    const parts = simple.split(":").map(Number);
    if (parts.every((p) => !Number.isNaN(p))) {
      return parts.length === 3
        ? parts[0] * 3600 + parts[1] * 60 + parts[2]
        : parts[0] * 60 + parts[1];
    }
  }
  const label = node?.accessibility?.accessibilityData?.label;
  if (label) {
    const h = label.match(/(\d+)\s*heure/)?.[1];
    const m = label.match(/(\d+)\s*minute/)?.[1];
    const s = label.match(/(\d+)\s*seconde/)?.[1];
    if (h || m || s) return (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
  }
  return null;
}

// ─── Extraction par page ────────────────────────────────────────────────────
function extractFromData(data) {
  const meta = { publishedAt: null, views: null, description: null };
  const durations = {}; // videoId -> secondes

  const primary = collectByKey(data, "videoPrimaryInfoRenderer")[0];
  if (primary) {
    const titleRuns = primary?.title?.runs;
    meta.views = parseViews(
      primary?.viewCount?.videoViewCountRenderer?.viewCount?.simpleText
    );
    meta.publishedAt = parseFrenchDate(primary?.dateText?.simpleText);
  }
  if (!meta.description) {
    const desc = collectByKey(data, "attributedDescription")[0];
    meta.description = desc?.content ?? null;
  }
  if (!meta.publishedAt) {
    const micro = collectByKey(data, "videoPrimaryInfoRenderer")[0];
    meta.publishedAt = parseFrenchDate(micro?.dateText?.simpleText);
  }

  // Durées : tout nœud portant videoId + lengthText (listes associées, playlists)
  const seen = collectByKey(data, "compactVideoRenderer")
    .concat(collectByKey(data, "videoRenderer"))
    .concat(collectByKey(data, "playlistPanelVideoRenderer"));
  for (const node of seen) {
    const vid = node?.videoId;
    const dur = parseDuration(node?.lengthText);
    if (vid && dur) durations[vid] = dur;
  }
  return { meta, durations };
}

// ─── Récupération avec reprises ─────────────────────────────────────────────
async function fetchPage(id) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(
        `https://www.youtube.com/watch?v=${id}&hl=fr&persist_hl=1`,
        { headers: { "User-Agent": UA, "Accept-Language": "fr-FR,fr;q=0.9" } }
      );
      if (res.status === 429) {
        console.log(`  ⏳ 429 — pause 12 s`);
        await new Promise((r) => setTimeout(r, 12000));
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
    }
  }
  throw new Error("unreachable");
}

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const durationsMap = {}; // recoupement multi-pages
  const results = [];
  let done = 0;

  // Reprise : ignorer les vidéos déjà traitées
  const processed = new Set();
  if (fs.existsSync(PARTIAL)) {
    for (const line of fs.readFileSync(PARTIAL, "utf8").split("\n")) {
      if (!line.trim()) continue;
      try {
        const rec = JSON.parse(line);
        processed.add(rec.id);
        results.push(rec);
        for (const [k, v] of Object.entries(rec._durations || {})) durationsMap[k] = v;
      } catch {}
    }
    console.log(`⟳ Reprise : ${processed.size} vidéo(s) déjà traitée(s).`);
  }

  for (const v of CATALOG) {
    if (processed.has(v.id)) continue;
    try {
      const html = await fetchPage(v.id);
      const data = extractInitialData(html);
      if (!data) throw new Error("ytInitialData introuvable");
      const { meta, durations } = extractFromData(data);
      results.push({
        id: v.id,
        title: v.title,
        publishedAt: meta.publishedAt,
        views: meta.views,
        description: meta.description,
        _durations: durations,
      });
      for (const [k, sec] of Object.entries(durations)) durationsMap[k] = sec;
      fs.appendFileSync(PARTIAL, JSON.stringify({ id: v.id, ...meta, _durations: durations }) + "\n");
    } catch (e) {
      results.push({ id: v.id, error: String(e.message || e) });
      console.log(`  ✗ ${v.id} : ${e.message}`);
    }
    done++;
    if (done % 10 === 0) console.log(`  … ${done} page(s) traitée(s)`);
    await new Promise((r) => setTimeout(r, 500));
  }

  // Fusion : durées recoupées + métadonnées par vidéo du catalogue
  const enriched = CATALOG.map((v) => {
    const rec = results.find((r) => r.id === v.id) || {};
    return {
      videoId: v.id,
      title: v.title,
      publishedAt: rec.publishedAt ?? null,
      views: rec.views ?? null,
      durationSeconds: durationsMap[v.id] ?? null,
      description: rec.description ?? null,
    };
  });

  const withDate = enriched.filter((e) => e.publishedAt).length;
  const withDur = enriched.filter((e) => e.durationSeconds).length;
  const withDesc = enriched.filter((e) => e.description && e.description.length > 40).length;
  const withViews = enriched.filter((e) => e.views).length;

  fs.writeFileSync(OUT, JSON.stringify(enriched, null, 2));
  console.log(
    `\n✅ Enrichissement terminé : ${enriched.length} vidéos — ` +
    `dates ${withDate}, vues ${withViews}, durées ${withDur}, descriptions ${withDesc}`
  );
  fs.rmSync(PARTIAL, { force: true });
}

main().catch((e) => {
  console.error("❌", e);
  process.exit(1);
});
