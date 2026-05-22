/**
 * MagicGrid Type Definitions
 * Converted from source: templates/dashboard/masonry-layout/MagicGrid.types.tsx
 */

import type { ReactNode, ElementType } from 'react'

export interface MagicGridType {
  readonly listen: () => void
  readonly positionItems: () => void
}

export interface ConfigType {
  readonly container: HTMLElement | string | null
  readonly static?: boolean
  readonly items: number
  readonly gutter?: number
  readonly maxColumns?: number
  readonly useMin?: boolean
  readonly useTransform?: boolean
  readonly animate?: boolean
  readonly center?: boolean
}

export interface Column {
  height: number
  index: number
}

export interface ReactMagicGridProps extends Omit<ConfigType, 'container'> {
  readonly as?: ElementType
  readonly children: ReactNode
}
