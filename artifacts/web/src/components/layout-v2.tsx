import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X, Linkedin } from "lucide-react";

import logo2Color from "@assets/InnovAgents-Main-Lockup-2color_1781206479353.png";
import logoWhite from "@assets/InnovAgents-Main-Lockup-white_1781206479352.png";
import splashIcon from "@assets/SpalshAnnouncements-500x500_1781206837930.png";
import enhancedFilesIcon from "@assets/EnhancedFiles-500x500_1781206837929.png";
import edgeConnectIcon from "@assets/EdgeConnect-icon.png";
import listViewIcon from "@assets/ListViewExport-500x500_1781206837929.png";
import fieldTrackingIcon from "@assets/UnlimitedFieldTracking-500x500_1781206837930.png";

/* Real AppExchange listing URLs */
export const APPX = {
  splashAnnouncements:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=670c3b7a-5a42-465e-8916-47289d357392",
  enhancedFiles:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=bae07232-1a00-4d9e-9f24-2ac1da068062",
  listViewExport:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=2993f924-33e0-4ce5-9463-8ea3f149ab8c",
  edgeConnect:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=d87ee483-c7b5-4eb4-bac3-802c9b24b70a",
  fieldHistoryTracking:
    "https://appexchange.salesforce.com/appxListingDetail?listingId=585cc05c-d49e-4ab7-8583-e4e3b2b85d25",
} as const;

export const PRODUCT_NAV = [
  { icon: splashIcon, name: "Splash Announcements", desc: "In-app communication that works", href: "/products/splash-announcements" },
  { icon: enhancedFilesIcon, name: "Enhanced Files", desc: "File management, upgraded", href: "/products/enhanced-files" },
  { icon: listViewIcon, name: "List View Export", desc: "Any list view to CSV in one click", href: "/products/list-view-export" },
  { icon: edgeConnectIcon, name: "Edge Connect", desc: "Low-code integration platform", href: "/products/edge-connect" },
  { icon: fieldTrackingIcon, name: "Unlimited Field Tracking", desc: "Field history without the ceiling", href: "/products/unlimited-field-tracking" },
];

/* ── small building blocks shared across pages ── */

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[13px] font-bold uppercase tracking-[0.18em] text-primary mb-4">
      {children}
    </div>
  );
}

export function Cloud({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className ?? ""}`} aria-hidden>
      <div className="relative">
        <div className="w-44 h-16 bg-white/80 rounded-full blur-xl" />
        <div className="absolute -top-6 left-10 w-28 h-14 bg-white/70 rounded-full blur-lg" />
        <div className="absolute -top-3 left-24 w-20 h-10 bg-white/60 rounded-full blur-lg" />
      </div>
    </div>
  );
}

export function PillTag({ icon: Icon, label, tone = "indigo" }: { icon: React.ElementType; label: string; tone?: "indigo" | "coral" }) {
  const iconColor = tone === "coral" ? "text-[#e0644b]" : "text-primary";
  return (
    <div className="inline-flex items-center gap-2 text-[#1a1814] text-[13px] font-medium">
      <Icon className={`w-3.5 h-3.5 shrink-0 ${iconColor}`} />
      {label}
    </div>
  );
}

export function Marquee({ children, reverse = false, duration }: { children: React.ReactNode; reverse?: boolean; duration?: string }) {
  /* Two identical halves, each carrying its own trailing gap, so the
     -50% keyframe lands exactly on the seam with no jump. */
  return (
    <div className="overflow-hidden marquee-mask">
      <div
        className={`flex w-max ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}
        style={duration ? { animationDuration: duration } : undefined}
      >
        <div className="flex shrink-0 gap-12 pr-12">{children}</div>
        <div className="flex shrink-0 gap-12 pr-12" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/* ── floating pill nav ── */

function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [location] = useLocation();
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* link styling flips with scroll: light on the transparent sky, dark on the white pill */
  const linkClass = scrolled
    ? "text-[#1a1814]/70 hover:text-[#1a1814] hover:bg-black/[0.04]"
    : "text-white/85 hover:text-white hover:bg-white/10";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`pointer-events-auto transition-all duration-300 ease-out flex items-center justify-between gap-6 ${
          scrolled
            ? "mt-3 w-[min(92%,880px)] rounded-full bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.10)] border border-black/[0.06] px-5 py-2.5 translate-y-0"
            : "mt-0 w-full max-w-6xl px-6 py-5 bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center shrink-0">
          {/* cross-fade the logo so the swap reads as part of the nav animating in */}
          <span className="relative inline-block h-7">
            <img
              src={logoWhite}
              alt="InnovAgents"
              className={`h-7 w-auto transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
            />
            <img
              src={logo2Color}
              alt="InnovAgents"
              aria-hidden={!scrolled}
              className={`absolute inset-0 h-7 w-auto transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
            />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <div
            className="relative"
            ref={solutionsRef}
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 text-base font-medium rounded-full transition-colors ${linkClass}`}
              aria-haspopup="menu"
              aria-expanded={solutionsOpen}
              onClick={() => setSolutionsOpen((v) => !v)}
            >
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              role="menu"
              className={`absolute left-0 top-full pt-2 transition-all duration-200 ${
                solutionsOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-white border border-black/[0.07] shadow-[0_20px_50px_rgba(26,24,20,0.14)] rounded-2xl p-2.5 w-80 flex flex-col gap-1">
                {PRODUCT_NAV.map((p) => (
                  <Link key={p.href} href={p.href} role="menuitem" className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-black/[0.04] transition-colors">
                    <img src={p.icon} alt="" className="w-10 h-10 rounded-xl shrink-0 mt-0.5" />
                    <div>
                      <div className="font-display font-medium text-base text-[#1a1814]">{p.name}</div>
                      <div className="text-[13px] text-[#6b6460] mt-0.5">{p.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/about" className={`px-4 py-2 text-base font-medium rounded-full transition-colors ${linkClass}`}>
            About
          </Link>
          <Link href="/contact" className={`px-4 py-2 text-base font-medium rounded-full transition-colors ${linkClass}`}>
            Contact
          </Link>
        </nav>

        <div className="hidden md:block shrink-0">
          <Link href="/contact" className="cta-pill inline-flex items-center px-5 py-2.5 text-base font-semibold bg-[#1a1814] text-white rounded-full">
            Get Started
          </Link>
        </div>

        <button
          className={`md:hidden p-2 rounded-full transition-colors ${scrolled ? "text-[#1a1814]/70 hover:text-[#1a1814]" : "text-white/90 hover:text-white"}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="pointer-events-auto absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 w-[min(92vw,28rem)] bg-white rounded-3xl shadow-xl border border-black/[0.06] p-4 flex flex-col gap-1 md:hidden max-h-[calc(100dvh-6rem)] overflow-y-auto">
          <div className="text-[12px] font-semibold text-[#9a9490] uppercase tracking-widest px-4 pt-1 pb-2">Solutions</div>
          {PRODUCT_NAV.map((p) => (
            <Link key={p.href} href={p.href} className="flex items-center gap-3 px-4 py-3 text-base font-medium text-[#1a1814]/75 rounded-2xl hover:bg-black/[0.04]">
              <img src={p.icon} alt="" className="w-7 h-7 rounded-lg" />
              {p.name}
            </Link>
          ))}
          <div className="h-px bg-black/[0.06] my-1" />
          <Link href="/about" className="px-4 py-3 text-base font-medium text-[#1a1814]/75 rounded-2xl hover:bg-black/[0.04]">About</Link>
          <Link href="/contact" className="px-4 py-3 text-base font-medium text-[#1a1814]/75 rounded-2xl hover:bg-black/[0.04]">Contact</Link>
          <Link href="/contact" className="mt-1 text-center px-4 py-3 text-base font-semibold bg-[#1a1814] text-white rounded-full">Get Started</Link>
        </div>
      )}
    </div>
  );
}

/* ── contained footer card ── */

function FooterV2() {
  return (
    <footer className="bg-[#d8e2f5] pb-10 px-4 pt-4">
      <div className="max-w-6xl mx-auto bg-white rounded-[28px] p-10 md:p-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2 space-y-5">
            <img src={logo2Color} alt="InnovAgents" className="h-7 w-auto" />
            <p className="text-[#6b6460] text-[15px] leading-relaxed max-w-xs">
              Powerful Salesforce-native apps built by veterans. Streamline your workflows without the heavy setup.
            </p>
            <a
              href="https://www.linkedin.com/company/innovagents-ai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="InnovAgents on LinkedIn"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black/[0.08] text-[#1a1814]/70 hover:text-primary hover:border-primary/[0.30] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9a9490] mb-5">Products</h4>
            <ul className="space-y-3">
              {PRODUCT_NAV.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-[15px] text-[#1a1814]/70 hover:text-primary transition-colors">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#9a9490] mb-5">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-[15px] text-[#1a1814]/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-[15px] text-[#1a1814]/70 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="text-[15px] text-[#1a1814]/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-black/[0.07] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="text-[13px] text-[#9a9490]">© {new Date().getFullYear()} InnovAgents. All rights reserved.</p>
          <p className="text-[13px] text-[#9a9490] max-w-xs md:max-w-none">Built natively for Salesforce · Available on AppExchange</p>
        </div>
      </div>
    </footer>
  );
}

/* ── page shell ── */

export function LayoutV2({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-sans bg-white text-[#1a1814] overflow-x-hidden">
      <FloatingNav />
      <main>{children}</main>
      <FooterV2 />
    </div>
  );
}
