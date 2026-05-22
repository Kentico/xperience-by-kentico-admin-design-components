/**
 * Lightweight i18n stub replacing `react-i18next`'s `useTranslation` hook.
 *
 * Returns a `t` function that looks up English defaults by translation key.
 * This keeps the design system standalone without requiring full i18n infrastructure.
 *
 * Keys follow the source convention: `kxp.components.<component>.<key>`
 */

const translations: Record<string, string> = {
  // DateTimeInput
  'kxp.components.datetimeinput.datetimeinput.datepicker': 'Date input',
  'kxp.components.datetimeinput.datetimeinput.openCalendar': 'Open calendar',
  'kxp.components.datetimeinput.datetimeinput.done': 'Done',

  // DateTimeRangeInput
  'kxp.components.datetimeinput.datetimerangeinput.daterangepicker':
    'Date interval selector',
  'kxp.components.datetimeinput.datetimerangeinput.openCalendar':
    'Open calendar',
  'kxp.components.datetimeinput.datetimerangeinput.done': 'Done',

  // CalendarHeading
  'kxp.components.datetimeinput.calendarheading.previous': 'Previous',
  'kxp.components.datetimeinput.calendarheading.next': 'Next',
  'kxp.components.datetimeinput.datetimeinput.calendarheading.selectMonth':
    'Select month',
  'kxp.components.datetimeinput.datetimeinput.calendarheading.selectYear':
    'Select year',

  // ClearInputButton
  'kxp.components.datetimeinput.clearinputbutton.clear': 'Clear',

  // QuickRangeSelect
  'kxp.components.datetimeinput.datetimerangeinput.last48hours':
    'Last 48 hours',
  'kxp.components.datetimeinput.datetimerangeinput.last7days': 'Last 7 days',
  'kxp.components.datetimeinput.datetimerangeinput.last14days': 'Last 14 days',
  'kxp.components.datetimeinput.datetimerangeinput.last30days': 'Last 30 days',
  'kxp.components.datetimeinput.datetimerangeinput.last60days': 'Last 60 days',

  // RangeCalendar
  'kxp.components.datetimeinput.rangeCalendar.startMonth': 'Start month',
  'kxp.components.datetimeinput.rangeCalendar.endMonth': 'End month',

  // TimeInput (double calendar)
  'kxp.components.datetimeinput.doubleCalendar.timeFrom': 'Time from',
  'kxp.components.datetimeinput.doubleCalendar.timeTo': 'Time to',
  'kxp.components.datetimeinput.timePicker.selectTime': 'Select time options',
  'kxp.components.datetimeinput.timePicker.timeInput': 'Time input',
}

/**
 * Stub replacement for `useTranslation()` from react-i18next.
 *
 * @returns An object with a `t` function for looking up translation strings.
 *
 * @example
 * ```tsx
 * const { t } = useTranslations()
 * return <label>{t('kxp.components.datetimeinput.datetimeinput.done')}</label>
 * ```
 */
export const useTranslations = () => {
  const t = (key: string): string => translations[key] ?? key

  return { t }
}
