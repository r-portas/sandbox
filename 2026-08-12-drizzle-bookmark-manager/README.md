# drizzle-bookmark-manager

A self-hosted app for saving links, organizing them into collections, tagging them, and jotting notes against them.
Built specifically as a Drizzle learning project to learn one-to-many, many-to-many, and nested relational queries.

## Core Features

- Save a bookmark (URL, title, optional description)
- Group bookmarks into collections (e.g. "Recipes", "Work reading")
- Tag bookmarks freely, independent of collection
- Attach freeform notes to a bookmark over time
- Browse/filter by collection or tag

## Data Model

- `collections` → `bookmarks` (one-to-many)
- `bookmarks` ↔ `tags` via `bookmarkTags` (many-to-many)
- `bookmarks` → `notes` (one-to-many)

## Getting Started

```bash
# Install dependencies
bun install

# Install the shadcn/ui skill
bunx --bun skills add shadcn/ui --global

# Copy the example env file and fill in any secrets
cp .env.local.example .env.local

# Start the development server
bun dev

# Update dependencies to the latest versions
bun run update
```

### Install Agent Browser

```bash
# Install the library globally
bun install -g agent-browser

# Download Chrome
agent-browser install

# Install the skill
bunx --bun skills add vercel-labs/agent-browser --global
```

### Update skills

```bash
bunx --bun skills update --global
```

## Environment variables

Environment variables can be configured in one of two files:

- `.env` for non-secret configuration, this is committed in git
- `.env.local` for secret configuration, this is gitignored. Copy `.env.local.example` to get started.

They are validated with Zod on startup:

- `src/lib/env.ts` — variables readable on the client, which must be prefixed with `VITE_`
- `src/lib/env.server.ts` — server-only variables
