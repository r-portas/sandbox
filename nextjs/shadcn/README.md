# shadcn

> Experiment with using [shadcn/ui](https://ui.shadcn.com/) with [Next.js](https://nextjs.org/).

## Why

Unlike conventional component libraries, `shadcn/ui` is a collection of components designed to be copied and pasted into your own codebase (vs imported from a NPM library like a conventional library).

Some of the standout features are:

- "Blocks" which are a collections of components for common pages (for example, login pages, dashboards, sidebars, etc.), in theory it lets you scaffold our applications really quickly.
- A lot more customization and flexibility of components (as they live inside the codebase)
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
