import * as React from 'react';
import { forwardRef, type CSSProperties, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Dimensions } from '../Layout.types'
import {
  kxpRowComponentSpacingXVariableName,
  kxpRowComponentSpacingYVariableName,
} from '../constants'
import type { ColumnProps } from './Column.types'
import './Column.css'

export const Column = forwardRef(
  (
    {
      children,
      width,
      className,
      cols,
      colsSm,
      colsMd,
      colsLg,
      order,
      orderSm,
      orderMd,
      orderLg,
      fullHeight,
      ...props
    }: ColumnProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const paddingStyle = {
      paddingLeft: `var(${kxpRowComponentSpacingXVariableName})`,
      paddingTop: `var(${kxpRowComponentSpacingYVariableName})`,
    }

    const widthStyle = {
      width: `calc((${Dimensions.GridUnit} * ${width}) + var(${kxpRowComponentSpacingXVariableName}))`,
      maxWidth: `calc((${Dimensions.GridUnit} * ${width}) + var(${kxpRowComponentSpacingXVariableName}))`,
      flex: `0 0 calc((${Dimensions.GridUnit} * ${width}) + var(${kxpRowComponentSpacingXVariableName}))`,
    }

    const style = {
      ...paddingStyle,
      ...(width ? widthStyle : []),
    } as CSSProperties

    const columnClasses = classNames(
      className,
      'Column',
      cols && `Column-${`col-${cols}`}`,
      colsSm && `Column-${`col-sm-${colsSm}`}`,
      colsMd && `Column-${`col-md-${colsMd}`}`,
      colsLg && `Column-${`col-lg-${colsLg}`}`,
      order && `Column-${`order-${order}`}`,
      orderSm && `Column-${`order-sm-${orderSm}`}`,
      orderMd && `Column-${`order-md-${orderMd}`}`,
      orderLg && `Column-${`order-lg-${orderLg}`}`,
      fullHeight && 'Column-fullHeight'
    )

    return (
      <div
        ref={ref}
        className={columnClasses}
        style={style}
        {...getDataAndAccessibilityProps(props)}
      >
        {children}
      </div>
    )
  }
)

Column.displayName = 'Column'
