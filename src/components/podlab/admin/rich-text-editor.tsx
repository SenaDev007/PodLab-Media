"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Eraser,
  Italic,
  List,
  ListOrdered,
  Underline,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// RichTextEditor — éditeur de texte enrichi léger (contentEditable), zéro
// dépendance externe. Utilisé par le CMS Épisodes pour le « Résumé public »
// et la « Transcription SEO » : multi-paragraphes + mise en forme (gras,
// italique, souligné, titres, listes). Le contenu est conservé en HTML.
// Design monochrome strict PodLab (§3) : bordures white/10, fond noir.
// ═══════════════════════════════════════════════════════════════════════════

interface ToolAction {
  icon?: typeof Bold;
  text?: string;
  label: string;
  command: string;
  value?: string;
}

const TOOLS: ToolAction[] = [
  { icon: Bold, label: "Gras", command: "bold" },
  { icon: Italic, label: "Italique", command: "italic" },
  { icon: Underline, label: "Souligné", command: "underline" },
  { text: "T1", label: "Titre de section", command: "formatBlock", value: "h2" },
  { text: "T2", label: "Sous-titre", command: "formatBlock", value: "h3" },
  { text: "¶", label: "Paragraphe simple", command: "formatBlock", value: "p" },
  { icon: List, label: "Liste à puces", command: "insertUnorderedList" },
  { icon: ListOrdered, label: "Liste numérotée", command: "insertOrderedList" },
  { icon: Eraser, label: "Effacer la mise en forme", command: "removeFormat" },
];

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Rédigez ici…",
  minHeight = 160,
  ariaLabel = "Éditeur de texte enrichi",
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);

  // Synchronisation contrôlée : on ne réécrit innerHTML que si la valeur
  // externe diverge réellement (évite de replacer le curseur à la saisie).
  useEffect(() => {
    const el = ref.current;
    if (el && value !== el.innerHTML) el.innerHTML = value;
    // Montage initial uniquement — le champ est ensuite piloté par l'utilisateur.
  }, []);

  const exec = (cmd: string, val?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, val);
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const empty =
    !value ||
    ["", "<br>", "<div><br></div>", "<p><br></p>"].includes(
      value.replace(/\s/g, "")
    );

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-black/60 transition-colors",
        focused ? "border-white/40" : "border-white/10"
      )}
    >
      {/* Barre d'outils */}
      <div
        className="flex flex-wrap items-center gap-0.5 border-b border-white/10 bg-zinc-950/90 px-2 py-1.5"
        role="toolbar"
        aria-label="Mise en forme du texte"
      >
        {TOOLS.map((t, i) => (
          <button
            key={i}
            type="button"
            onMouseDown={(e) => e.preventDefault()} // garde la sélection
            onClick={() => exec(t.command, t.value)}
            title={t.label}
            aria-label={t.label}
            className="rounded-md px-2 py-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t.icon ? <t.icon className="size-3.5" /> : <span className="block w-6 text-center text-[10px] font-bold">{t.text}</span>}
          </button>
        ))}
        <span className="ml-auto hidden pr-1 text-[9px] uppercase tracking-wider text-zinc-600 sm:block">
          Multi-paragraphes · mise en forme conservée en HTML
        </span>
      </div>

      {/* Zone éditable */}
      <div className="relative">
        {empty && !focused && (
          <p className="pointer-events-none absolute left-3.5 top-3 text-sm text-zinc-600">
            {placeholder}
          </p>
        )}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label={ariaLabel}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            if (ref.current) onChange(ref.current.innerHTML);
          }}
          onInput={() => {
            if (ref.current) onChange(ref.current.innerHTML);
          }}
          onKeyDown={(e) => {
            // Échappe sans injecter de markup parasite dans les champs voisins
            if (e.key === "Escape") ref.current?.blur();
          }}
          style={{ minHeight }}
          className="rich-text-zone nowheel max-h-[420px] overflow-y-auto px-3.5 py-3 text-sm leading-relaxed text-white outline-none"
        />
      </div>
    </div>
  );
}
