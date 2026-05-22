export interface LinkProps {
  /** The URI that the link points to. */
  readonly href: string
  /** Text to show in the link. If empty, the href is used instead. */
  readonly text?: string
  /** Target of the link. */
  readonly target?: '_self' | '_blank' | '_parent' | '_top'
  /** If true, text is rendered instead of an anchor element. */
  readonly inactive?: boolean
  /** If true, the link is truncated with ellipsis. */
  readonly ellipsis?: boolean
}
