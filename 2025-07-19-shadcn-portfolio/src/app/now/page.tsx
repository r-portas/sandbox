import { Gamepad2, Film, Tv, Star, Plus } from "lucide-react";
import React from "react";

interface TimelineItemBase {
  id: string;
  type: "media" | "project";
  date: string; // ISO string
}

interface MediaItem extends TimelineItemBase {
  type: "media";
  mediaType: "video-game" | "movie" | "tv-show";
  title: string;
  rating: number; // 1-5
}

interface ProjectItem extends TimelineItemBase {
  type: "project";
  projectName: string;
  projectDescription: string;
}

export type TimelineItem = MediaItem | ProjectItem;

const timelineItems: TimelineItem[] = [
  {
    id: "1",
    type: "media",
    mediaType: "video-game",
    title: "Elden Ring",
    rating: 5,
    date: "2025-07-18T20:00:00Z",
  },
  {
    id: "2",
    type: "media",
    mediaType: "movie",
    title: "Dune: Part Two",
    rating: 4,
    date: "2025-07-17T18:00:00Z",
  },
  {
    id: "3",
    type: "project",
    projectName: "shadcn-portfolio",
    projectDescription:
      "Building a modern portfolio with Next.js, Shadcn UI, and Tailwind.",
    date: "2025-07-16T15:00:00Z",
  },
  {
    id: "4",
    type: "media",
    mediaType: "tv-show",
    title: "Severance",
    rating: 5,
    date: "2025-07-15T21:00:00Z",
  },
];

const getMediaIcon = (mediaType: MediaItem["mediaType"]) => {
  switch (mediaType) {
    case "video-game":
      return (
        <Gamepad2 className="w-5 h-5 text-white" aria-label="Video Game" />
      );
    case "movie":
      return <Film className="w-5 h-5 text-white" aria-label="Movie" />;
    case "tv-show":
      return <Tv className="w-5 h-5 text-white" aria-label="TV Show" />;
    default:
      return null;
  }
};

const timeAgo = (iso: string) => {
  const now = new Date();
  const date = new Date(iso);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return date.toLocaleDateString();
};

export function NowTimeline() {
  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Now</h1>
      <ul className="flex flex-col gap-4">
        {timelineItems
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              {/* Icon */}
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 dark:bg-gray-900 mr-2">
                {item.type === "media" ? (
                  getMediaIcon(item.mediaType)
                ) : (
                  <Plus className="w-5 h-5 text-white" aria-label="Project" />
                )}
              </span>
              {/* Text */}
              <span className="ml-3 text-base flex flex-col sm:flex-row sm:items-center">
                {item.type === "media" ? (
                  <>
                    <span className="text-gray-200 dark:text-gray-300 mr-1">
                      playing
                    </span>
                    <span className="font-medium text-white dark:text-white mr-1">
                      {item.title}
                    </span>
                    <span className="flex items-center gap-1 mr-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (item as MediaItem).rating
                              ? "text-yellow-400"
                              : "text-gray-600 dark:text-gray-800"
                          }`}
                          aria-label={
                            i < (item as MediaItem).rating
                              ? "Filled star"
                              : "Empty star"
                          }
                          strokeWidth={i < (item as MediaItem).rating ? 2 : 1}
                          fill={
                            i < (item as MediaItem).rating ? "#facc15" : "none"
                          }
                        />
                      ))}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-gray-200 dark:text-gray-300 mr-1">
                      working on
                    </span>
                    <span className="font-medium text-white dark:text-white mr-1">
                      {(item as ProjectItem).projectName}
                    </span>
                  </>
                )}
                <span className="text-gray-400 dark:text-gray-500 ml-1">
                  {timeAgo(item.date)}
                </span>
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default NowTimeline;
