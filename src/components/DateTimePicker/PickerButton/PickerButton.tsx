import * as React from 'react';
import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import './PickerButton.css'

interface PickerButtonProps {
  readonly label: string
  readonly onClick: () => void
  readonly selected?: boolean
}

export const PickerButton = ({
  label,
  onClick,
  selected,
}: PickerButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const classes = classNames(
    'PickerButton',
    selected && 'PickerButton-selected',
  )

  useEffect(() => {
    if (selected) {
      buttonRef.current?.scrollIntoView({ block: 'nearest' })
    }
  }, [selected])

  return (
    <button
      ref={buttonRef}
      className={classes}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  )
}
