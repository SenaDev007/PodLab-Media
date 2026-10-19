import type { Metadata } from "next";
import { AppShell } from "@/components/podlab/app-shell";
import { AdminView } from "@/components/podlab/admin/admin-view";

export const metadata: Metadata = {
  title: "Back-office — PodLab Media",
  description: "Back-office PodLab Media : CMS épisodes, CRM sponsoring, planning studios et base audience.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <AppShell active="admin">
      <AdminView />
    </AppShell>
  );
}
