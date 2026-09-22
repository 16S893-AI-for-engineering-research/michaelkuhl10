# Dev Log Conventions

Extracted from `src/pages/dev-log.astro`, `notes/README.md`, and `README.md`.

## Two logs, different purposes

**Public** (`src/pages/dev-log.astro`): factual bullets, safe for an advisor or
grader. **Private** (`notes/ai-interactions.md`): unfiltered reasoning; `notes/`
is gitignored repo-wide, so it never deploys and never commits.

A fact moves from private to public only when you decide to promote it. That
filtering step is the whole point of the split.

## Entry schema

```js
{
  date: '2026-09-22',              // YYYY-MM-DD, single-quoted
  title: 'Short factual title',
  attachment: {                    // optional
    href: '/docs/File.pdf',        // root-relative, NO base path
    label: 'File (PDF)',
  },
  aiSummary: [                     // rendered as a bulleted list
    'Concrete statement.',
  ],
  personalNotes: `First person prose.`,   // template literal, \n preserved
}
```

Newest entry goes at the **top** of the `entries` array.

## `aiSummary` is not AI-written

The file's own comment is explicit:

> Written by me, not AI-generated, despite the label — "AI Summary" here means
> "summary of what was built," kept short and objective.

The page body repeats the claim for the right column: *"written by me, not
AI-generated."* Treat both as commitments. The script therefore refuses to
invent `personalNotes` and inserts the repo's existing placeholder
(`Add your own notes for this session here.`) when none is supplied.

Good bullets are specific and checkable:

- "Parsed the session's .jsonl file to count user-typed messages (4) and agent
  tool calls (141)."
- "Patched the extension's request-building code (dist/stream.js) to fetch tools
  via getCurrentTools."

Bad bullets are vague or evaluative: "Improved the site." "Made great progress
on the vision pipeline."

## The base-path trap

`src/lib/paths.ts` exports `resolvePath()`, which prefixes `/michaelkuhl10` in
production (GitHub Pages project site) and `/` in dev. The template already
wraps attachment hrefs:

```astro
<a href={resolvePath(entry.attachment.href)}>
```

So the stored href must be **root-relative and un-prefixed** (`/docs/File.pdf`).
Writing `/michaelkuhl10/docs/File.pdf` yields
`/michaelkuhl10/michaelkuhl10/docs/File.pdf` in production: a 404 that does not
reproduce locally, because dev mode resolves to `/`. The script rejects hrefs
containing the base path for this reason.

Attachments live in `public/docs/`; anything in `public/` is served verbatim.

## Escaping

Two different quoting styles in one object, each with its own hazard:

- `aiSummary` bullets are **single-quoted** strings. Apostrophes must be
  escaped. This bites often, since entries quote prompt text containing both
  `'` and `"` (see the 2026-09-16 entry).
- `personalNotes` is a **template literal**. Backticks and `${` must be escaped;
  literal newlines are fine and are preserved on the page via
  `whitespace-pre-line`.

The script handles both. A build failure right after insertion is almost always
an escaping problem: check `git diff src/pages/dev-log.astro`.

## Em dashes

The user has asked more than once to reduce em dashes (`—`) in generated
content. The script warns when it finds them in `title` or `aiSummary` but does
not block, since the existing file legitimately contains some.

## Verification

`npm run build` is the real check: a malformed entry is a syntax error in the
frontmatter script and fails the build rather than degrading gracefully. Then
`npm run dev` to confirm both columns render, since a valid-but-wrong entry
(e.g. a broken attachment path) still builds.
