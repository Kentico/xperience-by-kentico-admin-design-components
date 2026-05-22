import * as React from 'react';
import { useCallback, useEffect, useState } from 'react'
import { MonthPicker } from '../MonthPicker/MonthPicker'
import { YearPicker } from '../YearPicker/YearPicker'
import { SelectButton } from './SelectButton/SelectButton'
import './Header.css'

interface HeaderProps {
  readonly date: Date
  readonly months: string[]
  readonly years: number[]
  readonly changeMonth: (month: number) => void
  readonly changeYear: (year: number) => void
  readonly onPickerOpened: (opened: boolean) => void
}

export const Header = ({
  date,
  months,
  years,
  changeMonth,
  changeYear,
  onPickerOpened,
}: HeaderProps) => {
  const [isMonthPickerOpened, setIsMonthPickerOpened] = useState(false)
  const [isYearPickerOpened, setIsYearPickerOpened] = useState(false)

  useEffect(() => {
    onPickerOpened(isMonthPickerOpened || isYearPickerOpened)
  }, [isMonthPickerOpened, isYearPickerOpened, onPickerOpened])

  const toggleMonthPicker = useCallback(() => {
    setIsMonthPickerOpened((prevState) => !prevState)
  }, [])
  const toggleYearPicker = useCallback(() => {
    setIsYearPickerOpened((prevState) => !prevState)
  }, [])

  const onMonthSelect = useCallback(
    (month: number) => {
      changeMonth(month)
      toggleMonthPicker()
    },
    [changeMonth, toggleMonthPicker],
  )

  const onYearSelect = useCallback(
    (year: number) => {
      changeYear(year)
      toggleYearPicker()
    },
    [changeYear, toggleYearPicker],
  )

  return (
    <>
      <div className={'Header'}>
        {!isYearPickerOpened && (
          <SelectButton
            label={months[date.getMonth()]}
            icon={
              isMonthPickerOpened ? 'xp-chevron-up' : 'xp-chevron-down'
            }
            onClick={toggleMonthPicker}
          />
        )}
        {!isMonthPickerOpened && (
          <SelectButton
            label={date.getFullYear().toString()}
            icon={
              isYearPickerOpened ? 'xp-chevron-up' : 'xp-chevron-down'
            }
            onClick={toggleYearPicker}
            right
          />
        )}
      </div>
      <MonthPicker
        isOpened={isMonthPickerOpened}
        months={months}
        onMonthSelect={onMonthSelect}
        selectedMonth={date.getMonth()}
      />
      <YearPicker
        isOpened={isYearPickerOpened}
        years={years}
        onYearSelect={onYearSelect}
        selectedYear={date.getFullYear()}
      />
    </>
  )
}
