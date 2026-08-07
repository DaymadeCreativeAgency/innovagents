import { marked } from "marked";
import type { Plugin } from "vite";

/**
 * Compiles `.md` files to a module exporting `{ frontmatter, html, headings, words }`.
 *
 * The conversion happens at build time, so `marked` stays a devDependency and
 * never reaches the client bundle. Blog posts are authored as markdown in
 * `src/content/blog/`, and `src/lib/blog.ts` picks them up with import.meta.glob.
 */

export interface MarkdownFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  /** Path of the product page this post supports, for the in-post CTA. */
  product?: string;
  /** Topic cluster slug, used to surface sibling posts. */
  cluster?: string;
  /** Cluster pillar. Exactly one post per cluster should set this. */
  pillar?: boolean;
}

export interface MarkdownHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * Minimal YAML front matter reader: flat `key: value` pairs with optional
 * quoting, plus `true`/`false`. Blog front matter never needs more than that,
 * and a full YAML parser would be another dependency in the client's path.
 */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, body: raw };

  const data: Record<string, unknown> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value === "true" ? true : value === "false" ? false : value;
  }
  return { data, body: raw.slice(match[0].length) };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Adds stable ids to h2/h3 so posts can be deep-linked and so the pillar's
 * contents list has somewhere to point. Also returns the heading outline.
 */
function anchorHeadings(html: string): { html: string; headings: MarkdownHeading[] } {
  const headings: MarkdownHeading[] = [];
  const seen = new Set<string>();

  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_full, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugify(text);
    let n = 2;
    while (seen.has(id)) id = `${slugify(text)}-${n++}`;
    seen.add(id);
    headings.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  return { html: out, headings };
}

/**
 * Wraps tables in a horizontally scrollable container. The site sets
 * `overflow-x: hidden` on `html`, so a table wider than a phone viewport would
 * otherwise have its last column clipped with no way to reach it.
 */
function wrapTables(html: string): string {
  return html.replace(
    /<table>([\s\S]*?)<\/table>/g,
    '<div class="md-table-scroll"><table>$1</table></div>',
  );
}

export function markdownPlugin(): Plugin {
  return {
    name: "innovagents-markdown",
    enforce: "pre",
    transform(code, id) {
      if (!id.endsWith(".md")) return null;

      const { data, body } = parseFrontmatter(code);
      const parsed = marked.parse(body, { async: false }) as string;
      const { html: anchored, headings } = anchorHeadings(parsed);
      const html = wrapTables(anchored);
      const words = body.split(/\s+/).filter(Boolean).length;

      return {
        code: [
          `export const frontmatter = ${JSON.stringify(data)};`,
          `export const html = ${JSON.stringify(html)};`,
          `export const headings = ${JSON.stringify(headings)};`,
          `export const words = ${words};`,
        ].join("\n"),
        map: null,
      };
    },
  };
}
