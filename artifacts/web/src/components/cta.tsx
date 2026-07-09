import { ArrowRight, Store, CalendarDays } from "lucide-react";
import { track } from "@/lib/track";
import { ctaEvent, type Cta, type CtaKind, type ProductConfig } from "@/lib/products";

const ICONS: Record<CtaKind, React.ElementType> = {
  trial: ArrowRight,
  appexchange: Store,
  demo: CalendarDays,
};

type Size = "lg" | "sm";

function primaryClass(size: Size) {
  return size === "lg"
    ? "cta-pill group inline-flex items-center justify-center gap-2 px-7 h-11 text-[15px] font-semibold bg-[#1a1814] text-white rounded-full shadow-sm"
    : "cta-pill group inline-flex items-center justify-center gap-1.5 px-4 h-9 text-[14px] font-semibold bg-[#1a1814] text-white rounded-full";
}

function secondaryClass(size: Size) {
  return size === "lg"
    ? "inline-flex items-center justify-center gap-2 px-7 h-11 text-[15px] font-semibold rounded-full border border-black/[0.12] bg-white text-[#1a1814] hover:border-primary/40 hover:text-primary transition-colors"
    : "inline-flex items-center justify-center gap-1.5 px-4 h-9 text-[14px] font-semibold rounded-full border border-black/[0.12] bg-white text-[#1a1814] hover:border-primary/40 hover:text-primary transition-colors";
}

/** A single external CTA button that fires a dataLayer event on click. */
export function CtaLink({
  cta,
  event,
  variant,
  size = "lg",
  className,
}: {
  cta: Cta;
  event: string;
  variant: "primary" | "secondary";
  size?: Size;
  className?: string;
}) {
  const Icon = ICONS[cta.kind];
  const base = variant === "primary" ? primaryClass(size) : secondaryClass(size);
  return (
    <a
      href={cta.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(event, { product: cta.verb, cta: cta.kind })}
      className={`${base}${className ? ` ${className}` : ""}`}
    >
      {cta.label}
      <Icon
        className={`${size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5"} ${
          variant === "primary" ? "transition-transform duration-300 group-hover:translate-x-0.5" : ""
        }`}
      />
    </a>
  );
}

/** Small text/link CTA (Edge Connect's tertiary "View on AppExchange"). */
export function CtaTextLink({
  cta,
  event,
  className,
}: {
  cta: Cta;
  event: string;
  className?: string;
}) {
  return (
    <a
      href={cta.href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(event, { product: cta.verb, cta: cta.kind })}
      className={`inline-flex items-center gap-1 text-[13px] font-semibold text-[#6b6460] hover:text-primary transition-colors underline-offset-4 hover:underline${
        className ? ` ${className}` : ""
      }`}
    >
      {cta.label}
    </a>
  );
}

/**
 * Renders a product's full CTA stack: primary + secondary buttons and, when
 * present, a tertiary text link — each wired to a unique tracking event.
 */
export function ProductCtas({
  product,
  page,
  size = "lg",
  align = "start",
}: {
  product: ProductConfig;
  /** Page-location prefix for event names, e.g. "homepage" or "product". */
  page: string;
  size?: Size;
  align?: "start" | "center";
}) {
  const alignRow = align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"}`}>
      <div className={`flex flex-wrap items-center gap-2.5 ${alignRow}`}>
        <CtaLink cta={product.primary} event={ctaEvent(page, product.slug, product.primary.verb)} variant="primary" size={size} />
        {product.secondary && (
          <CtaLink cta={product.secondary} event={ctaEvent(page, product.slug, product.secondary.verb)} variant="secondary" size={size} />
        )}
      </div>
      {product.tertiary && (
        <CtaTextLink cta={product.tertiary} event={ctaEvent(page, product.slug, product.tertiary.verb)} />
      )}
    </div>
  );
}
