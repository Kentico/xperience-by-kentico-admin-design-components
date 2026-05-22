import * as React from 'react';
import './Day.css'

interface DayProps {
  readonly day: number
}

export const Day = ({ day }: DayProps) => {
  return (
    <div className={'Day'} data-day={day}>
      {day}
    </div>
  )
}
