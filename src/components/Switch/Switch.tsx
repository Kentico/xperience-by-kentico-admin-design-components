import * as React from 'react';
import { forwardRef, useRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { useFocusRing } from '@react-aria/focus'
import { useSwitch } from '@react-aria/switch'
import { useToggleState } from '@react-stately/toggle'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { generateId } from '@/lib/generateId'
import { Spinner } from '@/components/Spinner'
import { FormItemWrapper } from '@/components/FormItemWrapper'
import { SwitchSize, type SwitchProps } from './Switch.types'
import './Switch.css'

export const Switch = forwardRef(
  (
    { size, value, label, disabled, inProgress, onChange, labelActionsElement, ...props }: SwitchProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { isFocusVisible, focusProps } = useFocusRing()
    const id = useRef<string>(`switch-${generateId()}`)
    const switchState = useToggleState({ isSelected: value, onChange })
    const inputRef = useRef<HTMLInputElement>(null)

    const { inputProps } = useSwitch(
      {
        isSelected: value,
        onChange,
        isDisabled: disabled,
        'aria-label': label ?? (value ? 'On' : 'Off'),
      },
      switchState,
      inputRef
    )

    const switchSizeClasses = classNames(
      size === SwitchSize.M && 'Switch-switchSizeMedium',
      size === SwitchSize.L && 'Switch-switchSizeLarge'
    )

    const switchStateClasses = classNames(value ? 'Switch-switchOn' : 'Switch-switchOff')

    const switchClasses = classNames(
      'Switch',
      switchStateClasses,
      disabled && 'Switch-disabledSwitch',
      isFocusVisible && 'Switch-focused'
    )

    const switchBaseClasses = classNames(
      'Switch-switchBase',
      switchStateClasses,
      switchSizeClasses,
      disabled && 'Switch-disabled'
    )

    const switchTriggerClasses = classNames(
      'Switch-switchTrigger',
      switchSizeClasses,
      switchStateClasses,
      inProgress && 'Switch-switchInProgress'
    )

    const switchLabelClasses = classNames('Switch-switchLabel', switchSizeClasses)

    const onToggle = () => {
      if (!inProgress && !disabled) {
        onChange(!value)
      }
    }

    return (
      <FormItemWrapper
        ref={ref}
        label={label}
        inlineWrapperClassnames={switchClasses}
        id={id.current}
        inline
        disabled={disabled}
        labelClassnames={switchLabelClasses}
        onInlineWrapperClick={onToggle}
        labelActionsElement={labelActionsElement}
        {...getDataAndAccessibilityProps(props)}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...inputProps} {...focusProps} id={id.current} />
        </VisuallyHidden>
        <div className={switchBaseClasses} aria-hidden="true">
          <div className={switchTriggerClasses}>
            {inProgress && !disabled && (
              <Spinner className={'Switch-triggerInProgress'} />
            )}
          </div>
        </div>
      </FormItemWrapper>
    )
  }
)

Switch.displayName = 'Switch'
