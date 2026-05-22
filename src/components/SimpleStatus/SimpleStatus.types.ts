/**
 * SimpleStatus Component Types
 * Minimal status indicator with icon and text, supporting various states.
 */

import { type TooltipPlacement } from '../Tooltip/Tooltip.types'

/* ------------------------------------------------------------------ */
/*  Semantic Color Map                                                  */
/* ------------------------------------------------------------------ */

/**
 * Predefined semantic colors for status indicators.
 * Maps to CSS custom properties from tokens.css.
 */
export const StatusColor = {
  /** Success state - turquoise/green */
  Success: 'var(--color-success-icon)',
  /** Warning state - yellow/amber */
  Warning: 'var(--color-warning-icon)',
  /** Alert/Error state - red */
  Alert: 'var(--color-alert-icon)',
  /** Info state - blue */
  Info: 'var(--color-info-icon)',
  /** Default/neutral - grey */
  Default: 'var(--color-icon-default)',
  /** Low emphasis - lighter grey */
  LowEmphasis: 'var(--color-icon-low-emphasis)',
  /** Highlighted - purple */
  Highlighted: 'var(--color-icon-highlighted)',
} as const

export type StatusColor = (typeof StatusColor)[keyof typeof StatusColor]

/* ------------------------------------------------------------------ */
/*  Enums (const + type pattern)                                       */
/* ------------------------------------------------------------------ */

/**
 * Icon alignment relative to the label.
 */
export const SimpleStatusAlign = {
  Left: 'left',
  Right: 'right',
} as const

export type SimpleStatusAlign = (typeof SimpleStatusAlign)[keyof typeof SimpleStatusAlign]

/**
 * Status type for semantic styling.
 */
export const SimpleStatusType = {
  Default: 'default',
  Error: 'error',
  Success: 'success',
  Warning: 'warning',
} as const

export type SimpleStatusType = (typeof SimpleStatusType)[keyof typeof SimpleStatusType]

/**
 * Size variants for the status indicator.
 */
export const SimpleStatusSize = {
  /** Standard size */
  S: 'S',
  /** Extra small size */
  XS: 'XS',
} as const

export type SimpleStatusSize = (typeof SimpleStatusSize)[keyof typeof SimpleStatusSize]

/* ------------------------------------------------------------------ */
/*  Content Types                                                      */
/* ------------------------------------------------------------------ */

/**
 * Base content properties shared by all content variants.
 */
interface ContentBase {
  /** Icon alignment relative to the label */
  readonly iconAlign?: SimpleStatusAlign
  /** Tooltip text to display on hover */
  readonly tooltipText?: string
  /** Tooltip placement relative to the element */
  readonly tooltipPlacement?: TooltipPlacement
  /** Custom portal target element for tooltip */
  readonly tooltipAppendTo?: Element
}

/**
 * Content with icon but optional label (tooltip required).
 */
interface ContentWithIcon extends ContentBase {
  /** Optional label text */
  readonly label?: string
  /** Name of the icon to display (required) */
  readonly iconName: string
  /** Tooltip text (required when label is absent) */
  readonly tooltipText: string
}

/**
 * Content with label but optional icon.
 */
interface ContentWithLabel extends ContentBase {
  /** Label text (required) */
  readonly label: string
  /** Optional icon name */
  readonly iconName?: string
  /** Optional tooltip text */
  readonly tooltipText?: string
}

/**
 * Content definition - either has a required icon with tooltip, or a required label.
 */
export type SimpleStatusContent = ContentWithIcon | ContentWithLabel

/* ------------------------------------------------------------------ */
/*  Component Props                                                    */
/* ------------------------------------------------------------------ */

/**
 * Props for the BaseSimpleStatus component.
 */
export interface BaseSimpleStatusProps {
  /** Spreads the component to full width */
  readonly spread?: boolean
  /** Status type for semantic styling */
  readonly type: SimpleStatusType
  /** Custom label color (CSS color value or token) */
  readonly labelColor?: string
  /** Custom icon color (CSS color value or token) */
  readonly iconColor?: string
  /** Content configuration (label, icon, tooltip) */
  readonly content: SimpleStatusContent
  /** Size variant */
  readonly size?: SimpleStatusSize
  /** Additional CSS class name */
  readonly className?: string
}

/**
 * Props for SimpleStatusDefault - configurable default status.
 */
export interface SimpleStatusDefaultProps extends Omit<BaseSimpleStatusProps, 'type'> {}

/**
 * Content specifically for error status (icon is preset).
 */
interface SimpleStatusErrorContent {
  /** Label text */
  readonly label: string
  /** Icon alignment relative to the label */
  readonly iconAlign?: SimpleStatusAlign
  /** Tooltip text to display on hover */
  readonly tooltipText?: string
  /** Tooltip placement relative to the element */
  readonly tooltipPlacement?: TooltipPlacement
  /** Custom portal target element for tooltip */
  readonly tooltipAppendTo?: Element
}

/**
 * Props for SimpleStatusError - error status with preset icon.
 */
export interface SimpleStatusErrorProps extends Omit<BaseSimpleStatusProps, 'type' | 'content' | 'labelColor' | 'iconColor'> {
  /** Content for error status (icon is preset) */
  readonly content: SimpleStatusErrorContent
}

/**
 * Props for SimpleStatusSuccess - success status.
 */
export interface SimpleStatusSuccessProps extends Omit<BaseSimpleStatusProps, 'type' | 'labelColor' | 'iconColor'> {}

/**
 * Props for SimpleStatusWarning - warning status.
 */
export interface SimpleStatusWarningProps extends Omit<BaseSimpleStatusProps, 'type' | 'labelColor' | 'iconColor'> {}
