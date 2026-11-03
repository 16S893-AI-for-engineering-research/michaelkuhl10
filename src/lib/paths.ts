/**
 * Prefix a root-relative path with the site base path.
 * Dev ('npm run dev'): '/'.  Production (GitHub Pages): '/michaelkuhl10'.
 * Usage: href={resolvePath('/about')}
 */
export function resolvePath(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : '/' + path;
  return base + normalized;
}
