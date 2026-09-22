#!/usr/bin/env python3
"""Add a dated entry to the public Astro dev log and the private notes log.

Handles the fussy parts: JS string escaping for the two different quoting
styles used by the template, attachment copying into public/docs/, root-relative
hrefs for the base-path helper, and newest-first insertion.

Deliberately does NOT generate personalNotes. The site claims that column is
written by the author; see SKILL.md.

Usage:
    python3 .pi/skills/dev-log-entry/scripts/add_entry.py entry.json
    python3 .pi/skills/dev-log-entry/scripts/add_entry.py entry.json --dry-run
"""

import argparse
import json
import re
import shutil
import subprocess
import sys
from datetime import date
from pathlib import Path

# repo root = .pi/skills/dev-log-entry/scripts/ -> up 4
REPO = Path(__file__).resolve().parents[4]
DEV_LOG = REPO / "src" / "pages" / "dev-log.astro"
NOTES = REPO / "notes" / "ai-interactions.md"
DOCS_DIR = REPO / "public" / "docs"

PLACEHOLDER_NOTES = "Add your own notes for this session here."


def fail(msg):
    sys.exit(f"error: {msg}")


def esc_single(s):
    """Escape for a single-quoted JS string literal.

    Real entries embed quoted prompt text containing both ' and ", so this has
    to be right or the Astro build breaks.
    """
    return s.replace("\\", "\\\\").replace("'", "\\'")


def esc_template(s):
    """Escape for a JS template literal: backslashes, backticks, and ${."""
    return s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")


def validate(entry):
    for field in ("date", "title", "aiSummary"):
        if not entry.get(field):
            fail(f"entry is missing required field '{field}'")

    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", entry["date"]):
        fail(f"date must be YYYY-MM-DD, got '{entry['date']}'")

    if not isinstance(entry["aiSummary"], list) or not all(
        isinstance(b, str) and b.strip() for b in entry["aiSummary"]
    ):
        fail("aiSummary must be a non-empty list of non-empty strings")

    notes = entry.get("personalNotes")
    if notes is None or not str(notes).strip():
        print(
            "warning: no personalNotes provided. Inserting the repo's placeholder.\n"
            "         That column is meant to be written by you, not generated.",
            file=sys.stderr,
        )
        entry["personalNotes"] = PLACEHOLDER_NOTES

    # Nudge, not a hard failure: the user has repeatedly asked for no em dashes.
    em_dash_fields = [
        b for b in entry["aiSummary"] if "\u2014" in b
    ] + ([entry["title"]] if "\u2014" in entry["title"] else [])
    if em_dash_fields:
        print(
            f"warning: {len(em_dash_fields)} field(s) contain an em dash. "
            "Consider rewording.",
            file=sys.stderr,
        )
    return entry


def handle_attachment(att):
    """Copy the file into public/docs/ if needed; return the {href, label} dict."""
    if not att:
        return None
    label = att.get("label")
    if not label:
        fail("attachment requires a 'label'")

    href = att.get("href")
    if href:
        if not href.startswith("/"):
            fail(f"attachment href must be root-relative (start with '/'), got '{href}'")
        if href.startswith("/michaelkuhl10"):
            fail(
                "attachment href must NOT include the base path. The template applies "
                "resolvePath(); hardcoding '/michaelkuhl10' yields a doubled path in production."
            )
        target = REPO / "public" / href.lstrip("/")
        if not target.exists():
            print(f"warning: {target} does not exist yet", file=sys.stderr)
        return {"href": href, "label": label}

    source = att.get("source")
    if not source:
        fail("attachment requires either 'href' or 'source'")
    src = Path(source).expanduser()
    if not src.exists():
        fail(f"attachment source not found: {src}")

    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    dest = DOCS_DIR / src.name
    if dest.resolve() != src.resolve():
        shutil.copy2(src, dest)
        print(f"copied attachment -> public/docs/{src.name}")
    return {"href": f"/docs/{src.name}", "label": label}


def render_block(entry, attachment):
    """Build the JS object literal, matching existing indentation exactly."""
    lines = ["  {"]
    lines.append(f"    date: '{esc_single(entry['date'])}',")
    lines.append(f"    title: '{esc_single(entry['title'])}',")

    if attachment:
        lines.append("    attachment: {")
        lines.append(f"      href: '{esc_single(attachment['href'])}',")
        lines.append(f"      label: '{esc_single(attachment['label'])}',")
        lines.append("    },")

    lines.append("    aiSummary: [")
    for bullet in entry["aiSummary"]:
        lines.append(f"      '{esc_single(bullet)}',")
    lines.append("    ],")

    lines.append(f"    personalNotes: `{esc_template(str(entry['personalNotes']))}`,")
    lines.append("  },")
    return "\n".join(lines)


def insert_entry(block, entry_date):
    if not DEV_LOG.exists():
        fail(f"{DEV_LOG} not found")
    content = DEV_LOG.read_text()

    marker = "const entries = ["
    idx = content.find(marker)
    if idx == -1:
        fail(f"could not find '{marker}' in {DEV_LOG.name}; the file structure changed")

    # Warn on a duplicate date rather than silently adding a second entry.
    if re.search(rf"date: '{re.escape(entry_date)}'", content):
        print(f"warning: an entry dated {entry_date} already exists", file=sys.stderr)

    insert_at = idx + len(marker)
    updated = content[:insert_at] + "\n" + block + content[insert_at:]
    DEV_LOG.write_text(updated)
    print(f"inserted entry into {DEV_LOG.relative_to(REPO)} (newest first)")


def append_private_notes(entry):
    """Append to the gitignored private log, in that file's suggested format."""
    pn = entry.get("privateNotes")
    if not pn:
        return
    if not NOTES.exists():
        print(f"warning: {NOTES} not found, skipping private notes", file=sys.stderr)
        return

    parts = [f"\n## {entry['date']} - {entry['title']}\n"]
    for key, heading in (
        ("tool", "Tool"),
        ("asked", "What I asked for"),
        ("result", "What it did"),
        ("kept", "Kept vs. reverted"),
        ("learned", "Learned"),
    ):
        if pn.get(key):
            parts.append(f"**{heading}:** {pn[key]}\n")

    with NOTES.open("a") as f:
        f.write("\n".join(parts))
    print(f"appended to {NOTES.relative_to(REPO)} (private, gitignored)")


def verify_build():
    print("\nrunning npm run build ...")
    result = subprocess.run(
        ["npm", "run", "build"], cwd=REPO, capture_output=True, text=True
    )
    if result.returncode != 0:
        tail = (result.stdout + result.stderr).strip().splitlines()[-25:]
        print("\n".join(tail), file=sys.stderr)
        fail(
            "build FAILED. The entry was inserted but breaks the site.\n"
            "Most likely an escaping issue in aiSummary or personalNotes; "
            "check git diff on src/pages/dev-log.astro."
        )
    print("build OK")


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("entry", help="JSON file describing the entry")
    ap.add_argument("--dry-run", action="store_true", help="print the block, change nothing")
    ap.add_argument("--skip-notes", action="store_true", help="only update the public log")
    ap.add_argument("--skip-build", action="store_true", help="skip build verification")
    args = ap.parse_args()

    entry = json.loads(Path(args.entry).read_text())
    entry.setdefault("date", date.today().isoformat())
    entry = validate(entry)

    if args.dry_run:
        att = entry.get("attachment")
        # Don't copy files during a dry run; synthesize the href for preview.
        if att and not att.get("href") and att.get("source"):
            att = {"href": f"/docs/{Path(att['source']).name}", "label": att["label"]}
        print(render_block(entry, att))
        print("\n(dry run: no files modified)")
        return

    attachment = handle_attachment(entry.get("attachment"))
    insert_entry(render_block(entry, attachment), entry["date"])

    if not args.skip_notes:
        append_private_notes(entry)
    if not args.skip_build:
        verify_build()

    print("\nnext: npm run dev, confirm both columns render, then commit.")


if __name__ == "__main__":
    main()
