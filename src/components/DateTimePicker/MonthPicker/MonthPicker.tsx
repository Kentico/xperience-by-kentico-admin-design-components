import * as React from 'react';
import { useCallback } from 'react'
import { PickerOverlay } from '../PickerOverlay/PickerOverlay'
import { Column, Row, Stack } from '@/components/Layout'
import { Spacing } from '@/components/Layout/Layout.types'
import { PickerButton } from '../PickerButton/PickerButton'
import './MonthPicker.css'

interface MonthPickerProps {
  readonly months: string[]
  readonly selectedMonth: number
  readonly onMonthSelect: (month: number) => void
  readonly isOpened: boolean
}

export const MonthPicker = ({
  months,
  selectedMonth,
  onMonthSelect,
  isOpened,
}: MonthPickerProps) => {
  const halfIndex = Math.floor(months.length / 2)
  const firstHalf = months.slice(0, halfIndex)
  const secondHalf = months.slice(halfIndex)

  const handleMonthSelect = useCallback(
    (month: number) => {
      onMonthSelect(month)
    },
    [onMonthSelect],
  )

  return (
    <PickerOverlay isOpened={isOpened}>
      <div className={'MonthPicker'}>
        <Row spacingX={Spacing.XL}>
          <Column>
            <Stack spacing={Spacing.M} className={'MonthPicker-leftColumn'}>
              {firstHalf.map((month) => (
                <PickerButton
                  key={month}
                  selected={months[selectedMonth] === month}
                  label={month}
                  onClick={() => handleMonthSelect(months.indexOf(month))}
                />
              ))}
            </Stack>
          </Column>
          <Column>
            <Stack spacing={Spacing.M} className={'MonthPicker-rightColumn'}>
              {secondHalf.map((month) => (
                <PickerButton
                  key={month}
                  selected={months[selectedMonth] === month}
                  label={month}
                  onClick={() => handleMonthSelect(months.indexOf(month))}
                />
              ))}
            </Stack>
          </Column>
        </Row>
      </div>
    </PickerOverlay>
  )
}
