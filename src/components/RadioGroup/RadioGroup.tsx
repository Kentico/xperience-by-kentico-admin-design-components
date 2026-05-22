import * as React from 'react';
import { forwardRef, useMemo, type ForwardedRef } from 'react'
import { useRadioGroup } from '@react-aria/radio'
import { useRadioGroupState } from '@react-stately/radio'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { FormEditMode } from '@/components/types/FormEditMode'
import { FormItemWrapper } from '@/components/FormItemWrapper'
import { type RadioGroupProps, RadioGroupSize } from './RadioGroup.types'
import { RadioGroupContext } from './RadioGroupContext'
import './RadioGroup.css'

/**
 * `RadioGroup` is a container for multiple radio buttons rendered via `RadioButton` components.
 */
export const RadioGroup = forwardRef(
  (
    { size = RadioGroupSize.Medium, inline = false, labelActionsElement, disabled, readOnly, ...props }: RadioGroupProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const state = useRadioGroupState({
      isDisabled: disabled,
      isRequired: props.markAsRequired,
      isReadOnly: readOnly,
      ...props,
    })

    const { radioGroupProps } = useRadioGroup(props, state)

    const radioGroupClasses = classNames('RadioGroup', inline && 'RadioGroup-inline', readOnly && 'RadioGroup-readOnly')
    const contextValue = useMemo(() => ({ size, radioGroupState: state }), [size, state])

    return (
      <FormItemWrapper
        ref={ref}
        labelActionsElement={labelActionsElement}
        editMode={readOnly ? FormEditMode.ReadOnly : disabled ? FormEditMode.Disabled : FormEditMode.Default}
        {...props}
      >
        <div
          className={radioGroupClasses}
          {...radioGroupProps}
          {...getDataAndAccessibilityProps(props)}
          data-testid={props.name}
          data-readonly={readOnly}
        >
          <RadioGroupContext.Provider value={contextValue}>{props.children}</RadioGroupContext.Provider>
        </div>
      </FormItemWrapper>
    )
  },
)

RadioGroup.displayName = 'RadioGroup'
