/**
 * Snackbar Component Barrel Export
 *
 * Toast-style notification system for displaying feedback messages.
 *
 * @example
 * ```tsx
 * // Wrap your app with the provider
 * import { SnackbarProvider } from '@/components/Snackbar'
 *
 * <SnackbarProvider>
 *   <App />
 * </SnackbarProvider>
 *
 * // Use the hook in any child component
 * import { useSnackbar, SnackbarVariant } from '@/components/Snackbar'
 *
 * const { addMessage } = useSnackbar()
 * addMessage({ message: 'Success!', variant: SnackbarVariant.Success })
 * ```
 */

// Provider component
export { SnackbarProvider } from './SnackbarProvider'

// Container component
export { Snackbar } from './Snackbar'

// Item component
export { SnackbarItem, type SnackbarItemProps } from './SnackbarItem'

// Context and hook
export { SnackbarContext, useSnackbar } from './SnackbarContext'

// Types and constants
export {
  SnackbarPosition,
  SnackbarVariant,
  SnackbarSpacing,
  type SnackbarProps,
  type SnackbarContainerProps,
  type SnackbarMessage,
  type SnackbarContextType,
  type SnackbarProviderProps,
} from './Snackbar.types'
