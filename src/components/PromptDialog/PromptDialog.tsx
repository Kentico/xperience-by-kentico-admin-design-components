import * as React from 'react';
import { useState, useCallback, useEffect, useRef, type FC, type ChangeEvent, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { Dialog } from '@/components/Dialog'
import { Input } from '@/components/Input'
import { Box } from '@/components/Box'
import type { PromptDialogProps } from './PromptDialog.types'
import './PromptDialog.css'

/**
 * Default max width for the prompt dialog.
 * Matches the confirmation dialog default.
 */
const PROMPT_DIALOG_MAX_WIDTH = 600

/**
 * A dialog that prompts the user for text input.
 *
 * Wraps the Dialog component with a built-in Input field for collecting
 * user input. The confirm button can be disabled until the user enters
 * a value by setting `required={true}`.
 *
 * @example
 * ```tsx
 * const [showPrompt, setShowPrompt] = useState(false)
 * const [name, setName] = useState('')
 *
 * {showPrompt && (
 *   <PromptDialog
 *     isOpen={showPrompt}
 *     texts={{
 *       headline: "Enter your name",
 *       confirmLabel: "Submit",
 *       cancelLabel: "Cancel",
 *       inputPlaceholder: "Your name..."
 *     }}
 *     message="Please enter your name to continue."
 *     required
 *     onConfirmation={(value) => {
 *       setName(value)
 *       setShowPrompt(false)
 *     }}
 *     onCancellation={() => setShowPrompt(false)}
 *   />
 * )}
 * ```
 */
export const PromptDialog: FC<PromptDialogProps> = ({
  isOpen,
  texts,
  message,
  initialValue = '',
  isConfirmationButtonDestructive,
  confirmationButtonIcon,
  actionInProgress = false,
  required = false,
  onConfirmation,
  onCancellation,
  className,
  overlayClassName,
  maxWidth = PROMPT_DIALOG_MAX_WIDTH,
  inputType = 'text',
}) => {
  const [inputValue, setInputValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset input value when dialog opens with new initial value
  useEffect(() => {
    if (isOpen) {
      setInputValue(initialValue)
    }
  }, [isOpen, initialValue])

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      // Delay focus to allow dialog animation to complete
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  const handleConfirmation = useCallback(() => {
    onConfirmation(inputValue)
  }, [onConfirmation, inputValue])

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !actionInProgress) {
      // Only confirm if not required or if there's a value
      if (!required || inputValue.trim()) {
        e.preventDefault()
        handleConfirmation()
      }
    }
  }, [actionInProgress, required, inputValue, handleConfirmation])

  if (!isOpen) return null

  const isConfirmDisabled = required && !inputValue.trim()

  return (
    <Dialog
      isOpen={true}
      headline={texts.headline}
      onClose={onCancellation}
      isDismissable={true}
      actionInProgress={actionInProgress}
      maxWidth={maxWidth}
      className={className}
      overlayClassName={cn('PromptDialog-overlay', overlayClassName)}
      headerCloseButton={{
        tooltipText: texts.closeTooltip ?? 'Close',
        shortcuts: 'Esc',
      }}
      confirmAction={{
        label: texts.confirmLabel,
        onClick: handleConfirmation,
        destructive: isConfirmationButtonDestructive,
        icon: confirmationButtonIcon,
        disabled: isConfirmDisabled,
      }}
      cancelAction={{
        label: texts.cancelLabel,
        onClick: onCancellation,
      }}
    >
      <div className={'PromptDialog-content'}>
        {message && (
          <Box spacingBottom="var(--spacing-m)">
            {typeof message === 'string' ? <p className={'PromptDialog-message'}>{message}</p> : message}
          </Box>
        )}
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={texts.inputPlaceholder}
          type={inputType}
          disabled={actionInProgress}
          inputRef={inputRef}
          name="prompt-input"
        />
      </div>
    </Dialog>
  )
}

PromptDialog.displayName = 'PromptDialog'
