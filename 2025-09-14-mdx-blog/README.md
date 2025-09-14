# MDX Blog

Goal:
- Be able to use a consistent header for all blog posts
- Table of Contents plugin, e.g. to show the Table of Contents on the side
- co-located images with posts

## Choosing a library

### @next/mdx

`@next/mdx` is the official library, from doing some reading and exploration I've found:

Pros:
- Official Next.js library, integrates well with turbopack, etc.

Cons: 
- Doesn't support proper front matter parsing out of the box

### content collections

Relatively new library with some good DX ergonomics

Pros:
- Good DX

Cons:
- Has a few dependencies, like esbuild. I'd prefer not to introduce a second bundler into my app

### next-mdx-remote-client

The maintained version of next-mdx-remote, which works properly with app router, etc.

Pros:
- Supports front matter out of the box

Cons: 

## Approach

- Use `@next/mdx`, as its the official Next.js library
- Use a Layout component for the consistent header
  - The layout component should render the title and date
- Structure posts under the blog folder, like:
  ```
  /blog
    /my-first-post
      page.mdx
      image.png
    /my-second-post
      page.mdx
      image.png
  ```