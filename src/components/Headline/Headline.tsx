import * as React from 'react';
import { forwardRef, type ForwardedRef } from 'react'
import classNames from 'classnames'
import { HeadlineSize, type HeadlineProps } from './Headline.types'
import './Headline.css'

export const Headline = forwardRef(
  (
    {
      children,
      size,
      labelColor,
      spacingTop,
      spacingBottom,
      spacingY,
    }: HeadlineProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const sTop = spacingTop ?? spacingY
    const sBottom = spacingBottom ?? spacingY

    const headlineClasses = classNames(
      'Headline',
      size === HeadlineSize.S && 'Headline-sizeS',
      size === HeadlineSize.M && 'Headline-sizeM',
      size === HeadlineSize.L && 'Headline-sizeL'
    )

    const style: React.CSSProperties = {}

    if (sTop) {
      style.marginTop = sTop
    }

    if (sBottom) {
      style.marginBottom = sBottom
    }

    if (labelColor) {
      style.color = labelColor
    }

    return (
      <div
        ref={ref}
        className={headlineClasses}
        style={Object.keys(style).length > 0 ? style : undefined}
      >
        {children}
      </div>
    )
  }
)

Headline.displayName = 'Headline'
