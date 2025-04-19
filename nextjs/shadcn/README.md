# shadcn

> Experiment with using [shadcn/ui](https://ui.shadcn.com/) with [Next.js](https://nextjs.org/).

## Why

Unlike conventional component libraries, `shadcn/ui` is a collection of components designed to be copied and pasted into your own codebase (vs imported from a NPM library like a conventional library).

Some of the standout features are:

- "Blocks" which are a collections of components for common pages (for example, login pages, dashboards, sidebars, etc.), in theory it lets you scaffold our applications really quickly.
- A lot more customization and flexibility of components (as they live inside the codebase)
- Better support for
- A nice look and feel out of the box

In theory this allows for more customization and flexibility, but some of the things I want to explore are:

- Do all the components bloat the codebase?
- If a component is updated, how do you update it in your codebase?

## Getting Started

```bash
# Install dependencies
bun install

# Run the development server
bun dev
```

# Notes

## Setup

Configuring `shadcn/ui` is fairly easy, theres a single line command (`bunx --bun shadcn@latest init`) that sets it up, running the command will:

- Installs dependencies, which namely:
  - `class-variance-authority`: A utility for creating classes with variants
  - `clsx`: A utility for conditionally joining classNames together
  - `tailwind-merge`: A utility for merging Tailwind CSS classes
  - `lucide-react`: Icon library
  - `tw-animate-css`: A tailwind CSS plugin for animations
- Creates a [`components.json` configuration file](https://ui.shadcn.com/docs/components-json), which is used by the CLI
  - This defines a `baseColor` which is used to generate the default color palette, which _can't_ be changed after initialization, its not clear how this works though.
- Creates a `lib/utils.ts` file, which contains a `cn` function that merges class names together
  - It seems to just combine `clsx` and `tailwind-merge` together?

## Using Dark Mode as the default

- Open the `globals.css` file and delete the `:root` class, then rename the `.dark` class to `:root`, the custom variant at the top can be deleted too.
