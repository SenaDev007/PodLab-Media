#!/usr/bin/env python3
"""Génère le favicon PodLab (src/app/icon.png) depuis le VRAI logo officiel.

Source : public/logo-podlab.png (wordmark « PodLab » blanc sur transparent).
On isole le glyphe « P » (lettrage initial du vrai logo), on l'upscale proprement
(LANCZOS) puis on le centre sur un carré noir absolu 512×512 avec le liseré
blanc translucide caractéristique du design system monochrome.
"""
from PIL import Image, ImageDraw

SRC = "public/logo-podlab.png"
OUT = "src/app/icon.png"

S = 512  # carré final

src = Image.open(SRC).convert("RGBA")

# ── 1. Isolation du glyphe « P » (analyse d'occupation colonne : x 14→45) ──
# Marges incluses pour conserver l'anti-aliasing du lettrage original.
p = src.crop((12, 18, 46, 64))  # 34×46 px
assert p.width == 34 and p.height == 46, f"crop inattendu {p.size}"

# ── 2. Upscale net (×7 → 238×322) ──
p = p.resize((p.width * 7, p.height * 7), Image.LANCZOS)

# ── 3. Carré noir absolu + liseré blanc/0.22 (design system §1) ──
img = Image.new("RGBA", (S, S), (0, 0, 0, 255))
draw = ImageDraw.Draw(img)
# Liseré intérieur arrondi, esprit de l'ancienne favicone mais avec le vrai P
draw.rounded_rectangle(
    [7, 7, S - 8, S - 8],
    radius=98,
    outline=(255, 255, 255, 56),  # blanc à ~22 % d'opacité
    width=5,
)

# ── 4. Centrage du P ──
img.alpha_composite(p, ((S - p.width) // 2, (S - p.height) // 2))

img.save(OUT, "PNG")

# Contrôle ASCII (aperçu réduit)
check = img.resize((46, 46)).convert("RGBA")
px = check.load()
for y in range(46):
    row = ""
    for x in range(46):
        r, g, b, a = px[x, y]
        # blanc si pixel clair ET opaque
        row += "#" if (a > 128 and r > 100) else "."
    print(row)
print(f"\nOK → {OUT} ({S}×{S})")
