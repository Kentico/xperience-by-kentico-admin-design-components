import * as React from 'react';
import { useCallback } from 'react'
import { PickerOverlay } from '../PickerOverlay/PickerOverlay'
import { Stack } from '@/components/Layout'
import { Spacing } from '@/components/Layout/Layout.types'
import { PickerButton } from '../PickerButton/PickerButton'
import './YearPicker.css'

interface YearPickerProps {
  readonly years: number[]
  readonly selectedYear?: number
  readonly onYearSelect: (year: number) => void
  readonly isOpened: boolean
}

export const YearPicker = ({
  years,
  selectedYear,
  onYearSelect,
  isOpened,
}: YearPickerProps) => {
  const onYearButtonClick = useCallback(
    (year: number) => {
      onYearSelect(year)
    },
    [onYearSelect],
  )

  return (
    <PickerOverlay isOpened={isOpened}>
      <div className={'YearPicker-wrapper'}>
        <div className={'YearPicker'}>
          <Stack spacing={Spacing.M} className={'YearPicker-yearStack'}>
            {years.map((year) => (
              <PickerButton
                key={year}
                label={year.toString()}
                onClick={() => onYearButtonClick(year)}
                selected={selectedYear === year}
              />
            ))}
          </Stack>
        </div>
      </div>
    </PickerOverlay>
  )
}
