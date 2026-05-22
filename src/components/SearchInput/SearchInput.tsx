import * as React from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { Box } from '../Box'
import { Button } from '../Button'
import { ButtonColor } from '../Button/Button.types'
import { Icon } from '../Icon'
import { InputBase } from '../Input/InputBase'
import type { SearchInputProps } from './SearchInput.types'
import './SearchInput.css'

/**
 * A search input component with optional debouncing and clear button.
 * Wraps InputBase with search icon and submit functionality.
 */
export const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  (
    {
      placeholder = '',
      value,
      onSubmit,
      onChange,
      className,
      clearable = false,
      clearButtonTooltip,
      onClear,
      name,
      id,
      disabled = false,
      debounceMs = 0,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value)
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isControlled = value !== undefined

    // Sync internal value with external value
    useEffect(() => {
      if (isControlled) {
        setInternalValue(value)
      }
    }, [value, isControlled])

    // Cleanup debounce timer on unmount
    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }
      }
    }, [])

    const debouncedOnChange = useCallback(
      (newValue: string) => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current)
        }

        if (debounceMs > 0) {
          debounceTimerRef.current = setTimeout(() => {
            onChange(newValue)
          }, debounceMs)
        } else {
          onChange(newValue)
        }
      },
      [onChange, debounceMs]
    )

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInternalValue(newValue)
      debouncedOnChange(newValue)
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()

      // Cancel any pending debounce and immediately call onChange with current value
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
      onChange(internalValue)
      onSubmit?.()
    }

    const clearValue = () => {
      setInternalValue('')
      // Cancel any pending debounce
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
      onChange('')
      onClear?.()
    }

    const showMagnifier = clearable && !internalValue
    const showClearButton = clearable && internalValue

    return (
      <Box ref={ref} className={cn('SearchInput-wrapper', className)}>
        <form onSubmit={handleOnSubmit}>
          <InputBase
            placeholder={placeholder}
            onChange={handleOnChange}
            value={internalValue}
            name={name}
            id={id}
            disabled={disabled}
            actionElement={showMagnifier ? <Icon name="xp-magnifier" size="s" /> : undefined}
            clearButton={
              showClearButton ? (
                <Button
                  title={clearButtonTooltip}
                  onClick={clearValue}
                  color={ButtonColor.Quinary}
                  icon={<Icon name="xp-times-circle" size="s" />}
                  type="button"
                  aria-label="Clear search"
                />
              ) : undefined
            }
          />
        </form>
      </Box>
    )
  }
)

SearchInput.displayName = 'SearchInput'
