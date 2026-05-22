import * as React from 'react';
import { forwardRef, type CSSProperties } from 'react'
import { useFocusRing } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Icon } from '../Icon'
import { OptionalTooltip } from '../Tooltip'
import type { OptionTileProps } from './OptionTile.types'
import './OptionTile.css'

export const OptionTile = forwardRef<HTMLButtonElement, OptionTileProps>(
  (props, ref) => {
    const {
      label,
      startIcon,
      endIcon,
      tabIndex,
      block = false,
      maxWidth,
      onClick,
      shouldExpand,
      ...rest
    } = props

    const { isFocusVisible, focusProps } = useFocusRing()

    const tileClasses = cn(
      'OptionTile',
      block && 'OptionTile-block',
      isFocusVisible && 'OptionTile-focused',
      (shouldExpand || shouldExpand === undefined) && 'OptionTile-expand'
    )

    const buttonStyle: CSSProperties | undefined = maxWidth ? { maxWidth } : undefined

    return (
      <OptionalTooltip
        text={label}
        customRenderText={(refForTruncatedElement) => (
          <button
            ref={ref}
            className={tileClasses}
            tabIndex={tabIndex}
            onClick={onClick}
            type="button"
            aria-label={label}
            style={buttonStyle}
            {...focusProps}
            {...getDataAndAccessibilityProps(rest as Record<string, unknown>)}
          >
            {startIcon && (
              <div className={'OptionTile-startIcon'}>
                <Icon name={startIcon} />
              </div>
            )}

            <span ref={refForTruncatedElement as React.RefObject<HTMLSpanElement>} className={'OptionTile-label'}>
              {label}
            </span>

            {endIcon && (
              <div className={'OptionTile-endIcon'}>
                <Icon name={endIcon} />
              </div>
            )}
          </button>
        )}
      />
    )
  }
)

OptionTile.displayName = 'OptionTile'
