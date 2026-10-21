#!/bin/bash
# E2E — Back-office « Fiches & Documents » + génération PDF publique
set -u
BASE="http://localhost:3000"
CJ="/tmp/podlab-docs-cookies.txt"
PASS=0; FAIL=0

ok()   { PASS=$((PASS+1)); echo "  ✓ $1"; }
ko()   { FAIL=$((FAIL+1)); echo "  ✗ $1"; }
check() { # $1 = condition (0/1), $2 = label
  if [ "$1" -eq 0 ]; then ok "$2"; else ko "$2"; fi
}

echo "── 1. Authentification admin"
rm -f "$CJ"
LOGIN=$(curl -s -c "$CJ" -X POST "$BASE/api/admin/login" -H "Content-Type: application/json" \
  -d '{"email":"contact@podlabmedia.com","password":"PodLabAdmin2026!"}')
echo "$LOGIN" | grep -q '"success":true'; check $? "login admin OK"

echo "── 2. Garde 401 sans session"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/admin/doc-sheets?docType=kit_media")
[ "$CODE" = "401" ]; check $? "GET doc-sheets sans session → 401 (obtenu $CODE)"
CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE/api/admin/doc-sheets/preview" \
  -H "Content-Type: application/json" -d '{}')
[ "$CODE" = "401" ]; check $? "POST preview sans session → 401 (obtenu $CODE)"

echo "── 3. Index + détail (fiche par défaut)"
IDX=$(curl -s -b "$CJ" "$BASE/api/admin/doc-sheets?docType=episode_synthese")
echo "$IDX" | grep -q '"sheets":\[\]'; check $? "index vide au départ"
DET=$(curl -s -b "$CJ" "$BASE/api/admin/doc-sheets?docType=episode_synthese&scopeKey=ffsMdUO5dqw")
echo "$DET" | grep -q '"saved":null'; check $? "saved=null (mode par défaut)"
echo "$DET" | grep -q '"defaults"'; check $? "défauts calculés fournis"
echo "$DET" | grep -q '"L'"'"'essentiel de cet épisode"'; check $? "sections par défaut présentes"

echo "── 4. Enregistrement d'une fiche personnalisée (PUT)"
PUT=$(curl -s -b "$CJ" -X PUT "$BASE/api/admin/doc-sheets" -H "Content-Type: application/json" -d '{
  "docType":"episode_synthese","scopeKey":"ffsMdUO5dqw",
  "title":"Fiche pilotée par le back-office",
  "subtitle":"Test E2E — contenu contrôlé par POD LAB",
  "sections":[
    {"id":"c1","kind":"bullets","label":"Ce que POD LAB a décidé","enabled":true,
     "items":["Point éditorial n°1 validé par la rédaction","Point éditorial n°2"]},
    {"id":"c2","kind":"quote","label":"Citation validée","enabled":true,
     "quoteText":"L Afrique doit produire ses propres modèles","quoteAuthor":"Test Back-office"},
    {"id":"c3","kind":"paragraph","label":"Section masquée","enabled":false,"text":"NE DOIT PAS APPARAITRE"},
    {"id":"c4","kind":"stats","label":"Chiffres choisis","enabled":true,
     "stats":[{"value":"99 %","label":"taux de contrôle back-office"}]}
  ],
  "showContact":true,"footerNote":"Note de pied personnalisée E2E","published":true}')
echo "$PUT" | grep -q '"success":true'; check $? "PUT fiche → success"

echo "── 5. Aperçu PDF avant publication (POST preview)"
curl -s -b "$CJ" -X POST "$BASE/api/admin/doc-sheets/preview" -H "Content-Type: application/json" \
  -d '{"sheet":{"docType":"episode_synthese","scopeKey":"ffsMdUO5dqw","title":"Aperçu non enregistré","subtitle":"","sections":[{"id":"p1","kind":"bullets","label":"Brouillon","enabled":true,"items":["Contenu d aperçu"]}],"showContact":false,"footerNote":"","published":false}}' \
  -o /tmp/preview-test.pdf
head -c 4 /tmp/preview-test.pdf | grep -q "%PDF"; check $? "preview → PDF valide ($(stat -c%s /tmp/preview-test.pdf) octets)"
pdftotext /tmp/preview-test.pdf - 2>/dev/null | grep -q "Contenu d aper"; check $? "preview contient l'état NON enregistré"
pdftotext /tmp/preview-test.pdf - 2>/dev/null | grep -qi "Travaillons ensemble"; [ $? -eq 1 ]; check $? "showContact=false → pas de bloc contact auto"

echo "── 6. Le PDF public reflète la fiche enregistrée"
curl -s "$BASE/api/pdf/episode?videoId=ffsMdUO5dqw&email=e2e@podlab.test" -o /tmp/pub-episode.pdf
head -c 4 /tmp/pub-episode.pdf | grep -q "%PDF"; check $? "PDF épisode public valide"
TXT=$(pdftotext /tmp/pub-episode.pdf - 2>/dev/null)
echo "$TXT" | grep -q "Fiche pilotée par le back-office"; check $? "titre personnalisé dans le PDF public"
echo "$TXT" | grep -q "Point éditorial n°1"; check $? "contenu éditorial personnalisé présent"
echo "$TXT" | grep -q "NE DOIT PAS APPARAITRE"; [ $? -eq 1 ]; check $? "section masquée absente"
echo "$TXT" | grep -qi "Citation validée"; check $? "bloc citation rendu"
echo "$TXT" | grep -q "99 %"; check $? "bloc stats rendu"
echo "$TXT" | grep -q "e2e@podlab.test"; check $? "personnalisation email en pied de page"
echo "$TXT" | grep -q "Note de pied personnalisée"; check $? "note de pied personnalisée"

echo "── 7. Fiche complète publique (invités, citation, notes)"
curl -s "$BASE/api/pdf/episode-complete?videoId=ffsMdUO5dqw" -o /tmp/pub-complete.pdf
head -c 4 /tmp/pub-complete.pdf | grep -q "%PDF"; check $? "PDF fiche complète valide ($(stat -c%s /tmp/pub-complete.pdf) octets)"
TXTC=$(pdftotext /tmp/pub-complete.pdf - 2>/dev/null)
echo "$TXTC" | grep -qi "invit"; check $? "fiche complète contient les invités"
echo "$TXTC" | grep -qi "Synopsis"; check $? "fiche complète contient le synopsis"

echo "── 8. Business Brief (abonnés) + Kit Média (régression)"
curl -s "$BASE/api/pdf/business-brief?email=abonne@podlab.test" -o /tmp/pub-brief.pdf
head -c 4 /tmp/pub-brief.pdf | grep -q "%PDF"; check $? "PDF Business Brief valide ($(stat -c%s /tmp/pub-brief.pdf) octets)"
pdftotext /tmp/pub-brief.pdf - 2>/dev/null | grep -q "L'Envers du Décor Business\|Grilles de lecture BRVM"; check $? "contenu Fiche Décideur présent"
pdftotext /tmp/pub-brief.pdf - 2>/dev/null | grep -q "abonne@podlab.test"; check $? "email abonné en pied de page"
curl -s "$BASE/api/pdf/kit-media" -o /tmp/pub-kit.pdf
head -c 4 /tmp/pub-kit.pdf | grep -q "%PDF"; check $? "PDF Kit Média valide après refactor ($(stat -c%s /tmp/pub-kit.pdf) octets)"
pdftotext /tmp/pub-kit.pdf - 2>/dev/null | grep -qi "Grille tarifaire"; check $? "Kit Média : grille tarifaire intacte"

echo "── 9. Brouillon dépublié → le site public retombe sur les défauts"
curl -s -b "$CJ" -X PUT "$BASE/api/admin/doc-sheets" -H "Content-Type: application/json" -d '{
  "docType":"episode_synthese","scopeKey":"ffsMdUO5dqw",
  "title":"BROUILLON NON PUBLIE","subtitle":"","sections":[],
  "showContact":true,"footerNote":"","published":false}' > /dev/null
curl -s "$BASE/api/pdf/episode?videoId=ffsMdUO5dqw" -o /tmp/pub-ep2.pdf
pdftotext /tmp/pub-ep2.pdf - 2>/dev/null | grep -q "BROUILLON NON PUBLIE"; [ $? -eq 1 ]; check $? "brouillon invisible côté public"
pdftotext /tmp/pub-ep2.pdf - 2>/dev/null | grep -qi "Comment utiliser cette fiche"; check $? "défauts utilisés pendant le brouillon"

echo "── 10. Suppression → retour au contenu par défaut"
curl -s -b "$CJ" -X DELETE "$BASE/api/admin/doc-sheets?docType=episode_synthese&scopeKey=ffsMdUO5dqw" | grep -q '"success":true'; check $? "DELETE OK"
IDX2=$(curl -s -b "$CJ" "$BASE/api/admin/doc-sheets?docType=episode_synthese")
echo "$IDX2" | grep -q '"sheets":\[\]'; check $? "index vide après suppression"

echo "── 11. Validation des entrées invalides"
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" "$BASE/api/admin/doc-sheets?docType=inconnu")
[ "$CODE" = "400" ]; check $? "docType inconnu → 400 (obtenu $CODE)"
CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$CJ" -X PUT "$BASE/api/admin/doc-sheets" \
  -H "Content-Type: application/json" -d '{"docType":"episode_synthese","scopeKey":"EPISODE_INEXISTANT","title":"x","sections":[]}')
[ "$CODE" = "404" ]; check $? "épisode inexistant → 404 (obtenu $CODE)"

echo "── 12. Épisode inconnu côté public"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/pdf/episode-complete?videoId=MAUVAIS_ID")
[ "$CODE" = "404" ]; check $? "fiche complète épisode inconnu → 404 (obtenu $CODE)"

echo ""
echo "════════ RÉSULTAT : $PASS réussis / $FAIL échoués ════════"
[ "$FAIL" -eq 0 ]
