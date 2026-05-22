import * as React from 'react';
import { forwardRef, useContext, useRef, type ForwardedRef } from 'react'
import { useRadio } from '@react-aria/radio'
import classNames from 'classnames'
import { useHover } from '@react-aria/interactions'
import { VisuallyHidden } from '@react-aria/visually-hidden'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { RadioGroupContext } from '../RadioGroupContext'
import { Icon } from '@/components/Icon'
import { RadioGroupSize } from '../RadioGroup.types'
import { RadioCircle } from './RadioCircle/RadioCircle'
import { type RadioButtonProps } from './RadioButton.types'
import './RadioButton.css'

export const RadioButton = forwardRef(
  (
    {
      children,
      value,
      disabled = false,
      readOnly = false,
      alert = false,
      caption,
      alertCaption,
      inputRef: inputRefPassed,
      ...props
    }: RadioButtonProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const context = useContext(RadioGroupContext)

    if (!context) {
      throw new Error('RadioButton must be used within a RadioGroup component')
    }

    const componentDisabled = disabled || context.radioGroupState.isDisabled
    const componentReadOnly = readOnly || context.radioGroupState.isReadOnly

    const isSelected = context.radioGroupState.selectedValue === value
    const { isHovered, hoverProps } = useHover({})

    const localRef = useRef<HTMLInputElement>(null)
    const inputRef = inputRefPassed || localRef
    const { inputProps } = useRadio(
      {
        value,
        isDisabled: disabled,
        children,
        ...getDataAndAccessibilityProps(props),
      },
      context.radioGroupState,
      inputRef,
    )

    const sizeClass = classNames(
      context.size === RadioGroupSize.Small && 'RadioButton-sizeS',
      context.size === RadioGroupSize.Medium && 'RadioButton-sizeM',
      context.size === RadioGroupSize.Large && 'RadioButton-sizeL',
    )

    const radioButtonClasses = classNames(
      'RadioButton',
      componentDisabled && 'RadioButton-disabled',
      alert && 'RadioButton-alert',
      isSelected && 'RadioButton-selected',
      componentReadOnly && 'RadioButton-readOnly',
    )

    const labelClasses = classNames('RadioButton-label', sizeClass)
    const captionAlertClasses = classNames('RadioButton-captionAlert', sizeClass)
    const captionClasses = classNames('RadioButton-caption', alert && 'RadioButton-withAlertCaption', sizeClass)
    const circleWrapper = classNames('RadioButton-circleWrapper', Boolean(children || caption) && 'RadioButton-withCaption')

    return (
      <div ref={ref} className={'RadioButton-radioButtonWrapper'}>
        <label className={radioButtonClasses} {...getDataAndAccessibilityProps(props)} {...hoverProps}>
          <VisuallyHidden style={{ position: 'unset' }}>
            {' '}
            {/*Default VisuallyHidden style breaks radio buttons in chrome*/}
            <input {...inputProps} ref={inputRef} />
          </VisuallyHidden>
          <div className={circleWrapper}>
            <RadioCircle
              selected={isSelected}
              hovered={isHovered}
              alert={alert}
              size={context.size}
              readOnly={componentReadOnly}
              disabled={componentDisabled}
              {...getDataAndAccessibilityProps(props)}
            />
          </div>
          <div className={labelClasses}>{children}</div>
        </label>
        {alert && alertCaption && (
          <div className={captionAlertClasses}>
            <div className={'RadioButton-alertIcon'}>
              <Icon name="xp-exclamation-triangle-inverted" />
            </div>
            {alertCaption}
          </div>
        )}
        {caption && <div className={captionClasses}>{caption}</div>}
      </div>
    )
  },
)

RadioButton.displayName = 'RadioButton'
