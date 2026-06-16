import { useState } from "react";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Target,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Send,
  Search,
  FileText,
  Download,
  Megaphone,
  Clock,
  Files,
  Workflow,
  Linkedin,
  Store,
  Upload,
  Star,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LayoutV2, SectionLabel, Cloud, Marquee, PillTag, APPX } from "@/components/layout-v2";
import { HeroSection } from "@/components/hero-section";
import { EdgeFlowMockup } from "@/components/edge-flow-mockup";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PAGE_DESCRIPTIONS } from "@/lib/seo";

import splashIcon from "@assets/SpalshAnnouncements-500x500_1781206837930.png";
import enhancedFilesIcon from "@assets/EnhancedFiles-500x500_1781206837929.png";
import edgeConnectIcon from "@assets/EdgeConnect-icon.png";
import listViewIcon from "@assets/ListViewExport-500x500_1781206837929.png";
import fieldTrackingIcon from "@assets/UnlimitedFieldTracking-500x500_1781206837930.png";

/* ───────────────────────── content ───────────────────────── */

interface AppCard {
  icon: string;
  name: string;
  desc: string;
  href: string | null;
  appx: string | null;
  available: boolean;
}

const APPS: AppCard[] = [
  {
    icon: splashIcon,
    name: "Splash Announcements",
    desc: "Targeted org-wide messaging with scheduling & acknowledgment tracking",
    href: "/products/splash-announcements",
    appx: APPX.splashAnnouncements,
    available: true,
  },
  {
    icon: enhancedFilesIcon,
    name: "Enhanced Files",
    desc: "Modern file management with bulk downloads, instant search & smart previews",
    href: "/products/enhanced-files",
    appx: APPX.enhancedFiles,
    available: true,
  },
  {
    icon: listViewIcon,
    name: "List View Export",
    desc: "Export any Salesforce list view to CSV in a single click — no reports required",
    href: "/products/list-view-export",
    appx: APPX.listViewExport,
    available: true,
  },
  {
    icon: edgeConnectIcon,
    name: "Edge Connect",
    desc: "Low-code integration platform — build integrations as easily as you create flows",
    href: "/products/edge-connect",
    appx: APPX.edgeConnect,
    available: true,
  },
  {
    icon: fieldTrackingIcon,
    name: "Unlimited Field Tracking",
    desc: "Track unlimited field history without hitting native platform limits",
    href: null,
    appx: APPX.fieldHistoryTracking,
    available: true,
  },
];

const STATS = [
  { value: "5+", label: "AppExchange Apps" },
  { value: "100%", label: "Salesforce Native" },
  { value: "0", label: "Code Required" },
  { value: "<5min", label: "To Deploy" },
];

const WHY_US = [
  { title: "Real World Solutions", desc: "Every app is born from real consulting experience and built to solve real customer needs.", icon: Zap },
  { title: "Instant Impact", desc: "Quick installs mean you start working smarter within minutes, not weeks.", icon: Rocket },
  { title: "User-Friendly Design", desc: "Clean, intuitive interfaces your admins and teams will actually love using.", icon: Target },
  { title: "Continuous Innovation", desc: "We continually build, improve, and respond to your needs with every update.", icon: ShieldCheck },
];

const ECOSYSTEM = ["Sales Cloud", "Service Cloud", "Experience Cloud", "Nonprofit Cloud", "Lightning", "Flow", "AppExchange", "Slack", "Salesforce Mobile"];

/* single brand tint for the ecosystem marquee pills */
const PILL_CLASS = "bg-primary/[0.07] border-primary/[0.20] text-primary";

/* Real verbatim reviews from our Salesforce AppExchange listings.
   Avatars are rendered from initials — we don't have (and won't invent)
   reviewer photos. */
const TESTIMONIALS = [
  {
    quote: "Instead of hoping people read an inbox message, the info shows up directly in Salesforce where I'm already working, so it's hard to miss.",
    name: "Jared Icenhower",
    app: "Splash Announcements",
  },
  {
    quote: "It gives you so much more relevant information than the standard \"Files\" feature. You can actually see the real number of files attached, and you can add multiple files at the same time — a great time saver.",
    name: "Kevin Moore",
    app: "Enhanced Files",
  },
  {
    quote: "This app has been a game-changer for us. We were able to set up our QuickBooks integration quickly and efficiently, all without writing a single line of code.",
    name: "Maddie McPhillips",
    app: "Edge Connect",
  },
  {
    quote: "Very robust with scheduling and managing announcements, and getting the \"read receipt\" acknowledgement is a big plus. It's free and super easy to set up!",
    name: "Terry Good",
    app: "Splash Announcements",
  },
  {
    quote: "Being able to download all the files at once is my favorite feature from this app, and I also like that you can easily search for files.",
    name: "Felipe Sozinho",
    app: "Enhanced Files",
  },
  {
    quote: "The messaging being persistent to all employees in another platform that they use every day made a big difference. Great communication tool!",
    name: "Natalie Gerard",
    app: "Splash Announcements",
  },
];

/* deterministic initials + tinted avatar from a name */
const AVATAR_TONES = [
  "bg-primary/[0.14] text-primary",
  "bg-accent/[0.22] text-[#c2503a]",
  "bg-[#22a06b]/[0.16] text-[#1c7d54]",
  "bg-[#413c64]/[0.12] text-[#413c64]",
];
function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

const newsletterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ── Splash mockup — mirrors the real login announcement banner ── */

function SplashMockup() {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden shadow-sm">
      {/* Salesforce-style top bar */}
      <div className="px-4 py-2.5 border-b-[3px] border-primary/70 flex items-center gap-4 bg-white">
        <img src={splashIcon} alt="" className="w-6 h-6 rounded-md" />
        <div className="flex items-center gap-3 text-[11px] text-[#6b6460] font-medium">
          <span className="text-primary border-b-2 border-primary pb-0.5">Announcements</span>
          <span>Home</span>
          <span className="hidden sm:inline">Opportunities</span>
          <span className="hidden sm:inline">Leads</span>
          <span className="hidden sm:inline">Files</span>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 h-6 px-2.5 rounded-full bg-black/[0.04] border border-black/[0.07] text-[#9a9490] text-[10px]">
          <Search className="w-3 h-3" /> Search…
        </div>
      </div>
      <div className="p-4">
        <div className="text-[12px] font-bold text-[#1a1814] mb-3">Hello Hannah, you have 1 new announcement.</div>
        <div className="rounded-xl bg-[#faf8f4] border border-black/[0.06] p-4">
          <div className="text-[13px] font-bold text-[#1a1814] mb-1.5">Release Version 1.3</div>
          <p className="text-[11px] text-[#6b6460] leading-relaxed mb-1">
            Release notes for version 1.3 released this Friday can be found here:
          </p>
          <ul className="text-[11px] text-[#6b6460] leading-relaxed list-decimal pl-4 space-y-0.5 mb-3">
            <li>New package installed called "Splash Announcements" — improves company-wide communications.</li>
            <li>Updated account page layout to no longer require 150 fields to save a record :)</li>
          </ul>
          <button className="px-4 h-7 rounded-lg border border-primary/40 text-primary text-[11px] font-semibold bg-white">
            Acknowledge
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-[#9a9490]">
          <Clock className="w-3 h-3" /> Scheduled May 12 – May 30 · 87% acknowledged
        </div>
      </div>
    </div>
  );
}

/* ── Files mockup — mirrors the real Enhanced Files related list ── */

function FilesMockup() {
  const files = [
    { name: "Master_Service_Agreement_v4", meta: "Apr 2, 2026 · 11.7MB · pdf" },
    { name: "Q4_Renewal_Quote_Final", meta: "Apr 2, 2026 · 9.4MB · xlsx" },
    { name: "Implementation_Specs_SOW", meta: "Apr 1, 2026 · 6.0MB · docx" },
    { name: "Brand_Logo_Assets", meta: "Mar 28, 2026 · 13.1MB · zip" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-black/[0.07] flex items-center justify-between gap-2 bg-[#faf8f4]">
        <div className="flex items-center gap-2 shrink-0">
          <img src={enhancedFilesIcon} alt="" className="w-6 h-6 rounded-md" />
          <span className="text-[13px] font-bold text-[#1a1814]">Files (10)</span>
        </div>
        <div className="flex items-center gap-1.5 h-7 px-2.5 rounded-lg bg-white border border-black/[0.08] text-[#9a9490] text-[10px] flex-1 max-w-32">
          <Search className="w-3 h-3" /> Search Files
        </div>
        <div className="flex gap-1.5 shrink-0">
          <span className="flex items-center gap-1 h-7 px-2.5 rounded-lg border border-primary/30 text-primary text-[10px] font-semibold bg-white">
            <Download className="w-3 h-3" /> Download All
          </span>
          <span className="hidden sm:flex items-center gap-1 h-7 px-2.5 rounded-lg border border-black/[0.10] text-[#6b6460] text-[10px] font-semibold bg-white">
            <Upload className="w-3 h-3" /> Upload
          </span>
        </div>
      </div>
      <div className="p-3 space-y-1.5">
        {files.map((f) => (
          <div key={f.name} className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-black/[0.05] hover:border-black/[0.10] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-accent/[0.12] border border-accent/[0.18] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-medium text-primary truncate">{f.name}</div>
              <div className="text-[10px] text-[#9a9490] mt-0.5">{f.meta}</div>
            </div>
            <div className="w-7 h-7 rounded-lg bg-[#faf8f4] border border-black/[0.08] flex items-center justify-center shrink-0">
              <Download className="w-3.5 h-3.5 text-[#6b6460]" />
            </div>
          </div>
        ))}
        <div className="text-center text-[11px] font-medium text-primary pt-1.5 border-t border-black/[0.05]">View All</div>
      </div>
    </div>
  );
}

/* ───────────────────────── page ───────────────────────── */

export default function Home() {
  usePageMeta({
    title: "InnovAgents | Smarter Salesforce Starts Here",
    description: PAGE_DESCRIPTIONS.home,
    path: "/",
  });

  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("Thanks for subscribing! We'll be in touch.");
  const [newsletterError, setNewsletterError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { firstName: "", email: "" },
  });

  async function onSubmit(values: z.infer<typeof newsletterSchema>) {
    setSubmitting(true);
    setNewsletterError(null);
    const result = await subscribeToNewsletter(values.email, values.firstName);
    setSubmitting(false);
    if (result.ok) {
      setNewsletterMessage(result.message);
      setNewsletterSuccess(true);
      form.reset();
    } else {
      setNewsletterError(result.message);
    }
  }

  return (
    <LayoutV2>
      <HeroSection />

      {/* ── STATS ── */}
      <section className="bg-white pt-6 pb-14">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-black/[0.07] py-12">
            {STATS.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp}>
                <div className="text-4xl md:text-5xl font-display font-black text-primary mb-1">{stat.value}</div>
                <div className="text-[13px] text-[#6b6460] font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFIT PANEL 1 — Splash Announcements ── */}
      <section id="apps" className="bg-white pt-10 pb-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-primary/[0.10] to-primary/[0.04] border border-primary/[0.10] rounded-[32px] p-6 md:p-10"
          >
            <img
              src={splashIcon}
              alt="Splash Announcements"
              className="absolute -top-6 -left-5 md:-left-6 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-[3px] border-white shadow-[0_12px_32px_rgba(26,24,20,0.18)] z-10"
            />
            <SplashMockup />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel>Splash Announcements</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] font-display font-black mb-5 leading-[0.98]">Reach every user, every time</h2>
            <p className="text-[#6b6460] leading-relaxed mb-8">
              <strong className="text-[#1a1814] font-semibold">Targeted org-wide messaging</strong> with scheduling & acknowledgment tracking. Make sure critical updates actually get seen — and prove it with acknowledgment reports.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <PillTag icon={Megaphone} label="Smart redirect on login" />
              <PillTag icon={Clock} label="Instant or scheduled" />
              <PillTag icon={Target} label="Target audiences" />
              <PillTag icon={CheckCircle2} label="Acknowledgment tracking" tone="coral" />
            </div>
            <Link href="/products/splash-announcements" className="cta-pill group inline-flex items-center gap-2 px-7 h-11 text-[15px] font-semibold bg-[#1a1814] text-white rounded-full">
              Learn more <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── BENEFIT PANEL 2 — Enhanced Files ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            <SectionLabel>Enhanced Files</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] font-display font-black mb-5 leading-[0.98]">Files that finally make sense</h2>
            <p className="text-[#6b6460] leading-relaxed mb-8">
              <strong className="text-[#1a1814] font-semibold">Modern file management</strong> with bulk downloads, instant search & smart previews. Treat Salesforce files like a real file system, right on the record page.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <PillTag icon={Download} label="Download all in one click" tone="coral" />
              <PillTag icon={Search} label="Search filter" />
              <PillTag icon={Files} label="Total file count" />
              <PillTag icon={ShieldCheck} label="Native security" />
            </div>
            <Link href="/products/enhanced-files" className="cta-pill group inline-flex items-center gap-2 px-7 h-11 text-[15px] font-semibold bg-[#1a1814] text-white rounded-full">
              Learn more <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2 bg-gradient-to-br from-accent/[0.14] to-accent/[0.05] border border-accent/[0.14] rounded-[32px] p-6 md:p-10"
          >
            <img
              src={enhancedFilesIcon}
              alt="Enhanced Files"
              className="absolute -top-6 -right-5 md:-right-6 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-[3px] border-white shadow-[0_12px_32px_rgba(26,24,20,0.18)] z-10"
            />
            <FilesMockup />
          </motion.div>
        </div>
      </section>

      {/* ── BENEFIT PANEL 3 — Edge Connect ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-primary/[0.10] to-accent/[0.06] border border-primary/[0.10] rounded-[32px] p-6 md:p-10"
          >
            <img
              src={edgeConnectIcon}
              alt="Edge Connect"
              className="absolute -top-6 -left-5 md:-left-6 w-16 h-16 md:w-20 md:h-20 rounded-2xl border-[3px] border-white shadow-[0_12px_32px_rgba(26,24,20,0.18)] z-10"
            />
            <EdgeFlowMockup />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionLabel>Edge Connect</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] font-display font-black mb-5 leading-[0.98]">Integrations as easy as flows</h2>
            <p className="text-[#6b6460] leading-relaxed mb-8">
              <strong className="text-[#1a1814] font-semibold">A low-code integration platform</strong> that lets admins and developers design, build, test, and deploy integrations in Salesforce with a drag-and-drop flow designer — no middleware required.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <PillTag icon={Workflow} label="200+ prebuilt connectors" />
              <PillTag icon={Zap} label="Drag-and-drop designer" />
              <PillTag icon={Rocket} label="Custom JS connectors" />
              <PillTag icon={ShieldCheck} label="Built in Salesforce" />
            </div>
            <Link href="/products/edge-connect" className="cta-pill group inline-flex items-center gap-2 px-7 h-11 text-[15px] font-semibold bg-[#1a1814] text-white rounded-full">
              Learn more <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── APPS GRID ── */}
      <section className="bg-white pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 max-w-2xl">
            <SectionLabel>AppExchange Solutions</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] font-display font-black mb-4">Our featured products</h2>
            <p className="text-[#6b6460] text-lg">
              Built by Salesforce veterans for admins, IT leaders, and operations teams who need real solutions fast.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {APPS.map((app) => (
              <motion.div
                key={app.name}
                variants={fadeUp}
                className={`flex flex-col h-full bg-[#faf8f4] border rounded-3xl p-6 transition-all duration-300 ${
                  app.available ? "border-black/[0.07] hover:border-black/[0.14] hover:shadow-md" : "border-black/[0.05] opacity-45"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-2xl" />
                  <span
                    className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${
                      app.available
                        ? "bg-primary/[0.07] text-primary border-primary/[0.15]"
                        : "bg-black/[0.05] text-black/40 border-black/[0.08]"
                    }`}
                  >
                    {app.available ? "Available" : "Coming Soon"}
                  </span>
                </div>
                <h3 className="font-display font-medium text-xl text-[#1a1814] mb-2">{app.name}</h3>
                <p className="text-[#6b6460] text-[15px] leading-relaxed mb-6">{app.desc}</p>

                {/* action row — pinned to the bottom so it lines up across every card */}
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  {app.href && (
                    <Link
                      href={app.href}
                      className="cta-pill group inline-flex items-center gap-1.5 px-4 h-9 rounded-full bg-primary text-white text-[14px] font-semibold"
                    >
                      Learn more <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                  {app.appx && (
                    <a
                      href={app.appx}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 h-9 rounded-full border border-black/[0.12] bg-white text-[14px] font-semibold text-[#1a1814] hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      AppExchange
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY US — cream bento ── */}
      <section id="why-us" className="bg-[#f5f1ea] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <SectionLabel>Why Us</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] font-display font-black mb-4">Why Salesforce teams choose us</h2>
            <p className="text-[#6b6460] text-lg">Smart, native, and built around how your org actually works</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-black/[0.06] rounded-[28px] p-8 md:p-10 mb-4"
          >
            <h3 className="font-display font-medium text-2xl md:text-3xl text-[#1a1814] text-center mb-8">
              Works seamlessly with the Salesforce you already use
            </h3>
            <div className="space-y-4 mb-8">
              <Marquee duration="40s">
                {ECOSYSTEM.map((name) => (
                  <span key={name} className={`px-5 py-2.5 rounded-full border text-[15px] font-medium whitespace-nowrap ${PILL_CLASS}`}>
                    {name}
                  </span>
                ))}
              </Marquee>
              <Marquee reverse duration="46s">
                {[...ECOSYSTEM].reverse().map((name) => (
                  <span key={name} className={`px-5 py-2.5 rounded-full border text-[15px] font-medium whitespace-nowrap ${PILL_CLASS}`}>
                    {name}
                  </span>
                ))}
              </Marquee>
            </div>
            <p className="text-center text-[15px] text-[#6b6460] max-w-xl mx-auto">
              <strong className="text-[#1a1814] font-semibold">100% Salesforce native.</strong> No external servers, no API limits, no sync jobs. Our apps respect your permissions, sharing rules, and security model out of the box.
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_US.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="bg-white border border-black/[0.06] rounded-3xl p-7">
                <div className="w-12 h-12 rounded-full bg-[#faf8f4] border border-black/[0.07] flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-medium text-xl text-[#1a1814] mb-2">{f.title}</h3>
                <p className="text-[#6b6460] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-[#f5f1ea] pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto py-16"
          >
            <div className="flex items-center justify-center gap-1 text-[#f5a623] mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="font-display font-medium text-[clamp(32px,5vw,56px)] text-[#1a1814] leading-[1.1] mb-10">
              "We now have our admin building integrations, without the need to hire a developer!"
            </div>
            <div className="flex items-center justify-center gap-4">
              <span className="w-14 h-14 rounded-full bg-primary/[0.14] text-primary flex items-center justify-center font-bold text-lg">
                CS
              </span>
              <div className="text-left">
                <div className="font-semibold text-[15px] text-[#1a1814]">Chris Sommers</div>
                <div className="text-[#9a9490] text-[13px]">Edge Connect · AppExchange review</div>
              </div>
            </div>
          </motion.div>

          <Marquee duration="48s">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="flex flex-col w-80 h-full bg-white border border-black/[0.06] rounded-3xl p-6 shrink-0">
                <div className="flex items-center gap-0.5 text-[#f5a623] mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-[15px] text-[#1a1814] leading-relaxed mb-5">"{t.quote}"</p>
                {/* author block pinned to the bottom so it lines up across every card */}
                <div className="mt-auto flex items-center gap-3 pt-4 border-t border-black/[0.05]">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 ${AVATAR_TONES[i % AVATAR_TONES.length]}`}>
                    {initials(t.name)}
                  </span>
                  <div>
                    <div className="font-semibold text-[13px] text-[#1a1814]">{t.name}</div>
                    <div className="text-[#9a9490] text-[12px]">{t.app} · AppExchange review</div>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── STAY IN THE LOOP + NEWSLETTER — sky bookend ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8ecf8] to-[#d8e2f5] py-24">
        <Cloud className="top-12 left-[6%] opacity-80" />
        <Cloud className="bottom-12 right-[8%] opacity-70 scale-75" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* left — stay in the loop */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <SectionLabel>Community</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] font-display font-black mb-4">Stay in the loop</h2>
            <p className="text-[#5d574f] leading-relaxed mb-8">
              Follow along for new releases, betas, and ways teams are getting more out of Salesforce.
            </p>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/company/innovagents-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-4 border border-black/[0.06] hover:border-primary/[0.30] hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/[0.09] border border-primary/[0.15] flex items-center justify-center shrink-0">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-medium text-lg text-[#1a1814] leading-tight">Follow us on LinkedIn</div>
                  <div className="text-[#9a9490] text-[13px]">Release news & Salesforce tips</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9a9490] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
              </a>
              <a
                href={APPX.splashAnnouncements}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white rounded-2xl p-4 border border-black/[0.06] hover:border-[#fe907f]/[0.50] hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-[#fe907f]/[0.14] border border-[#fe907f]/[0.30] flex items-center justify-center shrink-0">
                  <Store className="w-5 h-5 text-[#d65a41]" />
                </div>
                <div className="flex-1">
                  <div className="font-display font-medium text-lg text-[#1a1814] leading-tight">Browse the AppExchange</div>
                  <div className="text-[#9a9490] text-[13px]">5+ apps · reviews · installs in minutes</div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#9a9490] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#d65a41]" />
              </a>
            </div>
          </motion.div>

          {/* right — newsletter signup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_20px_60px_rgba(26,24,20,0.10)]"
          >
            <h3 className="text-3xl md:text-4xl text-[#1a1814] font-display font-black mb-3">
              Be the first <span className="text-primary">to know</span>
            </h3>
            <p className="text-[#5d574f] mb-7 leading-relaxed">
              Get updates when new apps go live, beta tests open, and fresh features drop. No noise — just the good stuff.
            </p>

            {newsletterSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/[0.06] border border-primary/[0.15] text-[#1a1814] p-4 rounded-2xl flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="font-medium text-[15px]">{newsletterMessage}</span>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="First Name" {...field} className="h-12 bg-[#faf8f4] border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] rounded-full px-5 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email Address" {...field} className="h-12 bg-[#faf8f4] border-black/[0.10] text-[#1a1814] placeholder:text-[#9a9490] rounded-full px-5 text-base" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {newsletterError && (
                    <p className="text-[13px] text-[#d65a41] px-1 -mt-1">{newsletterError}</p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="cta-pill h-12 px-7 bg-[#1a1814] text-white font-semibold rounded-full text-base disabled:opacity-70"
                  >
                    <Send className="w-4 h-4 mr-2" /> {submitting ? "Subscribing…" : "Subscribe"}
                  </Button>
                  <p className="text-[12px] text-[#9a9490] text-center leading-relaxed">
                    By subscribing, you agree to our{" "}
                    <Link href="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    . Unsubscribe anytime.
                  </p>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </section>
    </LayoutV2>
  );
}
