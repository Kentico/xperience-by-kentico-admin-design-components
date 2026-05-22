import * as React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { type TimeFormat, type TimeValue, TimeFormat as TimeFormatValues } from '../../DateTimePicker.types'
import { Input } from '@/components/Input'
import { parseTimeFromString } from '../../utils/parseTimeFromString'
import './TimePickerInput.css'

interface TimePickerInputProps {
  readonly time: TimeValue
  readonly onTimeChange: (value: TimeValue) => void
  readonly timeFormat: TimeFormat
}

const parseStringFromTimeValue = (
  { hours, minutes }: TimeValue,
  timeFormat: TimeFormat,
): string => {
  const zeroLeftPaddedMinutes = String(minutes.toString()).padStart(2, '0')
  if (timeFormat === TimeFormatValues.Hours24) {
    return `${hours}:${zeroLeftPaddedMinutes} h`
  }

  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  const convertedHours = hours % 12 || 12

  return `${convertedHours}:${zeroLeftPaddedMinutes} ${amOrPm}`
}

export const TimePickerInput = ({
  time,
  onTimeChange,
  timeFormat,
}: TimePickerInputProps) => {
  const parseTimeFromProps = useCallback(() => {
    return parseStringFromTimeValue(time, timeFormat)
  }, [time, timeFormat])

  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(parseTimeFromProps())
  }, [parseTimeFromProps])

  const onBlur = () => {
    const parsedTimeValue = parseTimeFromString(value)
    if (parsedTimeValue) {
      onTimeChange(parsedTimeValue)
    } else {
      setValue(parseTimeFromProps())
    }
  }

  return (
    <div className={'TimePickerInput-timeInput'}>
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={onBlur}
      />
    </div>
  )
}
