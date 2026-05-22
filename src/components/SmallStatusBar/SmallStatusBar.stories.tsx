import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { SmallStatusBar } from './SmallStatusBar'
import type { UserProfile } from '@/components/Avatar'

const sampleUserProfile: UserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
}

const userWithImage: UserProfile = {
  firstName: 'Jane',
  lastName: 'Smith',
  username: 'janesmith',
  email: 'jane.smith@example.com',
  imageUrl: 'https://i.pravatar.cc/150?u=janesmith',
}

const userWithUsernameOnly: UserProfile = {
  username: 'admin',
}

/**
 * SmallStatusBar is a mobile status bar with logo, language selector, and user avatar.
 * It provides a compact navigation bar suitable for mobile or narrow layouts.
 */
const meta = {
  title: 'Layout/SmallStatusBar',
  component: SmallStatusBar,
  tags: ['autodocs'],
  decorators: [(Story) => <MemoryRouter><Story /></MemoryRouter>],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    userProfile: sampleUserProfile,
  },
  argTypes: {
    userProfile: {
      description: 'User profile data displayed in the avatar',
    },
    onProfileClick: {
      action: 'profile-clicked',
      description: 'Callback when profile action is triggered',
    },
    onSignOut: {
      action: 'sign-out',
      description: 'Callback when sign out action is triggered',
    },
    className: {
      control: 'text',
      description: 'Optional additional class name',
    },
  },
} satisfies Meta<typeof SmallStatusBar>

export default meta
type Story = StoryObj<typeof SmallStatusBar>

export const Default: Story = {
  args: {
    userProfile: sampleUserProfile,
  },
}

export const WithUserImage: Story = {
  args: {
    userProfile: userWithImage,
  },
  parameters: {
    docs: {
      description: {
        story: 'SmallStatusBar with a user profile that includes an avatar image.',
      },
    },
  },
}

export const UsernameOnly: Story = {
  args: {
    userProfile: userWithUsernameOnly,
  },
  parameters: {
    docs: {
      description: {
        story:
          'SmallStatusBar with a minimal user profile containing only a username.',
      },
    },
  },
}

export const WithCallbacks: Story = {
  args: {
    userProfile: sampleUserProfile,
    onProfileClick: () => alert('Profile clicked!'),
    onSignOut: () => alert('Sign out clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'SmallStatusBar with interactive callbacks for profile and sign out actions.',
      },
    },
  },
}

export const InMobileLayout: Story = {
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 400,
        maxWidth: 375,
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <SmallStatusBar {...args} />
      <div
        style={{
          flex: 1,
          backgroundColor: '#f5f5f5',
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: '#666', margin: 0, textAlign: 'center' }}>
          Main content area below the SmallStatusBar
        </p>
      </div>
    </div>
  ),
  args: {
    userProfile: sampleUserProfile,
  },
  parameters: {
    docs: {
      description: {
        story:
          'SmallStatusBar shown in context within a mobile device simulation (375px width).',
      },
    },
  },
}

export const MultipleProfiles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>
          User with full profile
        </p>
        <SmallStatusBar userProfile={sampleUserProfile} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>
          User with avatar image
        </p>
        <SmallStatusBar userProfile={userWithImage} />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>
          Username only
        </p>
        <SmallStatusBar userProfile={userWithUsernameOnly} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of SmallStatusBar with different user profile configurations.',
      },
    },
  },
}
