import * as React from 'react';
import { forwardRef, useCallback, useState, type MouseEvent, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '../Icon'
import { ApplicationTile, ApplicationTileState } from '../ApplicationTile'
import { ApplicationListItem } from './ApplicationListItem'
import { ApplicationListView, ApplicationListItemState } from './ApplicationMenu.types'
import type { ApplicationListGroupProps } from './ApplicationMenu.types'
import './ApplicationListGroup.css'

export const ApplicationListGroup = forwardRef<HTMLDivElement, ApplicationListGroupProps>(
  (
    { category, applicationPath, handleClick, renderToggleButtons, collapsible, view },
    ref
  ) => {
    const [collapsed, setCollapsed] = useState(false)

    const headerClasses = cn('ApplicationListGroup-header', collapsible && 'ApplicationListGroup-collapsible')
    const listClasses = cn(
      'ApplicationListGroup-list',
      view === ApplicationListView.List ? 'ApplicationListGroup-listView' : 'ApplicationListGroup-tilesView'
    )
    const titleClasses = cn(
      'ApplicationListGroup-categoryTitle',
      renderToggleButtons && 'ApplicationListGroup-withToggle'
    )
    const scrollableContentClasses = cn(
      'ApplicationListGroup-scrollableContent',
      view === ApplicationListView.List && 'ApplicationListGroup-listView'
    )

    const onLeftButtonClick = useCallback(
      (event: MouseEvent<HTMLElement>) => {
        // Prevent closing menu on Safari middle button click
        if (event.button === 0 && category) {
          handleClick(category)
        }
      },
      [category, handleClick]
    )

    const handleHeaderClick = useCallback(() => {
      setCollapsed((prev) => !prev)
    }, [])

    const handleHeaderKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        setCollapsed((prev) => !prev)
      }
    }, [])

    return (
      <div ref={ref}>
        <div
          className={headerClasses}
          onClick={collapsible ? handleHeaderClick : undefined}
          onKeyDown={collapsible ? handleHeaderKeyDown : undefined}
          role={collapsible ? 'button' : undefined}
          tabIndex={collapsible ? 0 : undefined}
        >
          <div className={titleClasses}>{category?.name}</div>
          {collapsible ? (
            <span className={'ApplicationListGroup-icon'}>
              <Icon name={collapsed ? 'xp-chevron-down' : 'xp-chevron-up'} />
            </span>
          ) : null}
          {renderToggleButtons ? renderToggleButtons() : null}
        </div>

        {!collapsed && (
          <div className={renderToggleButtons ? 'ApplicationListGroup-scrollable' : undefined}>
            <div className={renderToggleButtons ? scrollableContentClasses : undefined}>
              <ul className={listClasses}>
                {category?.applications.map((application) => {
                  const normalizedAppPath = application.path.replace(/^\//, '').toLowerCase()

                  if (view === ApplicationListView.List) {
                    return (
                      <ApplicationListItem
                        key={application.path}
                        state={
                          normalizedAppPath === applicationPath
                            ? ApplicationListItemState.Activated
                            : ApplicationListItemState.Default
                        }
                        application={application}
                        handleClick={onLeftButtonClick}
                      />
                    )
                  }

                  const linkPath = application.path.startsWith('/')
                    ? application.path
                    : `/${application.path}`

                  return (
                    <li key={application.path}>
                      <ApplicationTile
                        state={
                          normalizedAppPath === applicationPath
                            ? ApplicationTileState.Activated
                            : ApplicationTileState.Default
                        }
                        label={application.name}
                        iconName={application.icon}
                        link={linkPath}
                        onClick={onLeftButtonClick}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
)

ApplicationListGroup.displayName = 'ApplicationListGroup'
