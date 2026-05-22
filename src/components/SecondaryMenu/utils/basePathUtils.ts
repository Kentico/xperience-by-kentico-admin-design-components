/**
 * Removes the application base path from a URL path.
 * Uses `document.baseURI` to determine the base path.
 *
 * @example
 * // If base URI is 'https://example.com/admin/'
 * getPathWithoutBasePath('/admin/section/page') // '/section/page'
 */
export function getPathWithoutBasePath(path: string): string {
  const baseUri = getBaseUri()
  if (baseUri && path.startsWith(baseUri)) {
    return path.slice(baseUri.length) || '/'
  }
  return path
}

/**
 * Extracts the base path from `document.baseURI`.
 * Returns the pathname portion of the base URI, or an empty string.
 */
export function getBaseUri(): string {
  if (typeof document === 'undefined') return ''

  try {
    const url = new URL(document.baseURI)
    const basePath = url.pathname
    // Remove trailing slash for consistent comparison
    return basePath.length > 1 && basePath.endsWith('/')
      ? basePath.slice(0, -1)
      : basePath
  } catch {
    return ''
  }
}
