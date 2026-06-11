import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion, type Variants } from "framer-motion";
import { Zap, Target, ShieldCheck, Rocket } from "lucide-react";
import { Link } from "wouter";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const DIFFERENTIATORS = [
  {
    title: "Seamless Salesforce Integration",
    desc: "Apps that feel like they've been part of Salesforce all along. No awkward UI, no external systems — 100% native.",
    icon: Zap,
  },
  {
    title: "Affordable and Powerful",
    desc: "Premium quality apps without the enterprise price tag. We believe powerful tools shouldn't require an enterprise budget.",
    icon: Target,
  },
  {
    title: "Created by Salesforce Veterans",
    desc: "We've lived the problems, and we're building the solutions. Every feature exists because we needed it ourselves.",
    icon: ShieldCheck,
  },
  {
    title: "Fast Setup, Real Results",
    desc: "Start seeing value right away — no developers required. Install in minutes, not weeks.",
    icon: Rocket,
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us | InnovAgents";
  }, []);

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative py-32 lg:py-40 overflow-hidden bg-[#0f0e0b]">
        {/* Single ambient blob */}
        <div className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full bg-primary/[0.12] blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.10] rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl md:text-7xl text-white mb-6 leading-[0.92]"
          >
            We've lived<br />
            <span
              style={{
                background: "linear-gradient(135deg, #5555e6 0%, #8877f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              the problems
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/45 leading-relaxed max-w-2xl mx-auto"
          >
            At InnovAgents, we turn real-world consulting experience into powerful, Salesforce-native apps that fill critical gaps without the heavy setup.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-28 bg-[#151311]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.035] border border-white/[0.08] rounded-3xl p-8 md:p-10"
            >
              <div className="inline-flex items-center gap-2 bg-primary/[0.12] border border-primary/[0.20] rounded-full px-4 py-1.5 mb-6">
                <span className="text-primary text-[11px] font-semibold uppercase tracking-widest">Our Story</span>
              </div>
              <p className="text-lg text-white/55 leading-relaxed mb-5">
                We didn't start by building apps in a vacuum. We started as Salesforce consultants, administrators, and architects. For years, we helped companies of all sizes navigate the complexities of the Salesforce ecosystem.
              </p>
              <p className="text-lg text-white/55 leading-relaxed">
                Time and time again, we saw the same gaps. The same frustrations. Teams spending weeks building custom workarounds for things that should have been simple. That's why we created InnovAgents.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.035] border border-white/[0.08] rounded-3xl p-8 md:p-10"
            >
              <div className="inline-flex items-center gap-2 bg-accent/[0.12] border border-accent/[0.22] rounded-full px-4 py-1.5 mb-6">
                <span className="text-accent text-[11px] font-semibold uppercase tracking-widest">Our Mission</span>
              </div>
              <p className="text-lg text-white/55 leading-relaxed">
                To build smarter tools for more innovative Salesforce experiences. We believe that powerful software shouldn't require a massive learning curve, an army of developers, or an enterprise-sized budget. Our apps are designed to be installed in minutes and deliver value immediately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="py-28 bg-[#0f0e0b]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              What makes us different
            </h2>
            <div className="w-12 h-px bg-white/[0.15] mx-auto" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {DIFFERENTIATORS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-5 bg-white/[0.035] border border-white/[0.07] rounded-3xl p-7 hover:border-white/[0.12] hover:bg-white/[0.055] transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/[0.12] border border-primary/[0.18] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-display font-medium text-xl mb-2">{item.title}</h3>
                  <p className="text-white/38 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#151311]">
        <div className="max-w-6xl mx-auto px-6 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-white mb-6"
          >
            Ready to see what we've built?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/40 mb-10"
          >
            Explore our suite of Salesforce-native solutions and see how we can help your team move faster.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-3"
          >
            <Link
              href="/#apps"
              className="inline-flex items-center justify-center px-7 h-11 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm"
            >
              Explore All Apps
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 h-11 text-sm font-medium border border-white/[0.18] text-white/80 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
