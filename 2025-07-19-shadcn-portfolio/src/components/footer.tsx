import { faker } from "@faker-js/faker";
import { Button } from "./ui/button";
import Link from "next/link";

interface Link {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface Copyright {
  text: string;
  license?: string;
}

const brandName: string = faker.company.name();
const logo = (
  <span className="text-2xl" aria-label="logo" role="img">
    🦄
  </span>
);

const socialLinks: Link[] = [
  {
    href: faker.internet.url(),
    label: faker.company.name(),
    icon: (
      <span role="img" aria-label="twitter">
        🐦
      </span>
    ),
  },
  {
    href: faker.internet.url(),
    label: faker.company.name(),
    icon: (
      <span role="img" aria-label="github">
        🐙
      </span>
    ),
  },
  {
    href: faker.internet.url(),
    label: faker.company.name(),
    icon: (
      <span role="img" aria-label="linkedin">
        💼
      </span>
    ),
  },
];

const legalLinks: Link[] = [
  {
    href: faker.internet.url(),
    label: faker.lorem.words(2),
  },
  {
    href: faker.internet.url(),
    label: faker.lorem.words(2),
  },
  {
    href: faker.internet.url(),
    label: faker.lorem.words(2),
  },
];

const copyright: Copyright = {
  text: `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`,
  license: faker.lorem.sentence(),
};

// Use real mainLinks from the app structure
const mainLinks: Link[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Footer() {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {logo}
            <span className="font-bold text-xl">{brandName}</span>
          </Link>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div>{copyright.text}</div>
            {copyright.license && <div>{copyright.license}</div>}
          </div>
        </div>
      </div>
    </footer>
  );
}
