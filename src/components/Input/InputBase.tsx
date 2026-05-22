import * as React from 'react';
import classNames from 'classnames'
import { forwardRef, useRef, useState, type ReactElement, type FunctionComponent } from 'react'
import { useFocusRing } from '@react-aria/focus'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { isTextElementHorizontallyOverflowing } from '@/lib/isTextElementHorizontallyOverflowing'
import { generateId } from '@/lib/generateId'
import { usePreventAutoZoom } from '@/hooks'
import { Icon } from '@/components/Icon'
import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/Button'
import { TextWithLabel } from '@/components/TextWithLabel'
import type { InputBaseProps } from './InputBase.types'
import './InputBase.css'

const InputMode = {
  Numeric: 'numeric',
} as const

const InputBase = forwardRef<HTMLDivElement, InputBaseProps>(
  (
    {
      id = '',
      placeholder = '',
      invalid = false,
      value,
      disabled = false,
      readOnly = false,
      isSelect = false,
      type = 'text',
      actionElement,
      onChange,
      onBlur,
      name,
      onClick,
      onKeyPress,
      min,
      max,
      tabIndex,
      tooltipText,
      inputRef: inputRefPassed,
      clearButton,
      autoComplete,
      ...props
    },
    ref
  ) => {
    const localInputRef = useRef<HTMLInputElement>(null)
    const inputRef = inputRefPassed || localInputRef
    const [isInputFocused, setIsInputFocused] = useState(false)
    const rightGuardVisible =
      !isInputFocused && isTextElementHorizontallyOverflowing(inputRef.current)
    const inputId = id.length > 0 ? id : `input-${generateId()}`
    const actionElementDisplayName =
      actionElement &&
      ((actionElement as ReactElement).type as FunctionComponent).displayName
    const isIconAction = actionElementDisplayName === Icon.displayName
    const isButtonAction = actionElementDisplayName === Button.displayName
    const numericInput = type === 'number'
    const { disableZoom, enableZoom } = usePreventAutoZoom()

    const numericType = {
      type: 'text' as const,
      inputMode: InputMode.Numeric,
      pattern: '[0-9]*',
    }

    const inputTypeProps = numericInput ? numericType : { type }

    const { isFocusVisible, focusProps } = useFocusRing({ isTextInput: true })

    const classes = classNames(
      'InputBase-componentInput',
      invalid && 'InputBase-invalid',
      disabled && 'InputBase-disabled',
      rightGuardVisible && 'InputBase-overflowing'
    )

    const wrapperClasses = classNames(
      'InputBase-inputWrapper',
      Boolean(actionElement || clearButton) && 'InputBase-inputWrapperWithAction',
      rightGuardVisible && 'InputBase-inputWrapperWithGuard',
      invalid && 'InputBase-invalid',
      isFocusVisible && 'InputBase-focused',
      isSelect && 'InputBase-select'
    )

    const actionClasses = classNames(
      'InputBase-action',
      isIconAction && 'InputBase-icon',
      disabled && 'InputBase-disabled'
    )
    const clearButtonClasses = classNames('InputBase-action', 'InputBase-clear')

    const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (focusProps.onFocus) {
        focusProps.onFocus(e)
      }
      setIsInputFocused(true)
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        onBlur(e)
      }
      if (focusProps.onBlur) {
        focusProps.onBlur(e)
      }
      setIsInputFocused(false)
    }

    const isInputTextOverflowing = isTextElementHorizontallyOverflowing(
      inputRef.current
    )

    const getTooltipText = () => {
      if (tooltipText) {
        return tooltipText
      }

      if (type !== 'password' && isInputTextOverflowing) {
        return value?.toString() ?? ''
      }

      return ''
    }

    if (readOnly) {
      return (
        <TextWithLabel value={value?.toString()} />
      )
    }

    return (
      <div className={classes} ref={ref} role={props.role}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={wrapperClasses}
          onClick={(event) => {
            inputRef.current?.focus()

            if (onClick && !disabled) {
              onClick(event as React.MouseEvent<HTMLInputElement>)
            }
          }}
        >
          <Tooltip tooltipText={getTooltipText()}>
            <input
              ref={inputRef}
              placeholder={placeholder}
              id={inputId}
              value={value}
              disabled={disabled}
              readOnly={isSelect}
              onChange={onChange}
              onKeyDown={onKeyPress}
              name={name}
              min={min}
              max={max}
              tabIndex={tabIndex}
              onFocus={(e) => {
                handleOnFocus(e)
                enableZoom()
              }}
              onBlur={handleOnBlur}
              onTouchStart={disableZoom}
              {...getDataAndAccessibilityProps(props)}
              {...inputTypeProps}
              aria-invalid={invalid}
              autoComplete={autoComplete}
            />
          </Tooltip>
          {rightGuardVisible ? <div className={'InputBase-rightGuard'} /> : null}
          {clearButton ? (
            /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            <div
              className={classNames(clearButtonClasses)}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {clearButton}
            </div>
          ) : null}
          {actionElement ? (
            /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
            <div
              className={actionClasses}
              onClick={(e) => (isButtonAction ? e.stopPropagation() : null)}
            >
              {actionElement}
            </div>
          ) : null}
        </div>
      </div>
    )
  }
)

InputBase.displayName = 'InputBase'

export { InputBase }
