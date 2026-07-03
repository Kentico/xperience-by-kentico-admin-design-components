import * as React from 'react';
import {
  type ForwardedRef,
  useCallback,
  useMemo,
  forwardRef,
  useState,
} from 'react'
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Popover,
  type DateValue,
  type TimeValue,
  useLocale,
} from 'react-aria-components'
import {
  fromDate,
  getLocalTimeZone,
  isWeekend,
  Time,
  type CalendarDate,
  now,
} from '@internationalized/date'
import { useTranslations } from '@/hooks/useTranslations'
import { Button, ButtonColor } from '@/components/Button'
import { FormEditMode } from '@/components/types/FormEditMode'
import { FormItemWrapper } from '@/components/FormItemWrapper'
import { TextWithLabel } from '@/components/TextWithLabel'
import { Paper, PaperElevation, BorderRadius } from '@/components/Paper'
import { usePopoverContainerRef } from '@/contexts/PopoverRefContext'
import type { DateTimeInputProps } from './DateTimeInput.types'
import { ButtonIcon } from './components/ButtonIcon'
import { CalendarHeading } from './components/CalendarHeading'
import { ClearInputButton } from './components/ClearInputButton'
import { TimeInput } from './components/TimeInput'
import './components/Calendar.css'
import './DateTimeInput.css'

export const DateTimeInput = forwardRef(
  (props: DateTimeInputProps, ref: ForwardedRef<HTMLDivElement>) => {
    const timezone = props.timeZone ?? getLocalTimeZone()
    const value = props.value ? fromDate(props.value, timezone) : null
    const [isOpen, setIsOpen] = useState(false)

    const constraints = useMemo(() => {
      const minDate = props.minDate
        ? fromDate(props.minDate, timezone)
        : undefined
      const maxDate = props.maxDate
        ? fromDate(props.maxDate, timezone)
        : undefined
      const minTime =
        value &&
        minDate &&
        value.toDate().toDateString() === minDate.toDate().toDateString()
          ? new Time(minDate.hour, minDate.minute)
          : undefined
      const maxTime =
        value &&
        maxDate &&
        value.toDate().toDateString() === maxDate.toDate().toDateString()
          ? new Time(maxDate.hour, maxDate.minute)
          : undefined
      return { minDate, maxDate, minTime, maxTime }
    }, [props.minDate, props.maxDate, timezone, value])

    const onChange = useCallback(
      (newValue: DateValue | null) => {
        const date = newValue?.toDate(timezone) || null
        const onChangeProp = props.onChange
        onChangeProp?.(date)
      },
      [props.onChange, timezone],
    )

    const onClear = useCallback(() => {
      onChange(null)
    }, [onChange])

    const onTimeChange = useCallback(
      (time: TimeValue | null) => {
        if (!time) {
          onChange(null)
          return
        }

        const newDateTime = (value ? value : now(timezone)).set({
          hour: time.hour,
          minute: time.minute,
          second: time.second,
          millisecond: time.millisecond,
        })
        onChange(newDateTime)
      },
      [onChange, value, timezone],
    )

    const onDoneClick = useCallback(() => {
      setIsOpen(false)
    }, [])

    const { locale } = useLocale()
    const { t } = useTranslations()
    const portalContainer = usePopoverContainerRef()

    const renderCalendarCell = useCallback(
      (date: CalendarDate) => {
        return (
          <CalendarCell
            className={'Calendar-calendarCell'}
            date={date}
            data-weekend={isWeekend(date, locale) ? true : undefined}
          />
        )
      },
      [locale],
    )

    const openCalendar = useCallback(() => {
      setIsOpen(true)
    }, [])

    const editMode = props.readOnly
      ? FormEditMode.ReadOnly
      : props.disabled
        ? FormEditMode.Disabled
        : FormEditMode.Default

    return (
      <FormItemWrapper
        ref={ref}
        label={props.label}
        editMode={editMode}
        disabled={props.disabled}
      >
        {props.readOnly ? (
          <TextWithLabel
            value={
              props.value
                ? new Intl.DateTimeFormat(locale, {
                    ...(props.showTime
                      ? {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZoneName: 'short',
                          timeZone: timezone,
                        }
                      : { dateStyle: 'short' as const, timeZone: timezone }),
                  }).format(props.value)
                : undefined
            }
          />
        ) : (
          <DatePicker
            className={'DateTimeInput-datePicker'}
            minValue={constraints.minDate}
            maxValue={constraints.maxDate}
            onChange={onChange}
            value={value}
            granularity={props.showTime ? 'minute' : 'day'}
            isDisabled={props.disabled}
            name={props.name}
            aria-label={
              props.label ||
              t('kxp.components.datetimeinput.datetimeinput.datepicker')
            }
          >
            <Group className={'DateTimeInput-inputGroup'}>
              <DateInput className={'DateTimeInput-dateInput'}>
                {(segment) =>
                  segment.type === 'timeZoneName' ? (
                    <span tabIndex={-1}>{segment.text}</span>
                  ) : (
                    <DateSegment segment={segment} />
                  )
                }
              </DateInput>
              <div className={'DateTimeInput-inputButtons'}>
                {props.allowClear && !props.disabled ? (
                  <ClearInputButton onClear={onClear} />
                ) : null}
                {!props.disabled ? (
                  <ButtonIcon
                    icon="xp-calendar"
                    aria-label={t(
                      'kxp.components.datetimeinput.datetimeinput.openCalendar',
                    )}
                    onPress={openCalendar}
                  />
                ) : null}
              </div>
            </Group>
            <Popover
              className={'DateTimeInput-popover'}
              {...(portalContainer
                ? { UNSTABLE_portalContainer: portalContainer }
                : {})}
              onOpenChange={setIsOpen}
              isOpen={isOpen}
            >
                <Dialog>
                  <Paper
                    className={'DateTimeInput-paperWrapper'}
                    elevation={PaperElevation.Medium}
                    borderRadius={BorderRadius.Medium}
                  >
                    <Calendar>
                      <CalendarHeading />
                      <CalendarGrid
                        weekdayStyle="short"
                        className={'Calendar-calendarGrid'}
                      >
                        {renderCalendarCell}
                      </CalendarGrid>
                    </Calendar>
                    {props.showTime ? (
                      <div className={'DateTimeInput-dateTimeInputTimeActionsRow'}>
                        <TimeInput
                          value={
                            value
                              ? new Time(
                                  value.hour,
                                  value.minute,
                                  value.second,
                                  value.millisecond,
                                )
                              : null
                          }
                          onChange={onTimeChange}
                          minTime={constraints.minTime}
                          maxTime={constraints.maxTime}
                        />
                        <Button
                          label={t(
                            'kxp.components.datetimeinput.datetimeinput.done',
                          )}
                          color={ButtonColor.Primary}
                          onClick={onDoneClick}
                          type="submit"
                        />
                      </div>
                    ) : null}
                  </Paper>
                </Dialog>
            </Popover>
          </DatePicker>
        )}
      </FormItemWrapper>
    )
  },
)

DateTimeInput.displayName = 'DateTimeInput'
