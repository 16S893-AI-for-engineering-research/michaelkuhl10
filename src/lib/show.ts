/**
 * Read content synced from the project repos' public_show/ folders.
 * Data: src/data/show/<site_folder>.json, written by scripts/sync_public_show.py.
 * Files: public/show/<site_folder>/...
 *
 * Usage in a page:
 *   import { showItem } from '@lib/show';
 *   const fig = showItem('zig', 'square-tradeoff');   // throws at build time if missing
 */
export interface ShowItem {
  id: string;
  kind: 'figure' | 'video' | 'doc' | 'walkthrough' | 'text';
  file: string;
  url: string;
  poster_url?: string;
  title: string;
  caption: string;
  alt: string;
  section: string;
  order: number;
  body?: string;
  updated: string;
}

export interface ShowSource {
  name: string;
  site_folder: string;
  repo_url: string;
  public: boolean;
  about: string;
  items: ShowItem[];
}

const modules = import.meta.glob<ShowSource>('../data/show/*.json', { eager: true, import: 'default' });

export const showSources: ShowSource[] = Object.values(modules).sort((a, b) => a.name.localeCompare(b.name));

export function showSource(folder: string): ShowSource {
  const s = showSources.find((x) => x.site_folder === folder);
  if (!s) throw new Error(`public_show: no synced source "${folder}". Run scripts/sync_public_show.py --apply`);
  return s;
}

export function showItem(folder: string, id: string): ShowItem {
  const it = showSource(folder).items.find((x) => x.id === id);
  if (!it) throw new Error(`public_show: no item "${id}" in "${folder}". Check its manifest.json`);
  return it;
}

/** Items in one section, in manifest order. */
export function showSection(folder: string, section: string): ShowItem[] {
  return showSource(folder).items.filter((x) => x.section === section).sort((a, b) => a.order - b.order);
}
