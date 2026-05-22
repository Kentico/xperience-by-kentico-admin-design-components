import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import {
  LanguageSelectorPlaceholder,
  WorkspaceSelectorPlaceholder,
  RoutingContentPlaceholder,
} from './index'

/**
 * Placeholder components serve as mount points for dynamic functionality.
 * They provide styled containers where external functionality (like language
 * selectors or workspace switchers) can be injected at runtime.
 */
const meta = {
  title: 'Layout/Placeholders',
  component: LanguageSelectorPlaceholder,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LanguageSelectorPlaceholder>

export default meta
type Story = StoryObj

/**
 * The LanguageSelectorPlaceholder is an empty container with padding
 * that serves as a mount point for language selection functionality.
 * When empty, it hides itself using CSS.
 */
export const LanguageSelector: Story = {
  render: () => (
    <div style={{ border: '1px dashed #ccc', padding: 8 }}>
      <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>
        Placeholder container (with content for visibility):
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <LanguageSelectorPlaceholder />
        <span style={{ fontSize: 14 }}>← LanguageSelectorPlaceholder mount point</span>
      </div>
    </div>
  ),
}

/**
 * The WorkspaceSelectorPlaceholder is an empty container with padding
 * that serves as a mount point for workspace selection functionality.
 * When empty, it hides itself using CSS.
 */
export const WorkspaceSelector: Story = {
  render: () => (
    <div style={{ border: '1px dashed #ccc', padding: 8 }}>
      <p style={{ margin: '0 0 8px', fontSize: 12, color: '#666' }}>
        Placeholder container (with content for visibility):
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <WorkspaceSelectorPlaceholder />
        <span style={{ fontSize: 14 }}>← WorkspaceSelectorPlaceholder mount point</span>
      </div>
    </div>
  ),
}

/**
 * The RoutingContentPlaceholder renders children and serves as a
 * placeholder for routing-based content. In full implementation,
 * it handles React Router routes for template-based content.
 */
export const RoutingContent: Story = {
  render: () => (
    <div style={{ border: '1px dashed #ccc', padding: 16 }}>
      <RoutingContentPlaceholder>
        <div
          style={{
            padding: 24,
            backgroundColor: '#f5f5f5',
            borderRadius: 4,
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: '0 0 8px' }}>Content Area</h3>
          <p style={{ margin: 0, color: '#666' }}>
            RoutingContentPlaceholder renders children as the main content area.
          </p>
        </div>
      </RoutingContentPlaceholder>
    </div>
  ),
}

/**
 * Shows all placeholder components together, demonstrating how they
 * can be used as mount points in a typical layout scenario.
 */
export const AllPlaceholders: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 500,
      }}
    >
      <div style={{ border: '1px solid #ddd', borderRadius: 4, padding: 12 }}>
        <h4 style={{ margin: '0 0 8px', fontSize: 14 }}>Header Placeholders</h4>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <WorkspaceSelectorPlaceholder />
            <span style={{ fontSize: 12, color: '#999' }}>[Workspace]</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <LanguageSelectorPlaceholder />
            <span style={{ fontSize: 12, color: '#999' }}>[Language]</span>
          </div>
        </div>
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#f0f0f0', padding: '8px 12px', borderBottom: '1px solid #ddd' }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Content Placeholder</span>
        </div>
        <RoutingContentPlaceholder>
          <div
            style={{
              padding: 24,
              backgroundColor: '#fafafa',
              minHeight: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#666' }}>Main routing content renders here</span>
          </div>
        </RoutingContentPlaceholder>
      </div>
    </div>
  ),
}

/**
 * Demonstrates a skeleton-style loading state pattern that can be
 * achieved by placing animated content within the placeholders.
 */
export const SkeletonUsagePattern: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <p style={{ margin: 0, fontSize: 12, color: '#666' }}>
        Placeholders can contain skeleton loaders while content loads:
      </p>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {/* Language selector with skeleton */}
        <div style={{ position: 'relative' }}>
          <LanguageSelectorPlaceholder />
          <div
            style={{
              width: 80,
              height: 24,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
              animation: 'pulse 1.5s infinite',
            }}
          />
        </div>

        {/* Workspace selector with skeleton */}
        <div style={{ position: 'relative' }}>
          <WorkspaceSelectorPlaceholder />
          <div
            style={{
              width: 120,
              height: 24,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
              animation: 'pulse 1.5s infinite',
            }}
          />
        </div>
      </div>

      <RoutingContentPlaceholder>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            padding: 16,
            backgroundColor: '#f5f5f5',
            borderRadius: 4,
          }}
        >
          <div
            style={{
              width: '60%',
              height: 20,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: '100%',
              height: 14,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
            }}
          />
          <div
            style={{
              width: '80%',
              height: 14,
              backgroundColor: '#e0e0e0',
              borderRadius: 4,
            }}
          />
        </div>
      </RoutingContentPlaceholder>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  ),
}
