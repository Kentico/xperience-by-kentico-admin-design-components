import * as React from 'react';
import { Colors } from '@/tokens/colors'
import { SimpleStatusDefault, type SimpleStatusAlign } from '@/components/SimpleStatus'

export interface SimpleStatusTableCellComponentProps {
  /**
   * Name of the icon.
   */
  readonly iconName: string
  /**
   * Text of the status label.
   */
  readonly label: string
  /**
   * Color key for the icon (from Colors token).
   */
  readonly iconColor: keyof typeof Colors
  /**
   * Color key for the label (from Colors token).
   */
  readonly labelColor: keyof typeof Colors
  /**
   * Optional tooltip text.
   */
  readonly tooltipText?: string
  /**
   * Icon alignment relative to the label.
   */
  readonly iconAlign?: SimpleStatusAlign
}

/**
 * SimpleStatusTableCellComponent renders a SimpleStatus component within a table cell.
 * Uses the Colors token to resolve icon and label colors.
 */
export const SimpleStatusTableCellComponent = ({
  iconName,
  label,
  iconColor,
  iconAlign,
  labelColor,
  tooltipText,
}: SimpleStatusTableCellComponentProps) => (
  <SimpleStatusDefault
    iconColor={Colors[iconColor]}
    labelColor={Colors[labelColor]}
    content={{ iconName, iconAlign, label, tooltipText }}
  />
)

SimpleStatusTableCellComponent.displayName = 'SimpleStatusTableCellComponent'
