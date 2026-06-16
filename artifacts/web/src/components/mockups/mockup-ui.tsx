import type { ReactNode } from "react";

/* ──────────────────────────────────────────────────────────────
   Shared building blocks for the hand-built product mockups.
   These replace the old flat-purple screenshot images with a
   crisp, on-brand, "real product" look across every product page.
   ────────────────────────────────────────────────────────────── */

/* Outer window — soft floating panel with a macOS-style title bar. */
export function MockupFrame({
  children,
  title,
  right,
  className,
}: {
  children: ReactNode;
  title?: ReactNode;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-left bg-white rounded-2xl border border-black/[0.07] overflow-hidden shadow-[0_30px_80px_-28px_rgba(26,24,20,0.45)] ${className ?? ""}`}
    >
      <div className="flex items-center gap-3 px-4 h-10 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#faf8f4]">
        <span className="flex gap-1.5 shrink-0" aria-hidden>
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </span>
        {title && (
          <div className="text-[11px] font-medium text-[#9a9490] truncate">{title}</div>
        )}
        {right && <div className="ml-auto shrink-0">{right}</div>}
      </div>
      {children}
    </div>
  );
}

const AVATAR_TONES: Record<string, string> = {
  indigo: "bg-primary/[0.14] text-primary",
  coral: "bg-accent/[0.22] text-[#c2503a]",
  green: "bg-[#22a06b]/[0.16] text-[#1c7d54]",
  slate: "bg-[#413c64]/[0.12] text-[#413c64]",
  amber: "bg-[#f5a623]/[0.18] text-[#b5740a]",
};

export function Avatar({
  initials,
  tone = "indigo",
  size = 24,
  ring = false,
}: {
  initials: string;
  tone?: keyof typeof AVATAR_TONES | string;
  size?: number;
  ring?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-bold leading-none ${AVATAR_TONES[tone] ?? AVATAR_TONES.indigo} ${ring ? "ring-2 ring-white" : ""}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
    >
      {initials}
    </span>
  );
}

const STATUS_TONES = {
  live: "bg-[#22a06b]/[0.12] text-[#1c7d54] border-[#22a06b]/[0.25]",
  scheduled: "bg-primary/[0.10] text-primary border-primary/[0.22]",
  ended: "bg-black/[0.04] text-[#9a9490] border-black/[0.08]",
  draft: "bg-[#f5a623]/[0.14] text-[#b5740a] border-[#f5a623]/[0.30]",
} as const;

export function StatusPill({
  status,
  label,
}: {
  status: keyof typeof STATUS_TONES;
  label: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-5 px-2 rounded-full border text-[10px] font-semibold ${STATUS_TONES[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status === "live" ? "bg-[#22a06b] animate-pulse" : status === "scheduled" ? "bg-primary" : status === "draft" ? "bg-[#f5a623]" : "bg-[#c4beb6]"}`}
      />
      {label}
    </span>
  );
}

/* Circular progress ring used for acknowledgment / readiness stats. */
export function Donut({
  value,
  size = 96,
  stroke = 10,
  color = "#5555e6",
  track = "#f0ebe4",
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  /* pass an explicit hex/css color; defaults to brand indigo */
  color?: string;
  track?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = Math.max(0, Math.min(100, value)) / 100;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * filled} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/* Thin labelled progress bar. */
export function MeterRow({
  label,
  value,
  tone = "indigo",
}: {
  label: string;
  value: number;
  tone?: "indigo" | "coral" | "green";
}) {
  const bar =
    tone === "coral" ? "bg-accent" : tone === "green" ? "bg-[#22a06b]" : "bg-primary";
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className="text-[#6b6460] truncate pr-2">{label}</span>
        <span className="text-[#1a1814] font-semibold tabular-nums">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#f0ebe4] overflow-hidden">
        <div className={`h-full rounded-full ${bar}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
