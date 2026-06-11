import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
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
  {
    icon: LayoutGrid,
    title: "Intuitive Organization",
    desc: "Browse files with a clean, folder-like structure directly on the record page. No more endless scrolling through related lists.",
  },
  {
    icon: Download,
    title: "Bulk Operations",
    desc: "Select multiple files and download them all at once as a single ZIP file. Save your users hours of tedious clicking.",
  },
  {
    icon: Search,
    title: "Instant Search",
    desc: "Find what you need instantly with fast, record-specific file searching. Filter by name, type, and date.",
  },
  {
    icon: FolderOpen,
    title: "Smart Previews",
    desc: "Preview documents, images, and PDFs quickly without having to download them or navigate away from the record.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Optimized for speed. Built specifically for Lightning Experience to ensure zero lag even on records with hundreds of files.",
  },
  {
    icon: Lock,
    title: "Secure & Native",
    desc: "Respects all native Salesforce file permissions and sharing rules out of the box. No external servers or API limits.",
  },
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

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-[#09090f]">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <motion.div
          className="absolute -top-32 -right-20 w-[700px] h-[600px] rounded-full bg-accent/18 blur-[140px] pointer-events-none"
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-primary/12 blur-[110px] pointer-events-none"
          animate={{ scale: [1.08, 1, 1.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
                className="flex items-center justify-center order-2 lg:order-1"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-[32px] bg-accent/30 blur-[60px] scale-90" />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img
                      src={enhancedFilesIcon}
                      alt="Enhanced Files"
                      className="relative w-56 h-56 md:w-72 md:h-72 rounded-[32px] shadow-[0_0_80px_rgba(254,144,127,0.35)]"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right: text */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-accent/[0.15] border border-accent/25 rounded-full px-4 py-1.5 mb-8"
                >
                  <span className="text-accent text-xs font-semibold uppercase tracking-widest">Salesforce-Native App</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.65 }}
                  className="text-5xl md:text-6xl text-white mb-6 leading-[0.9]"
                >
                  ENHANCED
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(135deg, #fe907f 0%, #f06060 50%, #5555e6 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    FILES
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-white/45 leading-relaxed mb-10"
                >
                  Take control of your file management with fast browsing, bulk downloads, and intuitive file organization built right into your Salesforce records.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    asChild
                    className="h-12 px-8 bg-accent hover:bg-accent/90 text-[#161618] font-bold shadow-[0_0_35px_rgba(254,144,127,0.45)] hover:shadow-[0_0_55px_rgba(254,144,127,0.65)] transition-all duration-300 rounded-xl"
                  >
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      View on AppExchange <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="h-12 px-8 bg-transparent border border-white/20 text-white hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 rounded-xl"
                  >
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-28 bg-[#0c0c14]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Fix Salesforce{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #fe907f 0%, #5555e6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                File Frustrations
              </span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-accent to-primary mx-auto mb-6" />
            <p className="text-white/40 max-w-2xl mx-auto">
              Stop clicking endlessly just to find one document. Enhanced Files upgrades the native Salesforce file experience with tools that actually make sense.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          >
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-accent/30 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/[0.14] border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/25 transition-colors">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-white font-display font-medium text-lg mb-2">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-28 bg-[#09090f] relative overflow-hidden">
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-accent/[0.10] blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Abstract UI mockup */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-6"
            >
              <div className="bg-[#0a0a12] rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="bg-white/[0.03] px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <div className="flex gap-2">
                    <div className="w-16 h-7 bg-accent/20 rounded-lg border border-accent/20" />
                    <div className="w-20 h-7 bg-white/[0.05] rounded-lg border border-white/[0.08]" />
                  </div>
                  <div className="w-36 h-7 bg-white/[0.05] rounded-lg border border-white/[0.08] flex items-center px-2.5 gap-2">
                    <Search className="w-3.5 h-3.5 text-white/25" />
                    <div className="w-16 h-1.5 bg-white/[0.1] rounded-full" />
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.07] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/[0.18] border border-accent/20 flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-white/[0.15] rounded-full w-1/3 mb-1.5" />
                        <div className="h-2 bg-white/[0.07] rounded-full w-1/5" />
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.08]" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl text-white">Stop wasting time on file management.</h2>
              <p className="text-white/45 leading-relaxed">
                If your team relies heavily on documents — contracts, specs, invoices, images — the standard Salesforce file component quickly becomes a bottleneck. It's hard to search, impossible to bulk download, and lacks intuitive organization.
              </p>
              <p className="text-white/45 leading-relaxed">
                Enhanced Files replaces that frustration with a modern, consumer-grade file browsing experience right on the Lightning record page. Your team can finally treat Salesforce files like a real file system.
              </p>
              <ul className="space-y-3 mt-2">
                {BENEFITS.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 font-medium text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
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

      {/* ── CTA ── */}
      <section className="py-28 bg-[#0c0c14] relative overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] rounded-full bg-accent/[0.15] blur-[110px] pointer-events-none"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-white mb-6"
          >
            Ready to upgrade your file experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/40 mb-10"
          >
            Install Enhanced Files today and give your team the file management tools they deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="h-12 px-8 bg-accent hover:bg-accent/90 text-[#161618] font-bold shadow-[0_0_35px_rgba(254,144,127,0.4)] hover:shadow-[0_0_55px_rgba(254,144,127,0.6)] transition-all duration-300 rounded-xl"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">View on AppExchange</a>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 px-8 bg-transparent border border-white/20 text-white hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 rounded-xl"
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
