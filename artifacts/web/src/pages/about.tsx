import { useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Zap, Target, ShieldCheck, Rocket, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { LayoutV2, SectionLabel, Cloud } from "@/components/layout-v2";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const DIFFERENTIATORS = [
  { title: "Seamless Salesforce Integration", desc: "Apps that feel like they've been part of Salesforce all along. No awkward UI, no external systems — 100% native.", icon: Zap },
  { title: "Affordable and Powerful", desc: "Premium quality apps without the enterprise price tag. Powerful tools shouldn't require an enterprise budget.", icon: Target },
  { title: "Created by Salesforce Veterans", desc: "We've lived the problems, and we're building the solutions. Every feature exists because we needed it ourselves.", icon: ShieldCheck },
  { title: "Fast Setup, Real Results", desc: "Start seeing value right away — no developers required. Install in minutes, not weeks.", icon: Rocket },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us | InnovAgents";
  }, []);

  return (
    <LayoutV2>
      {/* ── HERO — sky gradient ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#dbe4f7] via-[#edeef5] to-white pt-40 pb-20">
        <Cloud className="top-24 left-[5%] opacity-80" />
        <Cloud className="top-36 right-[8%] opacity-60 scale-75" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <SectionLabel>Our Story</SectionLabel>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="text-[clamp(44px,7vw,80px)] leading-[0.95] tracking-[-0.5px] text-[#1a1814] mb-6"
          >
            We've lived<br /><span className="text-primary">the problems</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#5d574f] leading-relaxed max-w-2xl mx-auto"
          >
            At InnovAgents, we turn real-world consulting experience into powerful, Salesforce-native apps that fill critical gaps without the heavy setup.
          </motion.p>
        </div>
      </section>

      {/* ── OUR STORY — white ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#faf8f4] border border-black/[0.07] rounded-[28px] p-8 md:p-10"
            >
              <SectionLabel>Our Story</SectionLabel>
              <p className="text-lg text-[#6b6460] leading-relaxed mb-5">
                We didn't start by building apps in a vacuum. We started as Salesforce consultants, administrators, and architects. For years, we helped companies of all sizes navigate the complexities of the Salesforce ecosystem.
              </p>
              <p className="text-lg text-[#6b6460] leading-relaxed">
                Time and time again, we saw the same gaps. The same frustrations. Teams spending weeks building custom workarounds for things that should have been simple. That's why we created InnovAgents.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#faf8f4] border border-black/[0.07] rounded-[28px] p-8 md:p-10"
            >
              <SectionLabel>Our Mission</SectionLabel>
              <p className="text-lg text-[#6b6460] leading-relaxed">
                To build smarter tools for more innovative Salesforce experiences. We believe that powerful software shouldn't require a massive learning curve, an army of developers, or an enterprise-sized budget. Our apps are designed to be installed in minutes and deliver value immediately.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT — cream ── */}
      <section className="py-24 bg-[#f5f1ea]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <SectionLabel>Why Us</SectionLabel>
            <h2 className="text-4xl md:text-5xl text-primary">What makes us different</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {DIFFERENTIATORS.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex items-start gap-5 bg-white border border-black/[0.06] rounded-3xl p-7 hover:border-black/[0.12] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#faf8f4] border border-black/[0.07] flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-xl text-[#1a1814] mb-2">{item.title}</h3>
                  <p className="text-[#6b6460] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA — sky bookend ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8ecf8] to-[#d8e2f5] py-24">
        <Cloud className="top-10 left-[6%] opacity-80" />
        <Cloud className="bottom-10 right-[8%] opacity-70 scale-75" />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] mb-4">Ready to see what we've built?</h2>
            <p className="text-[#5d574f] mb-9">
              Explore our suite of Salesforce-native solutions and see how we can help your team move faster.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/#apps"
                className="inline-flex items-center justify-center gap-2 px-7 h-11 text-sm font-semibold bg-[#1a1814] text-white rounded-full hover:bg-[#33302a] transition-colors shadow-sm"
              >
                Explore All Apps <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 h-11 text-sm font-medium bg-white/70 border border-black/[0.10] text-[#1a1814] hover:bg-white rounded-full transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </LayoutV2>
  );
}
