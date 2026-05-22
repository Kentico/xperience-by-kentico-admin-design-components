import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { FormItemWrapper } from './FormItemWrapper'
import { FormEditMode } from '@/components/types/FormEditMode'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'

const meta = {
  title: 'Forms/FormItemWrapper',
  component: FormItemWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    inline: { control: 'boolean' },
    markAsRequired: { control: 'boolean' },
    invalid: { control: 'boolean' },
    validationMessage: { control: 'text' },
    statusText: { control: 'text' },
    explanationText: { control: 'text' },
    explanationTextAsHtml: { control: 'boolean' },
    inactiveMessage: { control: 'text' },
    labelIcon: { control: 'text' },
    labelIconTooltip: { control: 'text' },
    editMode: {
      control: 'select',
      options: [FormEditMode.Default, FormEditMode.Disabled, FormEditMode.ReadOnly],
    },
  },
  args: {
    onInlineWrapperClick: fn(),
    inline: false,
    markAsRequired: false,
    invalid: false,
    explanationTextAsHtml: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormItemWrapper>

export default meta
type Story = StoryObj<typeof FormItemWrapper>

export const Default: Story = {
  args: {
    label: 'Email Address',
    id: 'email-input',
    children: <Input placeholder="Enter email..." name="email" id="email-input" />,
  },
}

export const WithRequired: Story = {
  args: {
    label: 'Username',
    markAsRequired: true,
    id: 'username-input',
    children: <Input placeholder="Enter username..." name="username" id="username-input" />,
  },
}

export const Inline: Story = {
  args: {
    label: 'Subscribe to newsletter',
    inline: true,
    id: 'subscribe-input',
    children: <input type="checkbox" name="subscribe" id="subscribe-input" />,
  },
}

export const WithValidation: Story = {
  args: {
    label: 'Password',
    invalid: true,
    validationMessage: 'Password must be at least 8 characters',
    id: 'password-input',
    children: <Input value="abc" invalid name="password" id="password-input" />,
  },
}

export const WithStatusText: Story = {
  args: {
    label: 'Description',
    statusText: '50/500 characters',
    id: 'description-input',
    children: <Input placeholder="Enter description..." name="description" id="description-input" />,
  },
}

export const WithExplanationText: Story = {
  args: {
    label: 'API Key',
    explanationText: 'Your API key is used for authentication. Keep it secure.',
    id: 'api-key-input',
    children: <Input placeholder="Enter API key..." name="api-key" id="api-key-input" />,
  },
}

export const WithHtmlExplanation: Story = {
  args: {
    label: 'Terms',
    explanationText: 'By submitting, you agree to our <a href="#">Terms of Service</a>.',
    explanationTextAsHtml: true,
    id: 'terms-input',
    children: <input type="checkbox" name="terms" id="terms-input" />,
  },
}

export const WithLabelIcon: Story = {
  args: {
    label: 'Secure Field',
    labelIcon: 'xp-lock',
    labelIconTooltip: 'This field is encrypted',
    id: 'secure-input',
    children: <Input placeholder="Enter secure data..." name="secure" id="secure-input" />,
  },
}

export const WithLabelActions: Story = {
  args: {
    label: 'Tags',
    labelActionsElement: (
      <Button size="S" color="secondary">
        Add
      </Button>
    ),
    id: 'tags-input',
    children: <Input placeholder="Enter tags..." name="tags" id="tags-input" />,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    editMode: FormEditMode.Disabled,
    inactiveMessage: 'This field is currently disabled',
    id: 'disabled-input',
    children: <Input placeholder="Disabled..." disabled name="disabled" id="disabled-input" />,
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Read-Only Field',
    editMode: FormEditMode.ReadOnly,
    id: 'readonly-input',
    children: <Input value="Read-only value" disabled name="readonly" id="readonly-input" />,
  },
}

export const EditModes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>
          Default Mode
        </span>
        <FormItemWrapper
          label="Default"
          editMode={FormEditMode.Default}
          id="edit-default"
        >
          <Input placeholder="Editable..." name="edit-default" id="edit-default" />
        </FormItemWrapper>
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>
          Disabled Mode
        </span>
        <FormItemWrapper
          label="Disabled"
          editMode={FormEditMode.Disabled}
          inactiveMessage="Field is disabled"
          id="edit-disabled"
        >
          <Input placeholder="Disabled..." disabled name="edit-disabled" id="edit-disabled" />
        </FormItemWrapper>
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#666', marginBottom: 4, display: 'block' }}>
          Read-Only Mode
        </span>
        <FormItemWrapper
          label="Read-Only"
          editMode={FormEditMode.ReadOnly}
          id="edit-readonly"
        >
          <Input value="Read-only value" disabled name="edit-readonly" id="edit-readonly" />
        </FormItemWrapper>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 320 }}>
      <FormItemWrapper
        label="Required Field"
        markAsRequired
        id="variant-required"
      >
        <Input placeholder="Required..." name="variant-required" id="variant-required" />
      </FormItemWrapper>

      <FormItemWrapper
        label="With Icon"
        labelIcon="xp-info-circle"
        labelIconTooltip="Additional information"
        id="variant-icon"
      >
        <Input placeholder="With icon..." name="variant-icon" id="variant-icon" />
      </FormItemWrapper>

      <FormItemWrapper
        label="With Validation"
        invalid
        validationMessage="This field is required"
        id="variant-invalid"
      >
        <Input invalid name="variant-invalid" id="variant-invalid" />
      </FormItemWrapper>

      <FormItemWrapper
        label="With Status"
        statusText="0/100 characters"
        id="variant-status"
      >
        <Input placeholder="With status..." name="variant-status" id="variant-status" />
      </FormItemWrapper>

      <FormItemWrapper
        label="With Explanation"
        explanationText="Enter a valid email address for notifications."
        id="variant-explanation"
      >
        <Input placeholder="With explanation..." name="variant-explanation" id="variant-explanation" />
      </FormItemWrapper>

      <FormItemWrapper
        label="Inline Checkbox"
        inline
        id="variant-inline"
      >
        <input type="checkbox" name="variant-inline" id="variant-inline" />
      </FormItemWrapper>
    </div>
  ),
}
