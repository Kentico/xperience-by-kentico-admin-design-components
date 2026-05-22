import type { ApplicationCategory } from '../App/App.types'

export interface DashboardContentProps {
  /**
   * Definitions of categories and applications to be displayed.
   */
  readonly categories: ApplicationCategory[]
}
