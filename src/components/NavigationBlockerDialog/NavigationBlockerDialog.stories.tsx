import * as React from 'react';
import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  NavigationBlockerDialogProvider,
  useNavigationBlocker,
} from './NavigationBlockerDialog'

const meta = {
  title: 'Feedback/NavigationBlockerDialog',
  component: NavigationBlockerDialogProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

const blockerTexts = {
  headline: 'Unsaved Changes',
  message: 'You have unsaved changes. Are you sure you want to leave?',
  confirmLabel: 'Leave',
  cancelLabel: 'Stay',
}

const NavBar = () => {
  const location = useLocation()
  return (
    <nav
      style={{
        padding: '12px 24px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: 16,
        background: '#f9f9f9',
      }}
    >
      {[
        { to: '/', label: 'Home' },
        { to: '/edit', label: 'Edit Form' },
        { to: '/settings', label: 'Settings' },
      ].map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          style={{
            color: location.pathname === to ? '#007bff' : '#333',
            fontWeight: location.pathname === to ? 600 : 400,
            textDecoration: 'none',
          }}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

const HomePage = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ margin: '0 0 8px' }}>Home</h2>
    <p style={{ color: '#666' }}>
      Navigate to &quot;Edit Form&quot; and make changes, then try navigating
      away.
    </p>
  </div>
)

const SettingsPage = () => (
  <div style={{ padding: 24 }}>
    <h2 style={{ margin: '0 0 8px' }}>Settings</h2>
    <p style={{ color: '#666' }}>You navigated here successfully.</p>
  </div>
)

const EditFormPage = ({ blockByDefault }: { blockByDefault: boolean }) => {
  const [hasChanges, setHasChanges] = useState(blockByDefault)
  const { dialog } = useNavigationBlocker({
    shouldBlock: hasChanges,
    texts: blockerTexts,
  })

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ margin: '0 0 8px' }}>Edit Form</h2>
      <div
        style={{
          padding: 16,
          border: `1px solid ${hasChanges ? '#ffc107' : '#ccc'}`,
          borderRadius: 4,
          marginBottom: 16,
        }}
      >
        <p style={{ margin: '0 0 12px', fontSize: 13, color: '#666' }}>
          {hasChanges
            ? 'You have unsaved changes — try navigating away'
            : 'No unsaved changes — navigation is free'}
        </p>
        <input
          type="text"
          placeholder="Type to simulate changes..."
          onChange={(e) => setHasChanges(e.target.value.length > 0)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: 4,
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        {hasChanges && (
          <button
            onClick={() => setHasChanges(false)}
            style={{
              marginTop: 8,
              padding: '6px 12px',
              cursor: 'pointer',
              border: '1px solid #28a745',
              borderRadius: 4,
              background: '#28a745',
              color: '#fff',
            }}
          >
            Save (clears blocker)
          </button>
        )}
      </div>
      {dialog}
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/edit']}>
      <NavigationBlockerDialogProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/edit"
            element={<EditFormPage blockByDefault={false} />}
          />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </NavigationBlockerDialogProvider>
    </MemoryRouter>
  ),
}

export const Blocked: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/edit']}>
      <NavigationBlockerDialogProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/edit"
            element={<EditFormPage blockByDefault={true} />}
          />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </NavigationBlockerDialogProvider>
    </MemoryRouter>
  ),
}
