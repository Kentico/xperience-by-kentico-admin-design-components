export interface BrowseButtonProps {
  /** File types which file input should accept. */
  readonly accept?: string
  /** Indicates if the browse button is disabled. Defaults to `false`. */
  readonly disabled?: boolean
  /** Text displayed in button label. */
  readonly label: string
  /** The tooltip message displayed when the browse button is disabled. */
  readonly inactiveMessage?: string
  /** Indicates if the file input allows multiple files to be uploaded. Defaults to `true`. */
  readonly allowMultipleFiles?: boolean
  /** Event handler fired when file is being uploaded. */
  readonly onUpload: (files: FileList) => void
}
