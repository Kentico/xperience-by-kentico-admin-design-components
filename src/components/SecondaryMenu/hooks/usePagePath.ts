import { useLocation } from 'react-router-dom'

/**
 * Returns the current page path using React Router's useLocation.
 * Reactively updates when the route changes via client-side navigation.
 */
export function usePagePath(): string {
  const { pathname } = useLocation()
  return pathname
}
