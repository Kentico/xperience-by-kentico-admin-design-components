import type { ReactNode } from 'react'

export type ItemId = string

export interface ToggleButtonsItem {
  readonly id: ItemId
}

export interface ToggleButtonsProps<ItemsType> {
  readonly selectedItemId: ItemId
  readonly items: ItemsType[]
  readonly onChange: (id: ItemId) => void
  readonly orientation?: 'vertical' | 'horizontal'
}

export interface ToggleButtonsBaseProps {
  readonly children?: ReactNode
}
