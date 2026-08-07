import type { MouseEvent } from "react";
import { Link, useLocation, useRoute } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { LayoutV2, Cloud } from "@/components/layout-v2";
import { usePageMeta } from "@/hooks/use-page-meta";
import { ProductCtas } from "@/components/cta";
import { PRODUCTS } from "@/lib/products";
import { BLOG_BASE, clusterPosts, formatPostDate, getPost } from "@/lib/blog";
import NotFound from "@/pages/not-found";

/* Global CSS uppercases every heading, which is unreadable at article length,
   so the prose container resets casing and re-applies the body font. */
const PROSE = [
  "prose prose-neutral max-w-none",
  "prose-headings:font-display prose-headings:normal-case prose-headings:text-[#1a1814]",
  "prose-h2:text-3xl prose-h2:font-black prose-h2:mt-14 prose-h2:mb-4",
  "prose-h3:text-xl prose-h3:font-medium prose-h3:mt-10 prose-h3:mb-3",
  "prose-p:text-[#4a453f] prose-p:leading-relaxed",
  "prose-li:text-[#4a453f] prose-li:leading-relaxed",
  "prose-strong:text-[#1a1814]",
  "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
  "prose-table:text-[15px] prose-th:text-[#1a1814] prose-td:text-[#4a453f]",
  "prose-code:text-[#1a1814] prose-code:bg-black/[0.05] prose-code:px-1.5 prose-code:py-0.5",
  "prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
  "prose-blockquote:border-l-primary prose-blockquote:text-[#5d574f]",
].join(" ");

export default function BlogPost() {
  const [, params] = useRoute(`${BLOG_BASE}/:slug`);
  const [, navigate] = useLocation();
  const post = params?.slug ? getPost(params.slug) : undefined;

  /* Post bodies are injected HTML, so their internal links are plain anchors
     that wouter never sees. Route them client side instead of reloading. */
  function onProseClick(event: MouseEvent<HTMLDivElement>) {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    const anchor = (event.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (!href || !href.startsWith("/") || anchor?.target === "_blank") return;
    event.preventDefault();
    navigate(href);
  }

  // Hooks must run unconditionally, so resolve meta before the missing-post exit.
  usePageMeta(post ? post.path : "/404");

  if (!post) return <NotFound />;

  const related = clusterPosts(post);
  const product = post.product
    ? Object.values(PRODUCTS).find((p) => p.path === post.product)
    : undefined;
  const showContents = post.pillar && post.headings.filter((h) => h.level === 2).length > 2;

  return (
    <LayoutV2>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#9ec2e8] via-[#c9def2] to-[#edf3fa] pt-32 sm:pt-36 pb-12 sm:pb-14">
        <Cloud className="top-24 left-[4%] opacity-80 hidden sm:block" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href={BLOG_BASE}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#3f4654] hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All guides
          </Link>

          <h1 className="ia-rise font-display font-black normal-case text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.5px] text-[#1a1814] mb-5">
            {post.title}
          </h1>

          <div className="ia-rise ia-delay-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-[#3f4654]">
            <span className="font-semibold text-[#1a1814]">{post.author.name}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          {post.updated && post.updated !== post.date && (
            <p className="ia-rise ia-delay-1 text-[13px] text-[#5d574f] mt-1">
              Updated <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
            </p>
          )}
        </div>
      </section>

      <article className="py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-lg text-[#5d574f] leading-relaxed mb-10 pb-10 border-b border-black/[0.08]">
            {post.description}
          </p>

          {showContents && (
            <nav
              aria-label="On this page"
              className="mb-12 bg-[#faf8f4] border border-black/[0.06] rounded-3xl p-7"
            >
              <h2 className="font-display font-medium text-lg text-[#1a1814] mb-3 normal-case">
                On this page
              </h2>
              <ol className="space-y-2 text-[15px]">
                {post.headings
                  .filter((h) => h.level === 2)
                  .map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-primary hover:underline">
                        {h.text}
                      </a>
                    </li>
                  ))}
              </ol>
            </nav>
          )}

          <div
            className={PROSE}
            onClick={onProseClick}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {product && (
            <aside className="mt-16 border border-primary/[0.16] bg-gradient-to-br from-primary/[0.08] to-primary/[0.03] rounded-[28px] p-8 text-center">
              <h2 className="font-display font-black normal-case text-2xl text-[#1a1814] mb-3">
                {product.name} handles this inside Salesforce
              </h2>
              <p className="text-[#5d574f] leading-relaxed mb-7 max-w-xl mx-auto">
                Native, installed from the AppExchange, and it respects the access model your
                org already runs on.
              </p>
              <div className="flex flex-col items-center gap-3">
                <ProductCtas product={product} page="blog" align="center" />
              </div>
            </aside>
          )}

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-black/[0.08]">
              <h2 className="font-display font-medium text-xl text-[#1a1814] mb-5 normal-case">
                More on this topic
              </h2>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={r.path}
                      className="group flex items-start justify-between gap-4 bg-[#faf8f4] border border-black/[0.06] rounded-2xl p-5 hover:border-black/[0.14] transition-colors"
                    >
                      <span>
                        <span className="block font-semibold text-[#1a1814] mb-1">{r.title}</span>
                        <span className="block text-[14px] text-[#6b6460] leading-relaxed">
                          {r.description}
                        </span>
                      </span>
                      <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </LayoutV2>
  );
}
