import { createContext, useContext } from 'react'

/**
 * Observer type - for reading unsaved changes status
 */
export interface EditableObjectStatusObserverType {
  /** Whether any observed object has unsaved changes */
  dataChanged: boolean
}

/**
 * Observee type - for components to report their unsaved changes
 */
export interface EditableObjectStatusObserveeType {
  /** Set data changed state */
  setDataChanged: (id: string, changed: boolean) => void
  /** Get new unique ID for tracking */
  getNewId: () => string
  /** Get data changed state for specific ID */
  getDataChanged: (id?: string) => boolean
}

/**
 * Full context type
 */
export interface EditableObjectStatusContextType
  extends EditableObjectStatusObserverType,
    EditableObjectStatusObserveeType {
  /** Get data changed state for specific ID */
  getDataChanged: (id?: string) => boolean
  /** Reset all data changed states */
  resetAllDataChanged: () => void
  /** Set callback for reset all */
  setResetAllDataChangedCallback: (callback: () => void) => void
}

/**
 * Context for tracking unsaved changes across the application.
 * Used to prevent navigation when there are unsaved changes.
 */
export const EditableObjectStatusContext =
  createContext<EditableObjectStatusContextType>({
    dataChanged: false,
    getDataChanged: () => false,
    setDataChanged: () => {},
    resetAllDataChanged: () => {},
    setResetAllDataChangedCallback: () => {},
    getNewId: () => '',
  })

EditableObjectStatusContext.displayName = 'EditableObjectStatusContext'

/**
 * Hook for observing unsaved changes status.
 * Used by layout components to detect when navigation should be blocked.
 */
export function useEditableObjectStatusObserver(): EditableObjectStatusObserverType {
  return useContext(EditableObjectStatusContext)
}

/**
 * Hook for reporting unsaved changes.
 * Used by form components to report their unsaved state.
 */
export function useEditableObjectStatusObservee(): EditableObjectStatusObserveeType {
  return useContext(EditableObjectStatusContext)
}
