export const DividerOrientation = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const
export type DividerOrientation =
  (typeof DividerOrientation)[keyof typeof DividerOrientation]

export interface DividerProps {
  readonly orientation: DividerOrientation
  readonly isSubheaderDivider?: boolean
}
