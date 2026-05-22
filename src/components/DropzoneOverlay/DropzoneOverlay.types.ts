import type { DropzoneProps } from '../Dropzone/Dropzone.types';

export interface DropzoneOverlayProps extends DropzoneProps {
    /**
     * The main title of the dropzone, which will be shown to the user in the center of the screen.
     */
    readonly title?: string;
    /**
     * Additional class name(s) to be added to the dropzone overlay container.
     */
    readonly className?: string;
    /**
     * Additional class name(s) to be added to the overlay element.
     */
    readonly overlayClassName?: string;
}
