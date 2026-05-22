import * as React from 'react';
import type { ReactNode } from 'react'
import classNames from 'classnames'
import './PickerOverlay.css'

export interface PickerOverlayProps {
  readonly children: ReactNode
  readonly isOpened?: boolean
}

export const PickerOverlay = ({ isOpened, children }: PickerOverlayProps) => {
  const classes = classNames('PickerOverlay-picker', isOpened && 'PickerOverlay-opened')

  return <div className={classes}>{isOpened ? children : null}</div>
}
