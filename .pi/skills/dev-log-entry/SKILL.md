---
name: dev-log-entry
description: Add a dated entry to the public Astro dev log (src/pages/dev-log.astro) and the private notes/ai-interactions.md log, following this repo's conventions for entry shape, PDF attachments, base-path handling, and hand-written personal notes. Use when recording a work session or adding a dev log entry.
metadata:
  project: michaelkuhl10 (MIT 16.S893 portfolio site)
---

# Dev Log Entry

Adds a session entry to **both** logs this repo keeps, which are deliberately
different in kind:

| | `src/pages/dev-log.astro` | `notes/ai-interactions.md` |
|---|---|---|
| Visibility | Public, deployed | Private, gitignored |
| Content | Factual bullets: what was built | Unfiltered reasoning, what you kept vs. reverted |
| Author | **You**, by hand | You, unfiltered |

## The one rule that matters

The site states in its own body copy that the right-hand column is *"written by
me, not AI-generated."* The `aiSummary` field name means "summary of the
session," **not** "summary written by AI."

So: **never invent `personalNotes`.** The script requires that text as input and
will not fabricate it. If the user hasn't provided reflections, ask for them — or
insert the placeholder (`Add your own notes for this session here.`, as used by
the 2026-09-15 entry) for them to fill in later. Do not write prose in their
voice.

`aiSummary` bullets should be concrete and verifiable: what changed, which file,
which command, what the measured result was. No narrative, no adjectives, no em
dashes (the user has asked for this repeatedly).

## Usage

Write a JSON file describing the entry, then:

```bash
python3 .pi/skills/dev-log-entry/scripts/add_entry.py entry.json
```

Options: `--dry-run` to preview the generated block, `--skip-notes` to update
only the public log, `--skip-build` to skip verification.

### Input format

```json
{
  "date": "2026-09-22",
  "title": "Short factual title",
  "aiSummary": [
    "One concrete thing that was done.",
    "Another, with specifics: file paths, counts, measured numbers."
  ],
  "personalNotes": "First person, written by the user. Multi-line is fine.",
  "attachment": {
    "source": "~/Downloads/Some_Doc.pdf",
    "label": "Some Doc (PDF)"
  },
  "privateNotes": {
    "tool": "pi + Claude Sonnet",
    "asked": "what you requested",
    "result": "what it did",
    "kept": "what you kept vs. reverted",
    "learned": "anything about using the tool effectively"
  }
}
```

`attachment` and `privateNotes` are optional. If `attachment.source` is given,
the file is copied into `public/docs/` and the href is set to
`/docs/<filename>`; you can pass `href` directly instead if it's already there.

## What the script handles

- **Insertion point:** prepends into the `entries` array so newest is first.
- **String escaping:** `aiSummary` bullets are single-quoted JS strings, so
  apostrophes need escaping (real entries contain quoted prompt text with both
  `'` and `"`). `personalNotes` is a template literal, so backticks and `${`
  need escaping. Getting this wrong breaks the Astro build.
- **Attachments:** copies into `public/docs/` and emits the `{ href, label }`
  shape the template expects.
- **Base path:** the href must stay root-relative (`/docs/x.pdf`). The template
  passes it through `resolvePath()`, which prefixes `/michaelkuhl10` in
  production. Hardcoding the prefix produces a double path and a 404 on the
  deployed site.
- **Verification:** runs `npm run build` and reports failure.

## After running

```bash
npm run dev      # confirm the entry renders, both columns
```

Then commit. Note `notes/` is gitignored, so the private half is never
committed; that is intentional.

## Reference

[references/conventions.md](references/conventions.md) documents the entry
schema, the base-path trap, and the em-dash preference in more detail.
