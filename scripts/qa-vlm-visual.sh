#!/bin/bash
# Captures défilées + vérification VLM (module, éditeur, hover footer)
set -u
cd /home/z/my-project
AB="agent-browser --session dbg7"
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null; sleep 1
rm -rf .next
nohup npx next dev -p 3000 > dev.log 2>&1 < /dev/null &
for i in $(seq 1 45); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 4)
  [ "$CODE" = "200" ] && break; sleep 2
done
echo "server:$CODE"

$AB open http://localhost:3000/admin/login > /dev/null 2>&1
$AB wait --load networkidle > /dev/null 2>&1; sleep 2
$AB snapshot -i > /tmp/d7.txt 2>&1
E=$(grep -i "ADRESSE" /tmp/d7.txt | grep -o 'ref=e[0-9]*' | head -1 | sed 's/^ref=/@/')
P=$(grep -i "MOT DE PASSE" /tmp/d7.txt | grep -o 'ref=e[0-9]*' | head -1 | sed 's/^ref=/@/')
B=$(grep -i "Accéder au back-office" /tmp/d7.txt | grep -o 'ref=e[0-9]*' | head -1 | sed 's/^ref=/@/')
$AB fill "$E" "contact@podlabmedia.com" > /dev/null 2>&1
$AB fill "$P" "PodLabAdmin2026!" > /dev/null 2>&1
$AB click "$B" > /dev/null 2>&1
sleep 8
$AB snapshot -i > /tmp/d7b.txt 2>&1
TAB=$(grep -i "Fiches & Documents" /tmp/d7b.txt | grep -o 'ref=e[0-9]*' | head -1 | sed 's/^ref=/@/')
$AB click "$TAB" > /dev/null 2>&1
sleep 3

echo "── capture module (défilée)"
$AB eval "window.scrollTo(0, 520)" > /dev/null 2>&1; sleep 1
$AB screenshot qa-shots/vlm-module.png > /dev/null 2>&1

echo "── capture éditeur épisode (défilée)"
$AB eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('Zézé')); if(b){b.click(); return 'ok'} return 'nope'})()" > /dev/null 2>&1
sleep 6
$AB eval "window.scrollTo(0, 560)" > /dev/null 2>&1; sleep 1
$AB screenshot qa-shots/vlm-editeur.png > /dev/null 2>&1

echo "── capture hover YouTube footer (défilée)"
$AB open http://localhost:3000/ > /dev/null 2>&1
$AB wait --load networkidle > /dev/null 2>&1
$AB eval "window.scrollTo(0, document.body.scrollHeight)" > /dev/null 2>&1; sleep 1
$AB snapshot -i > /tmp/d7f.txt 2>&1
YT=$(grep -i "sur YouTube" /tmp/d7f.txt | grep -o 'ref=e[0-9]*' | head -1 | sed 's/^ref=/@/')
$AB hover "$YT" > /dev/null 2>&1; sleep 1
$AB screenshot qa-shots/vlm-hover-youtube.png > /dev/null 2>&1
$AB close > /dev/null 2>&1
pkill -f "next dev" 2>/dev/null; pkill -f "next-server" 2>/dev/null

echo ""
echo "════ VLM 1 : module Fiches & Documents ════"
z-ai vision -p "Capture du back-office PodLab Media (monochrome strict). Vérifie que le module Fiches & Documents est affiché : 4 cartes de types de documents (Fiche de synthèse, Fiche complète, Business Brief, Kit Média) + un sélecteur/liste d'épisodes avec miniatures. Y a-t-il chevauchement, texte coupé ou illisible ? Réponds en 2 points + verdict VALIDE/INVALIDE." -i "./qa-shots/vlm-module.png" 2>/dev/null | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['choices'][0]['message']['content'])" 2>/dev/null || echo "(erreur VLM)"

echo ""
echo "════ VLM 2 : éditeur de fiche épisode ════"
z-ai vision -p "Capture du back-office PodLab Media. Vérifie l'éditeur de fiche PDF : statut (Mode par défaut), boutons Aperçu PDF, sections avec intitulés et cases Visible/Masquée, titre de l'épisode. Y a-t-il chevauchement, débordement ou illisibilité ? Réponds en 2 points + verdict VALIDE/INVALIDE." -i "./qa-shots/vlm-editeur.png" 2>/dev/null | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['choices'][0]['message']['content'])" 2>/dev/null || echo "(erreur VLM)"

echo ""
echo "════ VLM 3 : footer hover YouTube ════"
z-ai vision -p "Capture du footer du site PodLab Media. L'icône YouTube doit apparaître en ROUGE (couleur officielle) au survol tandis que les autres icônes restent grises. Vérifie : 1) l'icône YouTube est-elle rouge ? 2) y a-t-il encore des liens texte YouTube/Instagram/TikTok/Facebook sur la ligne du copyright en bas ? Réponds en 2 points + verdict VALIDE/INVALIDE." -i "./qa-shots/vlm-hover-youtube.png" 2>/dev/null | python3 -c "import json,sys; d=json.load(sys.stdin); print(d['choices'][0]['message']['content'])" 2>/dev/null || echo "(erreur VLM)"
