import * as React from 'react';
import {
  useCallback,
  useState,
  type MouseEvent,
  type KeyboardEvent,
} from 'react'
import { SplitButton, SplitButtonDisabledState } from '../SplitButton'
import { MenuItem } from '../MenuItem'
import { ActionMenuDivider } from '../ActionMenuDivider'
import { Icon } from '../Icon'
import {
  ActionType,
  type Action,
  type ActionDivider,
  type ActionSplitButtonProps,
} from './ActionSplitButtons.types'
import './ActionSplitButtons.css'

/**
 * Checks if all nested actions are disabled.
 */
const areAllNestedActionsDisabled = (action: Action): boolean => {
  if (!action.actions || action.actions.length === 0) {
    return true
  }

  for (const actionItem of action.actions.filter(
    (a): a is Action => !isDivider(a)
  )) {
    const isNestedDisabled =
      actionItem.disabled && areAllNestedActionsDisabled(actionItem)
    if (!isNestedDisabled) {
      return false
    }
  }

  return true
}

/**
 * Checks if the action is an ActionDivider.
 */
const isDivider = (action: Action | ActionDivider): action is ActionDivider => {
  return (action as ActionDivider).isDivider === true
}

/**
 * Internal component for rendering click-type menu items.
 */
const ClickActionMenuItem = ({
  action,
  onAfterClick,
}: {
  action: Action
  onAfterClick?: () => void
}) => {
  const [inProgress, setInProgress] = useState(false)

  const handleClick = useCallback(
    async (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      onAfterClick?.()

      if (action.onClick) {
        setInProgress(true)
        e.preventDefault()
        await action.onClick()
        setInProgress(false)
      }
    },
    [action, onAfterClick]
  )

  return (
    <MenuItem
      primaryLabel={action.label}
      onClick={handleClick}
      disabled={action.disabled || inProgress}
      destructive={action.destructive}
      tooltipText={action.title}
      leadingElement={
        action.icon
          ? {
              element: <Icon name={action.icon} />,
              type: 'icon',
            }
          : undefined
      }
    />
  )
}

/**
 * Internal component for rendering link-type menu items.
 */
const LinkActionMenuItem = ({
  action,
  onAfterClick,
}: {
  action: Action
  onAfterClick?: () => void
}) => {
  const handleClick = useCallback(
    (_e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      onAfterClick?.()

      // For links with targets or absolute URLs, let the browser handle it
      if (action.target || (action.href && !action.href.startsWith('/'))) {
        return
      }

      // For relative URLs, we could integrate with router here
      // For now, we let the browser handle navigation
    },
    [action, onAfterClick]
  )

  // Wrap MenuItem in anchor for link behavior
  return (
    <a
      href={action.href}
      target={action.target}
      className={'ActionSplitButtons-linkWrapper'}
      onClick={action.disabled ? (e) => e.preventDefault() : handleClick}
    >
      <MenuItem
        primaryLabel={action.label}
        disabled={action.disabled}
        destructive={action.destructive}
        tooltipText={action.title}
        leadingElement={
          action.icon
            ? {
                element: <Icon name={action.icon} />,
                type: 'icon',
              }
            : undefined
        }
      />
    </a>
  )
}

/**
 * Renders a menu item based on the action type.
 */
const ActionMenuItem = ({
  action,
  onAfterClick,
}: {
  action: Action
  onAfterClick?: () => void
}) => {
  switch (action.type) {
    case ActionType.Click:
      return <ClickActionMenuItem action={action} onAfterClick={onAfterClick} />
    case ActionType.Link:
      return <LinkActionMenuItem action={action} onAfterClick={onAfterClick} />
    default:
      return null
  }
}

/**
 * ActionSplitButton - A split button with a dropdown menu of actions.
 *
 * Combines a primary action button with a dropdown menu containing
 * additional actions. Supports click-based and link-based actions.
 *
 * @example
 * ```tsx
 * <ActionSplitButton
 *   action={{
 *     type: 'click',
 *     label: 'Save',
 *     buttonColor: 'primary',
 *     onClick: () => console.log('Save clicked'),
 *     actions: [
 *       { type: 'click', label: 'Save and close', onClick: () => {} },
 *       { isDivider: true },
 *       { type: 'link', label: 'View history', href: '/history' },
 *     ],
 *   }}
 *   size="M"
 * />
 * ```
 */
export const ActionSplitButton = ({
  action,
  size = 'M',
  href,
  target,
  onClick,
  inProgress,
}: ActionSplitButtonProps) => {
  const [splitButtonIsOpen, setSplitButtonIsOpen] = useState(false)

  const hideActionMenu = useCallback(() => {
    setSplitButtonIsOpen(false)
  }, [])

  const getDisabledState = useCallback((): SplitButtonDisabledState => {
    const isDisabledCompletely =
      action.disabled && areAllNestedActionsDisabled(action)
    if (isDisabledCompletely) {
      return SplitButtonDisabledState.ALL
    }
    if (action.disabled) {
      return SplitButtonDisabledState.PARTIAL
    }
    return SplitButtonDisabledState.NONE
  }, [action])

  const handleToggle = useCallback((open: boolean) => {
    setSplitButtonIsOpen(open)
  }, [])

  const handleClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      onClick?.(e)
      setSplitButtonIsOpen(false)
    },
    [onClick]
  )

  const renderMenuItem = useCallback(
    (menuAction: Action | ActionDivider, index: number) => {
      if (isDivider(menuAction)) {
        return <ActionMenuDivider key={`divider-${index}`} />
      }

      const key = menuAction.identifier ?? `action-${index}`

      return (
        <ActionMenuItem
          key={key}
          action={menuAction}
          onAfterClick={hideActionMenu}
        />
      )
    },
    [hideActionMenu]
  )

  return (
    <SplitButton
      size={size}
      href={href}
      target={target}
      onClick={handleClick}
      label={action.label}
      disabledState={getDisabledState()}
      title={action.title}
      icon={action.icon ? <Icon name={action.icon} /> : undefined}
      inProgress={inProgress}
      color={action.buttonColor ?? 'primary'}
      open={splitButtonIsOpen}
      onToggle={handleToggle}
    >
      {action.actions?.map(renderMenuItem)}
    </SplitButton>
  )
}

ActionSplitButton.displayName = 'ActionSplitButton'
