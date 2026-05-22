import * as React from 'react';
import { type ReactNode } from 'react'
import { useFocusRing } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { Icon, type IconSize } from '../Icon'
import { Spinner } from '../Spinner'
import { Tooltip, TooltipPlacement } from '../Tooltip'
import { ButtonColor, ButtonSize } from '../Button/Button.types'
import '../Button/Button.css'
import type { LinkButtonProps } from './LinkButton.types'
import './LinkButton.css'

const renderIcon = (icon: ReactNode, size?: IconSize): ReactNode => {
  if (typeof icon === 'string') return size ? <Icon name={icon} size={size} /> : <Icon name={icon} />
  return icon
}

/**
 * A link-styled button that renders as an `<a>` element with button appearance.
 * When disabled or in progress, renders as a non-interactive `<div>`.
 * Reuses Button.css for consistent styling with the Button component.
 */
export const LinkButton = ({
  onClick,
  href,
  target,
  tabIndex,
  anchorRef,
  size = ButtonSize.M,
  color = ButtonColor.Primary,
  label,
  icon,
  trailingIcon,
  fillContainer,
  destructive,
  inProgress,
  disabled,
  className,
  title,
}: LinkButtonProps) => {
  const { isFocusVisible, focusProps } = useFocusRing()
  const isDisabled = Boolean(disabled || inProgress)

  const hasLabel = Boolean(label)
  const isIconOnly = !hasLabel && Boolean(icon || trailingIcon)
  const iconSize: IconSize | undefined = color === ButtonColor.Quinary ? 's' : undefined

  const buttonClasses = cn(
    'Button',
    `Button-${color}`,
    `Button-${size}`,
    destructive && 'Button-destructive',
    isIconOnly && 'Button-iconOnly',
    'LinkButton-anchorButton',
    isDisabled &&
      cn(
        'LinkButton-disabled',
        color === 'primary' && 'LinkButton-disabledPrimary',
        color === 'secondary' && 'LinkButton-disabledSecondary',
        color === 'tertiary' && 'LinkButton-disabledTertiary'
      ),
    className
  )

  const content = (
    <>
      {inProgress ? (
        <span className={'Button-icon'}>
          <Spinner />
        </span>
      ) : (
        icon && (
          <span className={'Button-icon'}>{renderIcon(icon, iconSize)}</span>
        )
      )}
      {label}
      {!inProgress && trailingIcon && (
        <span className={'Button-icon'}>{renderIcon(trailingIcon, iconSize)}</span>
      )}
    </>
  )

  const sharedProps = {
    className: buttonClasses,
    'aria-label': label,
  }

  return (
    <Tooltip tooltipText={title} placement={TooltipPlacement.Top}>
      <div
        className={cn(
          'LinkButton-buttonWrapper',
          !fillContainer && 'LinkButton-buttonWrapperFit'
        )}
      >
        {!isDisabled ? (
          <a
            ref={anchorRef}
            {...sharedProps}
            {...focusProps}
            onClick={onClick}
            tabIndex={tabIndex}
            href={href}
            target={target}
            style={isFocusVisible ? { boxShadow: 'var(--focus-default)' } : undefined}
          >
            {content}
          </a>
        ) : (
          <div {...sharedProps} aria-disabled>
            {content}
          </div>
        )}
      </div>
    </Tooltip>
  )
}

LinkButton.displayName = 'LinkButton'
