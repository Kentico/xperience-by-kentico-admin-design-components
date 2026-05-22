import * as React from 'react';
import { Colors } from '@/tokens/colors'
import { Tag } from '@/components/Tag'

export interface TagTableCellComponentProps {
  readonly label: string
  readonly color: keyof typeof Colors
  readonly tooltipText?: string
}

/**
 * TagTableCellComponent renders a Tag component within a table cell.
 * Uses the Colors token to resolve the background color.
 */
export const TagTableCellComponent = ({ color, label, tooltipText }: TagTableCellComponentProps) => (
  <Tag background={{ color: Colors[color] }} label={label} tooltipText={tooltipText} />
)

TagTableCellComponent.displayName = 'TagTableCellComponent'
