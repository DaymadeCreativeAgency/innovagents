import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { LayoutV2, Cloud, SectionLabel } from "@/components/layout-v2";
import { usePageMeta } from "@/hooks/use-page-meta";
import { PAGE_DESCRIPTIONS } from "@/lib/seo";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found",
    description: PAGE_DESCRIPTIONS.notFound,
    path: "/404",
    noIndex: true,
  });

  return (
    <LayoutV2>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#dbe4f7] via-[#edeef5] to-white pt-44 pb-32 min-h-[70vh]">
        <Cloud className="top-28 left-[8%] opacity-80" />
        <Cloud className="top-44 right-[10%] opacity-60 scale-75" />
        <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
          <SectionLabel>404</SectionLabel>
          <h1 className="text-[clamp(44px,7vw,80px)] leading-[0.95] text-[#1a1814] mb-6">
            This page<br /><span className="text-primary">drifted away</span>
          </h1>
          <p className="text-[#5d574f] mb-10">
            The page you're looking for doesn't exist or has moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 h-11 text-sm font-semibold bg-[#1a1814] text-white rounded-full hover:bg-[#33302a] transition-colors shadow-sm"
          >
            Back to Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </LayoutV2>
  );
}
