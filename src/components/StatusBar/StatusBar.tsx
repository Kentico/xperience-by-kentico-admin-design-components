import * as React from 'react';
import { useCallback, useRef, useState } from 'react'
import { LanguageSelectorPlaceholder, WorkspaceSelectorPlaceholder } from '@/components/Placeholders'
import { AppBreadcrumbs } from '@/components/Breadcrumbs'
import './StatusBar.css'

export interface StatusBarProps {
  className?: string
}

/**
 * StatusBar is the upper part of the application shell.
 * It contains main navigation like breadcrumbs, selects, avatar, and application specific buttons.
 */
export const StatusBar = ({ className }: StatusBarProps) => {
  const [leftContainerWidth, setLeftContainerWidth] = useState(0)
  const containerLeftRef = useRef<HTMLDivElement>(null)

  const handleBreadcrumbsCollapsed = useCallback(
    (isCollapsedToMinWidth: boolean) => {
      setLeftContainerWidth(
        isCollapsedToMinWidth ? containerLeftRef?.current?.scrollWidth || 0 : 0
      )
    },
    [setLeftContainerWidth, containerLeftRef]
  )

  return (
    <header className={`${'StatusBar'} ${className || ''}`} data-testid="layouts-header">
      <div
        ref={containerLeftRef}
        className={'StatusBar-left'}
        style={{ minWidth: leftContainerWidth || undefined }}
      >
        <WorkspaceSelectorPlaceholder />
        <LanguageSelectorPlaceholder />
        <AppBreadcrumbs
          containerRef={containerLeftRef}
          onCollapsedToMinWidthChange={handleBreadcrumbsCollapsed}
        />
      </div>

      <div className={'StatusBar-right'}>
        <div id="applicationHeader"></div>
      </div>
    </header>
  )
}

StatusBar.displayName = 'StatusBar'
