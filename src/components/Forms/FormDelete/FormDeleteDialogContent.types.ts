import type { ReactNode } from 'react'
import type { CalloutType, CalloutPlacementType } from '@/components/Callout'

/**
 * Configuration for the callout displayed in the delete dialog.
 */
export interface FormDeleteCalloutConfig {
  /**
   * The type of callout to display.
   */
  readonly type: CalloutType
  /**
   * The placement context of the callout.
   */
  readonly placement: CalloutPlacementType
  /**
   * The headline text for the callout.
   */
  readonly headline?: string
  /**
   * The subheadline text for the callout.
   */
  readonly subheadline?: string
  /**
   * The content of the callout.
   */
  readonly content?: ReactNode
}

/**
 * An item to be displayed in the delete confirmation list.
 */
export interface FormDeleteItem {
  /**
   * Unique identifier for the item.
   */
  readonly id: number | string
  /**
   * Display name of the item.
   */
  readonly name: string
  /**
   * Optional description or additional info.
   */
  readonly description?: string
}

/**
 * Properties for the FormDeleteDialogContent component.
 *
 * Displays the content of a form delete confirmation dialog,
 * including an optional warning callout and a list of items to be deleted.
 */
export interface FormDeleteDialogContentProps {
  /**
   * Configuration for the callout displayed above the items list.
   * If not provided, no callout is shown.
   */
  readonly callout?: FormDeleteCalloutConfig
  /**
   * The items that will be deleted.
   * Can be a single item or an array of items.
   */
  readonly items: FormDeleteItem | FormDeleteItem[]
  /**
   * Custom content to display instead of the default items list.
   * If provided, the items prop is ignored for display purposes.
   */
  readonly children?: ReactNode
  /**
   * Additional CSS class name.
   */
  readonly className?: string
}
