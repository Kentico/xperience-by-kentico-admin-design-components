import * as React from 'react';
import { useState, type FC } from 'react'
import classNames from 'classnames'
import { Box } from '@/components/Box'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Headline, HeadlineSize } from '@/components/Headline'
import { Icon } from '@/components/Icon'
import { Input } from '@/components/Input'
import { Spacing } from '@/components/Layout'
import {
  EDITABLE_HEADER_DIALOG_MIN_WIDTH,
  type EditableHeaderProps,
} from './EditableHeader.types'
import './EditableHeader.css'

/**
 * EditableHeader displays a headline with an edit button.
 * Clicking the edit button opens a dialog to edit the value.
 *
 * @example
 * ```tsx
 * <EditableHeader
 *   value="Page Title"
 *   texts={{
 *     dialogHeadline: 'Edit page name',
 *     inputLabel: 'Name',
 *     confirmLabel: 'Save',
 *     cancelLabel: 'Cancel',
 *     closeTooltip: 'Close',
 *   }}
 *   onConfirm={async (value) => {
 *     const isValid = value.length > 0
 *     return { isValid, validationMessage: isValid ? undefined : 'Name is required' }
 *   }}
 * />
 * ```
 */
export const EditableHeader: FC<EditableHeaderProps> = ({
  value,
  texts,
  onConfirm,
  disabled = false,
  headlineSize = HeadlineSize.S,
  className,
}) => {
  const [showDialog, setShowDialog] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [validationMessage, setValidationMessage] = useState('')
  const [currentName, setCurrentName] = useState(value)
  const [submitInProgress, setSubmitInProgress] = useState(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value
    setCurrentName(inputText)
    // Clear validation on change
    if (invalid) {
      setInvalid(false)
      setValidationMessage('')
    }
  }

  const closeDialog = () => {
    setShowDialog(false)
    setValidationMessage('')
    setInvalid(false)
    setCurrentName(value)
  }

  const openDialog = () => {
    setCurrentName(value)
    setShowDialog(true)
  }

  const handleConfirmClick = async () => {
    setSubmitInProgress(true)
    const result = await onConfirm(currentName)
    setSubmitInProgress(false)

    if (result.isValid) {
      setInvalid(false)
      setShowDialog(false)
    } else {
      setInvalid(true)
      setValidationMessage(result.validationMessage ?? '')
    }
  }

  const headerClasses = classNames(
    'EditableHeader-headerContainer',
    disabled && 'EditableHeader-disabled',
    className
  )

  return (
    <>
      <Box spacingBottom={Spacing.XL}>
        <Headline size={headlineSize}>
          <Box className={headerClasses}>
            <span className={'EditableHeader-headerSpacing'}>{value}</span>
            <Button
              icon={<Icon name="xp-edit" size="xs" />}
              size={ButtonSize.XS}
              color={ButtonColor.Quinary}
              disabled={disabled}
              onClick={openDialog}
              aria-label="Edit"
            />
          </Box>
        </Headline>
      </Box>
      <Dialog
        minWidth={EDITABLE_HEADER_DIALOG_MIN_WIDTH}
        isOpen={showDialog}
        headline={texts.dialogHeadline}
        isDismissable={true}
        actionInProgress={submitInProgress}
        onClose={closeDialog}
        overlayClassName={'EditableHeader-overlay'}
        headerCloseButton={
          texts.closeTooltip
            ? {
                tooltipText: texts.closeTooltip,
                shortcuts: 'Esc',
              }
            : undefined
        }
        cancelAction={{
          label: texts.cancelLabel,
          onClick: closeDialog,
        }}
        confirmAction={{
          label: texts.confirmLabel,
          onClick: handleConfirmClick,
          destructive: false,
        }}
      >
        <div className={'EditableHeader-inputWrapper'}>
          <label className={'EditableHeader-inputLabel'} htmlFor="editable-header-input">
            {texts.inputLabel}
            <span aria-hidden="true"> *</span>
          </label>
          <Input
            id="editable-header-input"
            name="editable-header-input"
            type="text"
            value={currentName}
            invalid={invalid}
            onChange={handleOnChange}
          />
          {invalid && validationMessage && (
            <div className={'EditableHeader-validationMessage'}>
              <span className={'EditableHeader-alertIcon'}>
                <Icon name="xp-exclamation-triangle-inverted" size="s" />
              </span>
              {validationMessage}
            </div>
          )}
        </div>
      </Dialog>
    </>
  )
}

EditableHeader.displayName = 'EditableHeader'
