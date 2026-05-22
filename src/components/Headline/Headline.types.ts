import type { ReactNode } from 'react'
import type { BoxProps } from '@/components/Box/Box.types'
import type { Colors } from '@/tokens/colors'

export const HeadlineSize = {
  S: 'S',
  M: 'M',
  L: 'L',
} as const

export type HeadlineSize = (typeof HeadlineSize)[keyof typeof HeadlineSize]

export interface HeadlineProps extends Pick<BoxProps, 'spacingTop' | 'spacingBottom' | 'spacingY'> {
  readonly children?: ReactNode
  readonly size: HeadlineSize
  readonly labelColor?: Colors
}
