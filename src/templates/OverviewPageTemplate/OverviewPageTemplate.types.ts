import type { ReactNode } from 'react'

export interface OverviewPageTemplateProps {
  readonly children?: ReactNode
  readonly headline?: string
  readonly calloutHeadline?: string
  readonly calloutContent?: ReactNode
  readonly buttonLabel?: string
  readonly onButtonClick?: () => void
}
