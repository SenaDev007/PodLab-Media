#!/usr/bin/env python3
"""
PodLab Media — passe `variant: "destructive"` sur tous les toasts d'erreur.
Cible : les toast({ title: "<titre d'erreur>" }) du site public + back-office.
Les toasts de succès (default noir/blanc monochrome) ne sont pas touchés.
"""
import re
import sys

FILES = [
    "src/components/podlab/episodes/episode-detail.tsx",
    "src/components/podlab/invitation/invitation-view.tsx",
    "src/components/podlab/evenements/evenements-view.tsx",
    "src/components/podlab/studios/studios-view.tsx",
    "src/components/podlab/sponsoring/sponsoring-view.tsx",
    "src/components/podlab/player/floating-player.tsx",
    "src/components/podlab/home/newsletter-section.tsx",
    "src/components/podlab/admin/docs-manager.tsx",
    "src/components/podlab/admin/episodes-cms.tsx",
    "src/components/podlab/admin/site-stats-manager.tsx",
    "src/components/podlab/admin/crm-kanban.tsx",
]

ERROR_TITLES = (
    "Indisponible|Créneau manquant|Nom requis|Email invalide|Téléphone requis|"
    "Erreur|Formulaire incomplet|Réservation impossible|Choisissez d'abord un jour|"
    "Consentement requis|Copie impossible|Champs manquants"
)

# Pass A — toast multi-lignes : title est la 1re propriété sur sa propre ligne
#   toast({
#     title: "Erreur",
# → toast({
#     variant: "destructive",
#     title: "Erreur",
RE_MULTILINE = re.compile(
    r'toast\(\{\n(\s+)(?=title: "(?:' + ERROR_TITLES + r')")'
)
# Pass B — toast sur une seule ligne : toast({ title: "Erreur", ... });
RE_SINGLELINE = re.compile(
    r'toast\(\{ (?=[^{}\n]*?title: "(?:' + ERROR_TITLES + r')")'
)

total = 0
for path in FILES:
    with open(path, encoding="utf-8") as f:
        src = f.read()

    before = src

    # A : insertion alignée sur l'indentation de la ligne title:
    src = RE_MULTILINE.sub(lambda m: f'toast({{\n{m.group(1)}variant: "destructive",\n{m.group(1)}', src)
    # B : insertion inline juste après l'accolade ouvrante
    src = RE_SINGLELINE.sub('toast({ variant: "destructive", ', src)

    n_multi = len(RE_MULTILINE.findall(before))
    n_single = len(RE_SINGLELINE.findall(before))
    count = n_multi + n_single
    total += count
    status = f"{count:2d} remplacements" if count else "— rien à faire"
    print(f"{path}: {status}")
    if src != before:
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)

print(f"\nTOTAL : {total} toasts d'erreur passés en destructive (rouge)")
