// ─── PodLab Media — Types métier ─────────────────────────────────────────────

export type VideoTheme =
  | "entrepreneuriat"
  | "finance"
  | "success-stories"
  | "showbiz"
  | "societe";

export interface PodLabVideo {
  videoId: string;
  title: string;
  theme: VideoTheme;
  youtubeUrl: string;
  thumbnail: string; // miniature YouTube hqdefault
}

export type StudioCity = "cotonou" | "abidjan";

export interface Studio {
  id: StudioCity;
  city: string;
  country: string;
  flag: string;
  address: string;
  capacity: string;
  features: string[];
}

export type StudioFormulaId = "audio" | "video4k" | "cle-en-main";

export interface StudioFormula {
  id: StudioFormulaId;
  name: string;
  description: string;
  price: number; // F CFA par créneau de 3h (ou journée pour clé en main)
  duration: string;
  features: string[];
}

export interface BookingSlot {
  slot: string;
  label: string;
}

export interface PodLabEvent {
  id: string;
  title: string;
  city: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  seatsLeft: number;
  description: string;
  tag: string;
}

// ─── CRM ─────────────────────────────────────────────────────────────────────

export type LeadStatus = "nouveau" | "kit_envoye" | "rdv_cale" | "devis" | "signe";
export type BudgetRange = "A" | "B" | "C";

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone?: string | null;
  budgetRange: BudgetRange;
  budgetLabel: string;
  message?: string | null;
  status: LeadStatus;
  highPriority: boolean;
  mediaKitSent: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string | null;
  segment: string;
  source: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  city: StudioCity;
  formula: StudioFormulaId;
  formulaLabel: string;
  date: string;
  slot: string;
  clientName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  amount: number;
  status: string;
  createdAt: string;
}

export interface TicketPurchase {
  id: string;
  eventId: string;
  eventName: string;
  quantity: number;
  buyerName: string;
  email: string;
  amount: number;
  createdAt: string;
}

export interface AdminStats {
  subscribers: number;
  leads: number;
  leadsByStatus: Record<LeadStatus, number>;
  highPriority: number;
  bookings: number;
  tickets: number;
  revenueBookings: number;
  revenueTickets: number;
}
