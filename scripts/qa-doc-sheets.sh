#!/bin/bash
# QA autonome : démarre le dev server, exécute la suite E2E doc-sheets, puis
# arrête le serveur. Tout se passe dans UN appel shell (l'environnement tue
# les processus en arrière-plan entre les appels).
set -u
cd /home/z/my-project

echo "── Démarrage du dev server…"
pkill -f "next dev" 2>/dev/null
pkill -f "next-server" 2>/dev/null
sleep 1
nohup npx next dev -p 3000 > dev.log 2>&1 < /dev/null &

# Attente de disponibilité (max 90 s)
for i in $(seq 1 45); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ --max-time 4)
  if [ "$CODE" = "200" ]; then
    echo "  Serveur prêt après ~$((i*2)) s"
    break
  fi
  sleep 2
done

if [ "$CODE" != "200" ]; then
  echo "  ✗ Serveur indisponible — abandon"
  tail -20 dev.log
  pkill -f "next dev" 2>/dev/null
  exit 1
fi

# Suite E2E complète
./scripts/e2e-doc-sheets.sh
RESULT=$?

# Nettoyage des données de test (base propre pour la suite)
echo "── Nettoyage éventuel…"
pkill -f "next dev" 2>/dev/null
pkill -f "next-server" 2>/dev/null
exit $RESULT
