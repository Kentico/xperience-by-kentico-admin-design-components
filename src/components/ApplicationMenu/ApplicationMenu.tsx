import * as React from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useResizeObserver } from '@/hooks'
import { cn } from '@/lib/cn'
import { ApplicationTile, ApplicationTileState } from '../ApplicationTile'
import { TooltipPlacement } from '../Tooltip'
import { AvatarMenu } from '../Avatar'
import { DropDownPlacement } from '../DropDownActionMenu'
import type { ApplicationCategory } from '@/templates/App/App.types'
import type { ApplicationMenuProps } from './ApplicationMenu.types'
import { ApplicationList } from './ApplicationList'
import { getPathWithoutBasePath } from './utils'
import './ApplicationMenu.css'

// Default user profile when none provided
const defaultUserProfile = {
  username: 'admin',
  firstName: 'Admin',
  lastName: '',
}

export const ApplicationMenu = forwardRef<HTMLDivElement, ApplicationMenuProps>(
  ({ categories, userProfile = defaultUserProfile }, ref) => {
    const [selectedCategory, selectCategory] = useState<ApplicationCategory>()
    const [currentCategory, setCurrentCategory] = useState<ApplicationCategory>()
    const [applicationPath, setApplicationPath] = useState('')
    const [scrollbarVisible, setScrollbarVisible] = useState(false)

    const applicationListRef = useRef<HTMLDivElement>(null)
    const applicationListOverlayRef = useRef<HTMLDivElement>(null)
    const localRef = useRef<HTMLDivElement>(null)
    const applicationMenuRef = (ref as React.RefObject<HTMLDivElement>) || localRef
    const upperMenuRef = useRef<HTMLDivElement>(null)
    const accountPanelRef = useRef<HTMLLIElement>(null)

    const [displayAvatarMenu, setDisplayAvatarMenu] = useState(false)
    useResizeObserver({
      ref: upperMenuRef as RefObject<HTMLDivElement>,
      onResize: () => {
        if (upperMenuRef.current) {
          setScrollbarVisible(
            upperMenuRef.current.scrollHeight > upperMenuRef.current.offsetHeight
          )
        }
      },
    })

    useResizeObserver({
      ref: applicationMenuRef as RefObject<HTMLDivElement>,
      onResize: () => {
        if (applicationListRef.current) {
          const clientHeight = applicationMenuRef.current?.clientHeight
          applicationListRef.current.style.height = clientHeight
            ? `${clientHeight}px`
            : ''
        }
      },
    })

    const location = useLocation()

    const closeApplicationMenu = useCallback(() => {
      selectCategory(undefined)
      setDisplayAvatarMenu(false)
    }, [])

    const handleClick = useCallback(
      (e: MouseEvent) => {
        if (
          accountPanelRef.current &&
          !e.composedPath().includes(accountPanelRef.current)
        ) {
          setDisplayAvatarMenu(false)
        }
      },
      [accountPanelRef]
    )

    useEffect(() => {
      const menuRef = applicationMenuRef.current
      menuRef?.addEventListener('mousedown', handleClick as EventListener)
      return () => {
        menuRef?.removeEventListener('mousedown', handleClick as EventListener)
      }
    })

    const handleCategoryClick = (category: ApplicationCategory) => {
      // Unselect a category and roll in or set new selected category
      selectCategory(selectedCategory === category ? undefined : category)
    }

    const handleApplicationClick = (category: ApplicationCategory) => {
      setCurrentCategory(category)
      selectCategory(undefined)
    }

    const keyPressed = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          selectCategory(undefined)
          break
        case 'F2':
          // Open/close the application list
          const category = currentCategory ?? categories[0]
          selectCategory(selectedCategory ? undefined : category)
          break
        default:
          break
      }
    }

    useEffect(() => {
      document.addEventListener('keydown', keyPressed)
      return () => {
        document.removeEventListener('keydown', keyPressed)
      }
    })

    useEffect(() => {
      const path = getPathWithoutBasePath(location.pathname).toLowerCase()

      // Find the best (longest) matching application path across all categories
      let bestMatch = ''
      let matchedCategory: ApplicationCategory | undefined

      for (const cat of categories) {
        for (const app of cat.applications) {
          const appPathNorm = app.path.toLowerCase()
          if (
            (path === appPathNorm || path.startsWith(appPathNorm + '/')) &&
            appPathNorm.length > bestMatch.length
          ) {
            bestMatch = appPathNorm
            matchedCategory = cat
          }
        }
      }

      setApplicationPath(bestMatch.replace(/^\//, ''))
      setCurrentCategory(matchedCategory)
    }, [location, categories])

    const sidebarClasses = cn(
      'ApplicationMenu-sideBar',
      selectedCategory && 'ApplicationMenu-rollout',
      scrollbarVisible && 'ApplicationMenu-scrollable'
    )

    return (
      <div
        ref={applicationMenuRef}
        data-ignored-by-clickoutside={selectedCategory !== undefined ? 'true' : ''}
      >
        <div className={sidebarClasses}>
          <div className={'ApplicationMenu-upper'} ref={upperMenuRef}>
            <ul>
              <li className={'ApplicationMenu-logo'}>
                <Link to="/" aria-label="Logo" />
              </li>
              {categories.map((category, index) => (
                <li key={index}>
                  <ApplicationTile
                    iconName={category.icon}
                    state={
                      category.codeName === selectedCategory?.codeName ||
                      (!selectedCategory &&
                        category.codeName === currentCategory?.codeName)
                        ? ApplicationTileState.Activated
                        : ApplicationTileState.Default
                    }
                    tooltip={category.name}
                    tooltipPlacement={TooltipPlacement.Right}
                    label={category.name}
                    onClick={() => {
                      handleCategoryClick(category)
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={'ApplicationMenu-bottom'}>
            <ul>
              <li ref={accountPanelRef}>
                <AvatarMenu
                  userProfile={userProfile}
                  menuPlacement={DropDownPlacement.RightStart}
                  menuOpen={displayAvatarMenu}
                  setMenuOpen={setDisplayAvatarMenu}
                />
              </li>

            </ul>
          </div>
        </div>

        <ApplicationList
          ref={applicationListRef}
          overlayRef={applicationListOverlayRef}
          categories={categories}
          selectedCategory={selectedCategory}
          applicationPath={applicationPath}
          handleClick={handleApplicationClick}
          className={scrollbarVisible ? 'ApplicationMenu-scrollableApplicationList' : ''}
          onOutsideClick={closeApplicationMenu}
        />
      </div>
    )
  }
)

ApplicationMenu.displayName = 'ApplicationMenu'
