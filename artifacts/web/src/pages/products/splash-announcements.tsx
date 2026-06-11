import { useEffect } from "react";
import { Layout } from "@/components/layout";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Eye, Code, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import splashIcon from "@assets/SpalshAnnouncements-500x500_1781206837930.png";

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
    icon: Users,
    title: "Audience Targeting",
    desc: "Target announcements by Profile, Role, or Public Group. Ensure users only see what's relevant to them.",
  },
  {
    icon: Calendar,
    title: "Advanced Scheduling",
    desc: "Set start and end dates for your messages. Plan your communications in advance and let the app handle the rest.",
  },
  {
    icon: Eye,
    title: "Acknowledgment Tracking",
    desc: "Require users to acknowledge important messages. Track exactly who has seen and accepted your announcements.",
  },
  {
    icon: Zap,
    title: "Dynamic Content",
    desc: "Build rich announcements using standard rich text editors. Include links, formatting, and images easily.",
  },
  {
    icon: Code,
    title: "No Coding Required",
    desc: "Fully configurable by Admins. Drop the component onto any Lightning page and start communicating immediately.",
  },
  {
    icon: CheckCircle2,
    title: "100% Salesforce Native",
    desc: "Your data never leaves Salesforce. Built on native platform architecture for maximum security and performance.",
  },
];

const BENEFITS = [
  "Eliminate ignored emails",
  "Improve adoption of new processes",
  "Ensure compliance with required reading",
  "Keep remote teams aligned",
];

export default function SplashAnnouncements() {
  useEffect(() => {
    document.title = "Splash Announcements | InnovAgents";
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
          className="absolute -top-32 -left-20 w-[700px] h-[600px] rounded-full bg-primary/22 blur-[140px] pointer-events-none"
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full bg-accent/12 blur-[110px] pointer-events-none"
          animate={{ scale: [1.08, 1, 1.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 bg-primary/[0.15] border border-primary/25 rounded-full px-4 py-1.5 mb-8"
                >
                  <span className="text-primary text-xs font-semibold uppercase tracking-widest">Salesforce-Native App</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.65 }}
                  className="text-5xl md:text-6xl text-white mb-6 leading-[0.9]"
                >
                  SPLASH
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(135deg, #5555e6 0%, #8877f0 60%, #fe907f 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ANNOUNCEMENTS
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-white/45 leading-relaxed mb-10"
                >
                  Send dynamic, targeted announcements across your Salesforce Org with scheduling, audience targeting, and acknowledgment tracking — no coding needed.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button
                    asChild
                    className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-[0_0_35px_rgba(85,85,230,0.45)] hover:shadow-[0_0_55px_rgba(85,85,230,0.65)] transition-all duration-300 rounded-xl font-semibold"
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

              {/* Right: icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
                className="flex items-center justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-[32px] bg-primary/30 blur-[60px] scale-90" />
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img
                      src={splashIcon}
                      alt="Splash Announcements"
                      className="relative w-56 h-56 md:w-72 md:h-72 rounded-[32px] shadow-[0_0_80px_rgba(85,85,230,0.4)]"
                    />
                  </motion.div>
                </div>
              </motion.div>
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
            <h2 className="text-4xl md:text-5xl text-white mb-4">Powerful Messaging,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #5555e6 0%, #fe907f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Zero Code
              </span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-primary to-accent mx-auto mb-6" />
            <p className="text-white/40 max-w-2xl mx-auto">
              Get critical information to the right users at the right time without relying on endless emails or complex custom development.
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
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/[0.14] border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
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
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/[0.12] blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl text-white">Cut through the noise.</h2>
              <p className="text-white/45 leading-relaxed">
                Email announcements get lost. Chatter posts get buried. When you have a critical system update, a new process rollout, or an urgent company alert, you need to know your team will see it.
              </p>
              <p className="text-white/45 leading-relaxed">
                Splash Announcements puts your message front and center in the Salesforce UI. By requiring acknowledgment, you close the loop on compliance and training requirements without the hassle.
              </p>
              <ul className="space-y-3 mt-2">
                {BENEFITS.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/70 font-medium text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Abstract UI mockup */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/[0.04] border border-white/[0.08] rounded-3xl p-6"
            >
              <div className="bg-[#0a0a12] rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                  <div className="flex-1" />
                  <div className="h-2 w-20 bg-white/[0.06] rounded-full" />
                </div>
                <div className="p-5 space-y-4">
                  <div className="bg-primary/[0.12] border border-primary/20 rounded-xl p-4">
                    <div className="h-4 bg-primary/30 rounded-md w-2/5 mb-3" />
                    <div className="h-3 bg-white/[0.08] rounded-md w-full mb-2" />
                    <div className="h-3 bg-white/[0.06] rounded-md w-4/5 mb-2" />
                    <div className="h-3 bg-white/[0.05] rounded-md w-3/5 mb-4" />
                    <div className="flex justify-end">
                      <div className="h-8 bg-primary/40 rounded-lg w-28" />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {[60, 80, 45].map((w, i) => (
                      <div key={i} className="h-3 bg-white/[0.05] rounded-full" style={{ width: `${w}px` }} />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-white/[0.04] rounded-xl border border-white/[0.05]" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-[#0c0c14] relative overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] rounded-full bg-primary/[0.18] blur-[110px] pointer-events-none"
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
            Ready to improve your org's communication?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/40 mb-10"
          >
            Install Splash Announcements today and start sending smarter, targeted messages in minutes.
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
              className="h-12 px-8 bg-primary hover:bg-primary/90 shadow-[0_0_35px_rgba(85,85,230,0.4)] hover:shadow-[0_0_55px_rgba(85,85,230,0.6)] transition-all duration-300 rounded-xl font-semibold"
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
