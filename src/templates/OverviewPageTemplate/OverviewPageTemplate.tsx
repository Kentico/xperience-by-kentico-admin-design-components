import * as React from 'react';
import {
  Button,
  ButtonColor,
  Callout,
  CalloutPlacementType,
  CalloutType,
  Headline,
  HeadlineSize,
  Spacing,
  Stack,
} from '@/components'
import type { OverviewPageTemplateProps } from './OverviewPageTemplate.types'
import './OverviewPageTemplate.css'

/**
 * OverviewPageTemplate - Content template for the AIRA > Usage > Overview page.
 *
 * Renders:
 * - "Overview" headline
 * - Quick tip callout about AIRA
 * - Primary action button
 * - Content card with placeholder area
 *
 * Designed to be placed inside a SectionLayoutTemplate for secondary menu navigation.
 *
 * @example
 * ```tsx
 * <SectionLayoutTemplateWithProvider templateProperties={navigationConfig}>
 *   <OverviewPageTemplate />
 * </SectionLayoutTemplateWithProvider>
 * ```
 */
const defaultCalloutContent = (
  <p>
    AIRA is an AI-powered assistant that helps users automate
    content-related tasks. To learn more about particular AIRA features,
    see our <a href="#">documentation</a>.
  </p>
)

export function OverviewPageTemplate({
  children,
  headline = 'Overview',
  calloutHeadline = 'What is AIRA, and how can it help you',
  calloutContent = defaultCalloutContent,
  buttonLabel = 'PRIMARY ACTION',
  onButtonClick,
}: OverviewPageTemplateProps) {
  return (
    <div className={'OverviewPageTemplate-content'}>
      <Stack spacing={Spacing.XL}>
        <Headline size={HeadlineSize.M}>{headline}</Headline>

        <div className={'OverviewPageTemplate-quickTip'}>
          <Callout
            type={CalloutType.QuickTip}
            placement={CalloutPlacementType.OnPaper}
            headline={calloutHeadline}
            subheadline="Quick tip"
          >
            {calloutContent}
          </Callout>
        </div>

        <div>
          <Button color={ButtonColor.Primary} onClick={onButtonClick} label={buttonLabel} />
        </div>

        <div className={'OverviewPageTemplate-contentCard'}>
          {children ?? <div className={'OverviewPageTemplate-contentPlaceholder'} />}
        </div>
      </Stack>
    </div>
  )
}
