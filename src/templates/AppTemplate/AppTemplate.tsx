import * as React from 'react';
import { useEffect, useState } from 'react'
import { useMediaBreakpoints, useEditableObjectStatusObserver } from '@/hooks'
import { Main } from './Main'
import { MainMobile } from './MainMobile'
import type { AppTemplateProps } from './AppTemplate.types'

/**
 * AppTemplate - Main application layout template.
 *
 * Automatically switches between desktop and mobile layouts based on viewport width.
 * The switch is deferred when there are unsaved changes to prevent losing state.
 *
 * Features:
 * - Responsive layout (desktop/mobile)
 * - Application navigation sidebar (desktop) or bottom menu (mobile)
 * - User avatar with profile menu
 * - Breadcrumb navigation
 * - Sticky banner notifications
 * - License warning/error display
 */
export function AppTemplate({
  categories,
  userProfile,
  applicationVersion,
  showError = false,
  showWarning = false,
  expiringLicenseMessage = '',
  stickyBanner,
  children,
}: AppTemplateProps) {
  const [isMobile, setIsMobile] = useState(false)
  const { mobile } = useMediaBreakpoints()
  const { dataChanged } = useEditableObjectStatusObserver()

  // Only update mobile state when there are no unsaved changes
  // This prevents layout switch during editing which could cause data loss
  useEffect(() => {
    if (!dataChanged) {
      setIsMobile(mobile)
    }
  }, [mobile, dataChanged])

  return isMobile ? (
    <MainMobile
      categories={categories}
      userProfile={userProfile}
      applicationVersion={applicationVersion}
      showError={showError}
      showWarning={showWarning}
      expiringLicenseMessage={expiringLicenseMessage}
    >
      {children}
    </MainMobile>
  ) : (
    <Main
      categories={categories}
      userProfile={userProfile}
      showError={showError}
      showWarning={showWarning}
      expiringLicenseMessage={expiringLicenseMessage}
      stickyBanner={stickyBanner}
    >
      {children}
    </Main>
  )
}
