import type { ReactCodeMirrorProps } from '@uiw/react-codemirror'
import type { ReactNode } from 'react'

/**
 * Supported languages of code editor.
 */
export const CodeEditorLanguage = {
  Html: 'html',
  Css: 'css',
  Sql: 'sql',
  Xml: 'xml',
  Javascript: 'javascript',
} as const

export type CodeEditorLanguage =
  (typeof CodeEditorLanguage)[keyof typeof CodeEditorLanguage]

/**
 * Code editor props based on codemirror.
 */
export interface CodeEditorProps
  extends Omit<ReactCodeMirrorProps, 'extensions' | 'editable'> {
  /**
   * Language of the code editor.
   */
  readonly language: CodeEditorLanguage

  /**
   * Indicates if the code editor is disabled.
   */
  readonly disabled?: boolean

  /**
   * Label of the code editor.
   */
  readonly label?: string

  /**
   * Validation message if the code editor is in invalid state.
   */
  readonly validationMessage?: string

  /**
   * Indicates if the code editor is in invalid state.
   */
  readonly invalid?: boolean

  /**
   * Value of the code editor.
   */
  readonly value?: string

  /**
   * Explanation text of the code editor.
   */
  readonly explanationText?: string

  /**
   * Tooltip message displayed when the code editor is disabled.
   */
  readonly inactiveMessage?: string

  /**
   * Label icon.
   */
  readonly labelIcon?: string

  /**
   * Tooltip text for the label icon.
   */
  readonly labelIconTooltip?: string

  /**
   * Indicates if the user input is required.
   */
  readonly markAsRequired?: boolean

  /**
   * Data test ID.
   */

  /**
   * Dangerously sets explanation text as inner HTML.
   */
  readonly explanationTextAsHtml?: boolean

  /**
   * Dangerously sets tooltip as inner HTML.
   */
  readonly tooltipAsHtml?: boolean

  /**
   * Label actions element.
   */
  readonly labelActionsElement?: ReactNode
}
