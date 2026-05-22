import * as React from 'react';
import { useState, useCallback, useMemo, type ReactNode } from 'react'
import { SnackbarContext } from './SnackbarContext'
import { Snackbar } from './Snackbar'
import {
  type SnackbarMessage,
  type SnackbarContextType,
  type SnackbarProviderProps,
} from './Snackbar.types'

/**
 * Generates a unique ID for snackbar messages.
 * Uses a combination of timestamp and random string for uniqueness.
 */
const generateId = (): string => {
  return `snackbar-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Provider component for managing snackbar notifications across the application.
 *
 * Wrap your app or a section of your app with this provider to enable
 * toast-style notifications using the useSnackbar hook.
 *
 * @example
 * ```tsx
 * // In your app root
 * import { SnackbarProvider } from '@/components/Snackbar'
 *
 * function App() {
 *   return (
 *     <SnackbarProvider position="top-right">
 *       <MyAppContent />
 *     </SnackbarProvider>
 *   )
 * }
 *
 * // In any child component
 * import { useSnackbar, SnackbarVariant } from '@/components/Snackbar'
 *
 * function SaveButton() {
 *   const { addMessage } = useSnackbar()
 *
 *   const handleSave = async () => {
 *     try {
 *       await saveData()
 *       addMessage({
 *         message: 'Changes saved successfully!',
 *         variant: SnackbarVariant.Success,
 *       })
 *     } catch (error) {
 *       addMessage({
 *         message: 'Failed to save changes',
 *         variant: SnackbarVariant.Error,
 *       })
 *     }
 *   }
 *
 *   return <button onClick={handleSave}>Save</button>
 * }
 * ```
 */
export const SnackbarProvider = ({
  children,
  position,
  verticalSpacing,
  horizontalSpacing,
}: SnackbarProviderProps): ReactNode => {
  const [messages, setMessages] = useState<SnackbarMessage[]>([])

  /**
   * Adds a new message to the snackbar queue.
   * Generates a unique ID if one isn't provided.
   */
  const addMessage = useCallback((message: SnackbarMessage): void => {
    const messageWithId: SnackbarMessage = {
      ...message,
      id: message.id ?? generateId(),
    }
    setMessages((prev) => [...prev, messageWithId])
  }, [])

  /**
   * Removes a specific message by ID.
   */
  const removeMessage = useCallback((id: string | number): void => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }, [])

  /**
   * Clears all messages from the queue.
   */
  const clearMessages = useCallback((): void => {
    setMessages([])
  }, [])

  const contextValue: SnackbarContextType = useMemo(
    () => ({
      messages,
      addMessage,
      removeMessage,
      clearMessages,
    }),
    [messages, addMessage, removeMessage, clearMessages]
  )

  return (
    <SnackbarContext.Provider value={contextValue}>
      {children}
      <Snackbar
        position={position}
        verticalSpacing={verticalSpacing}
        horizontalSpacing={horizontalSpacing}
      />
    </SnackbarContext.Provider>
  )
}

SnackbarProvider.displayName = 'SnackbarProvider'
