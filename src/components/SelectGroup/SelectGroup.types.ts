import type { MouseEventHandler, ReactNode, RefObject } from 'react'
import type { LeadingElementType } from '@/components/MenuItem'

export interface SelectGroupProps<SelectShape> {
  /**
   * Array of select items to render.
   */
  readonly selects: SelectShape[]
  /**
   * Minimum width of the select group container.
   */
  readonly minWidth?: number
  /**
   * Additional class name for the Paper container.
   */
  readonly paperClassName?: string
  /**
   * Render function for each select item.
   * @param select - The select item data
   * @param onItemClick - Callback to close the dropdown
   * @param visible - Whether labels should be visible
   * @param index - Index of the select item
   */
  readonly renderSelect: (
    select: SelectShape,
    onItemClick: () => void,
    visible: boolean,
    index: number
  ) => ReactNode
}

export interface SelectGroupCellProps {
  /**
   * Whether the dropdown is open.
   */
  readonly open?: boolean
  /**
   * Label text to display.
   */
  readonly label?: string
  /**
   * Tooltip text shown on hover.
   */
  readonly tooltipText?: string
  /**
   * Icon name (with or without xp- prefix).
   */
  readonly icon?: string
  /**
   * Leading element configuration (e.g., avatar, icon).
   */
  readonly leadingElement?: {
    readonly type: LeadingElementType
    readonly element: ReactNode
  }
  /**
   * Whether to show only the icon (ellipsis mode).
   */
  readonly ellipsis?: boolean
  /**
   * Click handler for the cell.
   */
  readonly onClick?: MouseEventHandler<HTMLElement>
  /**
   * Whether selection is disabled.
   */
  readonly selectionDisabled?: boolean
  /**
   * Ref for the label element.
   */
  readonly labelRef?: RefObject<HTMLDivElement>
  /**
   * Additional class name.
   */
  readonly className?: string
  /**
   * Test ID for testing.
   */
}
