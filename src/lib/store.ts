// ═══════════════════════════════════════════════════════════════════════════
// PodLab Media — Couche d'accès aux données
//
// Deux modes d'exécution :
// • Local / sandbox : Prisma + SQLite (fichier db/custom.db, persistance
//   réelle — seed via `bun scripts/seed.ts`).
// • Vercel (process.env.VERCEL) : le système de fichiers des fonctions
//   serverless est éphémère et en lecture seule → SQLite est impossible.
//   On bascule sur un store mémoire seedé (données de démonstration).
//   Pour de la persistance en production, brancher PostgreSQL — voir README.
// ═══════════════════════════════════════════════════════════════════════════

import type {
  Subscriber,
  Lead,
  LeadStatus,
  Booking,
  InvitationBooking,
  TicketPurchase,
  BudgetRange,
} from "@/types/podlab";

const MEMORY_MODE = !!process.env.VERCEL;

type DbClient = Awaited<typeof import("@/lib/db")>["db"];
let dbPromise: Promise<DbClient> | null = null;

function getDb(): Promise<DbClient> {
  if (!dbPromise) {
    dbPromise = import("@/lib/db").then((m) => m.db);
  }
  return dbPromise;
}

export const BUDGET_LABELS: Record<string, string> = {
  A: "< 500 000 F CFA",
  B: "500 000 – 1 000 000 F CFA",
  C: "> 1 000 000 F CFA",
};

// ─── Types de création ───────────────────────────────────────────────────────

export interface NewSubscriber {
  email: string;
  name?: string | null;
  segment: string;
  source: string;
}

export interface NewLead {
  company: string;
  contactName: string;
  email: string;
  phone?: string | null;
  budgetRange: string;
  message?: string | null;
}

export interface NewBooking {
  city: string;
  formula: string;
  formulaLabel: string;
  date: string;
  slot: string;
  clientName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  amount: number;
}

export interface NewTicket {
  eventId: string;
  eventName: string;
  quantity: number;
  buyerName: string;
  email: string;
  amount: number;
}

export interface NewInvitationBooking {
  city: "cotonou" | "abidjan";
  date: string;
  slot: string;
  guestName: string;
  role?: string | null;
  email: string;
  phone: string;
  topic?: string | null;
  format: "standard" | "long" | "sur-mesure";
}

// ─── Store mémoire (mode Vercel) ─────────────────────────────────────────────

interface MemoryDb {
  subscribers: Subscriber[];
  leads: Lead[];
  bookings: Booking[];
  invitations: InvitationBooking[];
  tickets: TicketPurchase[];
  seq: number;
}

const g = globalThis as unknown as { __podlabMemory?: MemoryDb };

function isoDaysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function isoDaysAhead(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function seedMemory(): MemoryDb {
  let seq = 0;
  const nid = () => `mem-${(seq += 1)}`;

  const sub = (
    email: string,
    name: string,
    segment: string,
    days: number,
    source = "newsletter"
  ): Subscriber => ({
    id: nid(),
    email,
    name,
    segment,
    source,
    createdAt: isoDaysAgo(days),
  });

  const lead = (
    company: string,
    contactName: string,
    email: string,
    phone: string,
    budgetRange: "A" | "B" | "C",
    message: string,
    status: LeadStatus,
    highPriority: boolean,
    days: number
  ): Lead => ({
    id: nid(),
    company,
    contactName,
    email,
    phone,
    budgetRange,
    budgetLabel: BUDGET_LABELS[budgetRange],
    message,
    status,
    highPriority,
    mediaKitSent: true,
    createdAt: isoDaysAgo(days),
    updatedAt: isoDaysAgo(days),
  });

  const booking = (
    city: "cotonou" | "abidjan",
    formula: string,
    formulaLabel: string,
    day: number,
    slot: string,
    clientName: string,
    email: string,
    phone: string,
    paymentMethod: string,
    amount: number
  ): Booking => ({
    id: nid(),
    city,
    formula: formula as Booking["formula"],
    formulaLabel,
    date: isoDaysAhead(day),
    slot,
    clientName,
    email,
    phone,
    paymentMethod,
    amount,
    status: "confirme",
    createdAt: isoDaysAgo(3),
  });

  const ticket = (
    eventId: string,
    eventName: string,
    quantity: number,
    buyerName: string,
    email: string,
    amount: number,
    days: number
  ): TicketPurchase => ({
    id: nid(),
    eventId,
    eventName,
    quantity,
    buyerName,
    email,
    amount,
    createdAt: isoDaysAgo(days),
  });

  return {
    seq,
    subscribers: [
      sub("aime.kouadio@comparaf.ci", "Aimé Kouadio", "finance", 88),
      sub("fatou.ballo@ecobank.ci", "Fatou Ballo", "finance", 85),
      sub("serge.agbeto@gmail.com", "Serge Agbéto", "entrepreneuriat", 81, "episode-pdf"),
      sub("rachelle.aduke@lagomarket.com", "Rachelle Aduke", "success-stories", 77),
      sub("ibrahim.diarra@orange.bj", "Ibrahim Diarra", "general", 74),
      sub("celine.quoti@kayah-insurance.com", "Céline Quoti", "finance", 70, "episode-pdf"),
      sub("marc.dossou@bceao.int", "Marc Dossou", "finance", 66),
      sub("nadia.sylla@wave.com", "Nadia Sylla", "entrepreneuriat", 61),
      sub("paul.hounkpe@startupacademy.bj", "Paul Hounkpè", "entrepreneuriat", 57, "episode-pdf"),
      sub("linda.ekwa@nsia.ci", "Linda Ekwa", "finance", 52),
      sub("thierry.yao@groupeppp.com", "Thierry Yao", "success-stories", 47),
      sub("jocelyn.akpovi@funds.bj", "Jocelyn Akpovi", "finance", 43),
      sub("awa.mendy@teranga.sn", "Awa Mendy", "general", 40, "episode-pdf"),
      sub("diane.koffi@brvm.org", "Diane Koffi", "finance", 36),
      sub("emmanuel.sodji@togo-agro.tg", "Emmanuel Sodji", "entrepreneuriat", 31),
      sub("bea.gnonnah@fintech.bj", "Bea Gnonnah", "success-stories", 28),
      sub("olivier.zadi@sogeprom.ci", "Olivier Zadi", "finance", 24),
      sub("sylvie.lamien@digitalmali.ml", "Sylvie Lamien", "entrepreneuriat", 19, "episode-pdf"),
      sub("armand.tchibinda@sabcgroup.com", "Armand Tchibinda", "general", 15),
      sub("kadiatou.bah@guinee-invest.gn", "Kadiatou Bah", "finance", 12),
      sub("reine.essi@abidjan.net", "Reine Essi", "success-stories", 9, "episode-pdf"),
      sub("jules.amedegnato@digitals.bj", "Jules Amedegnato", "entrepreneuriat", 7),
      sub("claire.brou@heva.ci", "Claire Brou", "finance", 5),
      sub("moussa.diallo@postebourse.sn", "Moussa Diallo", "finance", 2),
    ],
    leads: [
      lead("Moov Africa Bénin", "Anicet Dossou", "anicet.dossou@moov.bj", "+229 97 12 34 56", "C", "Campagne de visibilité pour le lancement de notre offre 5G Business.", "rdv_cale", true, 2),
      lead("Wave Côte d'Ivoire", "Nadia Sylla", "nadia.sylla@wave.com", "+225 07 88 12 45", "C", "Sponsoring récurrent du format Success Stories, audience entrepreneurs.", "kit_envoye", true, 4),
      lead("Bénin Digital Ventures", "Fatou Ballo", "fatou.ballo@bdv.bj", "+229 96 45 78 12", "C", "Title sponsor de la masterclass BRVM à Cotonou.", "nouveau", true, 1),
      lead("NSIA Banque CI", "Linda Ekwa", "linda.ekwa@nsia.ci", "+225 27 22 40 15 60", "B", "Spot publicitaire dans les épisodes Finance & Investissement.", "kit_envoye", false, 6),
      lead("Kayah Insurance", "Céline Quoti", "celine.quoti@kayah.com", "+229 21 31 45 67", "B", "Sponsoring du PodLab Business Brief (newsletter).", "devis", false, 8),
      lead("Sogeprom CI", "Olivier Zadi", "olivier.zadi@sogeprom.ci", "+225 05 44 21 09 88", "B", "Mention sponsor sur 4 épisodes vidéo 4K.", "signe", false, 21),
      lead("Togo Agro Solutions", "Emmanuel Sodji", "emmanuel.sodji@togo-agro.tg", "+228 90 12 34 56", "A", "Découverte du média, test sur un épisode.", "nouveau", false, 3),
      lead("Startup Academy Bénin", "Paul Hounkpè", "paul.hounkpe@startupacademy.bj", "+229 95 11 22 33", "A", "Partenariat croisement d'audiences pour nos masterclasses.", "kit_envoye", false, 11),
      lead("Coalition Jeunes Leaders", "Reine Essi", "reine.essi@cjl.ci", "+225 01 02 03 04 05", "C", "Sponsoring annuel : épisodes + événements physiques Abidjan.", "signe", true, 35),
      lead("Digital Mali SARL", "Sylvie Lamien", "sylvie.lamien@digitalmali.ml", "+223 76 45 89 01", "B", "Visibilité régionale pour notre solution e-commerce.", "nouveau", false, 5),
    ],
    bookings: [
      booking("cotonou", "video4k", "Pack Vidéo Podcast 4K", 1, "09:00 – 12:00", "Bea Gnonnah", "bea.gnonnah@fintech.bj", "+229 94 11 55 22", "mobile-money", 150000),
      booking("abidjan", "cle-en-main", "Clé en Main (Tournage + Montage)", 2, "14:00 – 17:00", "Thierry Yao", "thierry.yao@groupeppp.com", "+225 07 77 88 99", "carte", 350000),
      booking("cotonou", "audio", "Enregistrement Audio Pur", 3, "18:00 – 21:00", "Jules Amedegnato", "jules.amedegnato@digitals.bj", "+229 97 45 12 36", "mobile-money", 75000),
      booking("abidjan", "video4k", "Pack Vidéo Podcast 4K", 5, "09:00 – 12:00", "Aimé Kouadio", "aime.kouadio@comparaf.ci", "+225 05 12 34 56", "mobile-money", 160000),
      booking("cotonou", "cle-en-main", "Clé en Main (Tournage + Montage)", 7, "09:00 – 12:00", "Armand Tchibinda", "armand.tchibinda@sabcgroup.com", "+229 96 33 44 55", "carte", 340000),
      booking("abidjan", "audio", "Enregistrement Audio Pur", 8, "14:00 – 17:00", "Reine Essi", "reine.essi@abidjan.net", "+225 01 23 45 67", "mobile-money", 85000),
      booking("cotonou", "video4k", "Pack Vidéo Podcast 4K", 10, "14:00 – 17:00", "Serge Agbéto", "serge.agbeto@gmail.com", "+229 95 66 77 88", "mobile-money", 150000),
      booking("abidjan", "cle-en-main", "Clé en Main (Tournage + Montage)", 12, "18:00 – 21:00", "Nadia Sylla", "nadia.sylla@wave.com", "+225 07 11 22 33", "carte", 360000),
    ],
    invitations: [
      {
        id: nid(),
        city: "cotonou",
        date: isoDaysAhead(4),
        slot: "09:00 – 12:00",
        guestName: "Richard Odjrado",
        role: "Bâtisseur — Fintech",
        email: "contact@odjrado.dm",
        phone: "+229 90 00 00 00",
        topic: "Parcours d'entrepreneur en bourse",
        format: "standard",
        ref: "PL-VIP-A7F2",
        status: "vip-confirme",
        createdAt: isoDaysAgo(2),
      },
      {
        id: nid(),
        city: "abidjan",
        date: isoDaysAhead(6),
        slot: "14:00 – 17:00",
        guestName: "Cabinet Hermès",
        role: "Conseil en stratégie",
        email: "media@hermes.dm",
        phone: "+225 07 00 00 00 00",
        topic: "Le conseil à l'africaine",
        format: "long",
        ref: "PL-VIP-B3C9",
        status: "vip-confirme",
        createdAt: isoDaysAgo(1),
      },
    ],
    tickets: [
      ticket("evt-brvm-cotonou", "Masterclass : Réussir son 1er Investissement BRVM", 2, "Diane Koffi", "diane.koffi@brvm.org", 50000, 12),
      ticket("evt-brvm-cotonou", "Masterclass : Réussir son 1er Investissement BRVM", 1, "Marc Dossou", "marc.dossou@bceao.int", 25000, 9),
      ticket("evt-live-abidjan", "Enregistrement Public PodLab Live × Invité Mystère", 4, "Thierry Yao", "thierry.yao@groupeppp.com", 60000, 7),
      ticket("evt-live-abidjan", "Enregistrement Public PodLab Live × Invité Mystère", 2, "Linda Ekwa", "linda.ekwa@nsia.ci", 30000, 4),
      ticket("evt-growth-benin", "Masterclass : Growth pour PME Africaines", 3, "Paul Hounkpè", "paul.hounkpe@startupacademy.bj", 105000, 2),
      ticket("evt-growth-benin", "Masterclass : Growth pour PME Africaines", 1, "Bea Gnonnah", "bea.gnonnah@fintech.bj", 35000, 1),
    ],
  };
}

function mem(): MemoryDb {
  if (!g.__podlabMemory) g.__podlabMemory = seedMemory();
  return g.__podlabMemory;
}

// ─── API du store ────────────────────────────────────────────────────────────

export async function listSubscribers(segment?: string): Promise<Subscriber[]> {
  if (MEMORY_MODE) {
    const all = mem().subscribers;
    const filtered =
      segment && segment !== "all" ? all.filter((s) => s.segment === segment) : all;
    return [...filtered].sort(
      (a, b) => (a.createdAt < b.createdAt ? 1 : -1)
    );
  }
  const db = await getDb();
  return (await db.subscriber.findMany({
    where: segment && segment !== "all" ? { segment } : undefined,
    orderBy: { createdAt: "desc" },
  })) as unknown as Subscriber[];
}

export async function upsertSubscriber(input: NewSubscriber): Promise<Subscriber> {
  if (MEMORY_MODE) {
    const m = mem();
    const existing = m.subscribers.find((s) => s.email === input.email);
    if (existing) {
      existing.segment = input.segment;
      existing.source = input.source;
      if (input.name) existing.name = input.name;
      return existing;
    }
    const created: Subscriber = {
      id: `mem-${(m.seq += 1)}`,
      email: input.email,
      name: input.name ?? null,
      segment: input.segment,
      source: input.source,
      createdAt: new Date().toISOString(),
    };
    m.subscribers.unshift(created);
    return created;
  }
  const db = await getDb();
  return (await db.subscriber.upsert({
    where: { email: input.email },
    update: { segment: input.segment, source: input.source },
    create: {
      email: input.email,
      name: input.name ?? null,
      segment: input.segment,
      source: input.source,
    },
  })) as unknown as Subscriber;
}

export async function listLeads(): Promise<Lead[]> {
  if (MEMORY_MODE) {
    return [...mem().leads].sort((a, b) => {
      if (a.highPriority !== b.highPriority) return a.highPriority ? -1 : 1;
      return a.createdAt < b.createdAt ? 1 : -1;
    });
  }
  const db = await getDb();
  return (await db.lead.findMany({
    orderBy: [{ highPriority: "desc" }, { createdAt: "desc" }],
  })) as unknown as Lead[];
}

export async function createLead(input: NewLead): Promise<Lead> {
  const highPriority = input.budgetRange === "C";
  const budgetLabel = BUDGET_LABELS[input.budgetRange] ?? input.budgetRange;

  if (MEMORY_MODE) {
    const m = mem();
    const now = new Date().toISOString();
    const created: Lead = {
      id: `mem-${(m.seq += 1)}`,
      company: input.company,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone ?? null,
      budgetRange: input.budgetRange as BudgetRange,
      budgetLabel,
      message: input.message ?? null,
      status: "nouveau",
      highPriority,
      mediaKitSent: true,
      createdAt: now,
      updatedAt: now,
    };
    m.leads.unshift(created);
    return created;
  }
  const db = await getDb();
  return (await db.lead.create({
    data: {
      company: input.company,
      contactName: input.contactName,
      email: input.email,
      phone: input.phone ?? null,
      budgetRange: input.budgetRange as BudgetRange,
      budgetLabel,
      message: input.message ?? null,
      status: "nouveau",
      highPriority,
      mediaKitSent: true,
    },
  })) as unknown as Lead;
}

export async function updateLead(
  id: string,
  patch: { status?: LeadStatus; highPriority?: boolean; message?: string | null }
): Promise<Lead> {
  if (MEMORY_MODE) {
    const lead = mem().leads.find((l) => l.id === id);
    if (!lead) throw new Error("Lead introuvable");
    if (patch.status !== undefined) lead.status = patch.status;
    if (patch.highPriority !== undefined) lead.highPriority = patch.highPriority;
    if (patch.message !== undefined) lead.message = patch.message;
    lead.updatedAt = new Date().toISOString();
    return lead;
  }
  const db = await getDb();
  return (await db.lead.update({
    where: { id },
    data: patch,
  })) as unknown as Lead;
}

export async function listBookings(): Promise<Booking[]> {
  if (MEMORY_MODE) {
    return [...mem().bookings].sort((a, b) =>
      a.date === b.date
        ? a.createdAt < b.createdAt
          ? 1
          : -1
        : a.date > b.date
          ? 1
          : -1
    );
  }
  const db = await getDb();
  return (await db.booking.findMany({
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
  })) as unknown as Booking[];
}

export async function findBookingConflict(
  city: string,
  date: string,
  slot: string
): Promise<Booking | null> {
  if (MEMORY_MODE) {
    return (
      mem().bookings.find(
        (b) => b.city === city && b.date === date && b.slot === slot
      ) ?? null
    );
  }
  const db = await getDb();
  return (await db.booking.findFirst({
    where: { city, date, slot },
  })) as unknown as Booking | null;
}

export async function createBooking(input: NewBooking): Promise<Booking> {
  if (MEMORY_MODE) {
    const m = mem();
    const created: Booking = {
      ...(input as unknown as Omit<Booking, "id" | "status" | "createdAt">),
      id: `mem-${(m.seq += 1)}`,
      status: "confirme",
      createdAt: new Date().toISOString(),
    };
    m.bookings.push(created);
    return created;
  }
  const db = await getDb();
  return (await db.booking.create({
    data: { ...input, status: "confirme" },
  })) as unknown as Booking;
}

// ─── Invitations VIP — passages à l'antenne (/invitation) ────────────────────

export async function listInvitationBookings(): Promise<InvitationBooking[]> {
  if (MEMORY_MODE) {
    return [...mem().invitations].sort((a, b) =>
      a.date === b.date
        ? a.createdAt < b.createdAt
          ? 1
          : -1
        : a.date > b.date
          ? 1
          : -1
    );
  }
  const db = await getDb();
  return (await db.invitationBooking.findMany({
    orderBy: [{ date: "asc" }, { createdAt: "desc" }],
  })) as unknown as InvitationBooking[];
}

export async function findInvitationConflict(
  city: string,
  date: string,
  slot: string
): Promise<InvitationBooking | null> {
  if (MEMORY_MODE) {
    return (
      mem().invitations.find(
        (b) => b.city === city && b.date === date && b.slot === slot
      ) ?? null
    );
  }
  const db = await getDb();
  return (await db.invitationBooking.findFirst({
    where: { city, date, slot },
  })) as unknown as InvitationBooking | null;
}

/** Référence VIP lisible : PL-VIP-A7F2. */
function makeVipRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `PL-VIP-${out}`;
}

export async function createInvitationBooking(
  input: NewInvitationBooking
): Promise<InvitationBooking> {
  const ref = makeVipRef();
  if (MEMORY_MODE) {
    const m = mem();
    const created: InvitationBooking = {
      id: `mem-${(m.seq += 1)}`,
      city: input.city,
      date: input.date,
      slot: input.slot,
      guestName: input.guestName,
      role: input.role ?? null,
      email: input.email,
      phone: input.phone,
      topic: input.topic ?? null,
      format: input.format,
      ref,
      status: "vip-confirme",
      createdAt: new Date().toISOString(),
    };
    m.invitations.push(created);
    return created;
  }
  const db = await getDb();
  return (await db.invitationBooking.create({
    data: {
      city: input.city,
      date: input.date,
      slot: input.slot,
      guestName: input.guestName,
      role: input.role ?? "",
      email: input.email,
      phone: input.phone,
      topic: input.topic ?? "",
      format: input.format,
      ref,
      status: "vip-confirme",
    },
  })) as unknown as InvitationBooking;
}

export async function listTickets(): Promise<TicketPurchase[]> {
  if (MEMORY_MODE) {
    return [...mem().tickets].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  }
  const db = await getDb();
  return (await db.ticketPurchase.findMany({
    orderBy: { createdAt: "desc" },
  })) as unknown as TicketPurchase[];
}

export async function createTicket(input: NewTicket): Promise<TicketPurchase> {
  if (MEMORY_MODE) {
    const m = mem();
    const created: TicketPurchase = {
      id: `mem-${(m.seq += 1)}`,
      ...input,
      createdAt: new Date().toISOString(),
    };
    m.tickets.unshift(created);
    return created;
  }
  const db = await getDb();
  return (await db.ticketPurchase.create({
    data: input,
  })) as unknown as TicketPurchase;
}

export function isMemoryMode(): boolean {
  return MEMORY_MODE;
}
