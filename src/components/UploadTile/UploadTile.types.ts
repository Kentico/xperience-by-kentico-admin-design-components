/**
 * Indicates the size of the upload tile.
 */
export const UploadTileSize = {
  Full: 'Full',
  Compact: 'Compact',
} as const

export type UploadTileSize = (typeof UploadTileSize)[keyof typeof UploadTileSize]

export interface UploadTileProps {
  /**
   * Event handler fired when file is being uploaded.
   * @param files list of uploaded files.
   */
  readonly onUpload: (files: FileList) => void
  /**
   * Text displayed in the first line of the label.
   */
  readonly firstLineLabel: string
  /**
   * Text displayed in the second line of the label.
   */
  readonly secondLineLabel: string
  /**
   * Text displayed in button label.
   */
  readonly buttonLabel: string
  /**
   * Indicates if the upload tile is disabled. Defaults to `false`.
   */
  readonly disabled?: boolean
  /**
   * The tooltip message displayed when the upload tile is disabled.
   */
  readonly inactiveMessage?: string
  /**
   * Size of the upload tile.
   */
  readonly size?: UploadTileSize
  /**
   * File types which tile should accept.
   */
  readonly acceptFiles?: string
  /**
   * Data test ID.
   */
}
