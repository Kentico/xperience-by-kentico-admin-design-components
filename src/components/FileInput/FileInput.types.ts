export interface FileInputProps {
  /** Indicates if the file dialog should be opened. */
  readonly isOpen: boolean
  /** Indicates if the file input allows multiple files to be uploaded. */
  readonly allowMultiple: boolean
  /** File types which file input should accept. */
  readonly accept?: string
  /** Callback called when the file dialog closes. */
  readonly onClose: () => void
  /** Event handler fired when files are selected. */
  readonly onFileChange: (files: FileList) => void
}
