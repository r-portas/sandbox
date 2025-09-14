import { readFile, readdir, stat } from "fs/promises";
import { join } from "path";
import z from "zod";
import { getFrontmatter } from "next-mdx-remote-client/utils";

/**
 * The directory where the MDX files are kept
 */
const CONTENT_DIR = "./posts";

/**
 * Defines the schema for a blog post.
 *
 * Using Zod allows for runtime validation of the post data
 */
const PostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  lastModified: z.date(),
  source: z.string().optional(),
});

/**
 * List all the posts
 *
 * This is primarily used to list all posts on the homepage
 */
export async function listPosts() {
  const slugs = (await readdir(CONTENT_DIR))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(".mdx", ""));

  return await Promise.all(slugs.map((slug) => getPostBySlug(slug, false)));
}

/**
 * Gets a post by its slug
 *
 * This is used to fetch the post on the post page
 */
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

/**
 * Reads the raw source of the MDX file
 */
async function getSource(filename: string) {
  return readFile(filename, "utf8");
}

/**
 * Gets the last modified date of a file based off the file's metadata
 */
async function getLastModified(filename: string): Promise<Date> {
  const { mtime } = await stat(filename);
  return mtime;
}

// #endregion
