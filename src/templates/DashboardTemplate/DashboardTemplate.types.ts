import type { CalloutType, CalloutPlacementType } from '@/components'
import type { ApplicationCategory } from '../App/App.types'

/**
 * Configuration for a callout action button.
 */
export interface DashboardCalloutButtonConfiguration {
  readonly text: string
  readonly clickCommandName?: string
  readonly statusCommandName?: string
  readonly redirectUrl?: string
  readonly openInNewTab?: boolean
  readonly icon?: string
  disabled: boolean
  inProgress: boolean
}

/**
 * Configuration for server-driven callouts displayed on the dashboard.
 */
export interface DashboardCalloutConfiguration {
  readonly headline?: string
  readonly content: string
  readonly actionButton?: DashboardCalloutButtonConfiguration
  readonly type: CalloutType
  readonly placement: CalloutPlacementType
  readonly contentAsHtml?: boolean
}

/**
 * Props for the DashboardTemplate component.
 */
export interface DashboardTemplateProps {
  /**
   * Definitions of categories and applications to be displayed.
   */
  readonly categories: ApplicationCategory[]
  /**
   * Callouts to be displayed on the dashboard.
   */
  readonly callouts?: DashboardCalloutConfiguration[]
}
