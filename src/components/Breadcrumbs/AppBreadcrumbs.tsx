import * as React from 'react';
import { forwardRef, useMemo } from 'react'
import { useBreadcrumbs } from './BreadcrumbsContext'
import { Breadcrumbs } from './Breadcrumbs'
import type { AppBreadcrumbsWrapperProps } from './Breadcrumbs.types'

/**
 * App template wrapper for Breadcrumbs that consumes the BreadcrumbsContext.
 * This component should be used within a BreadcrumbsProvider.
 */
export const AppBreadcrumbs = forwardRef<HTMLDivElement, AppBreadcrumbsWrapperProps>(
  ({ containerRef, onCollapsedToMinWidthChange }, ref) => {
    const { breadcrumbs, statusNode } = useBreadcrumbs()

    const filteredBreadcrumbs = useMemo(
      () => breadcrumbs.filter((breadcrumb) => breadcrumb?.text),
      [breadcrumbs]
    )

    return (
      <Breadcrumbs
        ref={ref}
        containerRef={containerRef}
        breadcrumbs={filteredBreadcrumbs}
        status={statusNode}
        onCollapsedToMinWidthChange={onCollapsedToMinWidthChange}
      />
    )
  }
)

AppBreadcrumbs.displayName = 'AppBreadcrumbs'
