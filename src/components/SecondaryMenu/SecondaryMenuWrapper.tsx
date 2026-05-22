import * as React from 'react';
import type { SecondaryMenuWrapperProps } from './SecondaryMenu.types'
import './SecondaryMenuWrapper.css'

/**
 * Paper-style wrapper for the top-level (level 0) secondary menu.
 * Provides shadow, border-radius, overflow scrolling, and max-height constraint.
 */
export function SecondaryMenuWrapper({ children }: SecondaryMenuWrapperProps) {
  return <div className={'SecondaryMenuWrapper-wrapper'}>{children}</div>
}
