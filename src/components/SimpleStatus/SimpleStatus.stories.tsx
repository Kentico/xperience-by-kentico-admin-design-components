import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import {
  BaseSimpleStatus,
  SimpleStatusDefault,
  SimpleStatusError,
  SimpleStatusSuccess,
  SimpleStatusWarning,
  SimpleStatusType,
  SimpleStatusSize,
  SimpleStatusAlign,
} from './index'

const statusTypes = Object.values(SimpleStatusType)
const statusSizes = Object.values(SimpleStatusSize)

const meta = {
  title: 'Data Display/SimpleStatus',
  component: BaseSimpleStatus,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    type: SimpleStatusType.Default,
    size: SimpleStatusSize.S,
    spread: false,
    content: {
      label: 'Status message',
      iconName: 'info-circle',
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: statusTypes,
      description: 'Status type for semantic styling',
    },
    size: {
      control: 'select',
      options: statusSizes,
      description: 'Size variant (S or XS)',
    },
    spread: {
      control: 'boolean',
      description: 'Spreads the component to full width',
    },
    labelColor: {
      control: 'color',
      description: 'Custom label color',
    },
    iconColor: {
      control: 'color',
      description: 'Custom icon color',
    },
  },
} satisfies Meta<typeof BaseSimpleStatus>

export default meta
type Story = StoryObj<typeof BaseSimpleStatus>

export const Default: Story = {
  args: {
    type: SimpleStatusType.Default,
    size: SimpleStatusSize.S,
    content: {
      label: 'Default status',
      iconName: 'info-circle',
    },
  },
}

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SimpleStatusDefault
        content={{ label: 'Default status', iconName: 'info-circle' }}
      />
      <SimpleStatusSuccess
        content={{ label: 'Success status', iconName: 'check-circle' }}
      />
      <SimpleStatusWarning
        content={{ label: 'Warning status', iconName: 'exclamation-triangle' }}
      />
      <SimpleStatusError content={{ label: 'Error status' }} />
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <SimpleStatusDefault
          content={{ label: 'Standard size (S)', iconName: 'info-circle' }}
          size={SimpleStatusSize.S}
        />
        <span style={{ fontSize: 12, color: '#666' }}>S</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <SimpleStatusDefault
          content={{ label: 'Extra small (XS)', iconName: 'info-circle' }}
          size={SimpleStatusSize.XS}
        />
        <span style={{ fontSize: 12, color: '#666' }}>XS</span>
      </div>
    </div>
  ),
}

export const TypeSizeMatrix: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        gap: 16,
        alignItems: 'center',
      }}
    >
      {/* Header row */}
      <div />
      <div style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Size S</div>
      <div style={{ fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Size XS</div>

      {/* Default row */}
      <div style={{ fontSize: 12, fontWeight: 'bold' }}>Default</div>
      <SimpleStatusDefault
        content={{ label: 'Default', iconName: 'info-circle' }}
        size={SimpleStatusSize.S}
      />
      <SimpleStatusDefault
        content={{ label: 'Default', iconName: 'info-circle' }}
        size={SimpleStatusSize.XS}
      />

      {/* Success row */}
      <div style={{ fontSize: 12, fontWeight: 'bold' }}>Success</div>
      <SimpleStatusSuccess
        content={{ label: 'Success', iconName: 'check-circle' }}
        size={SimpleStatusSize.S}
      />
      <SimpleStatusSuccess
        content={{ label: 'Success', iconName: 'check-circle' }}
        size={SimpleStatusSize.XS}
      />

      {/* Warning row */}
      <div style={{ fontSize: 12, fontWeight: 'bold' }}>Warning</div>
      <SimpleStatusWarning
        content={{ label: 'Warning', iconName: 'exclamation-triangle' }}
        size={SimpleStatusSize.S}
      />
      <SimpleStatusWarning
        content={{ label: 'Warning', iconName: 'exclamation-triangle' }}
        size={SimpleStatusSize.XS}
      />

      {/* Error row */}
      <div style={{ fontSize: 12, fontWeight: 'bold' }}>Error</div>
      <SimpleStatusError content={{ label: 'Error' }} size={SimpleStatusSize.S} />
      <SimpleStatusError content={{ label: 'Error' }} size={SimpleStatusSize.XS} />
    </div>
  ),
}

export const IconAlignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <SimpleStatusDefault
        content={{
          label: 'Icon on left',
          iconName: 'info-circle',
          iconAlign: SimpleStatusAlign.Left,
        }}
      />
      <SimpleStatusDefault
        content={{
          label: 'Icon on right',
          iconName: 'info-circle',
          iconAlign: SimpleStatusAlign.Right,
        }}
      />
    </div>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <SimpleStatusSuccess
        content={{ iconName: 'check-circle', tooltipText: 'Operation successful' }}
      />
      <SimpleStatusWarning
        content={{ iconName: 'exclamation-triangle', tooltipText: 'Needs attention' }}
      />
      <SimpleStatusError content={{ label: '', tooltipText: 'Failed' }} />
    </div>
  ),
}

export const WithCustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <BaseSimpleStatus
        type={SimpleStatusType.Default}
        content={{ label: 'Custom purple theme', iconName: 'star-full' }}
        labelColor="#6b21a8"
        iconColor="#9333ea"
      />
      <BaseSimpleStatus
        type={SimpleStatusType.Default}
        content={{ label: 'Custom teal theme', iconName: 'heart' }}
        labelColor="#0f766e"
        iconColor="#14b8a6"
      />
    </div>
  ),
}

export const SuccessStatus: Story = {
  render: () => (
    <SimpleStatusSuccess
      content={{ label: 'Operation completed successfully', iconName: 'check-circle' }}
    />
  ),
}

export const WarningStatus: Story = {
  render: () => (
    <SimpleStatusWarning
      content={{ label: 'Action required', iconName: 'exclamation-triangle' }}
    />
  ),
}

export const ErrorStatus: Story = {
  render: () => <SimpleStatusError content={{ label: 'An error occurred' }} />,
}
