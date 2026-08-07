import type { MarkdownFrontmatter, MarkdownHeading } from "../../vite-plugin-markdown";

/**
 * Blog post registry, built from the markdown files in `src/content/blog/`.
 *
 * Adding a post is one step: drop a `.md` file in that directory with front
 * matter. Everything downstream (routes, sitemap, llms.txt, JSON-LD, the
 * prerenderer) reads from here, so nothing else needs editing.
 *
 * Deliberately free of imports from `seo.ts` so the dependency runs one way:
 * seo.ts -> blog.ts.
 */

export const BLOG_BASE = "/blog";

/** Words per minute used for the reading estimate. */
const READING_SPEED = 225;

export interface Author {
  /** Front matter `author` value maps to this key. */
  id: string;
  name: string;
  /**
   * Role line shown under the byline and emitted as Person.jobTitle. Left unset
   * until real credentials are supplied, since an invented title is worse than
   * no title: it is the part of an author box a reader can check.
   */
  title?: string;
  /** Profile URL used as the author's sameAs entry, if there is one. */
  url?: string;
  /** True when the byline is the company rather than a person. */
  organization?: boolean;
}

/**
 * A named human author is the strongest E-E-A-T signal a blog carries. Posts
 * alternate between the two below; `author` in front matter picks one.
 */
export const AUTHORS: Record<string, Author> = {
  andre: {
    id: "andre",
    name: "Andre Fernandes",
  },
  pedro: {
    id: "pedro",
    name: "Pedro Gaspar",
  },
  innovagents: {
    id: "innovagents",
    name: "InnovAgents",
    title: "Salesforce-native app builders",
    organization: true,
  },
};

export const DEFAULT_AUTHOR = "innovagents";

export interface BlogPost {
  slug: string;
  path: string;
  title: string;
  description: string;
  /** ISO date, e.g. 2026-08-07. */
  date: string;
  updated?: string;
  html: string;
  headings: MarkdownHeading[];
  words: number;
  readingMinutes: number;
  author: Author;
  /** Product page this post supports. */
  product?: string;
  cluster?: string;
  pillar: boolean;
}

interface MarkdownModule {
  frontmatter: MarkdownFrontmatter & { author?: string };
  html: string;
  headings: MarkdownHeading[];
  words: number;
}

const modules = import.meta.glob<MarkdownModule>("../content/blog/*.md", { eager: true });

function toPost(filePath: string, mod: MarkdownModule): BlogPost {
  const slug = filePath.split("/").pop()!.replace(/\.md$/, "");
  const fm = mod.frontmatter;

  if (!fm.title || !fm.description || !fm.date) {
    throw new Error(
      `Blog post ${filePath} is missing required front matter (title, description, date).`,
    );
  }

  return {
    slug,
    path: `${BLOG_BASE}/${slug}`,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updated: fm.updated,
    html: mod.html,
    headings: mod.headings,
    words: mod.words,
    readingMinutes: Math.max(1, Math.round(mod.words / READING_SPEED)),
    author: AUTHORS[fm.author ?? DEFAULT_AUTHOR] ?? AUTHORS[DEFAULT_AUTHOR],
    product: fm.product,
    cluster: fm.cluster,
    pillar: fm.pillar === true,
  };
}

/** Newest first. */
export const POSTS: BlogPost[] = Object.entries(modules)
  .map(([filePath, mod]) => toPost(filePath, mod))
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

export const POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  POSTS.map((p) => [p.slug, p]),
);

export function getPost(slug: string): BlogPost | undefined {
  return POSTS_BY_SLUG[slug];
}

/** Sibling posts in the same cluster, pillar first. */
export function clusterPosts(post: BlogPost): BlogPost[] {
  if (!post.cluster) return [];
  return POSTS.filter((p) => p.cluster === post.cluster && p.slug !== post.slug).sort(
    (a, b) => Number(b.pillar) - Number(a.pillar),
  );
}

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
