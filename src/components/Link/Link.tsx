import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import { useFocusRing } from '@react-aria/focus'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { type LinkProps } from './Link.types'
import './Link.css'

/**
 * Component wrapping the HTML anchor element.
 */
export const Link = forwardRef(
  ({ href, target, text, inactive, ellipsis, ...props }: LinkProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { isFocusVisible, focusProps } = useFocusRing()

    const wrapperClasses = classNames(
      'Link-linkWrapper',
      isFocusVisible && 'Link-focused',
      ellipsis && 'Link-ellipsis'
    )

    const trimmedText = text?.trim()
    const shownText = trimmedText ? trimmedText : href

    return (
      <div ref={ref} {...getDataAndAccessibilityProps(props)}>
        <div className={wrapperClasses}>
          {inactive ? (
            shownText
          ) : (
            <a href={href} target={target} rel="noopener" {...focusProps}>
              {shownText}
            </a>
          )}
        </div>
      </div>
    )
  }
)

Link.displayName = 'Link'
