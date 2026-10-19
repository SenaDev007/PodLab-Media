# PodLab Media — Site officiel

> **1er Média Business d'Afrique francophone** · Studios Cotonou 🇧🇯 & Abidjan 🇨🇮
> 128 000 abonnés YouTube · 18,2 M de vues cumulées · 894 vidéos · 14 pays d'audience

Site vitrine + back-office complet de **PodLab Media** : catalogue réel des épisodes
YouTube, réservation de studios en ligne (Mobile Money / carte), tunnel sponsoring
B2B avec Kit Média, billetterie d'événements et CRM interne.

**Catalogue 100 % réel** : les 75 derniers épisodes affichés (titres officiels,
miniatures YouTube, liens directs) sont synchronisés avec la chaîne
[@podlabmedia](https://www.youtube.com/@podlabmedia) via l'API oEmbed YouTube.

---

## 📞 Contact & réseaux sociaux (officiels)

| Canal | Lien |
| --- | --- |
| 📞 Téléphone / WhatsApp | [+229 97 10 62 88](https://wa.me/22997106288) |
| ✉️ Email | [studiopodlab@gmail.com](mailto:studiopodlab@gmail.com) |
| 🎬 YouTube | [@podlabmedia](https://www.youtube.com/@podlabmedia) |
| 📸 Instagram | [@podlab.so](https://www.instagram.com/podlab.so) |
| 🎵 TikTok | [@podlabmedia](https://www.tiktok.com/@podlabmedia) |
| 👥 Facebook | [/podlabmedia](https://www.facebook.com/podlabmedia) |

---

## 🧱 Stack technique

- **Framework** : Next.js 16 (App Router, React 19, TypeScript strict)
- **UI** : Tailwind CSS 4 + shadcn/ui (New York) + Framer Motion + Lucide
- **Données** : Prisma ORM + SQLite en local · store mémoire seedé sur Vercel
  (bascule automatique — voir [Gestion des données](#-gestion-des-données))
- **Design system** : monochrome strict (noir `#000000`, blanc `#FFFFFF`,
  zinc 400/500, verre sombre `border-white/10`, grilles techniques, halos)
- **Génération PDF** : 100 % client-side, sans dépendance (fiches d'épisodes
  avec captation email, Kit Média B2B)

## 🗂️ Structure

```
src/
├── app/                        # App Router
│   ├── page.tsx                # Accueil (routeur hash : #/studios, #/sponsoring…)
│   ├── studios/page.tsx        # Route réelle — réservation de studios
│   ├── sponsoring/page.tsx     # Route réelle — tunnel B2B + ROI calculator
│   ├── evenements/page.tsx     # Route réelle — billetterie masterclasses
│   ├── admin/page.tsx          # Route réelle — back-office (CMS, CRM, audience)
│   └── api/                    # 8 routes REST (newsletter, leads, bookings,
│                               #   tickets, subscribers, export CSV, stats)
├── components/podlab/          # Composants métier (header, footer, vues, admin)
├── lib/
│   ├── videos.ts               # ⭐ Catalogue réel des 75 épisodes YouTube
│   ├── brand.ts                # ⭐ Contacts & réseaux sociaux officiels
│   ├── data-mock.ts            # Studios, formules, événements, budgets
│   ├── store.ts                # Couche données : Prisma ↔ mémoire (Vercel)
│   ├── pricing.ts              # Prix serveur (source de vérité)
│   ├── pdf.ts                  # Générateur PDF client-side
│   └── router.ts               # Routeur hybride (hash local ↔ URLs Vercel)
└── types/podlab.ts             # Types métier
scripts/
├── fetch-videos.mjs            # Récupère les métadonnées YouTube (oEmbed)
├── generate-videos-ts.mjs       # Regénère lib/videos.ts depuis le JSON
└── seed.ts                     # Seed SQLite local (démo back-office)
```

## 🚀 Démarrage local

```bash
# 1. Dépendances
bun install                      # ou npm install

# 2. Variables d'environnement
cp .env.example .env             # DATABASE_URL=file:./db/custom.db

# 3. Base de données SQLite + données de démonstration
bun run db:push
bun run db:seed

# 4. Serveur de développement
bun run dev                      # http://localhost:3000
```

## ▲ Déploiement Vercel

Le projet est **prêt à déployer** : `vercel.json`, `postinstall` (génération
Prisma), routes réelles et métadonnées SEO incluses.

### Méthode recommandée (Git)

1. Poussez ce dépôt sur GitHub
2. Sur [vercel.com](https://vercel.com) → **Add New Project** → importez le dépôt
3. Framework preset : **Next.js** (détecté automatiquement)
4. Déployez — aucune variable d'environnement n'est requise pour démarrer

### Méthode CLI

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

### <a name="gestion-des-données"></a>🗂️ Gestion des données sur Vercel

Les fonctions serverless de Vercel ont un **système de fichiers éphémère et en
lecture seule** : SQLite (fichier) ne peut pas y persister. L'application
**bascule automatiquement** :

| Environnement | Mode | Comportement |
| --- | --- | --- |
| Local / sandbox | `Prisma + SQLite` | Persistance réelle (`db/custom.db`), seed possible |
| Vercel (par défaut) | `Store mémoire seedé` | Back-office de démonstration fonctionnel ; les écritures vivent le temps de l'instance serverless |

**Pour une persistance réelle en production** (recommandé) :

1. Dans `prisma/schema.prisma`, remplacez `provider = "sqlite"` par
   `provider = "postgresql"`
2. Créez une base PostgreSQL (Vercel Postgres, Neon, Supabase…)
3. Dans Vercel → Settings → Environment Variables → `DATABASE_URL` =
   l'URL de connexion PostgreSQL (`postgresql://…`)
4. Redéployez : le client Prisma est régénéré par `postinstall`, le store
   détecte la config et persiste toutes les écritures (newsletter, leads,
   réservations, billets) en base.

> 💡 La détection est centralisée dans `src/lib/store.ts`
> (`MEMORY_MODE = !!process.env.VERCEL`).

### Navigation

- **Local / sandbox** : navigation par fragment hash (`/#/studios`) car seule la
  page `/` est exposée par le proxy de prévisualisation.
- **Vercel** : les routes réelles `/studios`, `/sponsoring`, `/evenements`,
  `/admin` existent (SEO, partage, accès direct). Depuis une page profonde, la
  navigation utilise les URLs propres ; depuis l'accueil, elle reste en hash —
  les deux mondes fonctionnent sans rupture.

## ✨ Fonctionnalités

### Front-office
- **Hero** — copywriting officiel : kicker « Le 1ᵉʳ Média Business d'Afrique
  Francophone », H1 « L'Écosystème où s'écrit le futur du Business en Afrique. »,
  double CTA « Rejoindre le Cercle Privé — Gratuit » / « Réserver un Studio », lecteur
  YouTube clic-to-play (épisode vedette réel « Discussion Informelle »)
- **Barre de preuve sociale** (copywriting §2.2) : 1M+ d'écoutes/trimestre
  (podcast business n°1 au Bénin, n°2 en Afrique de l'Ouest) · +128 000 décideurs ·
  2 studios internationaux 4K Broadcast
- **Manifeste « Pourquoi YouTube ne suffit plus »** (copywriting §2.3) : citation
  éditoriale + paragraphe institutionnel
- **Catalogue réel** : 75 épisodes, filtres par thématique (Entrepreneuriat,
  Finance, Success Stories, Showbiz, Société), recherche, chargement progressif
- **Fiches d'épisodes SEO** : 75 pages statiques `/episodes/[id]` générées au build
  (cahier des charges §3.1 — synopsis, lecteur enrichi, JSON-LD VideoObject,
  épisodes liés) + `sitemap.xml` automatique
- **Lecteur flottant** (design system §3 — 21st.dev) : barre flottante avec mini
  lecteur, waveform animée en blanc pur, fiche PDF et lien YouTube — écoute en
  continu tout en parcourant le catalogue
- **Captation email** : fiche PDF d'épisode en échange de l'email (source
  `episode-pdf` dans la base audience)
- **Réservation studio** : Cotonou/Abidjan → packs (Audio Master 75 000, Podcasting
  Vidéo 4K 150 000, Production Exécutive Clé en Main 350 000 F CFA) → calendrier
  14 jours avec créneaux occupés → acompte Mobile Money (FedaPay : MTN, Moov,
  Orange, Wave) ou carte (Paystack 3-D Secure) → confirmation
- **Sponsoring B2B** — tunnel 3 étapes (copywriting §3.1) : budget (A < 500 K /
  B 500 K–1 M / C +1 M F CFA « Sur-mesure » → **priorité haute automatique**) →
  objectif ROI (Branding / Acquisition B2B / Lancement de produit) → coordonnées
  + déblocage Kit Média 2026, calculateur ROI (CPM PodLab vs TV), 3 avantages
  annonceurs, rareté des créneaux
- **Événements** : billetterie masterclasses / enregistrements publics
- **Newsletter « Le Cercle Privé PodLab »** (copywriting §5) : « L'Envers du
  Décor Business », chaque dimanche 8h, lead magnet Fiche de Synthèse Décideur
  (épisodes Stan Zézé & Richard Odjrado — grilles BRVM & ratios de gestion)

### Back-office (`/admin`)
- 4 KPI temps réel (abonnés, leads HOT, CA studios, CA billets)
- **CRM Kanban 5 étapes** (cahier des charges §4) : Nouveau Lead → Kit Média
  Envoyé → RDV Calé → **Devis** → Signé (drag & drop, marquage priorité, filtre HOT)
- **CMS épisodes** : catalogue réel + ajout brouillon (transcription SEO),
  publier / dépublier / supprimer
- **Planning studios** : réservations filtrables Cotonou / Abidjan
- **Base audience** : recherche, segments (5 thématiques réelles), sources,
  export CSV (BOM Excel)

## 🔌 Intégrations production (prochaines étapes)

L'application simule aujourd'hui les étapes suivantes ; les textes et flux sont
prêts à recevoir les intégrations réelles :

| Module | État actuel | Montée en production |
| --- | --- | --- |
| Paiement studios & billets | Simulation acompte (FedaPay/Paystack mentionnés) | Créer un compte FedaPay & Paystack, brancher leurs APIs dans `/api/bookings` et `/api/tickets` |
| E-mailing (Cercle Privé + relances B2B) | Captation en base + PDF client-side | Brancher Brevo/HubSpot — les séquences rédactionnelles sont prêtes dans `copywriting_podlab_complet.docx` §6 (e-mail de bienvenue + relance partenariat 24h) |
| SEO domaine | `NEXT_PUBLIC_SITE_URL` (sitemap, défaut vercel.app) | Définir la variable avec le domaine final dans Vercel → Settings → Environment Variables |

## 📄 Licence

Code propriétaire PodLab Media © 2026 — Tous droits réservés.
