import * as React from 'react';
import { forwardRef, useEffect, useRef, useState, type RefObject, type ForwardedRef } from 'react'
import { useResizeObserver } from '@/hooks'
import { Button, ButtonColor, ButtonSize } from '../Button'
import { Icon } from '../Icon'
import { Input } from '../Input'
import type { ApplicationCategory } from '@/templates/App/App.types'
import type { ApplicationListMobileProps } from './ApplicationMenu.types'
import { ApplicationListView } from './ApplicationMenu.types'
import { ApplicationListGroup } from './ApplicationListGroup'
import { filterCategories, getPathWithoutBasePath } from './utils'
import './ApplicationListMobile.css'

export const ApplicationListMobile = forwardRef(
  (
    { categories, setIsOverflowing, handleClick }: ApplicationListMobileProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [filterValue, setFilterValue] = useState('')
    const filterRef = useRef<HTMLInputElement>(null)
    const [filteredCategories, setFilteredCategories] = useState<ApplicationCategory[]>([])
    const [visibleCategories, setVisibleCategories] = useState<ApplicationCategory[]>([])
    const [applicationPath, setApplicationPath] = useState('')
    const localRef = useRef<HTMLDivElement>(null)
    const scrollableRef = (ref as RefObject<HTMLDivElement>) || localRef
    const [filterActive, setFilterActive] = useState(false)

    useResizeObserver({
      ref: scrollableRef as RefObject<HTMLDivElement>,
      onResize: () => {
        if (scrollableRef.current) {
          setIsOverflowing(
            scrollableRef.current.offsetHeight < scrollableRef.current.scrollHeight
          )
        }
      },
    })

    useEffect(() => {
      const path = getPathWithoutBasePath(location.pathname).substring(1)
      const appPath = path.split('/')[0].toLowerCase()
      setApplicationPath(appPath)
    }, [])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value)
    }

    useEffect(() => {
      if (filterValue) {
        setFilteredCategories(filterCategories(categories, filterValue))
      } else {
        setFilteredCategories([])
      }
    }, [filterValue, categories])

    useEffect(() => {
      if (!filterActive) {
        setVisibleCategories(categories)
      } else if (filterValue) {
        setVisibleCategories(filteredCategories)
      } else {
        setVisibleCategories([])
      }
    }, [filterActive, filterValue, filteredCategories, categories])

    const handleCategoryClick = () => {
      handleClick()
    }

    return (
      <div ref={scrollableRef} className={'ApplicationListMobile-container'}>
        <div className={'ApplicationListMobile-title'}>
          {filterActive ? (
            <>
              <Button
                color={ButtonColor.Quinary}
                size={ButtonSize.L}
                icon={<Icon name="xp-arrow-left" size="s" />}
                onClick={() => setFilterActive(false)}
              />
              Search
            </>
          ) : (
            <span>Applications</span>
          )}
        </div>
        <div className={'ApplicationListMobile-search'}>
          <Input
            value={filterValue}
            onChange={handleOnChange}
            inputRef={filterRef}
            placeholder="Search applications..."
            onClick={() => setFilterActive(true)}
            onBlur={() => {
              if (!filterValue) {
                setFilterActive(false)
              }
            }}
          />
        </div>

        {visibleCategories.map((category, index) => (
          <ApplicationListGroup
            key={index}
            category={category}
            applicationPath={applicationPath}
            view={ApplicationListView.List}
            handleClick={handleCategoryClick}
            collapsible={!filterActive}
          />
        ))}

        {filterActive && filterValue && !filteredCategories.length && (
          <span className={'ApplicationListMobile-noItems'}>No applications found</span>
        )}
      </div>
    )
  }
)

ApplicationListMobile.displayName = 'ApplicationListMobile'
