---
title: Project A
summary: A comprehensive Markdown file used to exercise parsing/rendering of many Markdown features.
---

This file contains a wide variety of Markdown elements to test rendering and processing in the site.

## Table of Contents

- [Headings](#headings)
- [Text Formatting](#text-formatting)
- [Lists](#lists)
- [Code](#code)
- [Tables](#tables)
- [Links & References](#links--references)
- [Blockquotes & Admonitions](#blockquotes--admonitions)
- [Footnotes](#footnotes)
- [Math](#math)
- [HTML passthrough](#html-passthrough)
- [Metadata & Frontmatter](#metadata--frontmatter)

## Headings

### H3 Heading

#### H4 Heading

##### H5 Heading

###### H6 Heading

## Text Formatting

- Normal text with **bold**, _italic_, ~~strikethrough~~, and `inline code`.
- Emphasis nested: **bold and _italic_ inside**.
- Superscript: 10^2^ (renderers that support it will show superscript).
- Subscript: H~2~O (where supported).

## Lists

Unordered list:

- Item A
  - Nested A.1
  - Nested A.2
- Item B

Ordered list:

1. First
2. Second
   1. Second-A
   2. Second-B
3. Third

Task list (checkboxes):

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Code

Inline code example: `const x = 42;`

Block code (JavaScript):

```js
// Simple function
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

Block code (Python):

```py
def fib(n):
		a, b = 0, 1
		for _ in range(n):
				a, b = b, a + b
		return a

print(fib(10))
```

Inline code span with backticks: `Use`backticks`inside` ``

## Tables

Simple table:

| Name | Description   | Stars |
| ---- | ------------- | ----: |
| Repo | Example repo  |  1234 |
| Docs | Documentation |    98 |

Table with code and links:

| Language | Example             |
| -------- | ------------------- |
| JS       | `console.log("hi")` |
| Py       | `print("hi")`       |

## Links & References

- [External link — Deno](https://deno.land)
- [Internal link — Portfolio](/portfolio)

Reference-style link: [MDN][mdn]

[mdn]: https://developer.mozilla.org/ "MDN Web Docs"

## Blockquotes & Admonitions

> This is a nested blockquote.
>
> > It contains another quote inside it.

> **Note:** This is a callout-style note (renderers with admonition support may style it).

```admonition
title: Warning
type: warning
This is a warning-style admonition block for renderers that support it.
```

## Footnotes

Here is a statement that needs citation.[^1]

[^1]: This is the footnote text explaining the citation.

## Math

Inline math: $e^{i\\pi} + 1 = 0$.

Display math:

$$
\\nabla \\cdot \\mathbf{E} = \\frac{\\rho}{\\varepsilon_0}
$$

## HTML passthrough

You can include raw HTML for fine-grained control:

<details>
	<summary>Click to expand</summary>
	<p>This content is inside a native HTML details element.</p>
</details>

## Accessibility & ARIA example

<div role="region" aria-label="Example region">
	<button aria-pressed="false">Toggle</button>
</div>

## Metadata & Frontmatter

This document begins with YAML frontmatter including `title`, `summary`, `tags`, and `date`.

---

Generated with ❤️ for testing.
