import * as React from 'react';
import { Children, forwardRef, type CSSProperties, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Box } from '@/components/Box'
import { InlineSpacingXDirection, type InlineProps } from './Inline.types'
import './Inline.css'

export const Inline = forwardRef(
  (
    {
      children,
      spacing,
      spacingX,
      spacingXDirection = InlineSpacingXDirection.Left,
      spacingY,
      className,
      ...props
    }: InlineProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const sTop = spacingY ?? spacing ?? 0
    const sLeft =
      (spacingXDirection === InlineSpacingXDirection.Left && spacingX) ||
      spacing ||
      0
    const sRight =
      (spacingXDirection === InlineSpacingXDirection.Right && spacingX) ||
      spacing ||
      0

    const containerStyle = {
      '--kxp-inline-component-spacing-top': `${sTop}`,
      '--kxp-inline-component-spacing-left': `${sLeft}`,
      '--kxp-inline-component-spacing-right': `${sRight}`,
      display: 'flex',
      flexWrap: 'wrap',
    } as CSSProperties

    return (
      <div
        ref={ref}
        className={classNames(className, 'Inline')}
      >
        <div style={containerStyle} {...getDataAndAccessibilityProps(props)}>
          {Children.map(
            children,
            (child) =>
              child && (
                <Box
                  spacingTop={spacingY || spacing}
                  spacingLeft={sLeft || spacing}
                  spacingRight={sRight || spacing}
                >
                  {child}
                </Box>
              )
          )}
        </div>
      </div>
    )
  }
)

Inline.displayName = 'Inline'
