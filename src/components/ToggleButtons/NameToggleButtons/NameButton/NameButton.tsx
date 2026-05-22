import * as React from 'react';
import classNames from 'classnames'
import { ToggleButtonBase } from '../../Shared/ToggleButtonBase'
import { ToggleButtonBaseTypes } from '../../Shared/ToggleButtonBase/ToggleButtonBase.types'
import type { NameButtonProps } from './NameButton.types'
import './NameButton.css'

export const NameButton = ({ label, isSelected, ...props }: NameButtonProps) => {
  const classes = classNames('NameButton-nameToggleButton', isSelected && 'NameButton-selected')

  return (
    <ToggleButtonBase
      className={classes}
      isSelected={isSelected}
      type={ToggleButtonBaseTypes.Name}
      {...props}
    >
      {label}
    </ToggleButtonBase>
  )
}

NameButton.displayName = 'NameButton'
