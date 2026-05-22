import * as React from 'react';
import { Children, forwardRef } from 'react'
import { Card } from '@/components/Card'
import type { OverviewCardProps, OverviewCardSectionProps } from './OverviewCard.types'
import './OverviewCard.css'

/**
 * A section within an OverviewCard.
 * Wraps content with proper spacing between sections.
 */
export const OverviewCardSection = ({ children }: OverviewCardSectionProps) => {
  return <div className={'OverviewCard-overviewCardSection'}>{children}</div>
}

OverviewCardSection.displayName = 'OverviewCardSection'

/**
 * Overview card component.
 * A card component designed for displaying overview content with sections.
 * Each child is wrapped in a section with spacing between them.
 */
export const OverviewCard = forwardRef<HTMLDivElement, OverviewCardProps>(
  ({ headline, children, actions, fullHeight }, ref) => {
    // Convert children to array for mapping
    const childArray = Children.toArray(children)

    return (
      <Card ref={ref} headline={headline} footer={actions} fullHeight={fullHeight}>
        {childArray.length > 0
          ? childArray.map((child, index) => (
              <OverviewCardSection key={index}>{child}</OverviewCardSection>
            ))
          : null}
      </Card>
    )
  }
)

OverviewCard.displayName = 'OverviewCard'
