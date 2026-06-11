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
  },
  {
    icon: enhancedFilesIcon,
    name: "Enhanced Files",
    desc: "Modern file management with bulk downloads, instant search & smart previews",
    href: "/products/enhanced-files",
    available: true,
  },
  {
    icon: fundOpsIcon,
    name: "FundOps",
    desc: "Streamlined fund operations built natively inside your Salesforce org",
    href: null,
    available: false,
  },
  {
    icon: listViewIcon,
    name: "List View Export",
    desc: "Export any Salesforce list view to CSV or Excel in a single click",
    href: null,
    available: false,
  },
  {
    icon: fieldTrackingIcon,
    name: "Unlimited Field Tracking",
    desc: "Track unlimited field history without hitting native platform limits",
    href: null,
    available: false,
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

      {/* ── HERO — dark ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0f0e0b]">
        <div className="absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full bg-primary/[0.14] blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-accent/[0.10] blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 py-36 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-white/[0.07] backdrop-blur-sm border border-white/[0.10] rounded-full px-5 py-2 mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-white/55 text-sm font-medium tracking-wide">Salesforce-Native AppExchange Apps</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
            className="text-[clamp(56px,10vw,110px)] text-white leading-[0.88] mb-8 tracking-[-1px]"
          >
            Smarter<br />Salesforce
            <span
              className="block mt-2"
              style={{
                background: "linear-gradient(135deg, #5555e6 0%, #8877f0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Starts Here
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-lg md:text-xl text-white/45 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Powerful Salesforce-native apps that fill critical gaps, streamline workflows, and help your team move faster — without the heavy setup or high price.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="#apps"
              className="inline-flex items-center gap-2 px-7 h-11 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary/90 transition-colors shadow-sm"
            >
              Explore Our Apps <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-7 h-11 text-sm font-medium border border-white/[0.18] text-white/80 hover:text-white hover:bg-white/[0.06] rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-3 mt-20 flex-wrap"
          >
            {APPS.map((app, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                title={app.name}
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className={`w-11 h-11 rounded-xl transition-all duration-300 ${
                    app.available ? "opacity-80 hover:opacity-100" : "opacity-25 grayscale"
                  }`}
                />
              </motion.div>
            ))}
            <span className="text-white/25 text-xs ml-1">& more coming soon</span>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#faf8f4] to-transparent pointer-events-none" />
      </section>

      {/* ── STATS — warm cream ── */}
      <section className="bg-[#faf8f4] border-b border-black/[0.07] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {STATS.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center">
                <div className="text-4xl md:text-5xl font-display font-black text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-[#9a9490] font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM — white ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-4xl md:text-6xl text-[#1a1814] leading-[1.05]">
              Salesforce gaps slowing you down?
            </h2>
            <p className="text-lg md:text-xl text-[#6b6460] max-w-3xl mx-auto leading-relaxed">
              Salesforce is a powerful platform, but it doesn't always cover everything out of the box. When you're stuck building workarounds, managing costly customizations, or settling for less, your team loses valuable time.
            </p>
            <p className="text-base text-[#9a9490] max-w-3xl mx-auto leading-relaxed">
              Our apps address the most common Salesforce frustrations — quickly, efficiently, and without unnecessary overhead. No heavy implementation. No learning curve. Just smarter tools for more innovative Salesforce experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── APPS SHOWCASE — warm cream ── */}
      <section id="apps" className="py-28 bg-[#faf8f4] border-y border-black/[0.07]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-primary/[0.07] border border-primary/[0.15] rounded-full px-4 py-1.5 mb-5">
              <span className="text-primary text-[11px] font-semibold uppercase tracking-widest">AppExchange Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl text-[#1a1814] mb-4">Our featured products</h2>
            <p className="text-[#6b6460] text-lg max-w-2xl mx-auto">
              Built by Salesforce veterans for admins, IT leaders, and operations teams who need real solutions fast.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {APPS.map((app, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`group relative bg-white border rounded-3xl p-6 transition-all duration-300 ${
                  app.available
                    ? "border-black/[0.07] hover:border-black/[0.14] hover:shadow-md shadow-sm"
                    : "border-black/[0.05] opacity-45"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-2xl" />
                  {app.available ? (
                    <span className="text-[10px] font-semibold bg-primary/[0.07] text-primary border border-primary/[0.15] px-3 py-1 rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold bg-black/[0.05] text-black/40 border border-black/[0.08] px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="text-[#1a1814] font-display font-medium text-xl mb-2">{app.name}</h3>
                <p className="text-[#6b6460] text-sm leading-relaxed mb-5">{app.desc}</p>
                {app.available && app.href && (
                  <div className="flex gap-2.5">
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 text-xs h-8 bg-primary/[0.08] hover:bg-primary/15 text-primary border border-primary/[0.18] rounded-full transition-colors shadow-none"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">AppExchange</a>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="flex-1 text-xs h-8 bg-transparent text-[#6b6460] hover:text-[#1a1814] border border-black/[0.10] hover:bg-black/[0.04] rounded-full transition-colors shadow-none"
                    >
                      <Link href={app.href}>
                        Learn more <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY US — white ── */}
      <section className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl text-[#1a1814] mb-4">Why Salesforce teams choose us</h2>
            <div className="w-10 h-px bg-black/[0.12] mx-auto" />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          >
            {WHY_US.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-5 bg-[#faf8f4] border border-black/[0.06] rounded-3xl p-7 hover:border-black/[0.12] hover:bg-[#f4f1eb] transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/[0.09] border border-primary/[0.14] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-[#1a1814] font-display font-medium text-xl mb-2">{f.title}</h3>
                  <p className="text-[#6b6460] leading-relaxed text-sm">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER — indigo ── */}
      <section className="py-28 bg-primary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl text-white mb-3">Be the first to know</h2>
            <p className="text-white/65 mb-10 leading-relaxed">
              Get updates when new apps go live, beta tests open, and fresh features drop. No noise — just the good stuff.
            </p>

            {newsletterSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/[0.15] border border-white/[0.25] text-white p-4 rounded-2xl flex items-center justify-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium text-sm">Thanks for subscribing! We'll be in touch.</span>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2.5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="First Name"
                            {...field}
                            className="h-11 bg-white/[0.14] border-white/[0.22] text-white placeholder:text-white/40 focus:border-white/50 transition-colors rounded-full px-5"
                          />
                        </FormControl>
                        <FormMessage className="text-white/80" />
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
                            className="h-11 bg-white/[0.14] border-white/[0.22] text-white placeholder:text-white/40 focus:border-white/50 transition-colors rounded-full px-5"
                          />
                        </FormControl>
                        <FormMessage className="text-white/80" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="h-11 px-7 bg-white hover:bg-white/90 text-primary font-semibold rounded-full transition-colors shadow-sm shrink-0"
                  >
                    <Send className="w-4 h-4 mr-2" /> Subscribe
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
