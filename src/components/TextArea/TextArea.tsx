import * as React from 'react';
import {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import classNames from 'classnames'
import { generateId } from '@/lib/generateId'
import type { TextAreaProps } from './TextArea.types'
import './TextArea.css'

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      onValueChange,
      onSubmit,
      autoResize = false,
      maxRows = 10,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const generatedId = useRef(`textarea-${generateId()}`).current
    const textareaId = id || generatedId

    useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onValueChange(e.target.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && onSubmit) {
        e.preventDefault()
        onSubmit()
      }
    }

    // Auto-resize effect
    useEffect(() => {
      if (autoResize && textareaRef.current) {
        const textarea = textareaRef.current
        textarea.style.height = 'auto'

        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10) || 20
        const maxHeight = lineHeight * maxRows

        const newHeight = Math.min(textarea.scrollHeight, maxHeight)
        textarea.style.height = `${newHeight}px`
      }
    }, [value, autoResize, maxRows])

    return (
      <textarea
        ref={textareaRef}
        id={textareaId}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={classNames('TextArea-textarea', autoResize && 'TextArea-autoResize', className)}
        {...props}
      />
    )
  }
)

TextArea.displayName = 'TextArea'
