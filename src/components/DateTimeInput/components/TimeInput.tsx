import * as React from 'react';
import { useMemo, useCallback, useRef, type Key, useState } from 'react'
import {
  DateInput,
  DateSegment,
  TimeField,
  Select,
  Group,
  Label,
} from 'react-aria-components'
import { useDateFormatter } from '@react-aria/i18n'
import { Time } from '@internationalized/date'
import { useTranslations } from '@/hooks/useTranslations'
import type { TimeInputProps } from './TimeInput.types'
import { ListPopover } from './ListPopover'
import { ButtonIcon } from './ButtonIcon'
import './TimeInput.css'

export const TimeInput = (props: TimeInputProps) => {
  const { t } = useTranslations()
  const timeFormatter = useDateFormatter({
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC',
  })
  const timeOptions = useMemo(() => {
    const options: { key: Key; time: Time; label: string }[] = []

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = new Time(hour, minute)

        if (props.minTime && time.compare(props.minTime) < 0) {
          continue
        }
        if (props.maxTime && time.compare(props.maxTime) > 0) {
          continue
        }

        const labelDate = new Date(Date.UTC(2000, 0, 1, hour, minute))
        const label = timeFormatter.format(labelDate)
        options.push({ key: time.toString(), time: time, label })
      }
    }

    return options
  }, [props.minTime, props.maxTime, timeFormatter])

  const handleTimeSelect = useCallback(
    (key: Key | null) => {
      const selectedOption = timeOptions.find((option) => option.key === key)
      if (!selectedOption) {
        return
      }
      const onChange = props.onChange
      onChange(selectedOption.time)
    },
    [props.onChange, timeOptions],
  )
  const triggerRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const openSelect = useCallback(() => {
    setIsOpen(true)
  }, [])

  return (
    <Select
      aria-label={t(
        'kxp.components.datetimeinput.timePicker.selectTime',
      )}
      onChange={handleTimeSelect}
      className={'TimeInput-select'}
      isDisabled={props.disabled}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      {props.label ? (
        <Label className={'TimeInput-label'}>{props.label}</Label>
      ) : null}
      <TimeField
        className={'TimeInput-picker'}
        value={props.value}
        isDisabled={props.disabled}
        onChange={props.onChange}
        minValue={props.minTime}
        maxValue={props.maxTime}
        aria-label={t(
          'kxp.components.datetimeinput.timePicker.timeInput',
        )}
        ref={triggerRef}
      >
        <Group className={'TimeInput-input'}>
          <DateInput className={'TimeInput'}>
            {(segment) =>
              segment.type === 'timeZoneName' ? (
                <span tabIndex={-1}>{segment.text}</span>
              ) : (
                <DateSegment segment={segment} />
              )
            }
          </DateInput>
          <ButtonIcon
            icon="xp-chevron-down"
            aria-label={t(
              'kxp.components.datetimeinput.datetimeinput.openCalendar',
            )}
            onPress={openSelect}
          />
        </Group>
      </TimeField>
      <ListPopover items={timeOptions} triggerRef={triggerRef} />
    </Select>
  )
}

TimeInput.displayName = 'TimeInput'
