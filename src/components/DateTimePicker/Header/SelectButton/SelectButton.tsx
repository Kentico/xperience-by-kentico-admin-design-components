import * as React from 'react';
import classNames from 'classnames'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import './SelectButton.css'

interface SelectButtonProps {
  readonly right?: boolean
  readonly label: string
  readonly onClick: () => void
  readonly icon: string
}

export const SelectButton = ({
  right,
  label,
  icon,
  onClick,
}: SelectButtonProps) => {
  const selectButtonClasses = classNames(
    'SelectButton',
    right && 'SelectButton-right',
  )

  return (
    <div className={selectButtonClasses}>
      <Button
        color={ButtonColor.Quinary}
        trailingIcon={icon}
        size={ButtonSize.XS}
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  )
}
