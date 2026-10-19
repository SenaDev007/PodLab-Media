/**
 * PodLab Media — Seed BDD
 * Peuple le back-office : abonnés newsletter, leads CRM, réservations, billets.
 * Exécution : bun scripts/seed.ts
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function daysAhead(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

async function main() {
  console.log("Seed PodLab Media...");

  // Nettoyage
  await db.subscriber.deleteMany();
  await db.lead.deleteMany();
  await db.booking.deleteMany();
  await db.ticketPurchase.deleteMany();

  // ─── Abonnés Newsletter ───────────────────────────────────────────────
  const subscribers: Array<[string, string, string]> = [
    ["aime.kouadio@comparaf.ci", "Aimé Kouadio", "finance"],
    ["fatou.ballo@ecobank.ci", "Fatou Ballo", "finance"],
    ["serge.agbeto@gmail.com", "Serge Agbéto", "entrepreneuriat"],
    ["rachelle.aduke@lagomarket.com", "Rachelle Aduke", "success-stories"],
    ["ibrahim.diarra@orange.bj", "Ibrahim Diarra", "general"],
    ["celine.quoti@kayah-insurance.com", "Céline Quoti", "finance"],
    ["marc.dossou@bceao.int", "Marc Dossou", "finance"],
    ["nadia.sylla@wave.com", "Nadia Sylla", "entrepreneuriat"],
    ["paul.hounkpe@startupacademy.bj", "Paul Hounkpè", "entrepreneuriat"],
    ["linda.ekwa@nsia.ci", "Linda Ekwa", "finance"],
    ["thierry.yao@groupeppp.com", "Thierry Yao", "success-stories"],
    ["jocelyn.akpovi@funds.bj", "Jocelyn Akpovi", "finance"],
    ["awa.mendy@teranga.sn", "Awa Mendy", "general"],
    ["diane.koffi@brvm.org", "Diane Koffi", "finance"],
    ["emmanuel.sodji@togo-agro.tg", "Emmanuel Sodji", "entrepreneuriat"],
    ["bea.gnonnah@fintech.bj", "Bea Gnonnah", "success-stories"],
    ["olivier.zadi@sogeprom.ci", "Olivier Zadi", "finance"],
    ["sylvie.lamien@digitalmali.ml", "Sylvie Lamien", "entrepreneuriat"],
    ["armand.tchibinda@sabcgroup.com", "Armand Tchibinda", "general"],
    ["kadiatou.bah@guinee-invest.gn", "Kadiatou Bah", "finance"],
    ["reine.essi@abidjan.net", "Reine Essi", "success-stories"],
    ["jules.amedegnato@digitals.bj", "Jules Amedegnato", "entrepreneuriat"],
    ["claire.brou@heva.ci", "Claire Brou", "finance"],
    ["moussa.diallo@postebourse.sn", "Moussa Diallo", "finance"],
  ];
  for (const [email, name, segment] of subscribers) {
    const source = Math.random() > 0.5 ? "newsletter" : "episode-pdf";
    await db.subscriber.create({
      data: { email, name, segment, source, createdAt: daysAgo(Math.floor(Math.random() * 90)) },
    });
  }

  // ─── Leads CRM Sponsoring ──────────────────────────────────────────────
  const leads = [
    { company: "Moov Africa Bénin", contactName: "Anicet Dossou", email: "anicet.dossou@moov.bj", phone: "+229 97 12 34 56", budgetRange: "C", budgetLabel: "> 1 000 000 F CFA", message: "Campagne de visibilité pour le lancement de notre offre 5G Business.", status: "rdv_cale", highPriority: true, days: 2 },
    { company: "Wave Côte d'Ivoire", contactName: "Nadia Sylla", email: "nadia.sylla@wave.com", phone: "+225 07 88 12 45", budgetRange: "C", budgetLabel: "> 1 000 000 F CFA", message: "Sponsoring récurrent du format Success Stories, audience entrepreneurs.", status: "kit_envoye", highPriority: true, days: 4 },
    { company: "Bénin Digital Ventures", contactName: "Fatou Ballo", email: "fatou.ballo@bdv.bj", phone: "+229 96 45 78 12", budgetRange: "C", budgetLabel: "> 1 000 000 F CFA", message: "Title sponsor de la masterclass BRVM à Cotonou.", status: "nouveau", highPriority: true, days: 1 },
    { company: "NSIA Banque CI", contactName: "Linda Ekwa", email: "linda.ekwa@nsia.ci", phone: "+225 27 22 40 15 60", budgetRange: "B", budgetLabel: "500 000 – 1 000 000 F CFA", message: "Spot publicitaire dans l'épisode hebdomadaire Finance/BRVM.", status: "kit_envoye", highPriority: false, days: 6 },
    { company: "Kayah Insurance", contactName: "Céline Quoti", email: "celine.quoti@kayah.com", phone: "+229 21 31 45 67", budgetRange: "B", budgetLabel: "500 000 – 1 000 000 F CFA", message: "Sponsoring du Cercle Privé PodLab (newsletter).", status: "devis", highPriority: false, days: 8 },
    { company: "Sogeprom CI", contactName: "Olivier Zadi", email: "olivier.zadi@sogeprom.ci", phone: "+225 05 44 21 09 88", budgetRange: "B", budgetLabel: "500 000 – 1 000 000 F CFA", message: "Mention sponsor sur 4 épisodes vidéo 4K.", status: "signe", highPriority: false, days: 21 },
    { company: "Togo Agro Solutions", contactName: "Emmanuel Sodji", email: "emmanuel.sodji@togo-agro.tg", phone: "+228 90 12 34 56", budgetRange: "A", budgetLabel: "< 500 000 F CFA", message: "Découverte du média, test sur un épisode.", status: "nouveau", highPriority: false, days: 3 },
    { company: "Startup Academy Bénin", contactName: "Paul Hounkpè", email: "paul.hounkpe@startupacademy.bj", phone: "+229 95 11 22 33", budgetRange: "A", budgetLabel: "< 500 000 F CFA", message: "Partenariat croisement d'audiences pour nos masterclasses.", status: "kit_envoye", highPriority: false, days: 11 },
    { company: "Coalition Jeunes Leaders", contactName: "Reine Essi", email: "reine.essi@cjl.ci", phone: "+225 01 02 03 04 05", budgetRange: "C", budgetLabel: "> 1 000 000 F CFA", message: "Sponsoring annuel : épisodes + événements physiques Abidjan.", status: "signe", highPriority: true, days: 35 },
    { company: "Digital Mali SARL", contactName: "Sylvie Lamien", email: "sylvie.lamien@digitalmali.ml", phone: "+223 76 45 89 01", budgetRange: "B", budgetLabel: "500 000 – 1 000 000 F CFA", message: "Visibilité régionale pour notre solution e-commerce.", status: "nouveau", highPriority: false, days: 5 },
  ];
  for (const l of leads) {
    await db.lead.create({
      data: {
        company: l.company, contactName: l.contactName, email: l.email, phone: l.phone,
        budgetRange: l.budgetRange, budgetLabel: l.budgetLabel, message: l.message,
        status: l.status, highPriority: l.highPriority, mediaKitSent: true,
        createdAt: daysAgo(l.days),
      },
    });
  }

  // ─── Réservations Studios ─────────────────────────────────────────────
  const bookings = [
    { city: "cotonou", formula: "video4k", formulaLabel: "Pack Vidéo Podcast 4K", date: daysAhead(1), slot: "09:00 – 12:00", clientName: "Bea Gnonnah", email: "bea.gnonnah@fintech.bj", phone: "+229 94 11 55 22", paymentMethod: "mobile-money", amount: 150000 },
    { city: "abidjan", formula: "cle-en-main", formulaLabel: "Clé en Main (Tournage + Montage)", date: daysAhead(2), slot: "14:00 – 17:00", clientName: "Thierry Yao", email: "thierry.yao@groupeppp.com", phone: "+225 07 77 88 99", paymentMethod: "carte", amount: 350000 },
    { city: "cotonou", formula: "audio", formulaLabel: "Enregistrement Audio Pur", date: daysAhead(3), slot: "18:00 – 21:00", clientName: "Jules Amedegnato", email: "jules.amedegnato@digitals.bj", phone: "+229 97 45 12 36", paymentMethod: "mobile-money", amount: 75000 },
    { city: "abidjan", formula: "video4k", formulaLabel: "Pack Vidéo Podcast 4K", date: daysAhead(5), slot: "09:00 – 12:00", clientName: "Aimé Kouadio", email: "aime.kouadio@comparaf.ci", phone: "+225 05 12 34 56", paymentMethod: "mobile-money", amount: 160000 },
    { city: "cotonou", formula: "cle-en-main", formulaLabel: "Clé en Main (Tournage + Montage)", date: daysAhead(7), slot: "09:00 – 12:00", clientName: "Armand Tchibinda", email: "armand.tchibinda@sabcgroup.com", phone: "+229 96 33 44 55", paymentMethod: "carte", amount: 340000 },
    { city: "abidjan", formula: "audio", formulaLabel: "Enregistrement Audio Pur", date: daysAhead(8), slot: "14:00 – 17:00", clientName: "Reine Essi", email: "reine.essi@abidjan.net", phone: "+225 01 23 45 67", paymentMethod: "mobile-money", amount: 85000 },
    { city: "cotonou", formula: "video4k", formulaLabel: "Pack Vidéo Podcast 4K", date: daysAhead(10), slot: "14:00 – 17:00", clientName: "Serge Agbéto", email: "serge.agbeto@gmail.com", phone: "+229 95 66 77 88", paymentMethod: "mobile-money", amount: 150000 },
    { city: "abidjan", formula: "cle-en-main", formulaLabel: "Clé en Main (Tournage + Montage)", date: daysAhead(12), slot: "18:00 – 21:00", clientName: "Nadia Sylla", email: "nadia.sylla@wave.com", phone: "+225 07 11 22 33", paymentMethod: "carte", amount: 360000 },
  ];
  for (const b of bookings) {
    await db.booking.create({
      data: { ...b, status: "confirme", createdAt: daysAgo(Math.floor(Math.random() * 10)) },
    });
  }

  // ─── Billets Événements ────────────────────────────────────────────────
  const tickets = [
    { eventId: "evt-brvm-cotonou", eventName: "Masterclass : Réussir son 1er Investissement BRVM", quantity: 2, buyerName: "Diane Koffi", email: "diane.koffi@brvm.org", amount: 50000 },
    { eventId: "evt-brvm-cotonou", eventName: "Masterclass : Réussir son 1er Investissement BRVM", quantity: 1, buyerName: "Marc Dossou", email: "marc.dossou@bceao.int", amount: 25000 },
    { eventId: "evt-live-abidjan", eventName: "Enregistrement Public PodLab Live × Invité Mystère", quantity: 4, buyerName: "Thierry Yao", email: "thierry.yao@groupeppp.com", amount: 60000 },
    { eventId: "evt-live-abidjan", eventName: "Enregistrement Public PodLab Live × Invité Mystère", quantity: 2, buyerName: "Linda Ekwa", email: "linda.ekwa@nsia.ci", amount: 30000 },
    { eventId: "evt-growth-benin", eventName: "Masterclass : Growth pour PME Africaines", quantity: 3, buyerName: "Paul Hounkpè", email: "paul.hounkpe@startupacademy.bj", amount: 105000 },
    { eventId: "evt-growth-benin", eventName: "Masterclass : Growth pour PME Africaines", quantity: 1, buyerName: "Bea Gnonnah", email: "bea.gnonnah@fintech.bj", amount: 35000 },
  ];
  for (const t of tickets) {
    await db.ticketPurchase.create({ data: { ...t, createdAt: daysAgo(Math.floor(Math.random() * 14)) } });
  }

  console.log("Seed termine :", {
    subscribers: await db.subscriber.count(),
    leads: await db.lead.count(),
    bookings: await db.booking.count(),
    tickets: await db.ticketPurchase.count(),
  });
}

main()
  .catch((e) => {
    console.error("Erreur seed :", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
