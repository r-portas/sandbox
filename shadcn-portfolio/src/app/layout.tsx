import type { Metadata } from "next";
import "./globals.css";
import MainNav from "@/components/main-nav";

export const metadata: Metadata = {
  title: "shadcn/ui portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainNav
          items={[
            {
              label: "Home",
              href: "/",
            },
            {
              label: "About",
              href: "/about",
            },
          ]}
        />
        {children}
      </body>
    </html>
  );
}
