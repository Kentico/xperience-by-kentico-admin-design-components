import type { LinkButtonProps } from '../LinkButton'

/**
 * Props for AppLinkButton - a LinkButton with react-router integration.
 * Omits onClick since it's handled internally for SPA navigation.
 * Requires href to be provided.
 */
export interface AppLinkButtonProps extends Omit<LinkButtonProps, 'onClick' | 'href'> {
  /** URL the link points to (required) */
  readonly href: string
}
