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
  title: "PodLab Media — 1er Média Business d'Afrique francophone",
  description:
    "PodLab Media : 128 000 abonnés YouTube, 18,2 M de vues cumulées, 894 vidéos. Interviews business, finance, success stories et showbiz — studios 4K à Cotonou et Abidjan. Sponsoring B2B, masterclasses et réservation de studios en ligne.",
  keywords: [
    "PodLab Media",
    "PodLab",
    "podcast business Afrique",
    "success stories entrepreneurs",
    "interviews Afrique francophone",
    "studio podcast Cotonou",
    "studio tournage Abidjan",
    "sponsoring B2B Afrique",
    "BRVM",
    "finance Afrique francophone",
  ],
  authors: [{ name: "PodLab Media" }],
  openGraph: {
    title: "PodLab Media — 1er Média Business d'Afrique francophone",
    description:
      "128 000 abonnés YouTube · 18,2 M de vues cumulées · Studios Cotonou & Abidjan.",
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
