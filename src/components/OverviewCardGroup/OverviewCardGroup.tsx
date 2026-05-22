import * as React from 'react';
import { Children, forwardRef, isValidElement } from 'react'
import classNames from 'classnames'
import { Row, RowWrap, Column, Spacing } from '@/components/Layout'
import type { OverviewCardGroupProps } from './OverviewCardGroup.types'
import './OverviewCardGroup.css'

/**
 * Groups multiple OverviewCard components in a horizontal row.
 * Supports equal-width distribution or content-based sizing.
 */
export const OverviewCardGroup = forwardRef<HTMLDivElement, OverviewCardGroupProps>(
  ({ children, useEqualWidth = false, className }, ref) => {
    // Convert children to array for mapping
    const childArray = Children.toArray(children)

    return (
      <Row
        ref={ref}
        spacing={Spacing.XL}
        className={classNames('OverviewCardGroup', className)}
        wrap={RowWrap.NoWrap}
      >
        {childArray.map((child, index) => {
          // Get key from child if it's a valid element, otherwise use index
          const key = isValidElement(child) ? (child.key ?? index) : index

          return (
            <Column
              key={key}
              className={classNames({ ['OverviewCardGroup-fixedWidth']: useEqualWidth })}
            >
              {child}
            </Column>
          )
        })}
      </Row>
    )
  }
)

OverviewCardGroup.displayName = 'OverviewCardGroup'
