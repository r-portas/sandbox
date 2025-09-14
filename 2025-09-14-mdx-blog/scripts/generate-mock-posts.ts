#!/usr/bin/env bun
/**
 * Minimal mock post generator.
 *
 * Only option: -n / --count <number>
 * Generates that many .mdx files in ./posts named mock-post-00001.mdx etc.
 * Frontmatter limited to fields required by current PostSchema: title, slug.
 */

import { mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const DEFAULT_COUNT = 1000;

function parseCount(argv: string[]): number {
  if (argv.length === 0) return DEFAULT_COUNT;
  let count = DEFAULT_COUNT;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "-n" || a === "--count") {
      count = parseInt(argv[++i] ?? "", 10);
    } else if (a === "-h" || a === "--help") {
      printHelp();
      process.exit(0);
    } else if (a.startsWith("-")) {
      throw new Error(`Unknown argument: ${a}`);
    }
  }
  if (!Number.isFinite(count) || count <= 0)
    throw new Error("--count must be > 0");
  return count;
}

function printHelp() {
  console.log(
    `Minimal mock post generator.\n\nUsage: bun scripts/generate-mock-posts.ts [-n N] [--count N]\n\nOptions:\n  -n, --count N   Number of files (default ${DEFAULT_COUNT})\n  -h, --help      Show this help\n`,
  );
}

const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
  "Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
  "Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
  "Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.",
  "Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim.",
];

function pad(n: number, width = 5) {
  return n.toString().padStart(width, "0");
}

async function ensureDir(dir: string) {
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

function buildContent(num: number) {
  const numStr = pad(num);
  const title = `Mock Post #${numStr}`;
  const baseBody = `# ${title}\n\n${LOREM[0]}\n\n## Subheading A\n\n${LOREM[1]}\n\n## Subheading B\n\n${LOREM[2]} ${LOREM[3]}\n\n### Details\n\n(${title.toLowerCase().replace(/[^a-z0-9# ]/g, "")}) ${LOREM[4]}\n`;
  return `---\ntitle: "${title}"\n---\n\n${baseBody}`;
}

async function main() {
  const count = parseCount(process.argv.slice(2));
  const start = Date.now();
  const dir = "posts";
  const ext = "mdx";
  await ensureDir(dir);
  let created = 0;
  let skipped = 0;
  let lastFile = "";
  for (let i = 1; i <= count; i++) {
    const numStr = pad(i);
    const slug = `mock-post-${numStr}`;
    const filename = join(dir, `${slug}.${ext}`);
    if (existsSync(filename)) {
      skipped++;
      continue;
    }
    const content = buildContent(i);
    await writeFile(filename, content, "utf8");
    created++;
    lastFile = filename;
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(2);
  console.log(
    `Done. Created=${created} Skipped=${skipped} Requested=${count} Elapsed=${elapsed}s`,
  );
  if (lastFile) {
    const { mtime } = await stat(lastFile);
    console.log(`Last file: ${lastFile} (mtime ${mtime.toISOString()})`);
  }
}

main().catch((err) => {
  console.error("[error]", err.message);
  process.exit(1);
});
