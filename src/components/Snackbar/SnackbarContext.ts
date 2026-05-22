import { createContext, useContext } from 'react'
import { type SnackbarContextType } from './Snackbar.types'

/**
 * Default context value with no-op functions.
 * Provides type-safe defaults when used outside of a provider.
 */
const defaultContextValue: SnackbarContextType = {
  messages: [],
  addMessage: () => {
    // No-op when used outside provider
  },
  removeMessage: () => {
    // No-op when used outside provider
  },
  clearMessages: () => {
    // No-op when used outside provider
  },
}

/**
 * Context for managing snackbar messages across the application.
 * Use with SnackbarProvider to enable toast notifications.
 */
export const SnackbarContext = createContext<SnackbarContextType>(defaultContextValue)
SnackbarContext.displayName = 'SnackbarContext'

/**
 * Hook to access snackbar context for showing toast notifications.
 *
 * @example
 * ```tsx
 * const { addMessage, removeMessage, clearMessages, messages } = useSnackbar()
 *
 * // Show a success message
 * addMessage({
 *   message: 'Changes saved successfully',
 *   variant: 'success',
 * })
 *
 * // Show an error message
 * addMessage({
 *   message: 'Failed to save changes',
 *   variant: 'error',
 *   autoHide: false,
 * })
 * ```
 *
 * @returns The snackbar context value with messages array and control functions
 */
export const useSnackbar = (): SnackbarContextType => {
  return useContext(SnackbarContext)
}
