import type { Metadata } from "next";
import { fontClassNames } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "App Template",
  description:
    "An opinionated template for building web applications, preconfigured with everything needs to start building an idea quickly",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontClassNames} antialiased`}>
      {children}
    </html>
  );
}
