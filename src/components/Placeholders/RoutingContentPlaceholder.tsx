import * as React from 'react';
import type { ReactNode } from 'react'

export interface RoutingContentPlaceholderProps {
  /** Child components to render */
  children?: ReactNode
}

/**
 * Simplified placeholder for routing content.
 * The full implementation handles React Router routes for template-based content.
 * This stub version simply renders children.
 */
export const RoutingContentPlaceholder = ({
  children,
}: RoutingContentPlaceholderProps) => {
  return <>{children}</>
}
