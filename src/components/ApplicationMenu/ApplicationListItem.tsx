import * as React from 'react';
import { forwardRef, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Icon } from '../Icon'
import { OptionalTooltip, TooltipPlacement } from '../Tooltip'
import { ApplicationListItemState } from './ApplicationMenu.types'
import type { ApplicationListItemProps } from './ApplicationMenu.types'
import './ApplicationListItem.css'

export const ApplicationListItem = forwardRef<HTMLLIElement, ApplicationListItemProps>(
  ({ state, application, handleClick }, ref) => {
    const rowClasses = cn(
      'ApplicationListItem-row',
      state === ApplicationListItemState.Activated && 'ApplicationListItem-activated'
    )

    const linkPath = application.path.startsWith('/')
      ? application.path
      : `/${application.path}`

    const renderText = useCallback(
      (tooltipRef: React.RefObject<HTMLElement>) => (
        <NavLink
          className={rowClasses}
          to={linkPath}
          onClick={handleClick}
        >
          <div className={'ApplicationListItem-icon'}>
            <Icon name={application.icon} size="s" />
          </div>
          <span className={'ApplicationListItem-label'} ref={tooltipRef as React.RefObject<HTMLSpanElement>}>
            {application.name}
          </span>
        </NavLink>
      ),
      [application.icon, application.name, linkPath, handleClick, rowClasses]
    )

    return (
      <li className={'ApplicationListItem-listItem'} ref={ref}>
        <OptionalTooltip
          text={application.name}
          placement={TooltipPlacement.Right}
          customRenderText={renderText}
        />
      </li>
    )
  }
)

ApplicationListItem.displayName = 'ApplicationListItem'
