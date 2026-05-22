import * as React from 'react';
import { forwardRef, useMemo } from 'react'
import './ProgressBar.css'

export interface ProgressBarProps {
  /** Progress value: 0–100 */
  readonly completed?: number
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ completed }, ref) => {
    const style = useMemo(() => {
      if (completed == null || completed < 0) return { width: '0%' }
      if (completed > 100) return { width: '100%' }
      return { width: `${completed}%` }
    }, [completed])

    return (
      <div className={'ProgressBar-progressBarWrapper'} ref={ref}>
        <div className={'ProgressBar'} style={style} />
      </div>
    )
  },
)

ProgressBar.displayName = 'ProgressBar'
