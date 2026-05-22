import * as React from 'react';
import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ApplicationMenu,
  StatusBar,
  RoutingContentPlaceholder,
  StickyBanner,
} from '@/components'
import type { MainProps } from './AppTemplate.types'
import './Main.css'

/**
 * Main desktop layout component.
 * Provides the full desktop experience with sidebar, status bar, and AIRA panel.
 */
export function Main({
  categories,
  userProfile,
  showError = false,
  showWarning = false,
  expiringLicenseMessage = '',
  stickyBanner,
  children,
}: MainProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    canvasRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={'Main-container'}>
      {stickyBanner && (
        <StickyBanner
          message={stickyBanner.message}
          bannerType={stickyBanner.bannerType}
          messageAsHtml={stickyBanner.messageAsHtml}
        />
      )}
      <div className={'Main'}>
        <div id="dialog-container" className={'Main-contentArea'}>
          <ApplicationMenu
            categories={categories}
            userProfile={userProfile}
            showError={showError}
            showWarning={showWarning}
            expiringLicenseMessage={expiringLicenseMessage}
          />
          <div className={'Main-content'}>
            <StatusBar />
            <div ref={canvasRef} className={'Main-canvas'}>
              <div className={'Main-placeholder'}>
                {children ?? <RoutingContentPlaceholder />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
