import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Zap, Target, ShieldCheck, Rocket, CheckCircle2, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import splashIcon from "@assets/SpalshAnnouncements-500x500_1781206837930.png";
import enhancedFilesIcon from "@assets/EnhancedFiles-500x500_1781206837929.png";
import fundOpsIcon from "@assets/FundOps-500x500_1781206837929.png";
import listViewIcon from "@assets/ListViewExport-500x500_1781206837929.png";
import fieldTrackingIcon from "@assets/UnlimitedFieldTracking-500x500_1781206837930.png";

const APPS = [
  {
    icon: splashIcon,
    name: "Splash Announcements",
    desc: "Targeted org-wide messaging with scheduling & acknowledgment tracking",
    href: "/products/splash-announcements",
    available: true,
    color: "primary",
  },
  {
    icon: enhancedFilesIcon,
    name: "Enhanced Files",
    desc: "Modern file management with bulk downloads, instant search & smart previews",
    href: "/products/enhanced-files",
    available: true,
    color: "accent",
  },
  {
    icon: fundOpsIcon,
    name: "FundOps",
    desc: "Streamlined fund operations built natively inside your Salesforce org",
    href: null,
    available: false,
    color: "primary",
  },
  {
    icon: listViewIcon,
    name: "List View Export",
    desc: "Export any Salesforce list view to CSV or Excel in a single click",
    href: null,
    available: false,
    color: "accent",
  },
  {
    icon: fieldTrackingIcon,
    name: "Unlimited Field Tracking",
    desc: "Track unlimited field history without hitting native platform limits",
    href: null,
    available: false,
    color: "primary",
  },
];

const STATS = [
  { value: "5+", label: "AppExchange Apps" },
  { value: "100%", label: "Salesforce Native" },
  { value: "0", label: "Code Required" },
  { value: "<5min", label: "To Deploy" },
];

const WHY_US = [
  {
    title: "Real World Solutions",
    desc: "Every app is born from real consulting experience and built to solve real customer needs.",
    icon: Zap,
  },
  {
    title: "Instant Impact",
    desc: "Quick installs mean you start working smarter within minutes, not weeks.",
    icon: Rocket,
  },
  {
    title: "User-Friendly Design",
    desc: "Clean, intuitive interfaces your admins and teams will actually love using.",
    icon: Target,
  },
  {
    title: "Continuous Innovation",
    desc: "We continually build, improve, and respond to your needs with every update.",
    icon: ShieldCheck,
  },
];

const newsletterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
});

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Home() {
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  useEffect(() => {
    document.title = "InnovAgents | Smarter Salesforce Starts Here";
  }, []);

  const form = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { firstName: "", email: "" },
  });

  function onSubmit() {
    setNewsletterSuccess(true);
    form.reset();
  }

  return (
    <Layout>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090f]">
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        {/* Animated blobs */}
        <motion.div
          className="absolute -top-32 -left-16 w-[700px] h-[700px] rounded-full bg-primary/25 blur-[140px] pointer-events-none"
          animate={{ x: [0, 55, 0], y: [0, -35, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-16 w-[600px] h-[600px] rounded-full bg-accent/18 blur-[120px] pointer-events-none"
          animate={{ x: [0, -40, 0], y: [0, 35, 0], scale: [1.08, 1, 1.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-secondary/50 blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10 py-32 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] rounded-full px-5 py-2 mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-white/65 text-sm font-medium tracking-wide">Salesforce-Native AppExchange Apps</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[clamp(52px,10vw,108px)] text-white leading-[0.88] mb-8 tracking-[-1px]"
          >
            SMARTER<br />SALESFORCE
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(135deg, #5555e6 0%, #8877f0 50%, #fe907f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              STARTS HERE
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Powerful Salesforce-native apps that fill critical gaps, streamline workflows, and help your team move faster — without the heavy setup or high price.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              size="lg"
              asChild
              className="text-base px-8 h-12 bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_40px_rgba(85,85,230,0.45)] hover:shadow-[0_0_65px_rgba(85,85,230,0.65)] transition-all duration-300 rounded-xl"
            >
              <Link href="#apps">
                Explore Our Apps <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="text-base px-8 h-12 bg-transparent border border-white/20 text-white hover:bg-white/[0.07] hover:border-white/30 transition-all duration-300 rounded-xl"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>

          {/* Floating app icons */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-20 flex-wrap"
          >
            {APPS.map((app, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.12, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                title={app.name}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className={`w-12 h-12 rounded-xl transition-all duration-300 ${
                    app.available
                      ? "opacity-75 hover:opacity-100"
                      : "opacity-30 grayscale"
                  }`}
                />
              </motion.div>
            ))}
            <span className="text-white/25 text-xs ml-1 font-medium">& more coming soon</span>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#09090f] to-transparent pointer-events-none" />
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/[0.07] bg-[#0c0c14] py-10">
        <div className="container mx-auto px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-display font-black mb-1"
                  style={{
                    background: "linear-gradient(135deg, #ffffff 0%, #a0a0c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-white/35 font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM STATEMENT ── */}
      <section className="py-32 bg-[#09090f] relative overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] rounded-full bg-primary/10 blur-[110px] pointer-events-none"
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-6"
          >
            <h2 className="text-4xl md:text-6xl text-white leading-[1.1]">
              Salesforce Gaps
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #fe907f 0%, #5555e6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Slowing You Down?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/45 max-w-3xl mx-auto leading-relaxed">
              Salesforce is a powerful platform, but it doesn't always cover everything out of the box. When you're stuck building workarounds, managing costly customizations, or settling for less, your team loses valuable time.
            </p>
            <p className="text-base text-white/35 max-w-3xl mx-auto leading-relaxed">
              Our apps are designed to address the most common Salesforce frustrations — quickly, efficiently, and without unnecessary overhead. No heavy implementation. No learning curve. Just smarter tools for more innovative Salesforce experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── APPS SHOWCASE ── */}
      <section id="apps" className="py-32 bg-[#0c0c14] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/[0.14] border border-primary/25 rounded-full px-4 py-1.5 mb-6">
              <span className="text-primary text-xs font-semibold uppercase tracking-widest">AppExchange Solutions</span>
            </div>
            <h2 className="text-4xl md:text-6xl text-white mb-4">
              Our Featured{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #5555e6 0%, #fe907f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Products
              </span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Built by Salesforce veterans for admins, IT leaders, and operations teams who need real solutions fast.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          >
            {APPS.map((app, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`group relative bg-white/[0.04] backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 ${
                  app.available
                    ? "border-white/[0.09] hover:border-primary/40 hover:bg-white/[0.07]"
                    : "border-white/[0.05] opacity-55"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <img src={app.icon} alt={app.name} className="w-14 h-14 rounded-2xl" />
                  {app.available ? (
                    <span className="text-[11px] font-semibold bg-primary/[0.18] text-primary border border-primary/25 px-3 py-1 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold bg-white/[0.07] text-white/35 border border-white/[0.1] px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-white font-display font-medium text-xl mb-2">{app.name}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5">{app.desc}</p>
                {app.available && app.href && (
                  <div className="flex gap-2.5">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 text-xs h-9 bg-primary/[0.18] hover:bg-primary/30 text-primary border border-primary/25 rounded-lg transition-colors"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">AppExchange</a>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 text-xs h-9 bg-transparent text-white/55 hover:text-white border border-white/[0.1] hover:bg-white/[0.07] rounded-lg transition-colors"
                    >
                      <Link href={app.href}>
                        Learn more <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                )}
                {/* Hover glow overlay */}
                {app.available && (
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-br from-primary/[0.06] to-transparent pointer-events-none" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY INNOVAGENTS ── */}
      <section className="py-32 bg-[#09090f] relative overflow-hidden">
        <motion.div
          className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full bg-accent/[0.12] blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-40 bottom-20 w-[400px] h-[400px] rounded-full bg-primary/[0.12] blur-[100px] pointer-events-none"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Why Salesforce Teams{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #5555e6 0%, #fe907f 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Choose Us
              </span>
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-primary to-accent mx-auto" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto"
          >
            {WHY_US.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/[0.14] border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-display font-medium text-xl mb-2">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-32 bg-[#0c0c14]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center relative"
          >
            <div className="bg-gradient-to-br from-primary/[0.16] via-white/[0.03] to-accent/[0.10] border border-white/[0.10] rounded-3xl p-10 md:p-14 overflow-hidden relative">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffffff10 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <motion.div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-[80px] pointer-events-none"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl text-white mb-3">Be the First to Know</h2>
                <p className="text-white/40 mb-10 leading-relaxed">
                  Get updates when new apps go live, beta tests open, and fresh features drop. No noise — just the good stuff.
                </p>

                {newsletterSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary/[0.15] border border-primary/30 text-primary p-4 rounded-xl flex items-center justify-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-medium">Thanks for subscribing! We'll be in touch.</span>
                  </motion.div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="First Name"
                                {...field}
                                className="h-12 bg-white/[0.07] border-white/[0.13] text-white placeholder:text-white/28 focus:border-primary/50 focus:bg-white/[0.10] transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Email Address"
                                {...field}
                                className="h-12 bg-white/[0.07] border-white/[0.13] text-white placeholder:text-white/28 focus:border-primary/50 focus:bg-white/[0.10] transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="h-12 px-7 bg-primary hover:bg-primary/90 shadow-[0_0_25px_rgba(85,85,230,0.45)] hover:shadow-[0_0_45px_rgba(85,85,230,0.65)] transition-all duration-300"
                      >
                        <Send className="w-4 h-4 mr-2" /> Subscribe
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-32 bg-[#09090f] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          className="absolute left-1/4 -top-10 w-[450px] h-[450px] rounded-full bg-primary/[0.22] blur-[110px] pointer-events-none"
          animate={{ x: [0, 35, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 -bottom-10 w-[350px] h-[350px] rounded-full bg-accent/[0.16] blur-[90px] pointer-events-none"
          animate={{ x: [0, -25, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl text-white mb-6 leading-[1.08]"
          >
            Ready to Make Salesforce
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #5555e6 0%, #8877f0 50%, #fe907f 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work Smarter?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're managing a growing Salesforce org or solving specific workflow bottlenecks, InnovAgents delivers simple, powerful, and affordable tools — ready when you are.
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
              className="text-base px-8 h-12 bg-primary hover:bg-primary/90 text-white font-semibold shadow-[0_0_40px_rgba(85,85,230,0.45)] hover:shadow-[0_0_65px_rgba(85,85,230,0.65)] transition-all duration-300 rounded-xl"
            >
              <Link href="#apps">
                Explore All Apps <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
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
