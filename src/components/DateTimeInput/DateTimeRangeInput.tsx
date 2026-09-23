import * as React from 'react';
import {
  useCallback,
  useMemo,
  useState,
  forwardRef,
  type ForwardedRef,
} from 'react'
import {
  DateRangePicker,
  Group,
  DateInput,
  DateSegment,
  Popover,
  Dialog,
} from 'react-aria-components'
import {
  fromDate,
  getLocalTimeZone,
  type ZonedDateTime,
} from '@internationalized/date'
import { useTranslations } from '@/hooks/useTranslations'
import { usePopoverContainerRef } from '@/contexts/PopoverRefContext'
import { Button, ButtonColor } from '@/components/Button'
import { Paper, PaperElevation, BorderRadius } from '@/components/Paper'
import type { DateTimeRangeInputProps } from './DateTimeRangeInput.types'
import { ButtonIcon } from './components/ButtonIcon'
import { ClearInputButton } from './components/ClearInputButton'
import { RangeCalendar } from './components/RangeCalendar'
import './DateTimeInput.css'
import './DateTimeRangeInput.css'

export const DateTimeRangeInput = forwardRef(
  (
    props: DateTimeRangeInputProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const timeZone = props.timeZone ?? getLocalTimeZone()
    const { t } = useTranslations()
    const [isOpen, setIsOpen] = useState(false)
    const minValue = useMemo(() => {
      return props.minDate ? fromDate(props.minDate, timeZone) : undefined
    }, [props.minDate, timeZone])
    const maxValue = useMemo(() => {
      return props.maxDate ? fromDate(props.maxDate, timeZone) : undefined
    }, [props.maxDate, timeZone])

    const portalContainer = usePopoverContainerRef()
    const handleChange = useCallback(
      (
        value: { start: ZonedDateTime; end: ZonedDateTime } | null,
      ) => {
        const onChangeProp = props.onChange
        const newValue = value
          ? {
              from: value.start.toDate(),
              to: value.end.toDate(),
            }
          : null
        onChangeProp?.(newValue)
      },
      [props.onChange],
    )

    const onClear = useCallback(() => {
      handleChange(null)
    }, [handleChange])

    const value = useMemo(() => {
      if (props.value?.from || props.value?.to) {
        return {
          start: fromDate(props.value.from, timeZone),
          end: fromDate(props.value.to, timeZone),
        }
      }
      return null
    }, [props.value, timeZone])

    const closeCalendar = useCallback(() => {
      setIsOpen(false)
    }, [])

    const openCalendar = useCallback(() => {
      setIsOpen(true)
    }, [])

    return (
      <DateRangePicker
        ref={ref}
        className={'DateTimeInput-datePicker'}
        minValue={minValue}
        maxValue={maxValue}
        granularity={props.showTime ? 'minute' : 'day'}
        isDisabled={props.disabled}
        isReadOnly={props.readOnly}
        shouldCloseOnSelect={false}
        value={value}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        onChange={handleChange}
        startName={props.name ? `${props.name}-start` : undefined}
        endName={props.name ? `${props.name}-end` : undefined}
        aria-label={t(
          'kxp.components.datetimeinput.datetimerangeinput.daterangepicker',
        )}
      >
        <Group className={'DateTimeInput-inputGroup'}>
          <div className={'DateTimeRangeInput-dateRangeInputFieldsRow'}>
            <DateInput slot="start" className={'DateTimeInput-dateInput'}>
              {(segment) =>
                segment.type === 'timeZoneName' || props.readOnly ? (
                  <span tabIndex={-1}>{segment.text}</span>
                ) : (
                  <DateSegment segment={segment} />
                )
              }
            </DateInput>
            <span className={'DateTimeRangeInput-dateDash'}>&ndash;</span>
            <DateInput slot="end" className={'DateTimeInput-dateInput'}>
              {(segment) =>
                segment.type === 'timeZoneName' || props.readOnly ? (
                  <span tabIndex={-1}>{segment.text}</span>
                ) : (
                  <DateSegment segment={segment} />
                )
              }
            </DateInput>
          </div>
          <div className={'DateTimeInput-inputButtons'}>
            {props.allowClear && !props.readOnly && !props.disabled ? (
              <ClearInputButton onClear={onClear} />
            ) : null}
            {!props.disabled && !props.readOnly ? (
              <ButtonIcon
                icon="xp-calendar"
                aria-label={t(
                  'kxp.components.datetimeinput.datetimerangeinput.openCalendar',
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
        >
          <Dialog>
            <Paper
              className={'DateTimeInput-paperWrapper'}
              elevation={PaperElevation.Medium}
              borderRadius={BorderRadius.Medium}
            >
              <RangeCalendar
                timeZone={timeZone}
                minDate={minValue}
                maxDate={maxValue}
                readOnly={props.readOnly}
              />
              <div className={'DateTimeInput-dateTimeInputTimeActionsRow'}>
                <Button
                  label={t(
                    'kxp.components.datetimeinput.datetimerangeinput.done',
                  )}
                  color={ButtonColor.Primary}
                  onClick={closeCalendar}
                />
              </div>
            </Paper>
          </Dialog>
        </Popover>
      </DateRangePicker>
    )
  },
)

DateTimeRangeInput.displayName = 'DateTimeRangeInput'
