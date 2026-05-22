import * as React from 'react';
import {
  forwardRef,
  useRef,
  useState,
  useCallback,
  useEffect,
  Children,
  type RefObject,
  type ReactElement,
  type FunctionComponent,
  type ReactNode,
} from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { generateId } from '@/lib/generateId'
import { Button, ButtonColor } from '@/components/Button'
import { FormEditMode } from '@/components/types/FormEditMode'
import { FormItemWrapper } from '@/components/FormItemWrapper'
import { DropDownActionMenu } from '@/components/DropDownActionMenu'
import { Icon } from '@/components/Icon'
import { InputBase } from '@/components/Input'
import { MenuItem } from '@/components/MenuItem'
import type { MenuItemProps } from '@/components/MenuItem'
import type { SelectProps } from './Select.types'
import './Select.css'

const maxSelectMenuHeight = '40vh'

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      children,
      value: parentValue,
      onChange,
      disabled,
      readOnly,
      id,
      label,
      placeholder,
      invalid,
      validationMessage,
      markAsRequired,
      name,
      tabIndex,
      labelIcon,
      labelIconTooltip,
      inactiveMessage,
      explanationText,
      inputRef,
      maxContentHeight,
      clearButtonTooltip,
      clearable,
      labelActionsElement,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const selectRef = ref || localRef
    const [value, setValue] = useState(parentValue)
    const [open, setOpen] = useState(false)
    const inputId = id && id.length > 0 ? id : `input-${generateId()}`

    useEffect(() => {
      setValue(parentValue)
    }, [parentValue])

    const classes = classNames('Select', !disabled && 'Select-clickable')

    const onToggle = useCallback((newOpen: boolean) => {
      setOpen(newOpen)
    }, [])

    const clearValue = () => {
      setValue('')
      setOpen(false)
      onChange?.('')
    }

    const onSelectMenuItem = (menuItemProps: MenuItemProps) => {
      setValue(menuItemProps.value)
      setOpen(false)
      onChange?.(menuItemProps.value?.toString())
    }

    const mapChildrenDeep = (
      childNodes: ReactNode,
      callback: (child: ReactElement) => ReactNode
    ): ReactNode => (
      <>
        {Children.map(childNodes as ReactElement[], (child) => {
          const childProps = child?.props as Record<string, unknown> | undefined
          return childProps?.children
            ? mapChildrenDeep(childProps.children as ReactNode, callback)
            : callback(child)
        })}
      </>
    )

    let inputText = ''
    const childrenMapped = mapChildrenDeep(
      children,
      (child: ReactElement) => {
        if (
          (child?.type as FunctionComponent)?.displayName ===
          MenuItem.displayName
        ) {
          const menuItemProps = child.props as MenuItemProps
          if (menuItemProps.value === value) {
            inputText = menuItemProps.primaryLabel || ''
          }
          if (menuItemProps.disabled) {
            return child
          }
          return (
            <MenuItem
              {...menuItemProps}
              onClick={() => onSelectMenuItem(menuItemProps)}
              selected={menuItemProps.value === value}
            />
          )
        } else {
          return child
        }
      }
    )

    return (
      <div ref={selectRef} className={classes}>
        <DropDownActionMenu
          open={open}
          onToggle={onToggle}
          matchTriggerWidth
          placement="bottom-start"
          maxContentHeight={maxContentHeight || maxSelectMenuHeight}
          renderTrigger={(triggerRefProp, onTriggerClick) => (
            <FormItemWrapper
              id={inputId}
              label={label}
              markAsRequired={markAsRequired}
              disabled={disabled}
              editMode={
                readOnly
                  ? FormEditMode.ReadOnly
                  : disabled
                    ? FormEditMode.Disabled
                    : FormEditMode.Default
              }
              inactiveMessage={inactiveMessage}
              labelIcon={labelIcon}
              labelIconTooltip={labelIconTooltip}
              invalid={invalid}
              validationMessage={validationMessage}
              explanationText={explanationText}
              tooltipAsHtml={props.tooltipAsHtml}
              explanationTextAsHtml={props.explanationTextAsHtml}
              labelActionsElement={labelActionsElement}
            >
              <InputBase
                inputRef={inputRef}
                value={inputText}
                actionElement={
                  <Icon
                    name={open ? 'xp-chevron-up' : 'xp-chevron-down'}
                  />
                }
                clearButton={
                  clearable && !disabled && !readOnly && value ? (
                    <Button
                      title={clearButtonTooltip}
                      onClick={clearValue}
                      color={ButtonColor.Quinary}
                      icon="xp-times-circle"
                    />
                  ) : undefined
                }
                onClick={onTriggerClick}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    onTriggerClick()
                  }
                }}
                ref={triggerRefProp as RefObject<HTMLInputElement>}
                disabled={disabled}
                readOnly={readOnly}
                id={inputId}
                placeholder={placeholder}
                invalid={invalid}
                name={name}
                tabIndex={tabIndex}
                isSelect
                role="combobox"
                tooltipAsHtml={props.tooltipAsHtml}
                explanationTextAsHtml={props.explanationTextAsHtml}
                {...getDataAndAccessibilityProps(props)}
              />
            </FormItemWrapper>
          )}
        >
          {childrenMapped}
        </DropDownActionMenu>
      </div>
    )
  }
)

Select.displayName = 'Select'
