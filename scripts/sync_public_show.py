#!/usr/bin/env python3
"""Copy each project repo's public_show/ folder into this website.

Sources are listed in scripts/show_sources.json. For each source:

    <repo>/public_show/<files>     -> public/show/<site_folder>/<files>
    <repo>/public_show/manifest.json -> src/data/show/<site_folder>.json

Pages read the manifests through src/lib/show.ts, so a caption changed in
the source repo shows on the site after the next sync.

Usage (from the website repo root):
    python3 scripts/sync_public_show.py            # dry run: print what would change
    python3 scripts/sync_public_show.py --apply    # copy, then check
    python3 scripts/sync_public_show.py --check    # only check the copied files

The script never touches a source repo. It refuses blocked file types and
large files (same rules as tools/public_show.py in the source repos), and it
deletes files in public/show/<site_folder>/ that are gone from the source.
After --apply: review `git status`, run `npm run build`, then commit.
Stdlib only.
"""
import argparse
import filecmp
import json
import re
import shutil
import sys
from pathlib import Path

SITE = Path(__file__).resolve().parents[1]
SOURCES = SITE / "scripts" / "show_sources.json"
PUBLIC = SITE / "public" / "show"
DATA = SITE / "src" / "data" / "show"
MAX_MB = 40
ALLOWED_EXT = {".png", ".jpg", ".jpeg", ".svg", ".gif", ".webp", ".mp4", ".webm", ".pdf", ".html", ".md"}
BLOCKED = [r"(^|/)literature/", r"Literature Review", r"Pulled Articles", r"source-pdfs",
           r"(^|/)\.", r"~\$"]


def load_sources():
    cfg = json.loads(SOURCES.read_text(encoding="utf-8"))
    out = []
    for s in cfg["sources"]:
        path = Path(s["path"]).expanduser()
        out.append({**s, "path": path})
    return out


def plan(src):
    """Return (copies, deletes, problems) for one source."""
    show = src["path"] / "public_show"
    dest = PUBLIC / src["site_folder"]
    copies, deletes, problems = [], [], []
    if not (show / "manifest.json").is_file():
        return copies, deletes, [f"{src['name']}: no public_show/manifest.json at {show}"]
    manifest = json.loads((show / "manifest.json").read_text(encoding="utf-8"))
    wanted = set()
    for item in manifest.get("items", []):
        for key in ("file", "poster"):
            rel = item.get(key)
            if not rel:
                continue
            f = show / rel
            if not f.is_file():
                problems.append(f"{src['name']}: {rel} is in manifest.json but missing")
                continue
            if f.suffix.lower() not in ALLOWED_EXT:
                problems.append(f"{src['name']}: {rel}: file type {f.suffix} not allowed")
                continue
            if any(re.search(p, rel) for p in BLOCKED):
                problems.append(f"{src['name']}: {rel}: blocked path")
                continue
            if f.stat().st_size > MAX_MB * 1e6:
                problems.append(f"{src['name']}: {rel}: larger than {MAX_MB} MB")
                continue
            wanted.add(rel)
            target = dest / rel
            if not target.exists() or not filecmp.cmp(f, target, shallow=False):
                copies.append((f, target))
    if dest.exists():
        for t in dest.rglob("*"):
            if t.is_file() and str(t.relative_to(dest)) not in wanted:
                deletes.append(t)
    data_target = DATA / f"{src['site_folder']}.json"
    new_data = json.dumps(site_manifest(src, manifest), indent=2, ensure_ascii=False) + "\n"
    if not data_target.exists() or data_target.read_text(encoding="utf-8") != new_data:
        copies.append((new_data, data_target))
    return copies, deletes, problems


def site_manifest(src, manifest):
    """Manifest as the site sees it: file paths become site URLs, text is inlined."""
    show = src["path"] / "public_show"
    base = f"/show/{src['site_folder']}/"
    items = []
    for item in manifest.get("items", []):
        it = {k: v for k, v in item.items() if k not in ("source", "updated")}
        it["url"] = base + item["file"]
        if item.get("poster"):
            it["poster_url"] = base + item["poster"]
        if item.get("kind") == "text" and (show / item["file"]).is_file():
            it["body"] = (show / item["file"]).read_text(encoding="utf-8")
        it["updated"] = item.get("updated", "")
        items.append(it)
    return {"name": src["name"], "site_folder": src["site_folder"],
            "repo_url": src.get("repo_url", ""), "public": src.get("public", False),
            "about": manifest.get("about", ""), "items": items}


def check():
    errs = []
    for f in sorted(DATA.glob("*.json")):
        m = json.loads(f.read_text(encoding="utf-8"))
        for it in m["items"]:
            for key in ("url", "poster_url"):
                if it.get(key) and not (SITE / "public" / it[key].lstrip("/")).is_file():
                    errs.append(f"{f.name}: {it['id']}: missing {it[key]}")
    return errs


def main(argv=None):
    ap = argparse.ArgumentParser(description="Copy public_show/ folders into the website.")
    ap.add_argument("--apply", action="store_true", help="copy files (default is a dry run)")
    ap.add_argument("--check", action="store_true", help="only check the copied files")
    ns = ap.parse_args(argv)
    if ns.check:
        errs = check()
        print("\n".join(errs) or "OK: every manifest file is in public/show/")
        return 1 if errs else 0
    total_problems = 0
    for src in load_sources():
        copies, deletes, problems = plan(src)
        print(f"== {src['name']} ({src['path']}/public_show -> public/show/{src['site_folder']}/)")
        for p in problems:
            print(f"  PROBLEM {p}")
        for s, t in copies:
            print(f"  {'write' if isinstance(s, str) else 'copy '} {t.relative_to(SITE)}")
        for t in deletes:
            print(f"  delete {t.relative_to(SITE)}")
        if not (copies or deletes or problems):
            print("  up to date")
        total_problems += len(problems)
        if ns.apply:
            for s, t in copies:
                t.parent.mkdir(parents=True, exist_ok=True)
                if isinstance(s, str):
                    t.write_text(s, encoding="utf-8")
                else:
                    shutil.copy2(s, t)
            for t in deletes:
                t.unlink()
    if ns.apply:
        errs = check()
        for e in errs:
            print(f"  CHECK {e}")
        print("Applied. Next: git status, npm run build, then commit." if not errs else "Applied with problems.")
        return 1 if errs or total_problems else 0
    print("Dry run. Add --apply to copy." if not total_problems else "Fix the problems, then run again.")
    return 1 if total_problems else 0


if __name__ == "__main__":
    sys.exit(main())
