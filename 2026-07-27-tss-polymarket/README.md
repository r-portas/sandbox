# tss-polymarket

An example app using Polymarket APIs to explore writing TanStack Start applications with Claude

## Getting Started

```bash
# Install dependencies
bun install

# Start the development server
bun dev

# Update dependencies to the latest versions
bun run update
```

## Adding components

Add shadcn/ui components with the CLI:

```bash
bunx --bun shadcn@latest add <component>
```

## AI assistant skill

Install the [shadcn/ui skill](https://ui.shadcn.com/docs/skills) to give AI assistants like Claude Code project-aware context about this template's shadcn/ui setup:

```bash
bunx --bun skills add shadcn/ui
```

Once installed, the assistant reads this project's `components.json` to find, install, compose, and customize components using the correct APIs and patterns.
