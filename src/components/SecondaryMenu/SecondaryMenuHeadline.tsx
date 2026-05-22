import * as React from 'react';
import type { SecondaryMenuHeadlineProps } from './SecondaryMenu.types'
import './SecondaryMenuHeadline.css'

/**
 * Section headline within the secondary menu.
 * Renders a label with a horizontal rule line (via ::after pseudo-element).
 * Accepts a `level` prop for level-specific widths (main, submenu-1, submenu-2).
 */
export function SecondaryMenuHeadline({
  children,
  level = 0,
}: SecondaryMenuHeadlineProps) {
  const levelClass =
    level === 0
      ? 'SecondaryMenuHeadline-main'
      : level === 1
        ? 'SecondaryMenuHeadline-submenu1'
        : 'SecondaryMenuHeadline-submenu2'

  return (
    <div className={`${'SecondaryMenuHeadline-headline'} ${levelClass}`}>
      <span className={'SecondaryMenuHeadline-headlineLabel'}>{children}</span>
    </div>
  )
}
