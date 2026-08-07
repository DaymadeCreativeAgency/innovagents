/** Shape produced by `vite-plugin-markdown.ts` for every `.md` import. */
declare module "*.md" {
  import type { MarkdownFrontmatter, MarkdownHeading } from "../vite-plugin-markdown";

  export const frontmatter: MarkdownFrontmatter;
  export const html: string;
  export const headings: MarkdownHeading[];
  export const words: number;
}
