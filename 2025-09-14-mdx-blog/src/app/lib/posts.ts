import { readFile, readdir, stat } from "fs/promises";
import { basename, extname, join } from "path";
import z from "zod";
import { getFrontmatter } from "next-mdx-remote-client/utils";

const CONTENT_DIR = "./posts";

const PostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  lastModified: z.date(),
});

export async function listPosts() {
  const posts = (await readdir(CONTENT_DIR))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => join(CONTENT_DIR, file));

  return Promise.all(
    posts.map(async (post) => {
      const source = await getSource(post);
      const lastModified = await getLastModified(post);
      const { frontmatter } = getFrontmatter(source);
      return PostSchema.parse({
        ...frontmatter,
        lastModified,
        // The filename, without extension
        slug: basename(post, extname(post)),
      });
    }),
  );
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
