import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { LayoutV2, SectionLabel, Cloud } from "@/components/layout-v2";
import { usePageMeta } from "@/hooks/use-page-meta";
import { BLOG_BASE, POSTS, formatPostDate } from "@/lib/blog";

export default function BlogIndex() {
  usePageMeta(BLOG_BASE);

  return (
    <LayoutV2>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa] pt-32 sm:pt-40 pb-14 sm:pb-20">
        <Cloud className="top-24 left-[5%] opacity-80 hidden sm:block" />
        <Cloud className="top-36 right-[8%] opacity-60 scale-75 hidden sm:block" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <SectionLabel>Guides</SectionLabel>
          <h1 className="ia-rise text-[clamp(2.25rem,7vw,4.5rem)] leading-[0.95] tracking-[-0.5px] text-[#1a1814] mb-5 sm:mb-6">
            Where Salesforce<br /><span className="text-primary">stops short</span>
          </h1>
          <p className="ia-rise ia-delay-1 text-base md:text-lg text-[#5d574f] leading-relaxed max-w-2xl mx-auto">
            Guides to the platform limits admins actually run into, what the documented
            workarounds cost, and when a native app is the cheaper answer.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {POSTS.length === 0 ? (
            <p className="text-[#6b6460] text-center">No posts yet.</p>
          ) : (
            <ul className="space-y-4">
              {POSTS.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={post.path}
                    className="group block bg-[#faf8f4] border border-black/[0.06] rounded-3xl p-7 hover:border-black/[0.14] transition-colors"
                  >
                    <div className="flex items-center gap-3 text-[13px] text-[#6b6460] mb-3">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span aria-hidden>·</span>
                      <span>{post.readingMinutes} min read</span>
                      {post.pillar && (
                        <>
                          <span aria-hidden>·</span>
                          <span className="font-semibold text-primary">Complete guide</span>
                        </>
                      )}
                    </div>
                    <h2 className="font-display font-medium text-2xl text-[#1a1814] mb-2 normal-case">
                      {post.title}
                    </h2>
                    <p className="text-[#6b6460] text-[15px] leading-relaxed mb-4">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">
                      Read it
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </LayoutV2>
  );
}
