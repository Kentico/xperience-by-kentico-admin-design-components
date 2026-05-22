import * as React from 'react';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState, type ForwardedRef } from 'react'
import { cn } from '@/lib/cn'
import { Input } from '../Input'
import { IconToggleButtons } from '../ToggleButtons'
import { TooltipPlacement } from '../Tooltip'
import { ApplicationListView } from './ApplicationMenu.types'
import type { ApplicationListProps } from './ApplicationMenu.types'
import { ApplicationListGroup } from './ApplicationListGroup'
import { filterCategories } from './utils'
import './ApplicationList.css'

const ApplicationListLocalStorageKey = 'kxp.applicationList.view'

export const ApplicationList = forwardRef(
  (
    {
      categories,
      selectedCategory,
      applicationPath,
      overlayRef,
      className,
      handleClick,
      onOutsideClick,
    }: ApplicationListProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const savedView =
      (localStorage.getItem(ApplicationListLocalStorageKey) as ApplicationListView) ||
      ApplicationListView.List
    const [selectedView, setSelectedView] = useState(savedView)
    const [filterValue, setFilterValue] = useState('')
    const filterRef = useRef<HTMLInputElement>(null)

    const viewToggleButtons = [
      {
        id: ApplicationListView.List,
        icon: 'xp-list',
        tooltip: 'List view',
        tooltipPlacement: TooltipPlacement.Top,
      },
      {
        id: ApplicationListView.Tiles,
        icon: 'xp-l-grid-2-2',
        tooltip: 'Tiles view',
        tooltipPlacement: TooltipPlacement.Top,
      },
    ]

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value)
    }

    // Reset filter when category changes - intentional state sync for external prop change
    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilterValue('')
      filterRef.current?.focus()
    }, [selectedCategory])

    // Derive filtered categories from filter value
    const filteredCategories = useMemo(() => {
      if (filterValue) {
        return filterCategories(categories, filterValue)
      }
      return []
    }, [filterValue, categories])

    const containerClasses = cn(
      'ApplicationList-container',
      selectedCategory && 'ApplicationList-visible',
      className
    )

    const scrollableContentClasses = cn(
      'ApplicationList-scrollableContent',
      selectedView === ApplicationListView.List && 'ApplicationList-listView'
    )

    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
          // Check if click happened outside of menu (inside the grayed out area)
          onOutsideClick(e)
          e.stopPropagation()
        }
      },
      [onOutsideClick]
    )

    return (
      <div
        ref={overlayRef}
        onMouseDown={handleOverlayClick}
        className={selectedCategory ? 'ApplicationList-overlay' : ''}
      >
        <div ref={ref} className={containerClasses}>
          {selectedCategory && (
            <div className={'ApplicationList-content'}>
              <div className={'ApplicationList-search'}>
                <Input
                  value={filterValue}
                  onChange={handleOnChange}
                  inputRef={filterRef}
                  placeholder="Search applications..."
                />
              </div>

              {filterValue ? (
                <div className={'ApplicationList-scrollable'}>
                  <div className={scrollableContentClasses}>
                    {filteredCategories.length ? (
                      filteredCategories.map((category, index) => (
                        <ApplicationListGroup
                          key={index}
                          category={category}
                          applicationPath={applicationPath}
                          view={selectedView}
                          handleClick={handleClick}
                        />
                      ))
                    ) : (
                      <span className={'ApplicationList-noItems'}>No applications found</span>
                    )}
                  </div>
                </div>
              ) : (
                <ApplicationListGroup
                  category={selectedCategory}
                  applicationPath={applicationPath}
                  view={selectedView}
                  handleClick={handleClick}
                  renderToggleButtons={() => (
                    <IconToggleButtons
                      items={viewToggleButtons}
                      onChange={(id) => {
                        setSelectedView(id as ApplicationListView)
                        localStorage.setItem(ApplicationListLocalStorageKey, id)
                      }}
                      selectedItemId={selectedView}
                    />
                  )}
                />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

ApplicationList.displayName = 'ApplicationList'
