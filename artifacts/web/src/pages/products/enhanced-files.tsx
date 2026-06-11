import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion, type Variants } from "framer-motion";
import { FolderOpen, Download, Search, LayoutGrid, Zap, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import enhancedFilesIcon from "@assets/EnhancedFiles-500x500_1781206837929.png";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const FEATURES = [
  { icon: LayoutGrid, title: "Intuitive Organization", desc: "Browse files with a clean, folder-like structure directly on the record page. No more endless scrolling through related lists." },
  { icon: Download, title: "Bulk Operations", desc: "Select multiple files and download them all at once as a single ZIP file. Save your users hours of tedious clicking." },
  { icon: Search, title: "Instant Search", desc: "Find what you need instantly with fast, record-specific file searching. Filter by name, type, and date." },
  { icon: FolderOpen, title: "Smart Previews", desc: "Preview documents, images, and PDFs quickly without downloading them or navigating away from the record." },
  { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed. Built specifically for Lightning Experience to ensure zero lag even on records with hundreds of files." },
  { icon: Lock, title: "Secure & Native", desc: "Respects all native Salesforce file permissions and sharing rules out of the box. No external servers or API limits." },
];

const BENEFITS = [
  "Download a complete record's files in one click",
  "Find the exact document you need in seconds",
  "Preview files without endless tab switching",
  "Keep your org's data secure and native",
];

export default function EnhancedFiles() {
  useEffect(() => {
    document.title = "Enhanced Files | InnovAgents";
  }, []);

  return (
    <Layout>

      {/* ── HERO — dark ── */}
      <section className="relative pt-24 pb-28 overflow-hidden bg-[#0f0e0b]">
        <div className="absolute -top-32 -right-20 w-[600px] h-[500px] rounded-full bg-accent/[0.10] blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-primary/[0.08] blur-[110px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
              className="flex items-center justify-center order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-[36px] bg-accent/[0.22] blur-[55px] scale-90" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img src={enhancedFilesIcon} alt="Enhanced Files" className="relative w-56 h-56 md:w-72 md:h-72 rounded-[36px]" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text */}
            <div className="order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-accent/[0.14] border border-accent/[0.22] rounded-full px-4 py-1.5 mb-8"
              >
                <span className="text-accent/90 text-[11px] font-semibold uppercase tracking-widest">Salesforce-Native App</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.65 }}
                className="text-5xl md:text-6xl text-white mb-6 leading-[0.92]"
              >
                Enhanced<br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #fe907f 0%, #f06060 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Files
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/45 leading-relaxed mb-10"
              >
                Take control of your file management with fast browsing, bulk downloads, and intuitive file organization built right into your Salesforce records.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 h-11 text-sm font-semibold bg-accent text-[#1a1410] rounded-full hover:bg-accent/90 transition-colors shadow-sm"
                >
                  View on AppExchange <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-7 h-11 text-sm font-medium border border-white/[0.18] text-white/80 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
                >
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ── FEATURES — white ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl text-[#1a1814] mb-4">Fix Salesforce file frustrations</h2>
            <div className="w-10 h-px bg-black/[0.12] mx-auto mb-5" />
            <p className="text-[#6b6460] max-w-2xl mx-auto">
              Stop clicking endlessly just to find one document. Enhanced Files upgrades the native Salesforce file experience with tools that actually make sense.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-[#faf8f4] border border-black/[0.06] rounded-3xl p-7 hover:border-black/[0.12] hover:bg-[#f4f1eb] transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/[0.10] border border-accent/[0.17] flex items-center justify-center mb-5 group-hover:bg-accent/17 transition-colors">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-[#1a1814] font-display font-medium text-lg mb-2">{feature.title}</h3>
                <p className="text-[#6b6460] text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS — warm cream ── */}
      <section className="py-24 bg-[#faf8f4] border-y border-black/[0.07]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* File UI mockup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-black/[0.08] rounded-3xl p-6 shadow-sm"
            >
              <div className="bg-[#faf8f4] rounded-2xl border border-black/[0.07] overflow-hidden">
                <div className="bg-white px-4 py-3 border-b border-black/[0.07] flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-16 h-7 bg-accent/[0.14] rounded-lg border border-accent/[0.16]" />
                    <div className="w-20 h-7 bg-black/[0.04] rounded-lg border border-black/[0.07]" />
                  </div>
                  <div className="w-32 h-7 bg-black/[0.04] rounded-lg border border-black/[0.07] flex items-center px-2.5 gap-2">
                    <Search className="w-3.5 h-3.5 text-black/25" />
                    <div className="w-14 h-1.5 bg-black/[0.09] rounded-full" />
                  </div>
                </div>
                <div className="p-4 space-y-1.5">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/[0.06] hover:border-black/[0.12] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/[0.10] border border-accent/[0.16] flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="h-2.5 bg-black/[0.14] rounded-full w-1/3 mb-1.5" />
                        <div className="h-2 bg-black/[0.07] rounded-full w-1/5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-black/[0.04] border border-black/[0.07]" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl text-[#1a1814]">Stop wasting time on file management.</h2>
              <p className="text-[#6b6460] leading-relaxed">
                If your team relies heavily on documents — contracts, specs, invoices, images — the standard Salesforce file component quickly becomes a bottleneck. It's hard to search, impossible to bulk download, and lacks intuitive organization.
              </p>
              <p className="text-[#6b6460] leading-relaxed">
                Enhanced Files replaces that frustration with a modern, consumer-grade file browsing experience right on the Lightning record page. Your team can finally treat Salesforce files like a real file system.
              </p>
              <ul className="space-y-3 mt-2">
                {BENEFITS.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#1a1814] text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/[0.10] border border-accent/[0.20] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-accent" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA — coral accent ── */}
      <section className="py-24 bg-accent">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-white mb-5"
          >
            Ready to upgrade your file experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/75 mb-10 max-w-xl mx-auto"
          >
            Install Enhanced Files today and give your team the file management tools they deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 h-11 text-sm font-semibold bg-white text-accent rounded-full hover:bg-white/90 transition-colors shadow-sm"
            >
              View on AppExchange
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 h-11 text-sm font-medium border border-white/[0.35] text-white hover:bg-white/[0.12] rounded-full transition-colors"
            >
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
