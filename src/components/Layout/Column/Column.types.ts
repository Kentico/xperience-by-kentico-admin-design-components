import type { LayoutComponentProps } from '../Layout.types'

export const Cols = {
  Col1: '1',
  Col2: '2',
  Col3: '3',
  Col4: '4',
  Col5: '5',
  Col6: '6',
  Col7: '7',
  Col8: '8',
  Col9: '9',
  Col10: '10',
  Col11: '11',
  Col12: '12',
} as const
export type Cols = (typeof Cols)[keyof typeof Cols]

export interface ColumnProps extends LayoutComponentProps {
  readonly width?: number
  readonly cols?: Cols
  readonly colsSm?: Cols
  readonly colsMd?: Cols
  readonly colsLg?: Cols
  readonly order?: Cols
  readonly orderSm?: Cols
  readonly orderMd?: Cols
  readonly orderLg?: Cols
  readonly fullHeight?: boolean
}
