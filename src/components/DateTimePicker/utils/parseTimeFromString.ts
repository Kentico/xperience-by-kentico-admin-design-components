import type { TimeValue } from '../DateTimePicker.types'

const regexValidTimeInput = /^\d{0,2}:?\d{0,2}(\s?[ap][m]?)?$/i
const regexAm = /[a][m]?/i
const regexAmOrPm = /[ap][m]?/i
const regexOnlyNumbers = /\d+/
const regexSeparator = /:/

const pm12in24hours = 12
const am12in24hours = 0

const AmPm = {
  AM: 'am',
  PM: 'pm',
} as const
type AmPm = (typeof AmPm)[keyof typeof AmPm]

const toNumber = (num: string) => {
  return parseInt(num, 10)
}

const getZeroPaddedTime = (time: string) => {
  return time.length === 1 ? `0${time}00` : String(time).padEnd(4, '0')
}

const removeSeparatorFromTimeString = (time: string) => {
  let result = time
  if (regexSeparator.test(time)) {
    const timeParts = time.split(':')
    const hours = timeParts[0]
    const minutes = timeParts[1]
    result = `${String(hours).padStart(2, '0')}${minutes}`
  }
  return result
}

const getAmPmFromTimeString = (time: string) => {
  if (regexAmOrPm.test(time)) {
    return regexAm.test(time) ? AmPm.AM : AmPm.PM
  }

  return null
}

/*
 * Parses hours and minutes in 24-hours format from a string containing a time in either 12 or 24 hours format
 */
export const parseTimeFromString = (
  timeString: string,
): TimeValue | undefined => {
  if (!regexValidTimeInput.test(timeString)) {
    return undefined
  }

  const isAmOrPm = getAmPmFromTimeString(timeString)

  const timeWithoutSeparator = removeSeparatorFromTimeString(timeString)

  const timeWithoutChars = regexOnlyNumbers
    .exec(timeWithoutSeparator)
    ?.toString()
  if (!timeWithoutChars) {
    return undefined
  }

  const zeroPaddedTime = getZeroPaddedTime(timeWithoutChars)

  let parsedHours = toNumber(zeroPaddedTime.slice(0, 2))
  const parsedMinutes = toNumber(zeroPaddedTime.slice(2))

  if (isAmOrPm) {
    if (parsedHours === 12) {
      parsedHours = isAmOrPm === AmPm.PM ? pm12in24hours : am12in24hours
    } else {
      parsedHours = isAmOrPm === AmPm.PM ? parsedHours + 12 : parsedHours
    }
  }

  if (parsedHours > 23 || parsedMinutes > 59) {
    return undefined
  }

  return {
    hours: parsedHours,
    minutes: parsedMinutes,
  }
}
