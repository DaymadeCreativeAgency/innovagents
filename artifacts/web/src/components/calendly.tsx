import { useEffect } from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import { CALENDLY_URL } from "@/lib/products";
import { track } from "@/lib/track";

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

/** Load Calendly's widget assets once, shared across every embed on the page. */
function useCalendlyAssets() {
  useEffect(() => {
    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = WIDGET_CSS;
      document.head.appendChild(link);
    }
    if (!document.querySelector(`script[src="${WIDGET_JS}"]`)) {
      const script = document.createElement("script");
      script.src = WIDGET_JS;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
}

/**
 * Fire a tracking event when a visitor actually books through any Calendly
 * widget on the page (Calendly posts a message on `event_scheduled`).
 */
function useCalendlyBooked(event: string) {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (
        typeof e.data === "object" &&
        e.data?.event === "calendly.event_scheduled"
      ) {
        track(event);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [event]);
}

/** Inline Calendly scheduler so visitors can book without leaving the site. */
export function CalendlyEmbed({
  bookedEvent,
  className,
}: {
  /** Event fired when a booking completes, e.g. `get_started_demo_booked`. */
  bookedEvent: string;
  className?: string;
}) {
  useCalendlyAssets();
  useCalendlyBooked(bookedEvent);
  return (
    <div
      className={`calendly-inline-widget rounded-2xl overflow-hidden border border-black/[0.07] bg-white${
        className ? ` ${className}` : ""
      }`}
      data-url={CALENDLY_URL}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

/** A tracked "Schedule Demo" button that opens Calendly in a new tab. */
export function DemoButton({
  event,
  label = "Schedule Demo",
  className,
}: {
  event: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(event, { cta: "demo" })}
      className={`cta-pill group inline-flex items-center justify-center gap-2 px-7 h-11 text-[15px] font-semibold bg-[#1a1814] text-white rounded-full shadow-sm${
        className ? ` ${className}` : ""
      }`}
    >
      <CalendarDays className="w-4 h-4" />
      {label}
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}
