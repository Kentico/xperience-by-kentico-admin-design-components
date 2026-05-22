import * as React from 'react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useFocusRing } from '@react-aria/focus'
import { cn } from '@/lib/cn'
import { Icon } from '../Icon'
import { Spinner } from '../Spinner'
import { Tooltip, TooltipPlacement } from '../Tooltip'
import { DropDownActionMenu } from '../DropDownActionMenu'
import { useSpinnerWithTimer } from '@/hooks'
import '../Button/Button.css'
import { SplitButtonDisabledState, type SplitButtonProps } from './SplitButton.types'
import './SplitButton.css'

const renderIcon = (icon: ReactNode): ReactNode => {
  if (typeof icon === 'string') return <Icon name={icon} />
  return icon
}

/**
 * A compound button with a primary action and a dropdown menu trigger.
 * The left part is a button (or link) and the right part is a chevron
 * that opens a DropDownActionMenu.
 */
export const SplitButton = ({
  size,
  color,
  disabledState: disabledStateProp,
  inProgress: inProgressProp,
  icon,
  open,
  onToggle,
  children,
  href,
  target,
  onClick,
  title,
  label,
  disabled,
}: SplitButtonProps) => {
  const disabledState = disabledStateProp ?? SplitButtonDisabledState.NONE
  const inProgress = inProgressProp ?? false

  const displaySpinner = useSpinnerWithTimer(inProgress)
  const [dropDownOpen, setDropDownOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const isDisabledAll =
    disabledState === SplitButtonDisabledState.ALL || disabled || inProgress
  const isDisabledPartial =
    disabledState === SplitButtonDisabledState.PARTIAL && !inProgress
  const isDisabled = isDisabledPartial || isDisabledAll
  const shouldDisableLink = isDisabled || inProgress

  // Controlled / uncontrolled dropdown toggle
  const handleTriggerClick = useCallback(() => {
    if (onToggle) {
      onToggle(!dropDownOpen)
    } else {
      setDropDownOpen((prev) => !prev)
    }
  }, [onToggle, dropDownOpen])

  const handleClose = useCallback(() => {
    if (onToggle) {
      onToggle(false)
    } else {
      setDropDownOpen(false)
    }
  }, [onToggle])

  // Sync external open prop to internal state
  useEffect(() => {
    setDropDownOpen(!!open)
  }, [open])

  // Notify parent of state changes
  useEffect(() => {
    onToggle?.(dropDownOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropDownOpen])

  const {
    isFocusVisible: isFocusVisibleMainButton,
    focusProps: focusPropsMainButton,
  } = useFocusRing()
  const {
    isFocusVisible: isFocusVisibleIconButton,
    focusProps: focusPropsIconButton,
  } = useFocusRing()

  // CSS class composition
  const colorClass = color === 'primary' ? 'SplitButton-primary' : 'SplitButton-secondary'
  const sizeClass = `SplitButton-${size}`

  const wrapperClasses = cn(
    'Button',
    `Button-${color}`,
    `Button-${size}`,
    'SplitButton-wrapper',
    isDisabled && 'SplitButton-disabled',
    colorClass
  )

  const mainButtonClasses = cn(
    'SplitButton-mainButton',
    'SplitButton-resetDefaultStyles',
    colorClass,
    sizeClass,
    isFocusVisibleMainButton && 'SplitButton-focused'
  )

  const dividerClasses = cn(
    'SplitButton-divider',
    color === 'secondary' && 'SplitButton-dividerSecondary'
  )

  const iconClasses = cn('SplitButton-icon', sizeClass)

  const iconButtonClasses = cn(
    'SplitButton-iconButton',
    'SplitButton-resetDefaultStyles',
    dropDownOpen && 'SplitButton-active',
    colorClass,
    iconClasses,
    sizeClass,
    isFocusVisibleIconButton && 'SplitButton-focused',
    isDisabledPartial && 'SplitButton-mainButtonDisabled'
  )

  // Main button content: icon (or spinner) + label
  const mainContent = (
    <>
      {icon ? (
        <span className={'Button-icon'}>
          {inProgress ? <Spinner /> : renderIcon(icon)}
        </span>
      ) : null}
      {label}
    </>
  )

  return (
    <>
      <div ref={wrapperRef} className={'SplitButton-container'}>
        <Tooltip tooltipText={title} placement={TooltipPlacement.Top}>
          <div className={wrapperClasses}>
            {/* Absolute spinner for no-icon mode */}
            {!icon && displaySpinner ? (
              <Spinner className={cn('SplitButton-iconLabelLoading', iconClasses)} />
            ) : null}

            {/* Main action: button or anchor */}
            {href === undefined ? (
              <button
                className={mainButtonClasses}
                {...focusPropsMainButton}
                onClick={onClick}
                type="button"
                disabled={isDisabled}
                aria-label={label ?? 'button'}
                tabIndex={isDisabled ? -1 : 0}
              >
                {mainContent}
              </button>
            ) : (
              <a
                className={mainButtonClasses}
                {...focusPropsMainButton}
                onClick={shouldDisableLink ? undefined : onClick}
                href={shouldDisableLink ? undefined : href}
                target={target}
                aria-label={label ?? 'link'}
                tabIndex={shouldDisableLink ? -1 : 0}
                aria-disabled={shouldDisableLink ? true : undefined}
                role={shouldDisableLink ? 'link' : undefined}
              >
                {mainContent}
              </a>
            )}

            {/* Divider between main action and chevron */}
            <div className={dividerClasses} />

            {/* Chevron dropdown trigger */}
            <button
              className={iconButtonClasses}
              {...focusPropsIconButton}
              type="button"
              tabIndex={isDisabledAll ? -1 : 0}
              onClick={isDisabledAll ? undefined : handleTriggerClick}
              aria-haspopup="true"
              aria-expanded={dropDownOpen}
            >
              <Icon
                name={dropDownOpen ? 'xp-chevron-up' : 'xp-chevron-down'}
              />
            </button>
          </div>
        </Tooltip>
      </div>

      <DropDownActionMenu
        isOpen={dropDownOpen}
        onClose={handleClose}
        triggerRef={wrapperRef}
      >
        {children}
      </DropDownActionMenu>
    </>
  )
}

SplitButton.displayName = 'SplitButton'
