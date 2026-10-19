"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "@/components/podlab/app-shell";
import { HomeView } from "@/components/podlab/home/home-view";
import { StudiosView } from "@/components/podlab/studios/studios-view";
import { SponsoringView } from "@/components/podlab/sponsoring/sponsoring-view";
import { EvenementsView } from "@/components/podlab/evenements/evenements-view";
import { AdminView } from "@/components/podlab/admin/admin-view";
import { InvitationView } from "@/components/podlab/invitation/invitation-view";
import { useHashRoute } from "@/lib/router";

export default function Page() {
  const route = useHashRoute();

  // Remonter en haut à chaque changement de vue
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  return (
    <AppShell>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={route}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {route === "accueil" && <HomeView />}
          {route === "studios" && <StudiosView />}
          {route === "sponsoring" && <SponsoringView />}
          {route === "evenements" && <EvenementsView />}
          {route === "invitation" && <InvitationView />}
          {route === "admin" && <AdminView />}
        </motion.div>
      </AnimatePresence>
    </AppShell>
  );
}
