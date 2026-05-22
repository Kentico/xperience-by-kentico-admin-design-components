import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Stack } from '@/components/Layout'
import type { SideMenuProps } from './SideMenu.types'
import './SideMenu.css'

export const SideMenu = forwardRef(
  (
    { children, className, testId, ...props }: SideMenuProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={classNames('SideMenu', className)}
        data-testid={testId}
        {...getDataAndAccessibilityProps(props)}
      >
        <Stack>{children}</Stack>
      </div>
    )
  }
)

SideMenu.displayName = 'SideMenu'
