import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Box } from '@/components/Box'
import { Stack } from '@/components/Layout/Stack'
import { Shelf } from '@/components/Shelf'
import { Spacing } from '@/components/Layout/Layout.types'
import type { ViewMenuProps } from './ViewMenu.types'
import './ViewMenu.css'

export const ViewMenu = forwardRef(
  (
    { children, sticky, onPaper, ...props }: ViewMenuProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={'ViewMenu-container'}>
        <Shelf
          sticky={sticky}
          onPaper={onPaper}
          {...getDataAndAccessibilityProps(props)}
        >
          <Box spacingX={Spacing.XS} spacingY={Spacing.L}>
            <Stack spacing={Spacing.L}>{children}</Stack>
          </Box>
        </Shelf>
      </div>
    )
  }
)

ViewMenu.displayName = 'ViewMenu'
