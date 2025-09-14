import { AppShell } from "@/components/app-shell";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className="bg-background text-foreground">
      <AppShell>{children}</AppShell>
    </body>
  );
}
