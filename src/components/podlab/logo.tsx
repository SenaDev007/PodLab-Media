import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Logo PodLab Media ──────────────────────────────────────────────────────
// Identité : lettrage géométrique blanc sur noir, micro intégré.

export function PodLabLogo({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const box =
    size === "lg"
      ? "size-12 rounded-xl"
      : size === "sm"
        ? "size-8 rounded-lg"
        : "size-10 rounded-lg";
  const icon = size === "lg" ? "size-6" : size === "sm" ? "size-4" : "size-5";
  const title =
    size === "lg"
      ? "text-2xl"
      : size === "sm"
        ? "text-sm"
        : "text-lg";

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div
        className={cn(
          box,
          "relative flex items-center justify-center bg-white text-black shrink-0"
        )}
      >
        {/* Micro intégré au lettrage */}
        <Mic className={cn(icon, "shrink-0")} strokeWidth={2.4} />
        <div className="absolute inset-0 rounded-[inherit] ring-1 ring-white/60 ring-offset-0" />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            title,
            "font-bold tracking-tight text-white uppercase"
          )}
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          Pod<span className="text-zinc-400">Lab</span>
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-zinc-500 mt-1">
          Media
        </span>
      </div>
    </div>
  );
}
