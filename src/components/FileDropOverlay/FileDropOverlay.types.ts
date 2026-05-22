import type { DropzoneOverlayProps } from '../DropzoneOverlay/DropzoneOverlay.types';

export interface FileDropOverlayProps extends Omit<DropzoneOverlayProps, 'onCurrentTransfer' | 'onUpload'> {
    /**
     * Maximum number of files allowed to be dropped at once.
     * If not specified, any number of files is allowed.
     */
    readonly maxFiles?: number;
    /**
     * Callback method called when files are dropped.
     */
    readonly onDrop: (files: FileList) => void;
}
