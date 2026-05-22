import * as React from 'react';
import { cloneElement, forwardRef, type ForwardedRef, type ReactElement, type RefObject } from 'react'
import classNames from 'classnames'
import { useFocusRing } from '@react-aria/focus'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { OptionalTooltip } from '@/components/Tooltip'
import { Icon } from '@/components/Icon'
import { Colors } from '@/tokens/colors'
import { TagMode, type TagProps } from './Tag.types'
import './Tag.css'

export const Tag = forwardRef(
  (
    {
      label,
      tooltipText,
      onClick,
      onRemoveClick,
      onRemoveMouseDown,
      disabled,
      readOnly,
      removable,
      background = {
        color: Colors.BackgroundTagDefault,
      },
      isDragging,
      fullWidth,
      leadingButton,
      mode,
      tooltipTextAsHtml,
      ...props
    }: TagProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const mainTagButtonFocus = useFocusRing()
    const removeTagButtonFocus = useFocusRing()
    const leadingTagButtonFocus = useFocusRing()

    const brightnessClass = mode === TagMode.Light ? 'Tag-light' : 'Tag-dark'

    const containerClasses = classNames(
      'Tag-tagContainer',
      disabled && 'Tag-disabled',
      fullWidth && 'Tag-fullWidth',
      isDragging && 'Tag-dragged'
    )

    const mainClasses = classNames(
      'Tag-tagMain',
      brightnessClass,
      onRemoveClick && 'Tag-withRemove',
      leadingButton && 'Tag-withLeadingButton',
      disabled && 'Tag-disabled',
      fullWidth && 'Tag-fullWidth'
    )

    const mainButtonClasses = classNames(
      'Tag-button',
      mainClasses,
      !readOnly && !disabled && mainTagButtonFocus.isFocusVisible && 'Tag-focused'
    )

    const removeButtonClasses = classNames(
      'Tag-button',
      'Tag-tagRemove',
      brightnessClass,
      disabled && 'Tag-disabled',
      !readOnly && !disabled && removeTagButtonFocus.isFocusVisible && 'Tag-focused'
    )

    const leadingButtonClasses = classNames(
      'Tag-button',
      'Tag-leadingButton',
      brightnessClass,
      disabled && 'Tag-disabled',
      leadingTagButtonFocus.isFocusVisible && 'Tag-focused'
    )

    const tagLabel = (labelRef: RefObject<HTMLDivElement>) => (
      <div ref={labelRef} className={'Tag-tagLabel'}>
        {label}
      </div>
    )

    const isTooltipProvided = Boolean(tooltipText?.length)

    return (
      <OptionalTooltip
        text={isTooltipProvided ? '' : label}
        tooltipText={tooltipText}
        tooltipTextAsHtml={tooltipTextAsHtml}
        customRenderText={(labelRef) => (
          <div
            ref={ref}
            {...getDataAndAccessibilityProps(props)}
            className={containerClasses}
            style={
              disabled
                ? undefined
                : {
                    background: background.color,
                  }
            }
          >
            {!readOnly &&
              leadingButton &&
              cloneElement(leadingButton as ReactElement, {
                className: leadingButtonClasses,
                ...leadingTagButtonFocus.focusProps,
              } as Record<string, unknown>)}
            {onClick && !readOnly ? (
              <button
                type="button"
                onClick={onClick}
                className={mainButtonClasses}
                disabled={disabled}
                aria-label={label}
                aria-disabled={disabled}
                {...mainTagButtonFocus.focusProps}
              >
                {tagLabel(labelRef as RefObject<HTMLDivElement>)}
              </button>
            ) : (
              <div className={mainClasses}>
                {tagLabel(labelRef as RefObject<HTMLDivElement>)}
              </div>
            )}
            {!readOnly && (onRemoveClick || removable) && (
              <button
                type="button"
                onClick={onRemoveClick}
                onMouseDown={onRemoveMouseDown}
                className={removeButtonClasses}
                disabled={disabled}
                aria-label={`remove ${label}`}
                aria-disabled={disabled}
                {...removeTagButtonFocus.focusProps}
              >
                <Icon name="xp-cancel" size="s" />
              </button>
            )}
          </div>
        )}
      />
    )
  }
)

Tag.displayName = 'Tag'
