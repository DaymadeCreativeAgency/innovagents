import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { LayoutV2, SectionLabel, Cloud } from "@/components/layout-v2";
import { usePageMeta } from "@/hooks/use-page-meta";

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

export interface ProductMockup {
  /* short tab label shown under the viewer */
  label: string;
  /* descriptive caption shown above the tabs */
  caption: string;
  node: React.ReactNode;
}

interface ProductPageProps {
  icon: string;
  name: string;
  label: string;
  headline: React.ReactNode;
  description: string;
  appxUrl: string;
  /* tint for screenshot frames: "indigo" | "coral" */
  tint?: "indigo" | "coral";
  /* preferred: hand-built JSX mockups (premium, on-brand) */
  mockups?: ProductMockup[];
  /* legacy: real screenshots or a single hand-built JSX mockup */
  heroScreenshot?: ProductScreenshot;
  heroMockup?: React.ReactNode;
  screenshots?: ProductScreenshot[];
  features: ProductFeature[];
  benefits: string[];
  ctaHeadline: string;
}

export function ProductPage({
  icon,
  name,
  label,
  headline,
  description,
  appxUrl,
  tint = "indigo",
  mockups,
  heroScreenshot,
  heroMockup,
  screenshots = [],
  features,
  benefits,
  ctaHeadline,
}: ProductPageProps) {
  const [activeShot, setActiveShot] = useState(0);
  const [location] = useLocation();

  usePageMeta({
    title: name,
    description,
    path: location,
  });

  const frameClass =
    tint === "indigo"
      ? "bg-gradient-to-br from-primary/[0.10] to-primary/[0.04] border-primary/[0.10]"
      : "bg-gradient-to-br from-accent/[0.14] to-accent/[0.05] border-accent/[0.14]";

  const allShots = heroScreenshot ? [heroScreenshot, ...screenshots] : screenshots;

  return (
    <LayoutV2>
      {/* ── HERO — sky gradient ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa] pt-32 sm:pt-36 pb-12 sm:pb-16">
        <Cloud className="top-24 left-[4%] opacity-80 hidden sm:block" />
        <Cloud className="top-40 right-[6%] opacity-60 scale-75 hidden sm:block" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <img src={icon} alt={name} className="w-20 h-20 rounded-3xl" />
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
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
              Contact us
            </Link>
          </motion.div>

          {/* Product viewer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {mockups && mockups.length > 0 ? (
              <>
                <div className={`border rounded-[24px] sm:rounded-[32px] p-3 sm:p-4 md:p-6 lg:p-10 min-w-0 overflow-x-auto ${frameClass}`}>
                  {mockups[Math.min(activeShot, mockups.length - 1)].node}
                </div>
                {mockups.length > 1 && (
                  <>
                    <p className="text-sm text-[#5d574f] font-medium mt-5">
                      {mockups[Math.min(activeShot, mockups.length - 1)].caption}
                    </p>
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                      {mockups.map((m, i) => (
                        <button
                          key={m.label}
                          onClick={() => setActiveShot(i)}
                          className={`px-4 h-9 rounded-full text-xs font-semibold transition-colors ${
                            activeShot === i
                              ? "bg-[#1a1814] text-white"
                              : "bg-white border border-black/[0.10] text-[#6b6460] hover:bg-black/[0.04]"
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
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
              </>
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
            {mockups && mockups.length > 0 ? (
              (mockups[mockups.length > 1 ? 1 : 0].node)
            ) : screenshots[0] || heroScreenshot ? (
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

      {/* ── CTA — sky bookend ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e8ecf8] to-[#d8e2f5] py-24">
        <Cloud className="top-10 left-[6%] opacity-80" />
        <Cloud className="bottom-10 right-[8%] opacity-70 scale-75" />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-display font-black text-[#1a1814] mb-4">{ctaHeadline}</h2>
            <p className="text-[#5d574f] mb-9">
              Install from the AppExchange in minutes. See current pricing and trial options on the listing.
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
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </LayoutV2>
  );
}
