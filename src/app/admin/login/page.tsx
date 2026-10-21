import type { Metadata } from "next";
import { LoginForm } from "@/components/podlab/admin/login-form";

export const metadata: Metadata = {
  title: "Connexion Back-office — PodLab Media",
  description: "Accès sécurisé au back-office PodLab Media.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-72 glow-top" aria-hidden />
      <LoginForm />
    </main>
  );
}
