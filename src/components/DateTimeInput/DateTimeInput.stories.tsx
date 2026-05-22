import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { DateTimeInput } from './DateTimeInput'
import { DateTimeRangeInput } from './DateTimeRangeInput'

const meta = {
  title: 'Forms/DateTimeInput',
  component: DateTimeInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'date' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    showTime: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    label: { control: 'text' },
    timeZone: { control: 'text' },
  },
  args: {
    onChange: fn(),
    showTime: false,
    disabled: false,
    readOnly: false,
    allowClear: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateTimeInput>

export default meta
type Story = StoryObj<typeof DateTimeInput>

export const Default: Story = {
  render: function DefaultStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? null)
    return (
      <DateTimeInput
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
    name: 'default-datetime',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Select Date',
    name: 'labeled-datetime',
  },
}

export const WithValue: Story = {
  render: function WithValueStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimeInput
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
    label: 'Event Date',
    value: new Date(2025, 5, 15),
    name: 'value-datetime',
  },
}

export const WithTime: Story = {
  render: function WithTimeStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15, 14, 30))
    return (
      <DateTimeInput
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
    label: 'Event Date & Time',
    showTime: true,
    value: new Date(2025, 5, 15, 14, 30),
    name: 'time-datetime',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Date',
    value: new Date(2025, 5, 15),
    disabled: true,
    name: 'disabled-datetime',
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Read Only Date',
    value: new Date(2025, 5, 15),
    readOnly: true,
    name: 'readonly-datetime',
  },
}

export const ReadOnlyWithTime: Story = {
  args: {
    label: 'Read Only DateTime',
    value: new Date(2025, 5, 15, 14, 30),
    readOnly: true,
    showTime: true,
    name: 'readonly-time-datetime',
  },
}

export const WithDateConstraints: Story = {
  args: {
    label: 'Constrained Date Range',
    minDate: new Date(2025, 0, 1),
    maxDate: new Date(2025, 11, 31),
    name: 'constrained-datetime',
  },
}

export const AllowClear: Story = {
  render: function AllowClearStory(args) {
    const [date, setDate] = useState<Date | null>(args.value ?? new Date(2025, 5, 15))
    return (
      <DateTimeInput
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
    label: 'Clearable Date',
    value: new Date(2025, 5, 15),
    allowClear: true,
    name: 'clearable-datetime',
  },
}

export const AllStates: Story = {
  render: function AllStatesStory() {
    const [valueDate, setValueDate] = useState<Date | null>(new Date(2025, 5, 15))
    const [timeDate, setTimeDate] = useState<Date | null>(new Date(2025, 5, 15, 14, 30))
    const [clearDate, setClearDate] = useState<Date | null>(new Date(2025, 5, 15))

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>Default</span>
          <DateTimeInput name="state-default" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>With Label</span>
          <DateTimeInput label="Event Date" name="state-labeled" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>With Value</span>
          <DateTimeInput label="Selected" value={valueDate} onChange={setValueDate} name="state-value" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>With Time</span>
          <DateTimeInput label="DateTime" showTime value={timeDate} onChange={setTimeDate} name="state-time" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>Disabled</span>
          <DateTimeInput label="Disabled" value={new Date(2025, 5, 15)} disabled name="state-disabled" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>Read Only</span>
          <DateTimeInput label="Read Only" value={new Date(2025, 5, 15)} readOnly name="state-readonly" />
        </div>
        <div>
          <span style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>Clearable</span>
          <DateTimeInput label="Clearable" value={clearDate} onChange={setClearDate} allowClear name="state-clearable" />
        </div>
      </div>
    )
  },
}

/** Demonstrates controlled DateTimeInput behavior */
export const Controlled: Story = {
  render: function ControlledDateTimeInput() {
    const [date, setDate] = useState<Date | null>(new Date(2025, 5, 15))

    return (
      <div>
        <DateTimeInput
          label="Controlled Date"
          value={date}
          onChange={setDate}
          allowClear
          name="controlled-datetime"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Selected: {date ? date.toLocaleDateString() : 'None'}
        </p>
      </div>
    )
  },
}

/** Demonstrates controlled DateTimeInput with time selection */
export const ControlledWithTime: Story = {
  render: function ControlledDateTimeInputWithTime() {
    const [date, setDate] = useState<Date | null>(new Date(2025, 5, 15, 14, 30))

    return (
      <div>
        <DateTimeInput
          label="Controlled DateTime"
          value={date}
          onChange={setDate}
          showTime
          allowClear
          name="controlled-datetime-time"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Selected: {date ? date.toLocaleString() : 'None'}
        </p>
      </div>
    )
  },
}

// DateTimeRangeInput Stories
const rangeMeta = {
  title: 'Forms/DateTimeRangeInput',
  component: DateTimeRangeInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showTime: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    timeZone: { control: 'text' },
  },
  args: {
    onChange: fn(),
    showTime: false,
    disabled: false,
    readOnly: false,
    allowClear: false,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: 400, minHeight: 400 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DateTimeRangeInput>

type RangeStory = StoryObj<typeof rangeMeta>

export const RangeDefault: RangeStory = {
  render: () => <DateTimeRangeInput name="range-default" />,
}

export const RangeWithValue: RangeStory = {
  render: function RangeWithValueStory() {
    const [range, setRange] = useState<{ from: Date; to: Date } | null>({
      from: new Date(2025, 5, 1),
      to: new Date(2025, 5, 30),
    })
    return (
      <DateTimeRangeInput
        value={range}
        onChange={setRange}
        name="range-value"
      />
    )
  },
}

export const RangeWithTime: RangeStory = {
  render: function RangeWithTimeStory() {
    const [range, setRange] = useState<{ from: Date; to: Date } | null>({
      from: new Date(2025, 5, 1, 9, 0),
      to: new Date(2025, 5, 30, 17, 0),
    })
    return (
      <DateTimeRangeInput
        showTime
        value={range}
        onChange={setRange}
        name="range-time"
      />
    )
  },
}

export const RangeDisabled: RangeStory = {
  render: () => (
    <DateTimeRangeInput
      value={{ from: new Date(2025, 5, 1), to: new Date(2025, 5, 30) }}
      disabled
      name="range-disabled"
    />
  ),
}

export const RangeReadOnly: RangeStory = {
  render: () => (
    <DateTimeRangeInput
      value={{ from: new Date(2025, 5, 1), to: new Date(2025, 5, 30) }}
      readOnly
      name="range-readonly"
    />
  ),
}

export const RangeClearable: RangeStory = {
  render: function RangeClearableStory() {
    const [range, setRange] = useState<{ from: Date; to: Date } | null>({
      from: new Date(2025, 5, 1),
      to: new Date(2025, 5, 30),
    })
    return (
      <DateTimeRangeInput
        value={range}
        onChange={setRange}
        allowClear
        name="range-clearable"
      />
    )
  },
}

export const RangeWithConstraints: RangeStory = {
  render: () => (
    <DateTimeRangeInput
      minDate={new Date(2025, 0, 1)}
      maxDate={new Date(2025, 11, 31)}
      name="range-constrained"
    />
  ),
}

/** Demonstrates controlled DateTimeRangeInput behavior */
export const RangeControlled: RangeStory = {
  render: function ControlledDateTimeRangeInput() {
    const [range, setRange] = useState<{ from: Date; to: Date } | null>({
      from: new Date(2025, 5, 1),
      to: new Date(2025, 5, 30),
    })

    return (
      <div>
        <DateTimeRangeInput
          value={range}
          onChange={setRange}
          allowClear
          name="range-controlled"
        />
        <p style={{ fontSize: 12, color: '#666', marginTop: 8 }}>
          Range:{' '}
          {range
            ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
            : 'None'}
        </p>
      </div>
    )
  },
}
