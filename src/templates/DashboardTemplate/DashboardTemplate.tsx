import * as React from 'react';
import { useCallback } from 'react'
import {
  Box,
  Callout,
  CalloutType,
  CalloutPlacementType,
  Button,
  ButtonColor,
  Spacing,
} from '@/components'
import { DashboardContent } from './DashboardContent'
import type {
  DashboardTemplateProps,
  DashboardCalloutConfiguration,
} from './DashboardTemplate.types'
import './DashboardTemplate.css'

// Local translations dictionary for dashboard
const translations = {
  'admin.base.dashboard.home': 'Home',
  'callout.quickTip': 'Quick tip',
  'callout.friendlyWarning': 'Friendly warning',
} as const

/**
 * Simple translation lookup function.
 * In the full implementation, this would use i18next or similar.
 */
function t(key: keyof typeof translations): string {
  return translations[key] ?? key
}

/**
 * ConfigurableCallout - Wrapper around Callout that accepts CalloutConfiguration.
 * Maps server-driven configuration to the Callout component props.
 */
function ConfigurableCallout({
  calloutConfiguration,
}: {
  calloutConfiguration: DashboardCalloutConfiguration
}) {
  const { headline, content, type, placement, actionButton, contentAsHtml } =
    calloutConfiguration

  const handleActionClick = useCallback(() => {
    if (actionButton?.redirectUrl) {
      if (actionButton.openInNewTab) {
        window.open(actionButton.redirectUrl, '_blank')
      } else {
        window.location.href = actionButton.redirectUrl
      }
    }
  }, [actionButton])

  const actionButtonElement = actionButton && (
    <Button
      color={ButtonColor.Primary}
      onClick={handleActionClick}
      disabled={actionButton.disabled || actionButton.inProgress}
      label={actionButton.text}
    />
  )

  const subheadlineText =
    type === CalloutType.QuickTip
      ? t('callout.quickTip')
      : t('callout.friendlyWarning')

  return (
    <Callout
      type={type}
      placement={placement}
      headline={headline}
      actionButton={actionButtonElement}
      subheadline={subheadlineText}
    >
      {contentAsHtml ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        content
      )}
    </Callout>
  )
}

/**
 * DashboardTemplate - Main dashboard page template.
 *
 * Displays a home dashboard with:
 * - A gradient "Home" title at the top
 * - Configurable callout messages (quick tips, warnings)
 * - Application categories in a responsive masonry grid
 *
 * The dashboard serves as the landing page for the admin interface,
 * providing quick access to all application modules organized by category.
 *
 * @example
 * ```tsx
 * <DashboardTemplate
 *   categories={[
 *     {
 *       name: 'Content',
 *       codeName: 'content',
 *       icon: 'xp-content',
 *       applications: [
 *         { name: 'Pages', path: '/pages', icon: 'xp-doc' }
 *       ]
 *     }
 *   ]}
 *   callouts={[
 *     {
 *       type: CalloutType.QuickTip,
 *       placement: CalloutPlacementType.OnDesk,
 *       headline: 'Welcome!',
 *       content: 'Get started by exploring the dashboard.'
 *     }
 *   ]}
 * />
 * ```
 */
export function DashboardTemplate({
  categories,
  callouts,
}: DashboardTemplateProps) {
  return (
    <div className={'DashboardTemplate-dashboard'}>
      <div className={'DashboardTemplate-titleWrapper'}>
        <span className={'DashboardTemplate-title'}>{t('admin.base.dashboard.home')}</span>
      </div>
      <div>
        {callouts &&
          callouts.map((callout, index) => {
            return (
              <Box key={index} spacingBottom={Spacing.XL}>
                <ConfigurableCallout calloutConfiguration={callout} />
              </Box>
            )
          })}

        <DashboardContent categories={categories} />
      </div>
    </div>
  )
}

// Re-export convenience types
export { CalloutType, CalloutPlacementType }
