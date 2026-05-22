import type {
  ActionCell,
  ComponentCell,
  NamedComponentCell,
  StringCell,
} from '../../Table.types'

/**
 * Props for ActionCell component.
 * Omits 'type' as it's handled by the parent when selecting which cell component to render.
 */
export type ActionCellProps = Omit<ActionCell, 'type'>

/**
 * Props for NamedComponentCell component.
 * Omits 'type' as it's handled by the parent when selecting which cell component to render.
 */
export type NamedComponentCellProps = Omit<NamedComponentCell, 'type'>

/**
 * Props for StringCell component.
 * Omits 'type' as it's handled by the parent when selecting which cell component to render.
 */
export type StringCellProps = Omit<StringCell, 'type'>

/**
 * Props for ComponentCell component.
 * Omits 'type' as it's handled by the parent when selecting which cell component to render.
 */
export type ComponentCellProps = Omit<ComponentCell, 'type'>
