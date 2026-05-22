import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import dompurify from 'dompurify'
import { Icon } from '@/components/Icon'
import { Tooltip, TooltipPlacement } from '@/components/Tooltip'
import { useComponentEditStatus } from '@/hooks'
import { type FormItemWrapperProps } from './FormItemWrapper.types'
import './FormItemWrapper.css'

export const FormItemWrapper = forwardRef(
  (
    {
      label,
      markAsRequired,
      disabled,
      editMode,
      inactiveMessage,
      labelIconTooltip,
      labelIcon,
      labelClassnames,
      footerClassnames,
      subheadlineClassnames,
      childrenWrapperClassnames,
      inlineWrapperClassnames,
      invalid,
      validationMessage,
      statusText,
      explanationText,
      inline = false,
      id,
      children,
      explanationTextAsHtml,
      onInlineWrapperClick,
      labelActionsElement,
    }: FormItemWrapperProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const sanitizer = dompurify.sanitize

    const { isDisabled, isReadOnly } = useComponentEditStatus(editMode, disabled)

    const labelClasses = classNames(
      'FormItemWrapper-label',
      isDisabled && 'FormItemWrapper-disabled',
      isReadOnly && 'FormItemWrapper-readOnly'
    )
    const iconClasses = classNames(
      'FormItemWrapper-icon',
      isDisabled && 'FormItemWrapper-disabled',
      isReadOnly && 'FormItemWrapper-readOnly'
    )
    const validationMessageClasses = classNames(
      'FormItemWrapper-validationMessage',
      (statusText || explanationText) && 'FormItemWrapper-withExplanationText'
    )
    const footerClasses = classNames(
      'FormItemWrapper-footer',
      isDisabled && 'FormItemWrapper-disabled',
      footerClassnames
    )

    const tooltipText = isDisabled && inactiveMessage ? inactiveMessage : ''

    const childrenWrapped = label ? (
      <div className={childrenWrapperClassnames}>{children}</div>
    ) : (
      <Tooltip tooltipText={tooltipText} placement={TooltipPlacement.TopStart}>
        <div className={childrenWrapperClassnames}>{children}</div>
      </Tooltip>
    )

    const labelContent = (
      <>
        {markAsRequired && !isDisabled && !isReadOnly && (
          <span className={'FormItemWrapper-required'}>*</span>
        )}
        <span className={subheadlineClassnames}>{label}</span>
      </>
    )

    const labelWrapped = Boolean(label) && (
      <Tooltip tooltipText={tooltipText} placement={TooltipPlacement.TopStart}>
        <div>
          {id && !isReadOnly ? (
            <label
              htmlFor={id}
              className={classNames(labelClasses, labelClassnames)}
              aria-disabled={isDisabled}
            >
              {labelContent}
            </label>
          ) : (
            <span
              className={classNames(labelClasses, labelClassnames)}
              aria-disabled={isDisabled}
            >
              {labelContent}
            </span>
          )}
        </div>
      </Tooltip>
    )

    const labelIconWrapped = Boolean(labelIcon) && (
      <Tooltip tooltipText={labelIconTooltip} placement={TooltipPlacement.Top}>
        <span className={iconClasses}>
          <Icon name={labelIcon!} />
        </span>
      </Tooltip>
    )

    return (
      <div
        ref={ref}
        className={inline && label ? 'FormItemWrapper-inline' : undefined}
      >
        {inline ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div className={inlineWrapperClassnames} onClick={onInlineWrapperClick}>
              {childrenWrapped}
              {labelWrapped}
              {!isReadOnly && labelActionsElement && (
                <div className={'FormItemWrapper-action'}>{labelActionsElement}</div>
              )}
            </div>
            {labelIconWrapped && (
              <div className={'FormItemWrapper-inlineIcon'}>{labelIconWrapped}</div>
            )}
          </>
        ) : (
          <>
            {(labelWrapped || labelIconWrapped) && (
              <div
                className={classNames(
                  'FormItemWrapper-labelWrapper',
                  isReadOnly && 'FormItemWrapper-readOnly'
                )}
              >
                {labelWrapped}
                {labelIconWrapped}
                {!isReadOnly && labelActionsElement && (
                  <div className={'FormItemWrapper-action'}>{labelActionsElement}</div>
                )}
              </div>
            )}
            {childrenWrapped}
          </>
        )}

        {((invalid && validationMessage) || statusText || explanationText) && (
          <div className={footerClasses}>
            {invalid && validationMessage && (
              <div
                className={validationMessageClasses}
                data-testid="invalid-state-validation"
              >
                <div className={'FormItemWrapper-alertIcon'}>
                  <Icon name="xp-exclamation-triangle-inverted" />
                </div>
                {validationMessage}
              </div>
            )}
            {!isReadOnly && statusText && !invalid && (
              <div className={'FormItemWrapper-statusText'}>{statusText}</div>
            )}
            {explanationText &&
              !isReadOnly &&
              (explanationTextAsHtml ? (
                <div
                  className={'FormItemWrapper-explanationText'}
                  dangerouslySetInnerHTML={{ __html: sanitizer(explanationText) }}
                />
              ) : (
                <div className={'FormItemWrapper-explanationText'}>{explanationText}</div>
              ))}
          </div>
        )}
      </div>
    )
  }
)

FormItemWrapper.displayName = 'FormItemWrapper'
