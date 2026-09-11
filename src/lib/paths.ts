/**
 * Base path handling for GitHub Pages project sites.
 * In dev mode:  '/'
 * In prod mode: '/michaelkuhl10'
 */
export function getBasePath(): string {
  if (typeof window !== 'undefined') {
    const isLocal =
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';
    return isLocal ? '/' : '/michaelkuhl10';
  }
  return import.meta.env.DEV ? '/' : '/michaelkuhl10';
}

/**
 * Resolve a relative path to include the base path when needed.
 * Usage: href={resolvePath('/about')}
 */
export function resolvePath(path: string): string {
  const basePath = getBasePath();
  if (basePath === '/') return path;
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  return basePath + normalizedPath;
}
