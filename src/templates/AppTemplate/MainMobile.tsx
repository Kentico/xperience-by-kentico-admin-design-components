import * as React from 'react';
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  SmallStatusBar,
  ApplicationMenuMobile,
  ApplicationListMobile,
  RoutingContentPlaceholder,
} from '@/components'
import { useMobileKeyboard, useScrollDown } from '@/hooks'
import type { MainMobileProps } from './AppTemplate.types'
import './MainMobile.css'

/**
 * Main mobile layout component.
 * Provides the mobile experience with bottom navigation and collapsible app list.
 */
// Default user profile when none provided
const defaultUserProfile = {
  username: 'user',
  firstName: 'User',
  lastName: '',
}

export function MainMobile({
  categories,
  userProfile = defaultUserProfile,
  showError = false,
  showWarning = false,
  expiringLicenseMessage = '',
  children,
}: MainMobileProps) {
  const [applicationListVisible, setApplicationListVisible] = useState(false)
  const [isAppListOverflowing, setAppListOverflowing] = useState(false)
  const scrollingDown = useScrollDown()
  const keyboardVisible = useMobileKeyboard()

  // Scroll to top when toggling application list
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [applicationListVisible])

  const statusBarWrapperClasses = classNames(
    applicationListVisible && 'MainMobile-statusBarWrapper'
  )
  const statusBarClasses = classNames(
    applicationListVisible && 'MainMobile-statusBarOnAppList'
  )
  const applicationMenuClasses = classNames(
    isAppListOverflowing && 'MainMobile-guard'
  )

  return (
    <div
      className={classNames(
        'MainMobile-main',
        applicationListVisible && 'MainMobile-withApplicationList'
      )}
    >
      <div id="applicationHeader" className={'MainMobile-applicationHeader'} />
      <div className={statusBarWrapperClasses}>
        <SmallStatusBar
          userProfile={userProfile}
          className={statusBarClasses}
        />
      </div>
      <div className={'MainMobile-canvas'}>
        {applicationListVisible ? (
          <ApplicationListMobile
            categories={categories}
            isOverflowing={isAppListOverflowing}
            setIsOverflowing={setAppListOverflowing}
            handleClick={() => setApplicationListVisible(false)}
          />
        ) : (
          <div className={'MainMobile-placeholder'}>
            {children ?? <RoutingContentPlaceholder />}
          </div>
        )}
      </div>
      {!(keyboardVisible || scrollingDown) && (
        <ApplicationMenuMobile
          className={applicationMenuClasses}
          categories={categories}
          setApplicationListVisible={setApplicationListVisible}
          applicationListVisible={applicationListVisible}
          showError={showError}
          showWarning={showWarning}
          expiringLicenseMessage={expiringLicenseMessage}
        />
      )}
    </div>
  )
}
