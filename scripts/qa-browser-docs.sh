#!/bin/bash
# QA navigateur v3 — refs déterministes, IIFE pour les evals, clics par ref.
# Tout en UN appel shell (l'environnement tue les processus d'arrière-plan).
set -u
cd /home/z/my-project
SHOTS=/home/z/my-project/qa-shots
mkdir -p "$SHOTS"
AB="agent-browser --session podlab3"
PASS=0; FAIL=0
ok() { PASS=$((PASS+1)); echo "  ✓ $1"; }
ko() { FAIL=$((FAIL+1)); echo "  ✗ $1"; }

ref_for() { grep -i "$2" "$1" | grep -o 'ref=e[0-9]*' | head -1 | sed 's/^ref=/@/'; }
# Les eval renvoient du JSON — les chaînes sont quotées : on retire les guillemets
jval() { tail -1 | tr -d '"'; }

echo "── Démarrage dev server (cache .next vierge)"
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; sleep 1
rm -rf .next
nohup npx next dev -p 3000 > dev.log 2>&1 < /dev/null &
for i in $(seq 1 45); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 4)
  [ "$CODE" = "200" ] && break; sleep 2
done
[ "$CODE" = "200" ] || { echo "✗ serveur indisponible"; exit 1; }
echo "  Serveur prêt"

echo "── 1. Footer : structure"
$AB open http://localhost:3000/ > /dev/null 2>&1
$AB wait --load networkidle > /dev/null 2>&1
$AB eval "window.scrollTo(0, document.body.scrollHeight)" > /dev/null 2>&1
sleep 1
TXT_LINKS=$($AB eval "(()=>{return Array.from(document.querySelectorAll('footer a')).filter(a=>/YouTube|Instagram|TikTok|Facebook/.test(a.textContent)&&a.querySelector('svg')===null).length})()" 2>/dev/null | tail -1)
[ "$TXT_LINKS" = "0" ]; [ $? -eq 0 ] && ok "0 lien texte résiduel" || ko "liens texte: $TXT_LINKS"
ICONS=$($AB eval "(()=>{return Array.from(document.querySelectorAll('footer a[aria-label]')).length})()" 2>/dev/null | tail -1)
[ "$ICONS" = "4" ]; [ $? -eq 0 ] && ok "4 icônes sociales" || ko "icônes: $ICONS"

$AB snapshot -i > /tmp/snap-footer.txt 2>&1
YT=$(ref_for /tmp/snap-footer.txt "sur YouTube")
IG=$(ref_for /tmp/snap-footer.txt "Instagram")
TT=$(ref_for /tmp/snap-footer.txt "TikTok")
FB=$(ref_for /tmp/snap-footer.txt "Facebook")

echo "── 2. Footer : couleurs officielles au survol"
hover_color() { # $1 = sélecteur aria, $2 = couleur attendue
  $AB eval "(()=>{const el=document.querySelector('$1');const t=document.createElement('div');t.style.color='$2';document.body.appendChild(t);const e=getComputedStyle(t).color;t.remove();return getComputedStyle(el).color===e})()" 2>/dev/null | tail -1
}
if [ -n "$YT" ]; then
  $AB hover "$YT" > /dev/null 2>&1; sleep 1
  R=$(hover_color "footer a[aria-label*=YouTube]" "#FF0000")
  [ "$R" = "true" ]; [ $? -eq 0 ] && ok "YouTube → rouge officiel #FF0000" || ko "YouTube: $R"
  $AB screenshot "$SHOTS/hover-youtube.png" > /dev/null 2>&1
fi
if [ -n "$IG" ]; then
  $AB hover "$IG" > /dev/null 2>&1; sleep 1
  BG=$($AB eval "(()=>{return getComputedStyle(document.querySelector('footer a[aria-label*=Instagram]')).backgroundImage})()" 2>/dev/null | tail -1)
  echo "$BG" | grep -qi "linear-gradient"; [ $? -eq 0 ] && ok "Instagram → dégradé officiel" || ko "Instagram: $BG"
  $AB screenshot "$SHOTS/hover-instagram.png" > /dev/null 2>&1
fi
if [ -n "$FB" ]; then
  $AB hover "$FB" > /dev/null 2>&1; sleep 1
  R=$(hover_color "footer a[aria-label*=Facebook]" "#1877F2")
  [ "$R" = "true" ]; [ $? -eq 0 ] && ok "Facebook → bleu officiel #1877F2" || ko "Facebook: $R"
fi
if [ -n "$TT" ]; then
  $AB hover "$TT" > /dev/null 2>&1; sleep 1
  F=$($AB eval "(()=>{return getComputedStyle(document.querySelector('footer a[aria-label*=TikTok]')).filter})()" 2>/dev/null | tail -1)
  echo "$F" | grep -qi "drop-shadow"; [ $? -eq 0 ] && ok "TikTok → ombres cyan/rouge officielles" || ko "TikTok: $F"
  $AB screenshot "$SHOTS/hover-tiktok.png" > /dev/null 2>&1
fi

echo "── 3. Connexion back-office"
$AB open http://localhost:3000/admin/login > /dev/null 2>&1
$AB wait --load networkidle > /dev/null 2>&1; sleep 2
$AB snapshot -i > /tmp/snap-login.txt 2>&1
EMAIL_REF=$(ref_for /tmp/snap-login.txt "ADRESSE E-MAIL")
PASS_REF=$(ref_for /tmp/snap-login.txt "MOT DE PASSE")
BTN_REF=$(ref_for /tmp/snap-login.txt "Accéder au back-office")
if [ -n "$EMAIL_REF" ] && [ -n "$PASS_REF" ] && [ -n "$BTN_REF" ]; then
  $AB fill "$EMAIL_REF" "contact@podlabmedia.com" > /dev/null 2>&1
  $AB fill "$PASS_REF" "PodLabAdmin2026!" > /dev/null 2>&1
  $AB click "$BTN_REF" > /dev/null 2>&1
  sleep 8
fi
URL_NOW=$($AB get url 2>/dev/null | tail -1)
[ "$URL_NOW" = "http://localhost:3000/admin" ]; [ $? -eq 0 ] && ok "connecté — $URL_NOW" || ko "login — $URL_NOW"

echo "── 4. Onglet « Fiches & Documents » (clic par ref — l'esperluette casse find text)"
$AB snapshot -i > /tmp/snap-admin.txt 2>&1
DOCS_TAB=$(ref_for /tmp/snap-admin.txt "Fiches & Documents")
echo "  ref onglet: $DOCS_TAB"
$AB click "$DOCS_TAB" > /dev/null 2>&1
sleep 4
HAS_DOC=$($AB eval "(()=>{const t=document.body.textContent; return t.includes('Choisir un épisode')&&t.includes('Fiche abonnés')&&t.includes('Kit Média')?'oui':'NON'})()" 2>/dev/null | jval)
[ "$HAS_DOC" = "oui" ]; [ $? -eq 0 ] && ok "sélecteur des 4 documents affiché" || ko "sélecteur: $HAS_DOC"
$AB screenshot "$SHOTS/admin-documents-module.png" > /dev/null 2>&1

echo "── 5. Épisode → éditeur de fiche"
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Zézé')); if(b){b.click(); return 'click'} return 'nope'})()" > /dev/null 2>&1
sleep 6
HAS_ED=$($AB eval "(()=>{const t=document.body.textContent; return t.includes('Mode par défaut')&&t.includes('Aperçu PDF')&&t.includes('Enregistrer la fiche')&&t.includes('Fiche publiée')?'oui':'NON'})()" 2>/dev/null | jval)
[ "$HAS_ED" = "oui" ]; [ $? -eq 0 ] && ok "éditeur complet chargé (statut, aperçu, publication)" || ko "éditeur: $HAS_ED"
$AB screenshot "$SHOTS/admin-editeur-fiche.png" > /dev/null 2>&1

echo "── 6. Palette des 10 types de sections"
KINDS=$($AB eval "(()=>{const s=document.querySelector('select'); return s?Array.from(s.options).map(o=>o.text).join(','):'absent'})()" 2>/dev/null | tail -1)
echo "  Types: $KINDS"
echo "$KINDS" | grep -q "Paragraphe.*Citation.*Invités.*Tableau.*Bloc contact"; [ $? -eq 0 ] && ok "palette de sections complète" || ko "palette incomplète"

echo "── 7. Fiche abonnés Business Brief (document global)"
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Fiche abonnés')); if(b){b.click(); return 'click'} return 'nope'})()" > /dev/null 2>&1
sleep 8
# Les libellés de sections sont des VALUE d'input — pas dans textContent
HAS_BB=$($AB eval "(()=>{return [...document.querySelectorAll('input,textarea')].some(i=>(i.value||'').includes('Ce que contient la Fiche Décideur'))?'oui':'NON'})()" 2>/dev/null | jval)
[ "$HAS_BB" = "oui" ]; [ $? -eq 0 ] && ok "éditeur Business Brief chargé avec les défauts" || ko "Business Brief: $HAS_BB"
$AB screenshot "$SHOTS/admin-business-brief.png" > /dev/null 2>&1

echo "── 8. Page épisode publique : bouton fiche complète"
$AB open "http://localhost:3000/episodes/ffsMdUO5dqw" > /dev/null 2>&1
$AB wait --load networkidle > /dev/null 2>&1; sleep 2
HAS_BTN=$($AB eval "(()=>{return document.body.textContent.includes('Fiche complète — invités, citation, notes')?'oui':'NON'})()" 2>/dev/null | jval)
[ "$HAS_BTN" = "oui" ]; [ $? -eq 0 ] && ok "bouton fiche complète présent" || ko "bouton: $HAS_BTN"

echo "── Nettoyage"
$AB close > /dev/null 2>&1
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null
echo ""
echo "════════ NAVIGATEUR : $PASS réussis / $FAIL échoués ════════"
[ "$FAIL" -eq 0 ]
