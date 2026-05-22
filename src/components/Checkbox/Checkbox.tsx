import * as React from 'react';
import { forwardRef, useEffect, useRef, useState, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { useFocusRing } from '@react-aria/focus'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { generateId } from '@/lib/generateId'
import { FormItemWrapper } from '@/components/FormItemWrapper'
import { FormEditMode } from '@/components/types/FormEditMode'
import { CheckboxSize, type CheckboxProps } from './Checkbox.types'
import { TickIcon } from './CheckboxTickIcon'
import './Checkbox.css'

const Checkbox = forwardRef(
  (
    {
      name,
      label,
      size = CheckboxSize.M,
      indetermined = false,
      disabled = false,
      readOnly = false,
      invalid = false,
      checked = false,
      onChange,
      onClick,
      markAsRequired,
      tabIndex,
      highlighted = false,
      inactiveMessage,
      labelIcon,
      labelIconTooltip,
      explanationText,
      validationMessage,
      inputRef,
      ...props
    }: CheckboxProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const localInputRef = useRef<HTMLInputElement>(null)
    const actualInputRef = inputRef || localInputRef

    const [isChecked, setChecked] = useState<boolean | undefined>(checked)
    const [isIndetermined, setIndetermined] = useState<boolean>(indetermined)

    const { isFocusVisible, focusProps } = useFocusRing()

    useEffect(() => {
      setIndetermined(indetermined)
      setChecked(indetermined ? undefined : checked)
    }, [checked, indetermined])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked && !isIndetermined
      setChecked(newChecked)
      setIndetermined(false)
      onChange?.(event, newChecked)
    }

    const sizeClasses = classNames(
      size === CheckboxSize.S && 'Checkbox-sizeS',
      size === CheckboxSize.M && 'Checkbox-sizeM',
      size === CheckboxSize.L && 'Checkbox-sizeL'
    )

    const checkboxWrapperClasses = classNames(
      'Checkbox-checkboxWrapper',
      disabled && 'Checkbox-disabled',
      invalid && 'Checkbox-invalid',
      readOnly && 'Checkbox-readOnly'
    )

    const checkboxLabelClasses = classNames(
      'Checkbox-checkboxLabel',
      sizeClasses,
      invalid && 'Checkbox-invalid',
      disabled && 'Checkbox-disabled',
      readOnly && 'Checkbox-readOnly'
    )

    const checkboxFrameClasses = classNames(
      'Checkbox-checkboxFrame',
      sizeClasses,
      isIndetermined && 'Checkbox-indetermined',
      isChecked && 'Checkbox-checked',
      invalid && 'Checkbox-invalid',
      disabled && 'Checkbox-disabled',
      !readOnly && isFocusVisible && 'Checkbox-focused',
      !readOnly && highlighted && 'Checkbox-highlighted',
      readOnly && 'Checkbox-readOnly'
    )

    const indeterminedIconClasses = classNames(
      'Checkbox-indeterminedIcon',
      sizeClasses,
      readOnly && 'Checkbox-readOnly'
    )

    const footerClasses = classNames('Checkbox-footer', sizeClasses)

    const indeterminedIcon = <span className={indeterminedIconClasses} />
    const id = useRef<string>(`checkbox-${generateId()}`)

    const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation()
      if (onClick) {
        onClick(e)
      }
    }

    const onWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      if (e.target === e.currentTarget) {
        actualInputRef.current?.click()
      }
    }

    const onCustomInputClick = () => {
      actualInputRef.current?.click()
    }

    return (
      <FormItemWrapper
        ref={ref}
        id={id.current}
        label={label}
        markAsRequired={markAsRequired}
        disabled={disabled}
        inactiveMessage={inactiveMessage}
        labelIcon={labelIcon}
        labelIconTooltip={labelIconTooltip}
        invalid={invalid}
        validationMessage={validationMessage}
        explanationText={explanationText}
        labelClassnames={checkboxLabelClasses}
        inlineWrapperClassnames={checkboxWrapperClasses}
        footerClassnames={footerClasses}
        tooltipAsHtml={props.tooltipAsHtml}
        explanationTextAsHtml={props.explanationTextAsHtml}
        inline
        onInlineWrapperClick={onWrapperClick}
        editMode={readOnly ? FormEditMode.ReadOnly : disabled ? FormEditMode.Disabled : FormEditMode.Default}
      >
        <VisuallyHidden>
          <input
            type="checkbox"
            ref={actualInputRef}
            id={id.current}
            name={name}
            checked={isChecked ?? false}
            onChange={handleChange}
            disabled={disabled || readOnly}
            onClick={onInputClick}
            tabIndex={tabIndex}
            {...getDataAndAccessibilityProps(props)}
            {...focusProps}
            data-testid={name ? `${name}Checkbox` : undefined}
            data-readonly={readOnly}
          />
        </VisuallyHidden>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <span
          className={checkboxFrameClasses}
          onClick={onCustomInputClick}
          data-testid={name || 'checkbox-default'}
          data-checked={isChecked}
        >
          {isIndetermined ? (
            indeterminedIcon
          ) : (
            <TickIcon checked={isChecked} size={size} disabled={disabled} readOnly={readOnly} />
          )}
        </span>
      </FormItemWrapper>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
