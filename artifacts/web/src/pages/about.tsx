import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion, type Variants } from "framer-motion";
import { Zap, Target, ShieldCheck, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
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
      <section className="relative py-28 lg:py-36 overflow-hidden bg-[#09090f]">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <motion.div
          className="absolute -top-24 -left-24 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[130px] pointer-events-none"
          animate={{ x: [0, 45, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[110px] pointer-events-none"
          animate={{ x: [0, -35, 0], y: [0, 25, 0], scale: [1.08, 1, 1.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.14] rounded-full px-4 py-1.5 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-white/55 text-xs font-medium uppercase tracking-widest">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-5xl md:text-7xl text-white mb-6 leading-[0.9]"
          >
            WE'VE LIVED THE
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(135deg, #fe907f 0%, #5555e6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PROBLEMS
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/45 leading-relaxed"
          >
            At InnovAgents, we turn real-world consulting experience into powerful, Salesforce-native apps that fill critical gaps without the heavy setup.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="py-28 bg-[#0c0c14]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 md:p-10"
            >
              <div className="inline-flex items-center gap-2 bg-primary/[0.14] border border-primary/25 rounded-full px-4 py-1.5 mb-6">
                <span className="text-primary text-xs font-semibold uppercase tracking-widest">Our Story</span>
              </div>
              <p className="text-lg text-white/60 leading-relaxed mb-5">
                We didn't start by building apps in a vacuum. We started as Salesforce consultants, administrators, and architects. For years, we helped companies of all sizes navigate the complexities of the Salesforce ecosystem.
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                Time and time again, we saw the same gaps. The same frustrations. Teams spending weeks building custom workarounds for things that should have been simple. That's why we created InnovAgents.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 md:p-10"
            >
              <div className="inline-flex items-center gap-2 bg-accent/[0.14] border border-accent/25 rounded-full px-4 py-1.5 mb-6">
                <span className="text-accent text-xs font-semibold uppercase tracking-widest">Our Mission</span>
              </div>
              <p className="text-lg text-white/60 leading-relaxed">
                To build smarter tools for more innovative Salesforce experiences. We believe that powerful software shouldn't require a massive learning curve, an army of developers, or an enterprise-sized budget. Our apps are designed to be installed in minutes and deliver value immediately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ── */}
      <section className="py-28 bg-[#09090f] relative overflow-hidden">
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.12] blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              What Makes Us{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #5555e6 0%, #fe907f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Different
              </span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-primary to-accent mx-auto" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
          >
            {DIFFERENTIATORS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/[0.14] border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-display font-medium text-xl mb-2">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#0c0c14] relative overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] rounded-full bg-primary/[0.15] blur-[100px] pointer-events-none"
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
            Ready to see what we've built?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/40 mb-10"
          >
            Explore our suite of Salesforce-native solutions and see how we can help your team move faster.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              size="lg"
              asChild
              className="text-base px-8 h-12 bg-primary hover:bg-primary/90 shadow-[0_0_35px_rgba(85,85,230,0.4)] hover:shadow-[0_0_55px_rgba(85,85,230,0.6)] transition-all duration-300 rounded-xl"
            >
              <Link href="/#apps">Explore All Apps</Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="text-base px-8 h-12 bg-transparent border border-white/20 text-white hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 rounded-xl"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
