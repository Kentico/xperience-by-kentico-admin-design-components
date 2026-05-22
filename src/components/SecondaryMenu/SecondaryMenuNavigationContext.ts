import { createContext, useContext } from 'react'
import type { SecondaryMenuNavigationContextType } from './SecondaryMenu.types'

export const SecondaryMenuNavigationContext =
  createContext<SecondaryMenuNavigationContextType>({
    navigation: [],
    push: () => {},
    pop: () => {},
  })

/**
 * Hook for accessing the secondary menu navigation stack.
 * Provides push/pop operations for managing nested section navigation.
 */
export function useSecondaryMenuNavigation() {
  return useContext(SecondaryMenuNavigationContext)
}
