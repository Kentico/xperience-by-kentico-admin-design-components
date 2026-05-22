import { createElement, type FunctionComponent } from 'react'
import type { NamedComponentCellProps } from './CellComponent.types'
import {
  LinkTableCellComponent,
  StringTableCellComponent,
  TagTableCellComponent,
  SimpleStatusTableCellComponent,
} from './NamedComponents'

// Type alias for generic component in registry
type GenericCellComponent = FunctionComponent<Record<string, unknown>>

/**
 * Registry of named table cell components.
 * Maps component names to their implementations.
 */
const ComponentRegistry: Record<string, GenericCellComponent> = {
  LinkTableCellComponent: LinkTableCellComponent as unknown as GenericCellComponent,
  StringTableCellComponent: StringTableCellComponent as unknown as GenericCellComponent,
  TagTableCellComponent: TagTableCellComponent as unknown as GenericCellComponent,
  SimpleStatusTableCellComponent: SimpleStatusTableCellComponent as unknown as GenericCellComponent,
}

/**
 * NamedComponentCell orchestrates the rendering of named table cell components.
 *
 * It looks up a component by name from the registry and renders it with the provided props.
 * The name property should match one of the supported component types:
 * - "Link" → LinkTableCellComponent
 * - "String" → StringTableCellComponent
 * - "Tag" → TagTableCellComponent
 * - "SimpleStatus" → SimpleStatusTableCellComponent
 *
 * @example
 * ```tsx
 * <NamedComponentCell
 *   name="Tag"
 *   componentProps={{ label: "Active", color: "BackgroundGreen60" }}
 * />
 * ```
 */
export const NamedComponentCell = ({ name, componentProps }: NamedComponentCellProps) => {
  const componentName = `${name}TableCellComponent`
  const Component = ComponentRegistry[componentName]

  if (!Component) {
    // Component not found in registry
    return null
  }

  return createElement(Component, componentProps)
}

NamedComponentCell.displayName = 'NamedComponentCell'
