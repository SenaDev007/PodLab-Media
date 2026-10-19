// ─── Générateur PDF minimal (client-side, sans dépendance) ──────────────────
// Produit un PDF A4 monochrome valide : titre, sous-titres, lignes à puces.
// Utilisé pour : Résumés d'épisodes (captation email) et Kit Média B2B.

interface PdfSection {
  heading?: string;
  lines: string[];
}

interface PdfDoc {
  title: string;
  subtitle?: string;
  brand?: string;
  sections: PdfSection[];
  footer?: string;
}

function esc(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrap(text: string, max = 86): string[] {
  const words = text.split(/\s+/);
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      if (line) out.push(line.trim());
      line = w;
    } else {
      line += " " + w;
    }
  }
  if (line.trim()) out.push(line.trim());
  return out;
}

export function buildPdfBytes(doc: PdfDoc): Blob {
  const pageW = 595;
  const pageH = 842;
  const left = 56;
  let y = 770;

  const parts: string[] = [];
  const push = (font: string, size: number, text: string, lead = 16) => {
    parts.push(`BT /${font} ${size} Tf ${left} ${y} Td 0 0 ${lead} rg ${lead} TL (${esc(text)}) Tj ET`);
  };

  // Marque (petites capitales grises simulées par la taille)
  if (doc.brand) {
    parts.push(`BT /F3 9 Tf ${left} ${y} Td (${esc(doc.brand.toUpperCase())}) Tj ET`);
    y -= 22;
  }

  // Titre principal (retours à la ligne auto)
  for (const [i, line] of wrap(doc.title, 38).entries()) {
    parts.push(`BT /F1 ${i === 0 ? 26 : 26} Tf ${left} ${y} Td (${esc(line)}) Tj ET`);
    y -= 30;
  }
  y -= 8;

  if (doc.subtitle) {
    for (const line of wrap(doc.subtitle, 80)) {
      parts.push(`BT /F2 12 Tf ${left} ${y} Td (${esc(line)}) Tj ET`);
      y -= 17;
    }
  }

  // Filet de séparation
  parts.push(`0.4 w ${left} ${y} m ${pageW - left} ${y} l S`);
  y -= 28;

  for (const section of doc.sections) {
    if (section.heading) {
      parts.push(`BT /F1 13 Tf ${left} ${y} Td (${esc(section.heading)}) Tj ET`);
      y -= 20;
    }
    for (const raw of section.lines) {
      const bullet = raw.startsWith("•");
      const text = bullet ? raw.slice(1).trim() : raw;
      for (const [i, line] of wrap(text, bullet ? 80 : 84).entries()) {
        const prefix = bullet && i === 0 ? "- " : "  ";
        parts.push(`BT /F2 ${i === 0 && bullet ? 11 : 11} Tf ${left} ${y} Td (${esc(prefix + line)}) Tj ET`);
        y -= 16;
      }
    }
    y -= 14;
    if (y < 120) break; // une seule page : on tronque proprement
  }

  if (doc.footer && y > 80) {
    parts.push(`0.3 w ${left} 96 m ${pageW - left} 96 l S`);
    parts.push(`BT /F2 8 Tf ${left} 80 Td (${esc(doc.footer)}) Tj ET`);
  }

  const content = parts.join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 4 0 R >> >> /Contents 6 0 R >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefPos = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

  // Encodage latin-1 (WinAnsi couvre les accents français)
  const bytes = new Uint8Array(pdf.length);
  for (let i = 0; i < pdf.length; i++) {
    bytes[i] = pdf.charCodeAt(i) & 0xff;
  }
  return new Blob([bytes], { type: "application/pdf" });
}

export function downloadPdf(doc: PdfDoc, filename: string) {
  const blob = buildPdfBytes(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
