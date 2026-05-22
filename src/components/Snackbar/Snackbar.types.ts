import { type HTMLAttributes, type ReactNode } from 'react'

/* ------------------------------------------------------------------ */
/*  Const + Type Patterns (erasableSyntaxOnly compliant)               */
/* ------------------------------------------------------------------ */

export const SnackbarPosition = {
  TopLeft: 'top-left',
  Top: 'top',
  TopRight: 'top-right',
  BottomLeft: 'bottom-left',
  Bottom: 'bottom',
  BottomRight: 'bottom-right',
} as const

export type SnackbarPosition = (typeof SnackbarPosition)[keyof typeof SnackbarPosition]

export const SnackbarVariant = {
  Success: 'success',
  Error: 'error',
  Warning: 'warning',
  Info: 'info',
} as const

export type SnackbarVariant = (typeof SnackbarVariant)[keyof typeof SnackbarVariant]

export const SnackbarSpacing = {
  M: 'm',
  L: 'l',
  XL: 'xl',
} as const

export type SnackbarSpacing = (typeof SnackbarSpacing)[keyof typeof SnackbarSpacing]

/* ------------------------------------------------------------------ */
/*  Component Props                                                    */
/* ------------------------------------------------------------------ */

export interface SnackbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  /** Unique identifier for the snackbar */
  readonly id?: string | number
  /** The message content to display */
  readonly message: string | ReactNode
  /** Visual variant determining color and icon */
  readonly variant: SnackbarVariant
  /** Position on screen (defaults to top-right) */
  readonly position?: SnackbarPosition
  /** Duration in ms before auto-hide (defaults to 4000ms) */
  readonly duration?: number
  /** Whether to auto-hide the snackbar (defaults to true for success/info) */
  readonly autoHide?: boolean
  /** Callback when the snackbar is dismissed */
  readonly onClose?: (id?: string | number) => void
  /** Additional CSS class */
  readonly className?: string
}

export interface SnackbarContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Position of the snackbar container on screen */
  readonly position?: SnackbarPosition
  /** Vertical spacing from edge */
  readonly verticalSpacing?: SnackbarSpacing
  /** Horizontal spacing from edge */
  readonly horizontalSpacing?: SnackbarSpacing
  /** Children snackbar items */
  readonly children?: ReactNode
  /** Additional CSS class */
  readonly className?: string
}

/* ------------------------------------------------------------------ */
/*  Snackbar Message and Context Types                                 */
/* ------------------------------------------------------------------ */

/**
 * Represents a single snackbar message in the queue.
 */
export interface SnackbarMessage {
  /** Unique identifier for the message */
  readonly id?: string | number
  /** The message content to display */
  readonly message: string | ReactNode
  /** Visual variant determining color and icon */
  readonly variant: SnackbarVariant
  /** Position on screen (optional, uses container default) */
  readonly position?: SnackbarPosition
  /** Duration in ms before auto-hide */
  readonly duration?: number
  /** Whether to render message as HTML (use with caution) */
  readonly messageAsHtml?: boolean
  /** Whether to auto-hide the snackbar */
  readonly autoHide?: boolean
  /** Callback when the snackbar is dismissed */
  readonly onClose?: (id: string | number) => void
}

/**
 * Context type for Snackbar state management.
 */
export interface SnackbarContextType {
  /** Array of current snackbar messages */
  readonly messages: readonly SnackbarMessage[]
  /** Add a new message to the snackbar queue */
  readonly addMessage: (message: SnackbarMessage) => void
  /** Remove a specific message by ID */
  readonly removeMessage: (id: string | number) => void
  /** Clear all messages */
  readonly clearMessages: () => void
}

/**
 * Props for the SnackbarProvider component.
 */
export interface SnackbarProviderProps {
  /** Child components that can access snackbar context */
  readonly children: ReactNode
  /** Default position for snackbars */
  readonly position?: SnackbarPosition
  /** Vertical spacing from edge */
  readonly verticalSpacing?: SnackbarSpacing
  /** Horizontal spacing from edge */
  readonly horizontalSpacing?: SnackbarSpacing
}
