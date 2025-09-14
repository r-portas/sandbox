# MDX Blog

> Goal: Identify a good approach for managing blog posts in a Next.js app

## Requirements
- Minimal dependencies and setup
- Should have good performance
- Support for YAML front matter
- Support for images in posts
- Support for search

## Approach

I chose `next-mdx-remote-client` as it supports front matter out of the box, and has minimal dependencies. See [Choosing a library](#choosing-a-library) in the appendix for more details of why I didn't choose the other options.

The key logic is contained in the following files:

- [`src/app/page.tsx`](./src/app/page.tsx): The homepage that lists all blog posts.
- [`src/app/[slug]/page.tsx`](./src/app/[slug]/page.tsx): The individual blog post page that renders the MDX content.
- [`src/app/lib/posts.ts`](./src/app/lib/posts.ts): Contains functions to read and parse MDX files, extract front matter, and validate it using Zod.

## Appendix

### Choosing a library

#### @next/mdx

`@next/mdx` is the official library, from doing some reading and exploration I've found:

Pros:
- Official Next.js library, integrates well with turbopack, etc.

Cons: 
- Doesn't support proper front matter parsing out of the box

#### content collections

Relatively new library with some good DX ergonomics

Pros:
- Good DX

Cons:
- Has a few dependencies, like esbuild. I'd prefer not to introduce a second bundler into my app

#### next-mdx-remote-client

The maintained version of next-mdx-remote, which works properly with app router, etc.

Pros:
- Supports front matter out of the box

Cons: 
- A bit more work to setup