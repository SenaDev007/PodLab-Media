"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/podlab/header";
import { Footer } from "@/components/podlab/footer";
import { HomeView } from "@/components/podlab/home/home-view";
import { StudiosView } from "@/components/podlab/studios/studios-view";
import { SponsoringView } from "@/components/podlab/sponsoring/sponsoring-view";
import { EvenementsView } from "@/components/podlab/evenements/evenements-view";
import { AdminView } from "@/components/podlab/admin/admin-view";
import { useHashRoute } from "@/lib/router";

export default function Page() {
  const route = useHashRoute();

  // Remonter en haut à chaque changement de vue
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <main className="flex-1 w-full">
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
            {route === "admin" && <AdminView />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
