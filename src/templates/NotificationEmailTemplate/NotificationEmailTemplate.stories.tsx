import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import {
  NotificationEmailPreviewPageTemplate,
  NotificationEmailContentPageTemplate,
} from './NotificationEmailTemplate'

const meta = {
  title: 'Templates/NotificationEmailTemplate',
  component: NotificationEmailPreviewPageTemplate,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Preview: Story = {
  render: () => (
    <NotificationEmailPreviewPageTemplate
      initialSubject="Welcome to our platform"
      initialContent="<html><body><h1>Welcome!</h1><p>Thank you for signing up. We are glad to have you on board.</p></body></html>"
    />
  ),
}

export const PreviewWithCustomFetch: Story = {
  render: () => (
    <NotificationEmailPreviewPageTemplate
      getPreview={async () => ({
        subject: 'Password Reset Request',
        content:
          '<html><body><h1>Password Reset</h1><p>Click the link below to reset your password.</p><a href="#">Reset Password</a></body></html>',
      })}
    />
  ),
}

export const NotConfigured: Story = {
  render: () => <NotificationEmailPreviewPageTemplate />,
}

export const ContentEditor: Story = {
  render: () => (
    <NotificationEmailContentPageTemplate>
      <div style={{ padding: 24 }}>
        <p>Email content editor form fields would appear here.</p>
      </div>
    </NotificationEmailContentPageTemplate>
  ),
}
