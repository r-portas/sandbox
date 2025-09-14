import { notFound } from "next/navigation";
import { MDXRemote, type MDXComponents } from "next-mdx-remote-client/rsc";
import rehypeShiki from "@shikijs/rehype";
import { getPostBySlug, listPosts } from "../lib/posts";
import Link from "next/link";
import { ChevronLeft, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return await listPosts();
}

const mdxComponents: MDXComponents = {};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);
    const formatter = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
    });

    return (
      <div className="bg-background min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <nav className="py-8 px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to blog
            </Link>
          </nav>

          {/* Header Section */}
          <header className="px-6 pb-12 border-b border-border">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
                {post.title}
              </h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <time
                  dateTime={post.lastModified.toISOString()}
                  className="text-sm"
                >
                  {formatter.format(post.lastModified)}
                </time>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="px-6 py-12">
            <article className="prose prose-lg prose-invert max-w-3xl mx-auto">
              {post.source && (
                <MDXRemote
                  source={post.source}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [[rehypeShiki, { theme: "ayu-dark" }]],
                    },
                  }}
                />
              )}
            </article>
          </main>
        </div>
      </div>
    );
  } catch {
    return notFound();
  }
}
