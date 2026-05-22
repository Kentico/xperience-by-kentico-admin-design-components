import * as React from 'react';
import { forwardRef, isValidElement, useMemo, useRef, useState, useEffect, type RefObject } from 'react'
import { useSliceOverflowingItems } from '@/hooks/useSliceOverflowingItems'
import { Paper, PaperElevation } from '@/components/Paper'
import { Icon } from '@/components/Icon'
import { Box } from '@/components/Box'
import { DropDownActionMenu } from '@/components/DropDownActionMenu'
import { MenuItem } from '@/components/MenuItem'
import { BreadcrumbItem } from './BreadcrumbItem'
import type { BreadcrumbProps, BreadcrumbsProps } from './Breadcrumbs.types'
import './Breadcrumbs.css'

const getHideableItems = (items: BreadcrumbProps[]): BreadcrumbProps[] => items.slice(1, -1)

// Grid unit = 8px
const breadcrumbMinWidth = 5 * 8
const breadcrumbWithArrowMinWidth = 6 * 8

export const Breadcrumbs = forwardRef<HTMLDivElement, BreadcrumbsProps>(
  ({ shorten, status, pin, breadcrumbs, containerRef, onCollapsedToMinWidthChange }, ref) => {
    const localBreadcrumbs = useMemo(() => getHideableItems(breadcrumbs), [breadcrumbs])
    const firstBreadcrumb = breadcrumbs[0]
    const lastBreadcrumb = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 1] : null

    const fallbackContainerRef = useRef<HTMLElement>(null)
    const firstBreadcrumbRef = useRef<HTMLDivElement>(null)
    const lastBreadcrumbRef = useRef<HTMLDivElement>(null)

    const [firstBreadcrumbWidth, setFirstBreadcrumbWidth] = useState(0)
    const [lastBreadcrumbWidth, setLastBreadcrumbWidth] = useState(0)

    // Observe first breadcrumb width
    useEffect(() => {
      if (!firstBreadcrumbRef.current) return
      const observer = new ResizeObserver(() => {
        setFirstBreadcrumbWidth(firstBreadcrumbRef.current?.offsetWidth || 0)
      })
      observer.observe(firstBreadcrumbRef.current)
      return () => observer.disconnect()
    }, [])

    // Observe last breadcrumb width
    useEffect(() => {
      if (!lastBreadcrumbRef.current) return
      const observer = new ResizeObserver(() => {
        setLastBreadcrumbWidth(lastBreadcrumbRef.current?.offsetWidth || 0)
      })
      observer.observe(lastBreadcrumbRef.current)
      return () => observer.disconnect()
    }, [])

    const { attachVisibleItemRef, visibleItems, hiddenItems } = useSliceOverflowingItems(
      localBreadcrumbs,
      (containerRef ?? fallbackContainerRef) as RefObject<HTMLElement>,
      'Beginning',
      shorten
    )

    const isCollapsedToMinWidth = useMemo(() => {
      const hasFirstItemMinWidth =
        firstBreadcrumbWidth === (lastBreadcrumb ? breadcrumbWithArrowMinWidth : breadcrumbMinWidth)
      const hasLastItemMinWidth = !lastBreadcrumb || lastBreadcrumbWidth === breadcrumbMinWidth
      return visibleItems.length === 0 && hasFirstItemMinWidth && hasLastItemMinWidth
    }, [visibleItems, firstBreadcrumbWidth, lastBreadcrumbWidth, lastBreadcrumb])

    useEffect(() => {
      onCollapsedToMinWidthChange?.(isCollapsedToMinWidth)
    }, [isCollapsedToMinWidth, onCollapsedToMinWidthChange])

    return (
      <Paper
        ref={ref}
        borderRadius="m"
        elevation={PaperElevation.Medium}
        className={'Breadcrumbs-container'}
        data-testid="breadcrumbs"
      >
        <BreadcrumbItem
          icon="home"
          path="/"
          showArrow={Boolean(firstBreadcrumb)}
          ariaLabel="home"
         
        />
        {firstBreadcrumb && (
          <BreadcrumbItem
            text={firstBreadcrumb.text}
            path={firstBreadcrumb.path}
            showArrow={Boolean(lastBreadcrumb)}
            current={!lastBreadcrumb}
            allowEllipsis={visibleItems.length === 0}
            ref={firstBreadcrumbRef}
           
          />
        )}
        {hiddenItems.length > 0 && (
          <DropDownActionMenu
            renderTrigger={(triggerRef, onTriggerClick) => (
              <BreadcrumbItem
                ref={triggerRef as unknown as React.Ref<HTMLDivElement>}
                showArrow
                ariaLabel="ellipsis"
                onClick={onTriggerClick}
              >
                <span className={'Breadcrumbs-pinIcon'}>
                  <Icon name="ellipsis" size="s" />
                </span>
              </BreadcrumbItem>
            )}
          >
            {hiddenItems.map((breadcrumb, index) => (
              <MenuItem
                key={index}
                primaryLabel={breadcrumb.text || ''}
                onClick={() => {
                  window.location.href = breadcrumb.path
                }}
              />
            ))}
          </DropDownActionMenu>
        )}
        {visibleItems.map((breadcrumb, index) => (
          <BreadcrumbItem
            ref={attachVisibleItemRef(index)}
            key={index}
            path={breadcrumb.path}
            text={breadcrumb.text}
            showArrow
          />
        ))}
        {lastBreadcrumb && (
          <BreadcrumbItem
            text={lastBreadcrumb.text}
            path={lastBreadcrumb.path}
            current
            showArrow={false}
            allowEllipsis={visibleItems.length === 0}
            ref={lastBreadcrumbRef}
          />
        )}
        {pin && (
          <BreadcrumbItem onClick={pin.onClick} ariaLabel={pin.tooltip}>
            <span className={'Breadcrumbs-pinIcon'}>
              <Icon name={pin.active ? 'star-full' : 'star-empty'} size="s" />
            </span>
          </BreadcrumbItem>
        )}
        {status != null && (typeof status !== 'object' || isValidElement(status) || Array.isArray(status)) && (
          <Box className={'Breadcrumbs-status'} spacingX="var(--spacing-s)">
            {status}
          </Box>
        )}
      </Paper>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'
