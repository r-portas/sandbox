import { $ } from "bun";
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z } from "zod";

async function getLastModified(filePath: string) {
  const text = await $`git log -1 --format=%ai -- ${filePath}`.text();
  if (text) {
    return new Date(text.trim()).toISOString();
  }

  return new Date().toISOString();
}

const projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
  }),
  transform: async (doc, context) => ({
    ...doc,
    slug: doc.title.toLowerCase().replace(/ /g, "-"),
    lastModified: await context.cache(doc._meta.filePath, async (filePath) =>
      getLastModified(filePath),
    ),
    html: await compileMarkdown(context, doc),
  }),
});

export default defineConfig({
  collections: [projects],
});
