import type { ReactNode, CSSProperties } from 'react'

export type HandleDirection = 'left' | 'right' | 'top' | 'bottom'

export type StyleMode = 'inline' | 'css-variables'

export interface ResizableBoxProps {
  /** ID for the container element */
  id?: string
  /** Child elements */
  children: ReactNode
  /** Directions where resize handles should appear */
  directions?: HandleDirection[]
  /** Width of the box (controlled) */
  width?: number
  /** Height of the box (controlled) */
  height?: number
  /** Minimum width */
  minWidth?: number
  /** Maximum width */
  maxWidth?: number
  /** Minimum height */
  minHeight?: number
  /** Maximum height */
  maxHeight?: number
  /** Callback when resizing */
  onResize?: (width: number, height: number) => void
  /** How to apply size styles */
  styleMode?: StyleMode
  /** Additional CSS class */
  className?: string
  /** Additional inline styles */
  style?: CSSProperties
  /** Data attribute for click outside ignore */
  'data-ignored-by-clickoutside'?: string
}
