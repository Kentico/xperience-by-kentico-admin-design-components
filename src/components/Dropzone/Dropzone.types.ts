import type { ReactNode } from 'react'

/**
 * Props for the Dropzone component.
 */
export interface DropzoneProps {
  /**
   * Callback method called when files are dropped or selected.
   */
  readonly onUpload: (files: FileList) => void

  /**
   * Callback method for when an item is dragged over the dropzone.
   * Used to update visual state (e.g., highlight the drop area).
   */
  readonly onActiveChange: (isActive: boolean) => void

  /**
   * Callback method for checking current data transfer validity.
   * If not provided, all file types are permitted.
   * Return true to permit the drag, false to deny.
   */
  readonly onCurrentTransfer?: (dataTransfer: DataTransfer) => boolean

  /**
   * If true, the dropzone is disabled and won't respond to drag/drop events.
   */
  readonly disabled?: boolean

  /**
   * Children elements to render inside the dropzone.
   */
  readonly children: ReactNode

  /**
   * Additional CSS class name.
   */
  readonly className?: string

  /**
   * Test ID for automated testing.
   */
}
