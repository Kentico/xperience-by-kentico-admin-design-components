import * as React from 'react';
import { forwardRef, type ReactNode } from 'react'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import './CardBody.css'

export interface CardBodyProps {
  readonly children: ReactNode
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} className={'CardBody'} {...getDataAndAccessibilityProps(props)}>
        {children}
      </div>
    )
  },
)

CardBody.displayName = 'CardBody'
