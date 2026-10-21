import { Youtube, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react";
import { PodLabLogo } from "./logo";
import { navigate } from "@/lib/router";
import { CONTACT, SOCIALS } from "@/lib/brand";

/** Icône TikTok (absente de lucide-react) — tracé officiel monochrome. */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.61c.3 0 .6.05.88.13V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/** Couleurs officielles des marques — révélées au survol de l'icône
 *  via les classes CSS natives de globals.css (.social-hover-*) :
 *  parité garantie entre dev (Turbopack) et production. */
const SOCIAL_LINKS = [
  {
    href: SOCIALS.youtube,
    label: "PodLab Media sur YouTube (@podlabmedia)",
    Icon: Youtube,
    hoverCls: "social-hover-youtube",
  },
  {
    href: SOCIALS.instagram,
    label: "PodLab sur Instagram (@podlab.so)",
    Icon: Instagram,
    hoverCls: "social-hover-instagram",
  },
  {
    href: SOCIALS.tiktok,
    label: "PodLab Media sur TikTok (@podlabmedia)",
    Icon: TikTokIcon,
    hoverCls: "social-hover-tiktok",
  },
  {
    href: SOCIALS.facebook,
    label: "PodLab Media sur Facebook (/podlabmedia)",
    Icon: Facebook,
    hoverCls: "social-hover-facebook",
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Marque */}
          <div className="md:col-span-5">
            <PodLabLogo size="md" />
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 max-w-sm">
              Le 1er Média Business d&apos;Afrique francophone. L&apos;émission
              « Discussion Informelle » et ses interviews business — sans
              filtre, chaque dimanche, depuis nos studios de Cotonou et
              d&apos;Abidjan.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ href, label, Icon, hoverCls }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className={`inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-zinc-950/80 text-zinc-400 transition-all duration-300 ${hoverCls}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Colonnes de navigation */}
          <nav className="md:col-span-2" aria-label="Média">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Média
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate("accueil")} className="text-zinc-400 hover:text-white transition-colors">
                  Épisodes
                </button>
              </li>
              <li>
                <button onClick={() => navigate("evenements")} className="text-zinc-400 hover:text-white transition-colors">
                  Masterclasses
                </button>
              </li>
              <li>
                <button onClick={() => navigate("accueil")} className="text-zinc-400 hover:text-white transition-colors">
                  Newsletter
                </button>
              </li>
              <li>
                <button onClick={() => navigate("invitation")} className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors">
                  Invitation VIP
                  <span className="rounded-full border border-white/15 px-1.5 py-px text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                    Privé
                  </span>
                </button>
              </li>
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Studios">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Studios
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate("studios")} className="text-zinc-400 hover:text-white transition-colors">
                  Réserver un studio
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-500">
                <MapPin className="size-3.5" /> Cotonou, Bénin
              </li>
              <li className="flex items-center gap-1.5 text-zinc-500">
                <MapPin className="size-3.5" /> Abidjan, Côte d&apos;Ivoire
              </li>
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-label="Contact">
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Contact
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate("sponsoring")} className="text-zinc-400 hover:text-white transition-colors">
                  Devenir annonceur
                </button>
              </li>
              <li>
                <a
                  href={CONTACT.mailto}
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Mail className="size-3.5 shrink-0" /> {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <Phone className="size-3.5 shrink-0" /> {CONTACT.phoneDisplay}
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} PodLab Media — Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
