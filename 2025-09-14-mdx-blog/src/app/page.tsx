import { listPosts } from "./lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await listPosts();

  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" });

  const sorted = [...posts].sort(
    (a, b) => b.lastModified.getTime() - a.lastModified.getTime(),
  );

  return (
    <div>
      <main className="max-w-3xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent mb-4">
            Blog
          </h1>
          <p className="text-neutral-400 text-lg">
            Thoughts, stories and ideas
          </p>
        </div>

        <div className="space-y-3">
          {sorted.map((post, index) => (
            <article key={post.slug} className="group relative">
              <Link
                href={`/${post.slug}`}
                className="block rounded-2xl p-8 border border-neutral-800 hover:border-neutral-700"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-neutral-100 line-clamp-2">
                      {post.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2 text-sm text-neutral-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <time
                        dateTime={post.lastModified.toISOString()}
                        className="tabular-nums"
                      >
                        {formatter.format(post.lastModified)}
                      </time>
                    </div>
                  </div>
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg
                      className="w-5 h-5 text-neutral-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
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
