import type { TimeValue } from '../DateTimePicker.types'

/*
    Creates a new Date object from the passed date and sets the time based on passed time value
*/
export const setTimeInDateObject = (
  dateToUpdate: Date | null,
  timeValue: TimeValue,
): Date | null => {
  if (dateToUpdate === null) {
    return null
  }
  const updatedDate = new Date(dateToUpdate.getTime())
  updatedDate.setHours(timeValue.hours, timeValue.minutes, 0, 0)
  return updatedDate
}
