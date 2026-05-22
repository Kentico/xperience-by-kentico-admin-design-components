import * as React from 'react';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { LayoutAlignment } from '../Layout.types'
import {
  kxpRowComponentSpacingXVariableName,
  kxpRowComponentSpacingYVariableName,
} from '../constants'
import { RowWrap, type RowProps } from './Row.types'
import './Row.css'

export const Row = forwardRef(
  (
    {
      children,
      alignX,
      alignY = LayoutAlignment.Start,
      spacing,
      spacingX,
      spacingY,
      wrap = RowWrap.Wrap,
      className,
      ...props
    }: RowProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const spX = spacingX ?? spacing ?? '0px'
    const spY = spacingY ?? spacing ?? '0px'

    const style: Record<string, string | number> = {
      marginLeft: `calc(-1 * ${spX})`,
      marginTop: `calc(-1 * ${spY})`,
    }
    style[kxpRowComponentSpacingXVariableName] = spX
    style[kxpRowComponentSpacingYVariableName] = spY

    const wrapClass = classNames(
      wrap === RowWrap.NoWrap && 'Row-flexNoWrap',
      wrap === RowWrap.Wrap && 'Row-flexWrap',
      wrap === RowWrap.WrapReverse && 'Row-flexWrapReverse'
    )

    const alignXClass = classNames(
      alignX === LayoutAlignment.Start && 'Row-xAlignStart',
      alignX === LayoutAlignment.Center && 'Row-xAlignCenter',
      alignX === LayoutAlignment.End && 'Row-xAlignEnd'
    )

    const alignYClass = classNames(
      alignY === LayoutAlignment.Start && 'Row-yAlignStretch',
      alignY === LayoutAlignment.Center && 'Row-yAlignCenter',
      alignY === LayoutAlignment.End && 'Row-yAlignEnd'
    )

    const rowClasses = classNames(
      'Row',
      wrapClass,
      alignXClass,
      alignYClass,
      className
    )

    return (
      <div
        style={style as CSSProperties}
        className={rowClasses}
        ref={ref}
        {...getDataAndAccessibilityProps(props)}
      >
        {children}
      </div>
    )
  }
)

Row.displayName = 'Row'
