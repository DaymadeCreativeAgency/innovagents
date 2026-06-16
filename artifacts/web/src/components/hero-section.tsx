import { Link } from "wouter";
import { motion } from "framer-motion";

/* ── photographic-feel cloud (layered soft puffs, hugs the frame edges) ── */

function CloudPuff({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none ${className ?? ""}`} aria-hidden>
      <div className="relative w-[440px] h-[150px]">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-white/90 rounded-full blur-2xl" />
        <div className="absolute -top-8 left-14 w-60 h-28 bg-white/85 rounded-full blur-xl" />
        <div className="absolute -top-2 left-48 w-44 h-22 bg-white/75 rounded-full blur-xl" />
        <div className="absolute top-8 left-0 w-52 h-16 bg-white rounded-full blur-lg" />
        <div className="absolute top-4 left-72 w-32 h-14 bg-white/80 rounded-full blur-lg" />
      </div>
    </div>
  );
}

/* ── hero — open blue sky with centered copy ── */

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* sky gradient: deeper blue up top, hazy near the horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa]" />

      {/* clouds hugging the edges, like a wide-angle sky photo */}
      <CloudPuff className="-left-32 top-[26%] hidden sm:block" />
      <CloudPuff className="-right-36 top-[38%] scale-90 hidden md:block" />
      <CloudPuff className="right-[4%] -top-10 scale-[0.55] opacity-80 hidden sm:block" />
      <CloudPuff className="left-[10%] bottom-[2%] scale-75 opacity-70 hidden sm:block" />

      <div className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6">
        <div className="relative z-10 max-w-[720px] text-center pt-28 sm:pt-24 pb-12 sm:pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display font-black uppercase text-[clamp(2rem,7vw,5.5rem)] leading-[0.95] tracking-[0.01em] text-[#1a1814] mb-5 sm:mb-6"
          >
            What if Salesforce actually worked <span className="text-primary">the way you wanted it to?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-base sm:text-lg md:text-xl text-[#3f4654] leading-relaxed mb-7 sm:mb-8 max-w-[580px] mx-auto"
          >
            Native apps that consolidate release comms, file chaos, and deployment busywork — so admins spend less time
            juggling tools and more time shipping what matters.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <a
              href="#apps"
              className="cta-pill inline-flex items-center justify-center px-7 h-12 text-base font-semibold bg-[#1a1814] text-white rounded-full"
            >
              Explore our apps
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 h-12 text-base font-medium bg-white/60 backdrop-blur-sm border border-white/70 text-[#1a1814] rounded-full hover:bg-white/85 transition-colors"
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
