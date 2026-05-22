import * as React from 'react';
import { forwardRef, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { generateId } from '@/lib/generateId'
import type { InputProps } from './Input.types'
import './Input.css'

export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      value,
      placeholder = '',
      disabled = false,
      invalid = false,
      type = 'text',
      name,
      id,
      tabIndex,
      autoComplete,
      inputRef: inputRefPassed,
      onChange,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      className,
    },
    ref
  ) => {
    const localInputRef = useRef<HTMLInputElement>(null)
    const inputRef = inputRefPassed || localInputRef
    const generatedId = useRef(`input-${generateId()}`).current
    const inputId = id || generatedId
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
      inputRef.current?.focus()
      if (onClick && !disabled) {
        onClick(e as unknown as React.MouseEvent<HTMLInputElement>)
      }
    }

    const wrapperClasses = cn(
      'Input-wrapper',
      disabled && 'Input-disabled',
      invalid && 'Input-invalid',
      className
    )

    const inputWrapperClasses = cn(
      'Input-inputWrapper',
      isFocused && 'Input-focused'
    )

    return (
      <div className={wrapperClasses} ref={ref}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className={inputWrapperClasses} onClick={handleWrapperClick}>
          <input
            ref={inputRef}
            type={type}
            placeholder={placeholder}
            id={inputId}
            value={value}
            disabled={disabled}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={onKeyDown}
            name={name}
            tabIndex={tabIndex}
            autoComplete={autoComplete}
            aria-invalid={invalid}
          />
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'
