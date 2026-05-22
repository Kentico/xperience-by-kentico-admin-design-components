import * as React from 'react';
import { useCallback, useMemo, useContext, useState, useEffect } from 'react'
import {
  Calendar,
  CalendarGrid,
  CalendarCell,
  type DateValue,
  useLocale,
  type TimeValue,
  DateRangePickerStateContext,
} from 'react-aria-components'
import {
  CalendarDate,
  CalendarDateTime,
  type ZonedDateTime,
  isWeekend,
  startOfMonth,
  now,
  toTime,
  Time,
} from '@internationalized/date'
import { useTranslations } from '@/hooks/useTranslations'
import { Divider, DividerOrientation } from '@/components/Divider'
import { CalendarHeading } from './CalendarHeading'
import { TimeInput } from './TimeInput'
import type { RangeCalendarProps } from './RangeCalendar.types'
import { QuickRangeSelect } from './QuickRangeSelect'
import './Calendar.css'
import './RangeCalendar.css'

export const RangeCalendar = (props: RangeCalendarProps) => {
  const { t } = useTranslations()
  const context = useContext(DateRangePickerStateContext)
  const { locale } = useLocale()

  const convertDateTime = useCallback(
    (dv: DateValue, time: TimeValue | undefined | null) =>
      new CalendarDateTime(
        dv.year,
        dv.month,
        dv.day,
        time?.hour || 0,
        time?.minute || 0,
        time?.second || 0,
        time?.millisecond || 0,
      ),
    [],
  )

  const getRangeMeta = useCallback(
    (date: CalendarDate) => {
      const { start, end } = context?.value || {}
      if (!start || !end) {
        return { inRange: false, edge: false, isStart: false, isEnd: false }
      }
      const startCmp = date.compare(start)
      const endCmp = date.compare(end)
      return {
        inRange: startCmp >= 0 && endCmp <= 0,
        edge: startCmp === 0 || endCmp === 0,
        isStart: startCmp === 0,
        isEnd: endCmp === 0,
      }
    },
    [context?.value],
  )

  const renderCell = useCallback(
    (date: CalendarDate) => {
      const { inRange, edge, isStart, isEnd } = getRangeMeta(date)

      return (
        <CalendarCell
          key={date.toString()}
          date={date}
          className={'Calendar-calendarCell'}
          data-range={inRange || undefined}
          data-edge={edge || undefined}
          data-selection-start={isStart ? 'true' : undefined}
          data-selection-end={isEnd ? 'true' : undefined}
          data-weekend={isWeekend(date, locale) ? true : undefined}
        />
      )
    },
    [getRangeMeta, locale],
  )

  const [anchor, setAnchor] = useState<DateValue | undefined>(undefined)

  useEffect(() => {
    if (!context?.value.start && !context?.value.end) {
      setAnchor(undefined)
    }
  }, [context?.value.start, context?.value.end])

  const onDateChange = useCallback(
    (selected: DateValue) => {
      if (!context) return

      const timeRange = context.timeRange
      const start =
        anchor && anchor.compare(selected) <= 0 ? anchor : selected
      const end =
        (anchor && anchor.compare(selected) <= 0 ? selected : anchor) ||
        start

      // If time selection is enabled, prefer existing selected times; otherwise fall back to day edges.
      const startTime = timeRange?.start || new Time(0, 0, 0, 0)
      const endTime = timeRange?.end || new Time(23, 59, 59, 999)

      context.setValue({
        start: convertDateTime(start, startTime),
        end: convertDateTime(end, endTime),
      })

      if (anchor) {
        setAnchor(undefined)
      } else {
        setAnchor(selected)
      }
    },
    [anchor, context, convertDateTime],
  )

  const onLeftTimeChange = useCallback(
    (time: TimeValue | null) => context?.setTime('start', time),
    [context],
  )
  const onRightTimeChange = useCallback(
    (time: TimeValue | null) => context?.setTime('end', time),
    [context],
  )

  const { minTime, maxTime } = useMemo(() => {
    const { start, end } = context?.value || {}
    const sameDay = (a: DateValue, zdt: ZonedDateTime) =>
      a.toDate(zdt.timeZone).toDateString() === zdt.toDate().toDateString()
    return {
      minTime:
        start && props.minDate && sameDay(start, props.minDate)
          ? toTime(props.minDate)
          : undefined,
      maxTime:
        end && props.maxDate && sameDay(end, props.maxDate)
          ? toTime(props.maxDate)
          : undefined,
    }
  }, [context?.value, props.minDate, props.maxDate])

  const [leftFocused, setLeftFocused] = useState<DateValue>(() => {
    if (context?.value.start) {
      return context.value.start as CalendarDate
    }
    return now(props.timeZone)
  })

  const [rightFocused, setRightFocused] = useState<DateValue>(() => {
    return leftFocused.add({ months: 1 })
  })

  const clampWithinBounds = useCallback(
    (candidate: CalendarDate): CalendarDate => {
      if (props.maxDate && candidate.compare(props.maxDate) > 0)
        return startOfMonth(
          new CalendarDate(
            props.maxDate.calendar,
            props.maxDate.year,
            props.maxDate.month,
            props.maxDate.day,
          ),
        )
      if (props.minDate && candidate.compare(props.minDate) < 0)
        return startOfMonth(
          new CalendarDate(
            props.minDate.calendar,
            props.minDate.year,
            props.minDate.month,
            props.minDate.day,
          ),
        )
      return candidate
    },
    [props.maxDate, props.minDate],
  )

  const handleLeftFocusChange = useCallback(
    (focused: DateValue) => {
      setLeftFocused(focused)
      const leftMonth = startOfMonth(focused as CalendarDate)
      const minAllowedRight = leftMonth.add({ months: 1 })
      const rightMonth = startOfMonth(rightFocused as CalendarDate)
      if (rightMonth.compare(minAllowedRight) <= 0) {
        setRightFocused(clampWithinBounds(minAllowedRight))
      }
    },
    [rightFocused, clampWithinBounds],
  )

  const handleRightFocusChange = useCallback(
    (focused: DateValue) => {
      setRightFocused(focused)
      const rightMonth = startOfMonth(focused as CalendarDate)
      const maxAllowedLeft = rightMonth.add({ months: -1 })
      const leftMonth = startOfMonth(leftFocused as CalendarDate)
      if (leftMonth.compare(maxAllowedLeft) >= 0) {
        setLeftFocused(clampWithinBounds(maxAllowedLeft))
      }
    },
    [leftFocused, clampWithinBounds],
  )

  const handleQuickRangeSelect = useCallback(
    (range: { start: ZonedDateTime; end: ZonedDateTime }) => {
      const start =
        props.minDate && range.start.compare(props.minDate) < 0
          ? props.minDate
          : range.start
      const end =
        props.maxDate && range.end.compare(props.maxDate) > 0
          ? props.maxDate
          : range.end
      context?.setValue({ start, end })
      setLeftFocused(start)
      if (startOfMonth(start).compare(startOfMonth(end)) === 0) {
        const next = start.add({ months: 1 })
        setRightFocused(
          props.maxDate && next.compare(props.maxDate) > 0 ? start : next,
        )
      } else {
        setRightFocused(end)
      }
    },
    [context, props.maxDate, props.minDate],
  )

  return (
    <div className={'RangeCalendar-root'}>
      <QuickRangeSelect
        timeZone={props.timeZone}
        onRangeSelect={handleQuickRangeSelect}
      />
      <div className={'RangeCalendar-columns'}>
        {/* Left column: Start calendar + time */}
        <div className={'RangeCalendar-column'}>
          <div className={'RangeCalendar-calendarWrapper'}>
            <Calendar
              value={context?.value.start as DateValue | undefined}
              onChange={onDateChange}
              minValue={props.minDate}
              maxValue={props.maxDate}
              aria-label={t(
                'kxp.components.datetimeinput.rangeCalendar.startMonth',
              )}
              isReadOnly={props.readOnly}
              focusedValue={leftFocused}
              onFocusChange={handleLeftFocusChange}
            >
              <CalendarHeading />
              <CalendarGrid
                weekdayStyle="short"
                className={'Calendar-calendarGrid'}
              >
                {renderCell}
              </CalendarGrid>
            </Calendar>
          </div>
          {context?.hasTime ? (
            <TimeInput
              value={context.timeRange?.start || null}
              onChange={onLeftTimeChange}
              minTime={minTime}
              maxTime={maxTime}
              label={
                <>
                  <span className={'RangeCalendar-required'}>*</span>
                  {t(
                    'kxp.components.datetimeinput.doubleCalendar.timeFrom',
                  )}
                </>
              }
            />
          ) : null}
        </div>
        <Divider orientation={DividerOrientation.Vertical} />
        <div className={'RangeCalendar-column'}>
          <div className={'RangeCalendar-calendarWrapper'}>
            <Calendar
              value={context?.value.end as DateValue | undefined}
              onChange={onDateChange}
              minValue={props.minDate}
              maxValue={props.maxDate}
              aria-label={t(
                'kxp.components.datetimeinput.rangeCalendar.endMonth',
              )}
              isReadOnly={props.readOnly}
              focusedValue={rightFocused}
              onFocusChange={handleRightFocusChange}
            >
              <CalendarHeading />
              <CalendarGrid
                weekdayStyle="short"
                className={'Calendar-calendarGrid'}
              >
                {renderCell}
              </CalendarGrid>
            </Calendar>
          </div>
          {context?.hasTime ? (
            <TimeInput
              value={context.timeRange?.end || null}
              onChange={onRightTimeChange}
              minTime={minTime}
              maxTime={maxTime}
              label={
                <>
                  <span className={'RangeCalendar-required'}>*</span>
                  {t(
                    'kxp.components.datetimeinput.doubleCalendar.timeTo',
                  )}
                </>
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
