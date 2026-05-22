import * as React from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ForwardedRef,
} from 'react'
import DatePicker from 'react-datepicker'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import type { DateTimePickerProps } from './DateTimePicker.types'
import { Day } from './Day/Day'
import { Header } from './Header/Header'
import { TimePicker } from './TimePicker/TimePicker'
import type { TimeValue } from './DateTimePicker.types'
import { setTimeInDateObject } from './utils/setTimeInDateObject'
import './DateTimePicker.css'

const getTimeValueFromDate = (date: Date): TimeValue => {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  }
}

export const DateTimePicker = forwardRef(
  (
    {
      value,
      onChange,
      years,
      minDate,
      maxDate,
      months,
      timePicker,
      ...props
    }: DateTimePickerProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const [localValue, setLocalValue] = useState<Date | null | undefined>(
      value,
    )
    const [localTimeValue, setLocalTimeValue] = useState<TimeValue>(
      timePicker?.defaultTime || getTimeValueFromDate(localValue || new Date()),
    )

    useEffect(() => {
      setLocalValue(value)
      setLocalTimeValue(getTimeValueFromDate(value || new Date()))
    }, [value])

    const [isPickerOpened, setIsPickerOpened] = useState(false)

    const onDaySelect = (date: Date | null) => {
      const updatedDate = setTimeInDateObject(date, localTimeValue)
      onChange(updatedDate)
    }

    const onTimePickerActionClick = useCallback(() => {
      timePicker?.onActionClick?.()

      const updatedDate = setTimeInDateObject(
        localValue || new Date(),
        localTimeValue,
      )
      onChange(updatedDate)
    }, [timePicker, localValue, localTimeValue, onChange])

    const paperClasses = classNames(
      'DateTimePicker-paperWrapper',
      isPickerOpened && 'DateTimePicker-openedPicker',
    )

    const dateTimePickerClasses = classNames(
      'DateTimePicker',
      isPickerOpened && 'DateTimePicker-openedPicker',
    )

    const monthNames = useMemo(() => {
      if (months) {
        return months
      }
      const format = new Intl.DateTimeFormat(undefined, { month: 'long' })
      return Array.from({ length: 12 }, (_, i) => {
        const date = new Date(2000, i, 1)
        return format.format(date)
      })
    }, [months])

    return (
      <div
        ref={ref}
        className={dateTimePickerClasses}
        {...getDataAndAccessibilityProps(props)}
      >
        <div className={paperClasses}>
          <DatePicker
            inline
            formatWeekDay={(day) => day.slice(0, 3)}
            selected={localValue}
            onChange={onDaySelect}
            minDate={minDate}
            maxDate={maxDate}
            renderDayContents={(dayOfMonth) => <Day day={dayOfMonth} />}
            renderCustomHeader={({ date, changeMonth, changeYear }) => (
              <Header
                date={date}
                months={monthNames}
                years={years}
                changeMonth={changeMonth}
                changeYear={changeYear}
                onPickerOpened={setIsPickerOpened}
              />
            )}
          >
            {timePicker ? (
              <TimePicker
                timeFormat={timePicker.timeFormat}
                actionLabel={timePicker.actionLabel}
                onActionClick={onTimePickerActionClick}
                value={localTimeValue}
                onChange={setLocalTimeValue}
                visuallyHidden={isPickerOpened}
              />
            ) : null}
          </DatePicker>
        </div>
      </div>
    )
  },
)

DateTimePicker.displayName = 'DateTimePicker'
