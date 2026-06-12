import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowUp, AtSign, Bell, Clock } from "lucide-react";

const WIDGET =
  "bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-5 pointer-events-none select-none";

/* ── floating widgets (Salesforce admin context) ── */

function PermissionSetsWidget() {
  const rows = [
    ["System Admin", "12"],
    ["Standard User", "847"],
    ["Read Only", "203"],
    ["Partner", "64"],
  ];
  return (
    <div className={`${WIDGET} w-[168px] md:w-[188px] relative`}>
      <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1.5 rounded-full bg-[#fe907f] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
        3
      </span>
      <div className="text-[13px] font-semibold text-[#1a1814] mb-3">Permission sets</div>
      <div className="space-y-0">
        {rows.map(([name, count]) => (
          <div
            key={name}
            className="flex items-center justify-between py-2 border-b border-[#f0f0f0] last:border-0 text-[11px]"
          >
            <span className="text-[#6b6460] truncate pr-2">{name}</span>
            <span className="text-[#1a1814] font-medium tabular-nums">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadinessWidget() {
  return (
    <div className={`${WIDGET} w-[196px] md:w-[220px] relative`}>
      <div className="text-[13px] font-semibold text-[#1a1814] mb-1">User readiness</div>
      <div className="text-[28px] font-bold text-[#1a1814] leading-none mb-0.5">87.4%</div>
      <div className="text-[12px] text-[#9a9490] mb-3">103% of release target</div>
      <svg viewBox="0 0 180 56" className="w-full h-14" aria-hidden>
        <line x1="0" y1="44" x2="180" y2="44" stroke="#e8e8e8" strokeWidth="1" />
        {[0, 45, 90, 135, 180].map((x) => (
          <line key={x} x1={x} y1="8" x2={x} y2="44" stroke="#e8e8e8" strokeWidth="1" />
        ))}
        <line x1="0" y1="28" x2="180" y2="28" stroke="#d4d4d4" strokeWidth="1" strokeDasharray="4 4" />
        <polyline
          fill="none"
          stroke="#5555e6"
          strokeWidth="2"
          points="0,38 45,34 90,30 135,22 180,14"
        />
        <circle cx="0" cy="38" r="3.5" fill="white" stroke="#5555e6" strokeWidth="2" />
        <circle cx="180" cy="14" r="4" fill="#5555e6" />
      </svg>
      <div className="flex items-center gap-2 mt-1 text-[10px] text-[#9a9490]">
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span className="px-2 py-0.5 rounded-full border border-[#ddd] text-[#1a1814] font-medium">Nov</span>
      </div>
      <div className="absolute -right-3 -bottom-3 w-10 h-10 rounded-full bg-[#a8e6cf] border-2 border-white flex items-center justify-center text-[11px] font-semibold text-[#2d4a3e] shadow-sm">
        JB
      </div>
    </div>
  );
}

function AcknowledgmentsWidget() {
  return (
    <div className={`${WIDGET} w-[172px] md:w-[192px]`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-[13px] font-semibold text-[#1a1814]">Acknowledgments</div>
        <span className="relative inline-flex">
          <Bell className="w-3.5 h-3.5 text-[#6b6460]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#fe907f]" />
        </span>
      </div>
      <div className="relative w-24 h-24 mx-auto mb-3">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#f0ebe4" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#fe907f"
            strokeWidth="10"
            strokeDasharray={`${94 * 2.39} ${100 * 2.39}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-[#1a1814]">94%</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-[#1a1814]">2.4k</div>
        <div className="text-[11px] font-medium text-[#fe907f]">↑ 5.5% vs last release</div>
      </div>
    </div>
  );
}

function ReleaseCommsWidget() {
  return (
    <div className={`${WIDGET} w-[min(92vw,340px)] md:w-[360px] px-5 py-4`}>
      <div className="text-[14px] text-[#9a9490] mb-4">Schedule org-wide announcement…</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-[#9a9490]">
          <span className="w-7 h-7 rounded-full border border-[#e0e0e0] flex items-center justify-center">
            <AtSign className="w-3.5 h-3.5" />
          </span>
          <span className="w-7 h-7 rounded-full border border-[#e0e0e0] flex items-center justify-center">
            <Clock className="w-3.5 h-3.5" />
          </span>
          <span className="w-7 h-7 rounded-full bg-[#dbeafe] text-[#1e40af] text-[10px] font-bold flex items-center justify-center">
            AF
          </span>
          <span className="relative w-7 h-7 rounded-full bg-[#fe907f]/20 text-[#c2503a] text-[10px] font-bold flex items-center justify-center">
            JT
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#fe907f] border-2 border-white" />
          </span>
        </div>
        <span className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_4px_12px_rgba(85,85,230,0.4)]">
          <ArrowUp className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}

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

/* ── hero — open blue sky, floating admin widgets, mockup with a clear landing ── */

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* sky gradient: deeper blue up top, hazy near the horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa]" />

      {/* clouds hugging the edges, like a wide-angle sky photo */}
      <CloudPuff className="-left-32 top-[26%]" />
      <CloudPuff className="-right-36 top-[38%] scale-90" />
      <CloudPuff className="right-[4%] -top-10 scale-[0.55] opacity-80" />
      <CloudPuff className="left-[10%] bottom-[2%] scale-75 opacity-70" />

      {/* centered copy with widgets floating around it */}
      <div className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 hidden lg:block">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[18%] left-[4%] xl:left-[6%]"
          >
            <PermissionSetsWidget />
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[14%] left-[5%] xl:left-[7%]"
          >
            <ReadinessWidget />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[14%] right-[2%] xl:right-[5%]"
          >
            <AcknowledgmentsWidget />
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute bottom-[12%] right-[6%] xl:right-[10%]"
          >
            <ReleaseCommsWidget />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-[720px] text-center pt-24 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display font-black uppercase text-[clamp(3rem,7.5vw,5.5rem)] leading-[0.95] tracking-[0.01em] text-primary mb-6"
          >
            What if Salesforce actually worked the way you wanted it to?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="text-lg md:text-xl text-[#3f4654] leading-relaxed mb-8 max-w-[580px] mx-auto"
          >
            Native apps that consolidate release comms, file chaos, and deployment busywork — so admins spend less time
            juggling tools and more time shipping what matters.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#apps"
              className="cta-pill inline-flex items-center px-7 h-12 text-base font-semibold bg-[#1a1814] text-white rounded-full"
            >
              Explore our apps
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 h-12 text-base font-medium bg-white/60 backdrop-blur-sm border border-white/70 text-[#1a1814] rounded-full hover:bg-white/85 transition-colors"
            >
              Contact us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
