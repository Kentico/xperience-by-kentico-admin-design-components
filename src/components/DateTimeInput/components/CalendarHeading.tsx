import * as React from 'react';
import { type Key, useCallback, useContext, useMemo } from 'react'
import {
  CalendarStateContext,
  type CalendarState,
  Button,
  SelectValue,
  Select,
} from 'react-aria-components'
import { useDateFormatter } from '@react-aria/i18n'
import { toCalendarDate, type CalendarDate } from '@internationalized/date'
import { useTranslations } from '@/hooks/useTranslations'
import { Icon } from '@/components/Icon'
import { ListPopover } from './ListPopover'
import { ButtonIcon } from './ButtonIcon'
import './CalendarHeading.css'

const isMonthDisabled = (
  monthDate: CalendarDate,
  calendarState: CalendarState | null,
): boolean => {
  if (!calendarState?.minValue && !calendarState?.maxValue) {
    return false
  }

  const firstDayOfMonth = monthDate.set({ day: 1 })
  const lastDayOfMonth = monthDate.set({
    day: monthDate.calendar.getDaysInMonth(monthDate),
  })
  if (
    calendarState.minValue &&
    lastDayOfMonth.compare(calendarState.minValue) < 0
  ) {
    return true
  }
  if (
    calendarState.maxValue &&
    firstDayOfMonth.compare(calendarState.maxValue) > 0
  ) {
    return true
  }
  return false
}

export const CalendarHeading = () => {
  const state = useContext(CalendarStateContext)

  const yearFormatter = useDateFormatter({
    year: 'numeric',
    timeZone: state?.timeZone,
  })

  const monthFormatter = useDateFormatter({
    month: 'long',
    timeZone: state?.timeZone,
  })

  const years = useMemo(() => {
    const list: { key: Key; label: string; date: CalendarDate }[] = []
    if (!state) {
      return list
    }

    const minYear = state.minValue
      ? toCalendarDate(state.minValue)
      : state.focusedDate.subtract({ years: 50 })
    const maxYear = state.maxValue
      ? toCalendarDate(state.maxValue)
      : state.focusedDate.add({ years: 50 })
    let date = minYear
    for (let i = 1; date.compare(maxYear) <= 0; i++) {
      list.push({
        key: i.toString(),
        date: date,
        label: yearFormatter.format(date.toDate(state.timeZone)),
      })
      date = minYear.add({ years: i })
    }
    return list
  }, [state, yearFormatter])

  const months = useMemo(() => {
    const list: {
      label: string
      key: string
      disabled: boolean
      month: number
    }[] = []
    if (!state) {
      return list
    }

    const numMonths =
      state.focusedDate.calendar.getMonthsInYear(state.focusedDate)
    for (let i = 1; i <= numMonths; i++) {
      const date = state.focusedDate.set({ month: i })
      const formatted = monthFormatter.format(date.toDate(state.timeZone))
      list.push({
        label: formatted,
        key: i.toString(),
        disabled: isMonthDisabled(date, state),
        month: i,
      })
    }
    return list
  }, [state, monthFormatter])

  const handleYearChange = useCallback(
    (key: Key | null) => {
      const year = years.find((year) => year.key === key)
      if (!year || !state) {
        return
      }
      const focused = state.focusedDate
      state.setFocusedDate(
        year.date.set({ month: focused.month, day: focused.day }),
      )
    },
    [state, years],
  )

  const handleMonthChange = useCallback(
    (key: Key | null) => {
      const month = months.find((m) => m.key === key)
      if (!month || !state) {
        return
      }
      const newDate = state.focusedDate.set({ month: month.month })
      state.setFocusedDate(newDate)
    },
    [state, months],
  )

  const focusedYearKey = useMemo(() => {
    if (!state) {
      return null
    }
    const focusedYear = state.focusedDate
      .toDate(state.timeZone)
      .getFullYear()
    return (
      years
        .find(
          (y) => y.date.toDate(state.timeZone).getFullYear() === focusedYear,
        )
        ?.key.toString() ?? null
    )
  }, [state, years])

  const { t } = useTranslations()

  if (!state) {
    return null
  }

  return (
    <div className={'CalendarHeading-root'}>
      <ButtonIcon
        slot="previous"
        icon="xp-chevron-left"
        aria-label={t(
          'kxp.components.datetimeinput.calendarheading.previous',
        )}
      />
      <div className={'CalendarHeading-selectWrapper'}>
        <Select
          selectedKey={state.focusedDate.month.toString()}
          onSelectionChange={handleMonthChange}
          aria-label={t(
            'kxp.components.datetimeinput.datetimeinput.calendarheading.selectMonth',
          )}
        >
          <Button className={'CalendarHeading-selectTrigger'}>
            <SelectValue />
            <Icon name="xp-chevron-down" />
          </Button>
          <ListPopover items={months} />
        </Select>
        <Select
          selectedKey={focusedYearKey}
          onSelectionChange={handleYearChange}
          aria-label={t(
            'kxp.components.datetimeinput.datetimeinput.calendarheading.selectYear',
          )}
        >
          <Button className={'CalendarHeading-selectTrigger'}>
            <SelectValue />
            <Icon name="xp-chevron-down" />
          </Button>
          <ListPopover items={years} />
        </Select>
      </div>
      <ButtonIcon
        slot="next"
        icon="xp-chevron-right"
        aria-label={t('kxp.components.datetimeinput.calendarheading.next')}
      />
    </div>
  )
}
