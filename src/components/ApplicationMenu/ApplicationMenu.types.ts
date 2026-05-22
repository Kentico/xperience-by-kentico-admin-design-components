import type { MouseEvent, RefObject } from 'react'
import type { Application, ApplicationCategory } from '@/templates/App/App.types'
import type { UserProfile } from '@/components/Avatar/Avatar.types'

/**
 * View mode for application list.
 */
export const ApplicationListView = {
  List: 'list',
  Tiles: 'tiles',
} as const

export type ApplicationListView = (typeof ApplicationListView)[keyof typeof ApplicationListView]

/**
 * State for application list items.
 */
export const ApplicationListItemState = {
  Default: 'Default',
  Activated: 'Activated',
} as const

export type ApplicationListItemState = (typeof ApplicationListItemState)[keyof typeof ApplicationListItemState]

/**
 * Props for ApplicationMenu component.
 */
export interface ApplicationMenuProps {
  readonly categories: ApplicationCategory[]
  readonly userProfile?: UserProfile
  readonly showWarning?: boolean
  readonly showError?: boolean
  readonly expiringLicenseMessage?: string
}

/**
 * Props for ApplicationList component.
 */
export interface ApplicationListProps {
  readonly categories: ApplicationCategory[]
  readonly selectedCategory?: ApplicationCategory
  readonly applicationPath: string
  readonly handleClick: (selectedCategory: ApplicationCategory) => void
  readonly overlayRef: RefObject<HTMLDivElement>
  readonly className?: string
  readonly onOutsideClick: (event: MouseEvent<HTMLElement>) => void
}

/**
 * Props for ApplicationListGroup component.
 */
export interface ApplicationListGroupProps {
  readonly category?: ApplicationCategory
  readonly applicationPath: string
  readonly view: ApplicationListView
  readonly handleClick: (category: ApplicationCategory) => void
  readonly renderToggleButtons?: () => React.ReactNode
  readonly collapsible?: boolean
}

/**
 * Props for ApplicationListItem component.
 */
export interface ApplicationListItemProps {
  readonly state: ApplicationListItemState
  readonly application: Application
  readonly handleClick: (event: MouseEvent<HTMLElement>) => void
}

/**
 * Props for ApplicationListMobile component.
 */
export interface ApplicationListMobileProps {
  readonly categories: ApplicationCategory[]
  readonly isOverflowing: boolean
  readonly setIsOverflowing: (isOverflowing: boolean) => void
  readonly handleClick: () => void
}

/**
 * Props for ApplicationMenuMobile component.
 */
export interface ApplicationMenuMobileProps {
  readonly categories: ApplicationCategory[]
  readonly className?: string
  readonly applicationListVisible: boolean
  readonly setApplicationListVisible: (visible: boolean) => void
  readonly showError: boolean
  readonly showWarning: boolean
  readonly expiringLicenseMessage: string
}
