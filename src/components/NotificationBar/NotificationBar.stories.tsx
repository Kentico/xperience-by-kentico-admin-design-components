import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import {
  BaseNotificationBar,
  NotificationBarAlert,
  NotificationBarWarning,
  NotificationBarInfo,
  NotificationBarType,
} from './NotificationBar'
import { Button } from '@/components/Button'
import { ButtonSize } from '@/components/Button/Button.types'

const meta = {
  title: 'Feedback/NotificationBar',
  component: BaseNotificationBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    type: {
      control: 'select',
      options: Object.values(NotificationBarType),
      description: 'The type/variant of the notification bar',
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when dismiss button is clicked',
    },
    noAutoIncrease: {
      control: 'boolean',
      description: 'Disables the auto-increase alignment when notification bar grows taller',
    },
    noBoldWeight: {
      control: 'boolean',
      description: 'Disables the bold (medium) weight of the text',
    },
    childrenAsHtml: {
      control: 'boolean',
      description: 'When true, children (string) is rendered as sanitized HTML',
    },
    children: {
      control: 'text',
      description: 'Notification content',
    },
  },
  args: {
    noAutoIncrease: false,
    noBoldWeight: false,
    childrenAsHtml: false,
  },
} satisfies Meta<typeof BaseNotificationBar>

export default meta
type Story = StoryObj<typeof BaseNotificationBar>

export const Default: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'This is an informational notification.',
  },
}

export const Alert: Story = {
  args: {
    type: NotificationBarType.Alert,
    children: 'This is an alert notification. Something requires your immediate attention.',
  },
}

export const Warning: Story = {
  args: {
    type: NotificationBarType.Warning,
    children: 'This is a warning notification. Please review before proceeding.',
  },
}

export const Info: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'This is an informational notification. Here is some helpful information.',
  },
}

export const AllTypes: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'Notification content',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <NotificationBarAlert>
        Alert: This is an alert notification for critical issues.
      </NotificationBarAlert>
      <NotificationBarWarning>
        Warning: This is a warning notification for potential issues.
      </NotificationBarWarning>
      <NotificationBarInfo>
        Info: This is an informational notification for general updates.
      </NotificationBarInfo>
    </div>
  ),
}

export const Dismissible: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'This notification can be dismissed by clicking the X button.',
    onDismiss: () => {},
  },
}

export const AllTypesDismissible: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'Notification content',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <NotificationBarAlert onDismiss={() => {}}>
        Alert notification with dismiss button.
      </NotificationBarAlert>
      <NotificationBarWarning onDismiss={() => {}}>
        Warning notification with dismiss button.
      </NotificationBarWarning>
      <NotificationBarInfo onDismiss={() => {}}>
        Info notification with dismiss button.
      </NotificationBarInfo>
    </div>
  ),
}

export const WithActions: Story = {
  args: {
    type: NotificationBarType.Warning,
    children: 'Your session will expire in 5 minutes.',
    actions: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size={ButtonSize.S} color="secondary" label="Extend Session" />
      </div>
    ),
    onDismiss: () => {},
  },
}

export const LongContent: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'Notification content',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <NotificationBarAlert onDismiss={() => {}}>
        This is a notification with longer content that may cause the notification bar to
        expand. When the content exceeds the default height, the bar will automatically
        adjust its alignment to accommodate the extra content gracefully.
      </NotificationBarAlert>
      <NotificationBarWarning noAutoIncrease onDismiss={() => {}}>
        This notification has noAutoIncrease enabled, so it will not adjust alignment
        even with longer content that spans multiple lines in the notification bar.
      </NotificationBarWarning>
    </div>
  ),
}

export const NormalFontWeight: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'Notification content',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <NotificationBarInfo>
        This notification uses the default bold font weight.
      </NotificationBarInfo>
      <NotificationBarInfo noBoldWeight>
        This notification uses normal font weight with noBoldWeight prop.
      </NotificationBarInfo>
    </div>
  ),
}

export const WithRichContent: Story = {
  args: {
    type: NotificationBarType.Info,
    children: 'Notification content',
  },
  render: () => (
    <NotificationBarInfo onDismiss={() => {}}>
      <div>
        <strong>Update Available:</strong> A new version is ready to install.{' '}
        <a href="#" style={{ color: 'inherit' }}>
          Learn more
        </a>
      </div>
    </NotificationBarInfo>
  ),
}
