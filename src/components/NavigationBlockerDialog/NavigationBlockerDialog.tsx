import * as React from 'react';
import { createContext, useCallback, useContext, useEffect, type FC } from 'react'
import { useBlocker, type Blocker } from 'react-router-dom'
import { Dialog } from '@/components/Dialog'
import { Box } from '@/components/Box'
import { Spacing } from '@/components/Layout'
import type {
  NavigationBlockerDialogProviderProps,
  NavigationBlockerContextValue,
  UseNavigationBlockerOptions,
} from './NavigationBlockerDialog.types'
import './NavigationBlockerDialog.css'

/**
 * Internal context for sharing the blocker state.
 * This is used internally - consumers should use the hook instead.
 */
const NavigationBlockerContext = createContext<NavigationBlockerContextValue | null>(null)

/**
 * Internal component that renders the dialog when navigation is blocked.
 */
const NavigationBlockerDialogContent: FC<{
  blocker: Blocker
  texts: UseNavigationBlockerOptions['texts']
  onConfirm?: () => void
  onCancel?: () => void
}> = ({ blocker, texts, onConfirm, onCancel }) => {
  const handleConfirm = useCallback(() => {
    onConfirm?.()
    blocker.proceed?.()
  }, [blocker, onConfirm])

  const handleCancel = useCallback(() => {
    onCancel?.()
    blocker.reset?.()
  }, [blocker, onCancel])

  return (
    <Dialog
      isOpen={blocker.state === 'blocked'}
      headline={texts.headline}
      onClose={handleCancel}
      isDismissable={true}
      maxWidth="640px"
      headerCloseButton={{ tooltipText: 'Close', shortcuts: 'Esc' }}
      overlayClassName={'NavigationBlockerDialog-overlay'}
      confirmAction={{
        label: texts.confirmLabel,
        onClick: handleConfirm,
        destructive: true,
      }}
      cancelAction={{
        label: texts.cancelLabel ?? 'Cancel',
        onClick: handleCancel,
      }}
    >
      <Box spacing={Spacing.M}>
        {texts.message}
      </Box>
    </Dialog>
  )
}

/**
 * Hook to enable navigation blocking with a confirmation dialog.
 *
 * When `shouldBlock` is true, any navigation attempt (link click, browser back,
 * manual URL change) will be intercepted and a confirmation dialog will be shown.
 *
 * @example
 * ```tsx
 * function MyForm() {
 *   const [hasChanges, setHasChanges] = useState(false)
 *
 *   useNavigationBlocker({
 *     shouldBlock: hasChanges,
 *     texts: {
 *       headline: 'Unsaved Changes',
 *       message: 'You have unsaved changes. Are you sure you want to leave?',
 *       confirmLabel: 'Leave',
 *       cancelLabel: 'Stay',
 *     },
 *     onConfirm: () => console.log('User left'),
 *     onCancel: () => console.log('User stayed'),
 *   })
 *
 *   return <form>...</form>
 * }
 * ```
 *
 * @returns An object containing the dialog element to render and the current blocker state
 */
export const useNavigationBlocker = ({
  shouldBlock,
  texts,
  onConfirm,
  onCancel,
}: UseNavigationBlockerOptions): {
  /** The dialog element to render in your component */
  dialog: React.ReactNode
  /** Whether navigation is currently blocked (dialog is showing) */
  isBlocked: boolean
} => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      shouldBlock && currentLocation.pathname !== nextLocation.pathname
  )

  // Handle browser beforeunload event for tab/window close
  useEffect(() => {
    if (!shouldBlock) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      // Modern browsers ignore custom messages and show a generic prompt
      e.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [shouldBlock])

  const dialog = (
    <NavigationBlockerDialogContent
      blocker={blocker}
      texts={texts}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  )

  return {
    dialog,
    isBlocked: blocker.state === 'blocked',
  }
}

/**
 * Provider component for navigation blocking functionality.
 *
 * Wrap your application or route with this provider to enable
 * navigation blocking features via the `useNavigationBlocker` hook.
 *
 * Note: This provider must be used inside a React Router context
 * (e.g., inside BrowserRouter or MemoryRouter).
 *
 * @example
 * ```tsx
 * import { BrowserRouter } from 'react-router-dom'
 * import { NavigationBlockerDialogProvider } from '@/components/NavigationBlockerDialog'
 *
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <NavigationBlockerDialogProvider>
 *         <Routes>
 *           <Route path="/" element={<Home />} />
 *           <Route path="/edit" element={<EditForm />} />
 *         </Routes>
 *       </NavigationBlockerDialogProvider>
 *     </BrowserRouter>
 *   )
 * }
 * ```
 */
export const NavigationBlockerDialogProvider: FC<NavigationBlockerDialogProviderProps> = ({
  children,
}) => {
  // The provider itself doesn't manage blocking state - that's done via the hook
  // This provider is for potential future enhancements like centralized blocking management
  const contextValue: NavigationBlockerContextValue = {
    setBlocking: () => {
      // Hook-based implementation - consumers use the hook directly
    },
    isBlocking: false,
  }

  return (
    <NavigationBlockerContext.Provider value={contextValue}>
      {children}
    </NavigationBlockerContext.Provider>
  )
}

NavigationBlockerDialogProvider.displayName = 'NavigationBlockerDialogProvider'

/**
 * Hook to access the navigation blocker context.
 * Returns null if used outside of NavigationBlockerDialogProvider.
 *
 * Note: For most use cases, use `useNavigationBlocker` directly instead.
 * This hook is for advanced cases where you need access to the context.
 */
export const useNavigationBlockerContext = (): NavigationBlockerContextValue | null => {
  return useContext(NavigationBlockerContext)
}
