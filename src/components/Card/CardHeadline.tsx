import * as React from 'react';
import { forwardRef } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import './CardHeadline.css'

export interface CardHeadlineProps {
  readonly text: string
}

export const CardHeadline = forwardRef<HTMLDivElement, CardHeadlineProps>(
  ({ text, ...props }, ref) => {
    return (
      <div ref={ref} className={'CardHeadline'} {...getDataAndAccessibilityProps(props)}>
        {text}
      </div>
    )
  },
)

CardHeadline.displayName = 'CardHeadline'
