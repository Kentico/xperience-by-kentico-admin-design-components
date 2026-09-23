import * as React from 'react';
/**
 * Edit Template Action Components
 *
 * These components provide action buttons and dropdown menus for the EditTemplate.
 * They support form submission, data validation, and command execution.
 */

import { type FC, type RefObject, useCallback, useMemo } from 'react'
import { Box, Button, ButtonColor } from '@/components'
import { DropDownActionMenu } from '@/components/DropDownActionMenu'
import { MenuItem } from '@/components/MenuItem'
import type {
  EditTemplateActionComponent,
  BuilderButtonEditTemplateActionComponentProps,
  ButtonEditTemplateActionComponentProps,
  DropdownButtonEditTemplateActionComponentProps,
  PublishButtonEditTemplateActionComponentProps,
  ActionButtonProps,
  FormParameters,
  ConfirmationSubmissionResult,
  PublishActionButtonAdditionalSubmitParams,
} from './TemplateActions.types'

// ============================================================================
// Stub Hooks
// ============================================================================

/**
 * Stub hook for useComponent - returns a dynamic component by name.
 * In the real implementation, this would load components from a registry.
 */
function useComponent(
  _componentName: string
): FC<EditTemplateActionComponent> | null {
  // Stub: returns null as we don't have a component registry
  return null
}

/**
 * Stub hook for useEditableObjectStatusObserver.
 * Tracks editable object status changes in the real implementation.
 */
function useEditableObjectStatusObserver() {
  return {
    resetAllDataChanged: () => {
      // Stub: would reset all data changed flags
    },
  }
}

// ============================================================================
// Stub Components
// ============================================================================

/**
 * Stub ActionButton component.
 * In the real implementation, this executes commands with confirmation dialogs.
 */
const ActionButton: FC<ActionButtonProps> = ({
  action,
  getActionData,
  onBeforeExecuteCommand,
  onAfterExecuteCommand,
}) => {
  const handleClick = useCallback(async () => {
    // Call before handler
    onBeforeExecuteCommand?.()

    // Get action data if provided (would be used in full implementation)
    void getActionData?.()

    // Execute action (stub - in real impl this would call page commands)
    if (action.onClick) {
      await action.onClick()
    }

    // Call after handler with stub result
    onAfterExecuteCommand?.({
      status: 'success',
    })
  }, [action, getActionData, onBeforeExecuteCommand, onAfterExecuteCommand])

  return (
    <Button
      type="button"
      color={
        action.destructive
          ? ButtonColor.Alert
          : action.buttonColor === 'primary'
            ? ButtonColor.Primary
            : ButtonColor.Secondary
      }
      onClick={handleClick}
      disabled={action.disabled}
      title={action.title}
      label={action.label}
    />
  )
}

ActionButton.displayName = 'ActionButton'

/**
 * Stub ActionMenuItem component for dropdown menus.
 */
const ActionMenuItem: FC<{
  action: ActionButtonProps['action']
  primaryLabel: string
  onBeforeExecuteCommand?: () => void
  onAfterExecuteCommand?: (
    result: ConfirmationSubmissionResult | undefined
  ) => void
}> = ({ action, primaryLabel, onBeforeExecuteCommand, onAfterExecuteCommand }) => {
  const handleClick = useCallback(async () => {
    onBeforeExecuteCommand?.()

    if (action.onClick) {
      await action.onClick()
    }

    onAfterExecuteCommand?.({
      status: 'success',
    })
  }, [action, onBeforeExecuteCommand, onAfterExecuteCommand])

  return (
    <MenuItem
      primaryLabel={primaryLabel}
      onClick={handleClick}
      disabled={action.disabled}
    />
  )
}

ActionMenuItem.displayName = 'ActionMenuItem'

// ============================================================================
// Action Components
// ============================================================================

/**
 * Loads and renders a custom edit template action component dynamically.
 */
export const EditTemplateActionComponentLoader: FC<EditTemplateActionComponent> = (
  props
) => {
  const Component = useComponent(`${props.clientComponentName}EditTemplateActionComponent`)

  return <Box>{Component && <Component {...props} />}</Box>
}

EditTemplateActionComponentLoader.displayName = 'EditTemplateActionComponentLoader'

/**
 * @deprecated Component is deprecated and will be removed in the next version.
 *
 * A button component for edit template actions using the legacy builder pattern.
 */
export const BuilderButtonEditTemplateActionComponent: FC<
  BuilderButtonEditTemplateActionComponentProps
> = ({ ...props }) => {
  const onActionClick = useCallback(() => {
    const propsOnClickAction = props.onActionClick
    propsOnClickAction(props.parameter || '', props.submitFormBeforeAction || false)
  }, [props.onActionClick, props.parameter, props.submitFormBeforeAction])

  return (
    <Button
      type="button"
      color={props.isPrimary ? ButtonColor.Primary : ButtonColor.Secondary}
      onClick={onActionClick}
      disabled={props.disabled}
      title={props.title}
      label={props.label}
    />
  )
}

BuilderButtonEditTemplateActionComponent.displayName =
  'BuilderButtonEditTemplateActionComponent'

/**
 * A standard button component for edit template form actions.
 * Handles form data submission and command execution.
 */
export const ButtonEditTemplateActionComponent: FC<
  ButtonEditTemplateActionComponentProps
> = ({
  resetAllDataChanges,
  submitFormData,
  onBeforeExecuteCommand,
  onAfterExecuteCommand,
  ...props
}) => {
  const { resetAllDataChanged } = useEditableObjectStatusObserver()

  const actionButtonProps: ActionButtonProps = { action: props } as ActionButtonProps

  const getFormData = (): FormParameters => {
    return { data: (props.getFormValues && props.getFormValues()) || {} }
  }

  const beforeExecuteCommand = useCallback(() => {
    onBeforeExecuteCommand?.()
    if (resetAllDataChanges) {
      resetAllDataChanged()
    }
  }, [onBeforeExecuteCommand, resetAllDataChanges, resetAllDataChanged])

  return (
    <ActionButton
      {...actionButtonProps}
      getActionData={submitFormData ? getFormData : () => ({})}
      onBeforeExecuteCommand={beforeExecuteCommand}
      onAfterExecuteCommand={
        onAfterExecuteCommand as (
          result: ConfirmationSubmissionResult | undefined
        ) => void
      }
    />
  )
}

ButtonEditTemplateActionComponent.displayName = 'ButtonEditTemplateActionComponent'

/**
 * A dropdown button component for edit template actions.
 * Displays multiple actions in a dropdown menu.
 */
export const DropdownButtonEditTemplateActionComponent: FC<
  DropdownButtonEditTemplateActionComponentProps
> = ({
  actions,
  label,
  disabled,
  title,
  onBeforeExecuteCommand,
  onAfterExecuteCommand,
}) => {
  const actionsWithDisabledState = useMemo(
    () =>
      actions.map((action) => ({
        ...action,
        disabled: action.disabled || disabled,
      })),
    [actions, disabled]
  )

  return (
    <DropDownActionMenu
      renderTrigger={(buttonRef, onTriggerClick) => (
        <Button
          ref={buttonRef as RefObject<HTMLButtonElement>}
          onClick={() => onTriggerClick()}
          color={ButtonColor.Secondary}
          disabled={disabled}
          title={title}
          label={label}
        />
      )}
    >
      {actionsWithDisabledState.map((action) => (
        <ActionMenuItem
          key={action.parameter || action.label}
          action={action}
          primaryLabel={action.label}
          onBeforeExecuteCommand={onBeforeExecuteCommand}
          onAfterExecuteCommand={
            onAfterExecuteCommand as (
              result: ConfirmationSubmissionResult | undefined
            ) => void
          }
        />
      ))}
    </DropDownActionMenu>
  )
}

DropdownButtonEditTemplateActionComponent.displayName =
  'DropdownButtonEditTemplateActionComponent'

/**
 * A publish button component for edit template actions.
 * Handles publishing content with optional form data submission.
 */
export const PublishButtonEditTemplateActionComponent: FC<
  PublishButtonEditTemplateActionComponentProps
> = ({ onAfterExecuteCommand, onBeforeExecuteCommand, ...props }) => {
  const actionButtonProps: ActionButtonProps = { action: props } as ActionButtonProps

  const getActionData = (): PublishActionButtonAdditionalSubmitParams => {
    return {
      formValues: props.getFormValues && props.getFormValues(),
      updateBeforePublish: props.getDataChanged && props.getDataChanged(),
    }
  }

  return (
    <ActionButton
      {...actionButtonProps}
      getActionData={getActionData}
      onBeforeExecuteCommand={onBeforeExecuteCommand}
      onAfterExecuteCommand={
        onAfterExecuteCommand as (
          result: ConfirmationSubmissionResult | undefined
        ) => void
      }
    />
  )
}

PublishButtonEditTemplateActionComponent.displayName =
  'PublishButtonEditTemplateActionComponent'
