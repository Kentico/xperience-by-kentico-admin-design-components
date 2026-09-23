import * as React from 'react';
import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, type IconSize } from '../Icon'
import { Spinner } from '../Spinner'
import type { ButtonProps } from './Button.types'
import { ButtonColor, ButtonSize } from './Button.types'
import './Button.css'

/**
 * Render icon - handles both ReactNode and string icon names
 */
const renderIcon = (icon: ReactNode, size?: IconSize): ReactNode => {
  if (typeof icon === 'string') {
    return size ? <Icon name={icon} size={size} /> : <Icon name={icon} />
  }
  return icon
}

/**
 * A flexible button component supporting multiple color variants and sizes.
 * Button text is provided via the `label` prop, not children (matching the
 * published @kentico/xperience-admin-components package):
 * ```tsx
 * <Button color="primary" label="Save" onClick={handleSave} />
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = ButtonColor.Secondary,
      size = ButtonSize.M,
      destructive,
      active,
      inProgress,
      fillContainer,
      badge,
      icon,
      trailingIcon,
      label,
      className,
      disabled,
      type = 'button',
      buttonRef,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || inProgress
    const hasLabel = Boolean(label)
    const isIconOnly = !hasLabel && Boolean(icon || trailingIcon)
    const iconSize: IconSize | undefined = color === ButtonColor.Quinary ? 's' : undefined

    // Use buttonRef if provided, otherwise use forwardRef
    const effectiveRef = buttonRef || ref

    return (
      <button
        ref={effectiveRef as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={isDisabled}
        className={cn(
          'Button',
          `Button-${color}`,
          `Button-${size}`,
          destructive && 'Button-destructive',
          active && 'Button-stateActive',
          isIconOnly && 'Button-iconOnly',
          badge && 'Button-badge',
          fillContainer && 'Button-fillContainer',
          className
        )}
        aria-label={props['aria-label'] || label || (isIconOnly ? 'button' : undefined)}
        {...props}
      >
        {inProgress ? (
          <span className={'Button-icon'}><Spinner size="small" /></span>
        ) : icon ? (
          <span className={'Button-icon'}>{renderIcon(icon, iconSize)}</span>
        ) : null}
        {label}
        {!inProgress && trailingIcon && <span className={'Button-icon'}>{renderIcon(trailingIcon, iconSize)}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'
