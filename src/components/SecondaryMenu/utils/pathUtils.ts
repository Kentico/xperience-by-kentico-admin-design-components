/**
 * Trims a leading path segment from a full path.
 *
 * @example
 * trimLeadingPath('/app/section/page', '/app') // '/section/page'
 * trimLeadingPath('/section/page', '/section') // '/page'
 */
export function trimLeadingPath(fullPath: string, leadingPath: string): string {
  if (fullPath.startsWith(leadingPath)) {
    return fullPath.slice(leadingPath.length) || '/'
  }
  return fullPath
}

/**
 * Normalizes a path by ensuring it starts with '/' and removing trailing slashes.
 *
 * @example
 * normalizePath('section/page/') // '/section/page'
 * normalizePath('/section/page') // '/section/page'
 */
export function normalizePath(path: string): string {
  let normalized = path.startsWith('/') ? path : `/${path}`
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1)
  }
  return normalized
}
