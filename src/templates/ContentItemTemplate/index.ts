/**
 * ContentItemTemplate
 *
 * Templates for content item management including editing, translation,
 * and usage tracking.
 */

// ContentItemEditTemplate exports
export {
  ContentItemEditTemplate,
  ContentItemCommandResultStatus,
  FormEditMode,
  ContentContext,
  useContentContext,
} from './ContentItemEditTemplate'

export type {
  ContentItemEditTemplateProps,
  ContentItemState,
  ContentItemStateBase,
  ContentItemAction,
  ContentItemCommandResult,
  ContentItemCommandParameters,
  ContentItemSubmissionCommandParameters,
  ContentItemChangeCommandArguments,
  ContentItemStatus,
  FormItems,
  FormValues,
  FormRef,
  FormParameters,
  FormComponentProps,
  FormCategoryProps,
  FormHeadings,
  FormChangeResult,
  SubmitEventHandler,
  ValidatedFormChangeEvent,
  ValidationResult,
  EditableHeaderConfirmResult,
  NavigationItem,
  NavigationConfiguration,
  TemplatePropertiesContextType,
  NotificationBarMessage,
  ContentFolderId,
  ContentVersionStatusEnum,
} from './ContentItemEditTemplate.types'

// ContentItemTranslateTemplate exports
export {
  ContentItemTranslateTemplate,
  SidePanelSize,
} from './ContentItemTranslateTemplate'

export type {
  ContentItemTranslateProps,
  CascadeTranslateCommandArguments,
  CascadeTranslateCommandResult,
  TableComponentBaseProps,
  TableRow as ContentItemTranslateTableRow,
  TableRowId,
  TableManager as ContentItemTranslateTableManager,
  NestedPageActions,
  TableAction as ContentItemTranslateTableAction,
  TableColumn as ContentItemTranslateTableColumn,
  SubmitAction,
} from './ContentItemTranslateTemplate.types'

export { ActionType as ContentItemTranslateActionType } from './ContentItemTranslateTemplate.types'

export type { SidePanelSize as ContentItemSidePanelSize } from './ContentItemTranslateTemplate.types'

// ContentItemUsageTemplate exports
export { ContentItemUsageTemplate } from './ContentItemUsageTemplate'

// Re-export with aliases to avoid collisions
export {
  ActionType as ContentItemUsageActionType,
  CellType as ContentItemUsageCellType,
} from './ContentItemUsageTemplate'

export type {
  ContentItemUsageTemplateProps,
  TableColumn as ContentItemUsageTableColumn,
  TableCell,
  ActionCell,
  NamedComponentCell,
  RelatedItemsTableCellComponentProps,
  Action as ContentItemUsageAction,
  TableRow as ContentItemUsageTableRow,
  StructuredTableRow,
  StructuredListingProps,
  LoadStructuredDataResult,
  LoadRelatedItemsCommandArgs,
} from './ContentItemUsageTemplate'
