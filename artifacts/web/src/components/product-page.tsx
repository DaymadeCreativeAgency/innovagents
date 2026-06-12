import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LayoutV2, SectionLabel, Cloud } from "@/components/layout-v2";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export interface ProductFeature {
  icon: React.ElementType;
  title: string;
  desc: string;
}

export interface ProductScreenshot {
  src: string;
  caption: string;
}

export interface ProductPricingTier {
  name: string;
  price: string;
  unit?: string;
  desc: string;
  featured?: boolean;
}

interface ProductPageProps {
  icon: string;
  name: string;
  label: string;
  headline: React.ReactNode;
  description: string;
  priceChip: string;
  trialNote?: string;
  appxUrl: string;
  /* tint for screenshot frames: "indigo" | "coral" */
  tint?: "indigo" | "coral";
  /* either real screenshots or a hand-built JSX mockup for the hero visual */
  heroScreenshot?: ProductScreenshot;
  heroMockup?: React.ReactNode;
  screenshots?: ProductScreenshot[];
  features: ProductFeature[];
  benefits: string[];
  pricingTiers?: ProductPricingTier[];
  ctaHeadline: string;
}

export function ProductPage({
  icon,
  name,
  label,
  headline,
  description,
  priceChip,
  trialNote,
  appxUrl,
  tint = "indigo",
  heroScreenshot,
  heroMockup,
  screenshots = [],
  features,
  benefits,
  pricingTiers,
  ctaHeadline,
}: ProductPageProps) {
  const [activeShot, setActiveShot] = useState(0);

  useEffect(() => {
    document.title = `${name} | InnovAgents`;
  }, [name]);

  const frameClass =
    tint === "indigo"
      ? "bg-gradient-to-br from-primary/[0.10] to-primary/[0.04] border-primary/[0.10]"
      : "bg-gradient-to-br from-accent/[0.14] to-accent/[0.05] border-accent/[0.14]";

  const allShots = heroScreenshot ? [heroScreenshot, ...screenshots] : screenshots;

  return (
    <LayoutV2>
      {/* ── HERO — sky gradient ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#dbe4f7] via-[#edeef5] to-white pt-36 pb-16">
        <Cloud className="top-24 left-[4%] opacity-80" />
        <Cloud className="top-40 right-[6%] opacity-60 scale-75" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <img src={icon} alt={name} className="w-20 h-20 rounded-3xl shadow-[0_12px_40px_rgba(26,24,20,0.18)]" />
          </motion.div>

          <SectionLabel>{label}</SectionLabel>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="text-[clamp(40px,6.5vw,72px)] leading-[0.95] tracking-[-0.5px] text-[#1a1814] mb-6 max-w-3xl mx-auto"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base md:text-lg text-[#5d574f] max-w-xl mx-auto mb-7 leading-relaxed"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="flex items-center justify-center gap-2 mb-9 flex-wrap"
          >
            <span className="px-4 py-1.5 rounded-full bg-white border border-black/[0.08] text-sm font-semibold text-[#1a1814]">
              {priceChip}
            </span>
            {trialNote && (
              <span className="px-4 py-1.5 rounded-full bg-primary/[0.07] border border-primary/[0.15] text-sm font-medium text-primary">
                {trialNote}
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
          >
            <a
              href={appxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill inline-flex items-center gap-2 px-7 h-11 text-[15px] font-semibold bg-[#1a1814] text-white rounded-full shadow-sm"
            >
              Get It on AppExchange <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-7 h-11 text-sm font-medium bg-white/70 border border-black/[0.10] text-[#1a1814] hover:bg-white rounded-full transition-colors"
            >
              Contact Sales
            </Link>
          </motion.div>

          {/* Screenshot viewer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className={`border rounded-[32px] p-4 md:p-8 ${frameClass}`}>
              {heroMockup ? (
                heroMockup
              ) : (
                <>
                  <img
                    src={allShots[activeShot].src}
                    alt={allShots[activeShot].caption}
                    className="w-full rounded-2xl border border-black/[0.07] bg-white shadow-[0_20px_60px_rgba(26,24,20,0.12)]"
                  />
                  <p className="text-sm text-[#5d574f] font-medium mt-4">{allShots[activeShot].caption}</p>
                </>
              )}
            </div>
            {!heroMockup && allShots.length > 1 && (
              <div className="flex justify-center gap-2 mt-5 flex-wrap">
                {allShots.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveShot(i)}
                    className={`px-4 h-9 rounded-full text-xs font-semibold transition-colors ${
                      activeShot === i
                        ? "bg-[#1a1814] text-white"
                        : "bg-white border border-black/[0.10] text-[#6b6460] hover:bg-black/[0.04]"
                    }`}
                  >
                    {s.caption.length > 30 ? `${s.caption.slice(0, 28)}…` : s.caption}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#1a1814] mb-4">
              Everything you need, nothing you don't
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="bg-[#faf8f4] border border-black/[0.06] rounded-3xl p-7 hover:border-black/[0.12] transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white border border-black/[0.07] flex items-center justify-center mb-5">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-medium text-xl text-[#1a1814] mb-2">{feature.title}</h3>
                <p className="text-[#6b6460] text-[15px] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-[#f5f1ea]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`border rounded-[32px] p-5 md:p-8 ${frameClass}`}
          >
            {screenshots[0] || heroScreenshot ? (
              <img
                src={(screenshots[0] ?? heroScreenshot)!.src}
                alt={(screenshots[0] ?? heroScreenshot)!.caption}
                className="w-full rounded-2xl border border-black/[0.07] bg-white shadow-sm"
              />
            ) : (
              heroMockup
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-black text-[#1a1814]">
              Why teams pick <span className={tint === "coral" ? "text-accent" : "text-primary"}>{name}</span>
            </h2>
            <ul className="space-y-3">
              {benefits.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#1a1814] text-base">
                  <div className="w-5 h-5 rounded-full bg-primary/[0.10] border border-primary/[0.20] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-primary" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING (optional) ── */}
      {pricingTiers && (
        <section className="py-24 bg-[#e8ecf8]">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <SectionLabel>Pricing</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-display font-black text-[#1a1814]">Simple plans for serious work</h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {pricingTiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  variants={fadeUp}
                  className={`rounded-[28px] p-7 ${
                    tier.featured
                      ? "bg-white border-2 border-primary shadow-[0_16px_50px_rgba(85,85,230,0.16)]"
                      : "bg-white/80 border border-black/[0.06]"
                  }`}
                >
                  <div className="font-display font-medium text-lg text-[#1a1814] mb-4">{tier.name}</div>
                  <div className="mb-1">
                    <span className="font-display font-black text-4xl text-[#1a1814]">{tier.price}</span>
                    {tier.unit && <span className="text-sm text-[#9a9490] ml-1">{tier.unit}</span>}
                  </div>
                  <p className="text-[#6b6460] text-[15px] leading-relaxed mb-6">{tier.desc}</p>
                  <a
                    href={appxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center px-5 h-10 leading-10 text-sm font-semibold rounded-full transition-colors ${
                      tier.featured
                        ? "bg-[#1a1814] text-white hover:bg-[#33302a]"
                        : "border border-black/[0.12] text-[#1a1814] hover:bg-black/[0.04]"
                    }`}
                  >
                    Get started
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ── CTA — sky bookend ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8ecf8] to-[#d8e2f5] py-24">
        <Cloud className="top-10 left-[6%] opacity-80" />
        <Cloud className="bottom-10 right-[8%] opacity-70 scale-75" />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#1a1814] mb-4">{ctaHeadline}</h2>
            <p className="text-[#5d574f] mb-9">
              Install from the AppExchange in minutes. {trialNote ? `${trialNote}.` : "No credit card required."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href={appxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-pill inline-flex items-center justify-center gap-2 px-7 h-11 text-[15px] font-semibold bg-[#1a1814] text-white rounded-full shadow-sm"
              >
                Get It on AppExchange <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 h-11 text-sm font-medium bg-white/70 border border-black/[0.10] text-[#1a1814] hover:bg-white rounded-full transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </LayoutV2>
  );
}
