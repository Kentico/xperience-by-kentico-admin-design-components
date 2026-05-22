import type { ReactNode } from 'react'

export const LayoutAlignment = {
  Start: 'flex-start',
  Center: 'center',
  End: 'flex-end',
} as const
export type LayoutAlignment = (typeof LayoutAlignment)[keyof typeof LayoutAlignment]

export interface LayoutComponentProps {
  className?: string
  children?: ReactNode
}

export const Spacing = {
  Micro: '1px',
  XXS: '2px',
  XS: '4px',
  S: '8px',
  M: '12px',
  L: '16px',
  XL: '24px',
  XXL: '32px',
  XXXL: '40px',
  XXXXL: '48px',
} as const
export type Spacing = (typeof Spacing)[keyof typeof Spacing]

export const Dimensions = {
  GridUnit: '8px',
} as const
export type Dimensions = (typeof Dimensions)[keyof typeof Dimensions]

