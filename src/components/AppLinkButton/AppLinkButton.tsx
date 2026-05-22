import * as React from 'react';
import { forwardRef, type MouseEventHandler, type RefObject } from 'react'
import { useHref, useNavigate } from 'react-router-dom'
import { LinkButton } from '../LinkButton'
import type { AppLinkButtonProps } from './AppLinkButton.types'

/**
 * A LinkButton with react-router integration for SPA navigation.
 *
 * For relative URLs (starting with '/'), clicking triggers client-side
 * navigation via react-router's navigate() function, preventing a full
 * page reload.
 *
 * For external/absolute URLs or when a target is specified (e.g., '_blank'),
 * the default browser behavior is preserved.
 */
export const AppLinkButton = forwardRef<HTMLAnchorElement, AppLinkButtonProps>(
  ({ href, ...props }, ref) => {
    const navigate = useNavigate()
    const absoluteHref = useHref(href)
    const isRelativeUrl = href.startsWith('/')

    const onClick: MouseEventHandler<HTMLElement> = (event) => {
      if (props.target || !isRelativeUrl) {
        // If developer specified absolute URL or custom target (i.e. _blank),
        // do not dynamically navigate to the route, but keep default behavior,
        // as the navigate() cannot change the target.
        return
      }

      event.preventDefault()
      navigate(href)
    }

    return (
      <LinkButton
        anchorRef={ref as RefObject<HTMLAnchorElement>}
        {...props}
        href={isRelativeUrl ? absoluteHref : href}
        onClick={onClick}
        disabled={props.disabled}
      />
    )
  }
)

AppLinkButton.displayName = 'AppLinkButton'
