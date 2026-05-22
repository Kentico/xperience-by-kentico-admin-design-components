import { type ReactElement } from 'react'
import { type Colors } from '@/tokens/colors'

export type TagBackgroundType = {
  readonly color: Colors
}

export const TagMode = {
  Light: 'light',
  Dark: 'dark',
} as const

export type TagMode = (typeof TagMode)[keyof typeof TagMode]

export interface TagProps {
  readonly label: string
  readonly tooltipText?: string
  readonly tooltipTextAsHtml?: boolean
  readonly onClick?: () => void
  readonly onRemoveClick?: () => void
  readonly onRemoveMouseDown?: () => void
  readonly disabled?: boolean
  readonly readOnly?: boolean
  readonly removable?: boolean
  readonly background?: TagBackgroundType
  readonly fullWidth?: boolean
  readonly isDragging?: boolean
  readonly leadingButton?: ReactElement<HTMLButtonElement>
  readonly mode?: TagMode
}

export interface TagDraggableProps extends TagProps {
  readonly draggableId: string
  readonly index: number
}
