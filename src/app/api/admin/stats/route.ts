import { NextResponse } from "next/server";
import {
  listSubscribers,
  listLeads,
  listBookings,
  listTickets,
} from "@/lib/store";
import type { AdminStats, LeadStatus } from "@/types/podlab";

// GET /api/admin/stats — KPI du tableau de bord back-office
export async function GET() {
  try {
    const [subscribers, leads, bookings, tickets] = await Promise.all([
      listSubscribers(),
      listLeads(),
      listBookings(),
      listTickets(),
    ]);

    const leadsByStatus: Record<LeadStatus, number> = {
      nouveau: 0,
      kit_envoye: 0,
      rdv_cale: 0,
      devis: 0,
      signe: 0,
    };
    for (const l of leads) {
      if (l.status in leadsByStatus) {
        leadsByStatus[l.status as LeadStatus] += 1;
      }
    }

    const stats: AdminStats = {
      subscribers: subscribers.length,
      leads: leads.length,
      leadsByStatus,
      highPriority: leads.filter((l) => l.highPriority).length,
      bookings: bookings.length,
      tickets: tickets.length,
      revenueBookings: bookings.reduce((s, b) => s + b.amount, 0),
      revenueTickets: tickets.reduce((s, t) => s + t.amount, 0),
    };

    return NextResponse.json({ stats });
  } catch (e) {
    console.error("[admin stats]", e);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
