"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const DynamicThemeToggleButton = dynamic(
  () => import("./theme-toggle-button"),
  {
    ssr: false,
    loading: () => (
      <Button
        variant="outline"
        size="icon"
        aria-label="Loading theme toggle"
        disabled
      >
        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
      </Button>
    ),
  }
);
export default function MainNav({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row items-center gap-2 p-2">
      <Button variant="ghost" asChild size="sm">
        <Link href="/" className="font-bold">
          shadcn/ui Portfolio
        </Link>
      </Button>
      <div className="grow" />
      {items.map((item) => (
        <Button key={item.href} variant="ghost" asChild size="sm">
          <Link
            href={item.href}
            className={cn(
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        </Button>
      ))}
      <DynamicThemeToggleButton />
    </nav>
  );
}
