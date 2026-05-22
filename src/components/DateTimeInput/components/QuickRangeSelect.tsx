import * as React from 'react';
import { useContext, useMemo } from 'react'
import { now } from '@internationalized/date'
import { DateRangePickerStateContext } from 'react-aria-components'
import { useTranslations } from '@/hooks/useTranslations'
import { Button, ButtonColor } from '@/components/Button'
import type { SelectTimeRangeProps } from './QuickRangeSelect.types'
import './QuickRangeSelect.css'

export const QuickRangeSelect = (props: SelectTimeRangeProps) => {
  const { t } = useTranslations()
  const context = useContext(DateRangePickerStateContext)

  const handlers = useMemo(() => {
    const hourMs = 60 * 60 * 1000
    const dayMs = 24 * hourMs
    const options = [
      {
        key: '48h',
        label: t(
          'kxp.components.datetimeinput.datetimerangeinput.last48hours',
        ),
        subtract: { days: 2 },
        durationMs: 48 * hourMs,
      },
      {
        key: '7d',
        label: t(
          'kxp.components.datetimeinput.datetimerangeinput.last7days',
        ),
        subtract: { days: 7 },
        durationMs: 7 * dayMs,
      },
      {
        key: '14d',
        label: t(
          'kxp.components.datetimeinput.datetimerangeinput.last14days',
        ),
        subtract: { days: 14 },
        durationMs: 14 * dayMs,
      },
      {
        key: '30d',
        label: t(
          'kxp.components.datetimeinput.datetimerangeinput.last30days',
        ),
        subtract: { days: 30 },
        durationMs: 30 * dayMs,
      },
      {
        key: '60d',
        label: t(
          'kxp.components.datetimeinput.datetimerangeinput.last60days',
        ),
        subtract: { days: 60 },
        durationMs: 60 * dayMs,
      },
    ]
    const onRangeSelect = props.onRangeSelect
    return options.map((opt) => ({
      ...opt,
      handler: () => {
        let end = now(props.timeZone)
        let start = end.subtract(opt.subtract)

        // reset the range from the start of the day (00:00:00.000) to the end of the day (23:59:59.999)
        end = end.set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
        start = end.subtract(opt.subtract).add({ milliseconds: 1 })

        onRangeSelect?.({ start, end })
      },
    }))
  }, [t, props.timeZone, props.onRangeSelect])

  const currentDurationMs = useMemo(() => {
    const start = context?.value.start
    const end = context?.value.end
    if (!start || !end) return undefined

    const startDate = start.toDate(props.timeZone).getTime()
    const endDate = end.toDate(props.timeZone).getTime()

    return endDate - startDate
  }, [context?.value.start, context?.value.end, props.timeZone])

  return (
    <div className={'QuickRangeSelect-column'}>
      {handlers.map((opt) => {
        const handleClick = opt.handler
        const isActive =
          currentDurationMs !== undefined &&
          (currentDurationMs === opt.durationMs ||
            currentDurationMs === opt.durationMs - 1)
        return (
          <Button
            key={opt.key}
            onClick={handleClick}
            color={ButtonColor.Quinary}
            active={isActive}
          >
            {opt.label}
          </Button>
        )
      })}
    </div>
  )
}
