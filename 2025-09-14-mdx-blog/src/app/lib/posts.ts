import { readFile, readdir, stat } from "fs/promises";
import { join } from "path";
import z from "zod";
import { getFrontmatter } from "next-mdx-remote-client/utils";

const CONTENT_DIR = "./posts";

const PostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  lastModified: z.date(),
  source: z.string().optional(),
});

export async function listPosts() {
  const slugs = (await readdir(CONTENT_DIR))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));

  return await Promise.all(slugs.map((slug) => getPostBySlug(slug, false)));
}

export async function getPostBySlug(
  slug: string,
  includeSource: boolean = true,
) {
  const filename = join(CONTENT_DIR, `${slug}.mdx`);
  const source = await getSource(filename);
  const lastModified = await getLastModified(filename);
  const { frontmatter, strippedSource } = getFrontmatter(source);

  if (includeSource) {
    return PostSchema.parse({
      ...frontmatter,
      lastModified,
      slug,
      source: strippedSource,
    });
  }

  return PostSchema.parse({
    ...frontmatter,
    lastModified,
    slug,
  });
}

// #region Helpers

async function getSource(filename: string) {
  return readFile(filename, "utf8");
}

async function getLastModified(filename: string): Promise<Date> {
  const { mtime } = await stat(filename);
  return mtime;
}

// #endregion
