import type { ReactNode, RefObject } from 'react'

export interface BreadcrumbProps {
  readonly text?: string
  readonly path: string
}

export interface BreadcrumbsProps {
  readonly status?: ReactNode
  readonly shorten?: boolean
  readonly pin?: PinProps
  readonly breadcrumbs: BreadcrumbProps[]
  readonly onCollapsedToMinWidthChange?: (isCollapsedToMinWidth: boolean) => void
  readonly containerRef?: RefObject<HTMLElement | null>
}

export interface PinProps {
  readonly active: boolean
  readonly tooltip: string
  readonly onClick: () => void
}

// Extended props for the App template breadcrumbs context
export interface AppBreadcrumbProps extends BreadcrumbProps {
  readonly isSignificant: boolean
}

export interface BreadcrumbsContextType {
  readonly breadcrumbs: AppBreadcrumbProps[]
  readonly push: (path: string, isSignificant: boolean, text: string) => void
  readonly pop: () => void
  readonly refreshItem: (level: number, text: string) => void
  readonly statusNode: ReactNode
  readonly setStatusNode: (statusNode: ReactNode) => void
}

export interface BreadcrumbsProviderProps {
  readonly children: ReactNode
}

export interface AppBreadcrumbsWrapperProps {
  readonly containerRef?: RefObject<HTMLDivElement | null>
  readonly onCollapsedToMinWidthChange?: (isCollapsedToMinWidth: boolean) => void
}
