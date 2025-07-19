"use client";
import Link from "next/link";
import { Moon, Sun, Monitor } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MainNav({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Switch to dark theme";
      case "dark":
        return "Switch to system theme";
      default:
        return "Switch to light theme";
    }
  };

  return (
    <nav className="flex flex-row items-center gap-1 p-2">
      <Link href="/" className="font-bold">
        shadcn/ui Portfolio
      </Link>
      <div className="grow" />
      {items.map((item) => (
        <Button key={item.href} variant="ghost" asChild size="sm">
          <Link
            href={item.href}
            className={cn(pathname === item.href && "font-bold")}
          >
            {item.label}
          </Link>
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        aria-label={getThemeLabel()}
        onClick={toggleTheme}
      >
        {getThemeIcon()}
      </Button>
    </nav>
  );
}
