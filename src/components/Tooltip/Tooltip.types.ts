import { type ReactElement, type ReactNode, type RefObject } from 'react'

export const TooltipPlacement = {
  Bottom: 'bottom',
  Top: 'top',
  Left: 'left',
  Right: 'right',
  BottomStart: 'bottom-start',
  BottomEnd: 'bottom-end',
  TopStart: 'top-start',
  TopEnd: 'top-end',
  LeftStart: 'left-start',
  LeftEnd: 'left-end',
  RightStart: 'right-start',
  RightEnd: 'right-end',
} as const

export type TooltipPlacement = (typeof TooltipPlacement)[keyof typeof TooltipPlacement]

export interface TooltipProps {
  readonly children: ReactElement
  readonly tooltipText?: string
  readonly placement?: TooltipPlacement
  readonly disabled?: boolean
  /** Keyboard shortcut string (e.g. "Ctrl + S") — renders styled key badges */
  readonly shortcuts?: string
  /** Controls max-width via grid units (default 50) */
  readonly maxGridUnitWidth?: number
  /** Skips the 300ms show delay */
  readonly withoutShowDelay?: boolean
  /** Controlled visibility mode */
  readonly visible?: boolean
  /** Custom portal target element */
  readonly appendTo?: Element
  /** Dangerously sets tooltip text as inner HTML via DOMPurify */
  readonly tooltipTextAsHtml?: boolean
}

/**
 * tooltipText is shown always. If truncation occurs, text is appended.
 */
export interface OptionalTooltipProps extends Omit<TooltipProps, 'shortcuts' | 'children'> {
  /** tooltipText and text merge into tooltip when text gets truncated */
  readonly text: string
  readonly customRenderText?: (refForTruncatedElement: RefObject<HTMLElement>) => ReactElement
  readonly children?: ReactNode | string
}
