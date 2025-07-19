import type { Metadata } from "next";
import "./globals.css";
import MainNav from "@/components/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "shadcn/ui portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
