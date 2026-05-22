/**
 * NamedComponents barrel export
 *
 * NamedComponents are specialized cell renderers for common cell types.
 * These components wrap existing UI components (Link, Tag, SimpleStatus, etc.)
 * for use within Table cells.
 */

export {
  LinkTableCellComponent,
  type LinkTableCellComponentProps,
} from './LinkTableCellComponent'

export {
  StringTableCellComponent,
  type StringTableCellComponentProps,
} from './StringTableCellComponent'

export {
  TagTableCellComponent,
  type TagTableCellComponentProps,
} from './TagTableCellComponent'

export {
  SimpleStatusTableCellComponent,
  type SimpleStatusTableCellComponentProps,
} from './SimpleStatusTableCellComponent'
