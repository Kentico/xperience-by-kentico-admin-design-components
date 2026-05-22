/**
 * Determines whether a given path is active based on the current path.
 * A path is considered active if the current path matches exactly or starts
 * with the path followed by a '/'.
 */
export function useIsPathActive(currentPath: string, itemPath: string): boolean {
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/')
}
