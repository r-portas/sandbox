# Notes

My notes captured as a built the website.

## Getting Started

Adding shadcn/ui is pretty easy, just run the following:

```bash
bunx --bun shadcn@latest init
```

Once ran, the CLI will ask a few questions.
One notable question is which colour to use as the base colour, it provides a couple options, like Neutral, Gray, Zinc, etc.
Its not clear to me what those colours are or what it is used for.

My guess is the colours match to the[colours page of the docs](https://ui.shadcn.com/colors), I chose `Zinc` for now.

Given I intend to use tweakcn to generate the colour scheme, I suspect it doesn't matter which one I pick.

The CLI did a couple things:

- Added a couple dependencies, namely:
  - `class-variance-authority`
  - `clsx`
  - `tailwind-merge`
  - `lucide-react`
  - `tw-animate-css`
- Created a `components.json` file, which looks to contain the configuration for shadcn/ui, like what icon library to use, where to store the components, etc.
- Created a `src/lib/utils.ts` file with a `cn` helper method, which is a wrapper around `clsx` and `tailwind-merge`.

## Adding a sample component

```bash
bunx --bun shadcn@latest add button
```

Then import the component from `@/components/ui/button`.

## Building the main navigation component

shadcn/ui doesn't have a nav component, so this is a good opportunity to see what building a custom component looks like.
For reference I looked at the [`main-nav.tsx` component in the shadcn/ui repo](https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/main-nav.tsx).
See [`main-nav.tsx`](src/components/main-nav.tsx) for the code.

## Configuring a font
