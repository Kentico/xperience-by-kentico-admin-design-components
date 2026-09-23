import * as React from 'react';
import classNames from 'classnames'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import type { TimeFormat } from '../DateTimePicker.types'
import { TimePickerInput } from './TimePickerInput/TimePickerInput'
import type { TimeValue } from '../DateTimePicker.types'
import './TimePicker.css'

export interface TimePickerProps {
  readonly timeFormat: TimeFormat
  readonly actionLabel: string
  readonly onActionClick?: () => void
  readonly value: TimeValue
  readonly onChange: (value: TimeValue) => void
  readonly visuallyHidden?: boolean
}

export const TimePicker = ({
  timeFormat,
  actionLabel,
  onActionClick,
  value,
  onChange,
  visuallyHidden,
}: TimePickerProps) => {
  const classes = classNames(
    'TimePicker-wrapper',
    visuallyHidden && 'TimePicker-hidden',
  )

  return (
    <div className={classes}>
      <TimePickerInput
        time={value}
        onTimeChange={onChange}
        timeFormat={timeFormat}
      />
      <Button
        label={actionLabel}
        color={ButtonColor.Primary}
        size={ButtonSize.M}
        onClick={onActionClick}
      />
    </div>
  )
}
