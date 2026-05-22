import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { DateTimePicker, DateTimePickerTimeFormat } from './index'

// Generate years array for the picker
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i)

const meta = {
  title: 'Forms/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'date' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
  },
  args: {
    onChange: fn(),
    years,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateTimePicker>

export default meta
type Story = StoryObj<typeof DateTimePicker>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date())
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(newDate) => {
          setDate(newDate)
          args.onChange?.(newDate)
        }}
      />
    )
  },
  args: {
    value: new Date(),
  },
}

export const WithSelectedDate: Story = {
  render: function WithSelectedDateStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15),
  },
}

export const WithMinDate: Story = {
  render: function WithMinDateStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15),
    minDate: new Date(2025, 5, 1),
  },
}

export const WithMaxDate: Story = {
  render: function WithMaxDateStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15),
    maxDate: new Date(2025, 5, 30),
  },
}

export const WithDateConstraints: Story = {
  render: function WithDateConstraintsStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15),
    minDate: new Date(2025, 0, 1),
    maxDate: new Date(2025, 11, 31),
  },
}

export const WithCustomMonths: Story = {
  render: function WithCustomMonthsStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15),
    months: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
  },
}

export const WithTimePicker12Hour: Story = {
  render: function WithTimePicker12HourStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15, 14, 30))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15, 14, 30),
    timePicker: {
      timeFormat: DateTimePickerTimeFormat.Hours12,
      actionLabel: 'Apply',
      defaultTime: { hours: 12, minutes: 0 },
      onActionClick: fn(),
    },
  },
}

export const WithTimePicker24Hour: Story = {
  render: function WithTimePicker24HourStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15, 14, 30))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15, 14, 30),
    timePicker: {
      timeFormat: DateTimePickerTimeFormat.Hours24,
      actionLabel: 'Apply',
      defaultTime: { hours: 12, minutes: 0 },
      onActionClick: fn(),
    },
  },
}

export const AllStates: Story = {
  render: function AllStatesStory() {
    const [date1, setDate1] = useState<Date | null>(new Date())
    const [date2, setDate2] = useState<Date | null>(new Date(2025, 5, 15))

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
            Default (current date)
          </span>
          <DateTimePicker
            value={date1}
            onChange={setDate1}
            years={years}
          />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
            With date constraints (Jun 2025 only)
          </span>
          <DateTimePicker
            value={date2}
            onChange={setDate2}
            years={years}
            minDate={new Date(2025, 5, 1)}
            maxDate={new Date(2025, 5, 30)}
          />
        </div>
      </div>
    )
  },
}

export const TimePickerFormats: Story = {
  render: function TimePickerFormatsStory() {
    const [date12, setDate12] = useState<Date | null>(new Date(2025, 5, 15, 14, 30))
    const [date24, setDate24] = useState<Date | null>(new Date(2025, 5, 15, 14, 30))

    return (
      <div style={{ display: 'flex', gap: 32 }}>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
            12-hour format
          </span>
          <DateTimePicker
            value={date12}
            onChange={setDate12}
            years={years}
            timePicker={{
              timeFormat: DateTimePickerTimeFormat.Hours12,
              actionLabel: 'Select',
              defaultTime: { hours: 12, minutes: 0 },
            }}
          />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 8 }}>
            24-hour format
          </span>
          <DateTimePicker
            value={date24}
            onChange={setDate24}
            years={years}
            timePicker={{
              timeFormat: DateTimePickerTimeFormat.Hours24,
              actionLabel: 'Select',
              defaultTime: { hours: 12, minutes: 0 },
            }}
          />
        </div>
      </div>
    )
  },
}

/** Demonstrates controlled DateTimePicker behavior */
export const Controlled: Story = {
  render: function ControlledDateTimePicker() {
    const [date, setDate] = useState<Date | null>(new Date(2025, 5, 15))

    return (
      <div>
        <DateTimePicker
          value={date}
          onChange={setDate}
          years={years}
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </div>
    )
  },
}

/** Demonstrates controlled DateTimePicker with time picker */
export const ControlledWithTimePicker: Story = {
  render: function ControlledDateTimePickerWithTime() {
    const [date, setDate] = useState<Date | null>(new Date(2025, 5, 15, 14, 30))
    const [lastAction, setLastAction] = useState<string>('')

    const handleActionClick = () => {
      setLastAction(`Action clicked at ${new Date().toLocaleTimeString()}`)
    }

    return (
      <div>
        <DateTimePicker
          value={date}
          onChange={setDate}
          years={years}
          timePicker={{
            timeFormat: DateTimePickerTimeFormat.Hours24,
            actionLabel: 'Apply Time',
            defaultTime: { hours: 12, minutes: 0 },
            onActionClick: handleActionClick,
          }}
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 16 }}>
          Selected: {date ? date.toLocaleString() : 'None'}
        </p>
        {lastAction && (
          <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
            {lastAction}
          </p>
        )}
      </div>
    )
  },
}

/** Demonstrates year range selection */
export const LimitedYearRange: Story = {
  render: function LimitedYearRangeStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimePicker
        {...args}
        value={date}
        onChange={(d) => { setDate(d); args.onChange?.(d) }}
      />
    )
  },
  args: {
    value: new Date(2025, 5, 15),
    years: [2024, 2025, 2026],
  },
}
