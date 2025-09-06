import type { ReactNode } from "react";
import { Home, Star, Notebook } from "lucide-react";
import { Sidebar, type Item } from "./ui/sidebar";

// Menu items.
const items: Item[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Star,
  },
  {
    label: "Resume",
    href: "/resume",
    icon: Notebook,
  },
];

/**
 * The main application shell, which handles the sidebar and main content area
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidebar items={items} className="shrink-0" />
      {children}
    </div>
  );
}
