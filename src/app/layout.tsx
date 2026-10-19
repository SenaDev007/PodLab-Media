import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PodLab Media — 1er Média Business d'Afrique Francophone",
  description:
    "L'Écosystème où s'écrit le futur du Business en Afrique. Chaque dimanche, les conversations confidentielles avec les bâtisseurs, dirigeants et investisseurs qui façonnent l'économie régionale. 128 000 décideurs · 1 million d'écoutes par trimestre · Studios 4K Cotonou & Abidjan · Sponsoring B2B · Discussion Informelle.",
  keywords: [
    "PodLab Media",
    "PodLab",
    "Discussion Informelle",
    "podcast business Afrique",
    "success stories entrepreneurs",
    "interviews Afrique francophone",
    "studio podcast Cotonou",
    "studio tournage Abidjan",
    "sponsoring B2B Afrique",
    "BRVM",
    "finance Afrique francophone",
    "Stan Zézé",
    "Richard Odjrado",
  ],
  authors: [{ name: "PodLab Media" }],
  openGraph: {
    title: "PodLab Media — L'Écosystème où s'écrit le futur du Business en Afrique",
    description:
      "128 000 décideurs · 1 million d'écoutes par trimestre · Studios 4K Broadcast Cotonou & Abidjan.",
    siteName: "PodLab Media",
    type: "website",
    locale: "fr_FR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-zinc-100 min-h-screen`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
