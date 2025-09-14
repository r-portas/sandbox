import { listPosts } from "./lib/posts";
import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";

export default async function Home() {
  const posts = await listPosts();

  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

  const sorted = [...posts].sort(
    (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
  );

  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-3xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight text-foreground mb-4">
            Blog
          </h1>
          <p className="text-muted-foreground text-lg">
            Thoughts, stories and ideas
          </p>
        </div>

        <div className="space-y-3">
          {sorted.map((post) => (
            <article key={post.slug} className="group relative">
              <Link
                href={`/${post.slug}`}
                className="block rounded-2xl p-8 bg-card border border-border hover:border-accent transition-colors"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-card-foreground line-clamp-2">
                      {post.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <time
                        dateTime={post.lastModified.toISOString()}
                        className="tabular-nums"
                      >
                        {formatter.format(post.lastModified)}
                      </time>
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
