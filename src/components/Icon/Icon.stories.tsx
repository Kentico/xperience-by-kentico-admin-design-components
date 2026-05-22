import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Icon, type IconSize } from './Icon'

const iconSizes: IconSize[] = ['xs', 's', 'm', 'l', 'xl', 'xxl']

/** Regular (non-flag) icons - comprehensive sample for display */
const regularIcons = [
  'home',
  'cogwheel',
  'bell',
  'user',
  'lock',
  'magnifier',
  'star-full',
  'star-half',
  'star-empty',
  'heart',
  'heart-empty',
  'check-circle',
  'times-circle',
  'exclamation-triangle',
  'i-circle',
  'plus',
  'minus',
  'edit',
  'bin',
  'doc-copy',
  'folder-opened',
  'folder-closed',
  'calendar',
  'clock',
  'earth',
  'cloud',
  'camera',
  'eye',
  'eye-slash',
  'arrow-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'a-lowercase',
  'accordion',
  'add-module',
  'adjust',
  'ai',
  'android',
  'apple',
  'badge',
  'bell',
  'book-opened',
  'box',
  'boxes',
  'braces',
  'briefcase',
  'bug',
  'calculator',
  'calendar-plus',
  'chart-bar',
  'chart-line',
  'chart-pie',
  'checkmark',
  'circle',
  'clipboard',
  'code',
  'comment',
  'compass',
  'crown',
  'cube',
  'database',
  'diamond',
  'doc-blank',
  'doc-filled',
  'download',
  'ellipsis-h',
  'ellipsis-v',
  'envelope',
  'filter',
  'fire',
  'flash',
  'gear',
  'gift',
  'hashtag',
  'headset',
  'image',
  'key',
  'laptop',
  'layers',
  'lightbulb',
  'link',
  'list',
  'menu',
  'microphone',
  'mobile',
  'monitor',
  'moon',
  'paintbrush',
  'paperclip',
  'pen',
  'phone',
  'pin',
  'puzzle',
  'refresh',
  'rocket',
  'shield',
  'shopping-cart',
  'sidebar',
  'square',
  'sun',
  'tag',
  'terminal',
  'thumbs-up',
  'triangle',
  'upload',
  'video',
  'volume',
  'wifi',
  'wrench',
]

/** Flag icons - sample for display */
const flagIcons = [
  'flag-afghanistan',
  'flag-albania',
  'flag-algeria',
  'flag-andorra',
  'flag-angola',
  'flag-argentina',
  'flag-armenia',
  'flag-australia',
  'flag-austria',
  'flag-azerbaijan',
  'flag-bahamas',
  'flag-bahrain',
  'flag-bangladesh',
  'flag-barbados',
  'flag-belarus',
  'flag-belgium',
  'flag-belize',
  'flag-benin',
  'flag-bhutan',
  'flag-bolivia',
  'flag-bosnia-and-herzegovina',
  'flag-botswana',
  'flag-brazil',
  'flag-brunei',
  'flag-bulgaria',
  'flag-burkina-faso',
  'flag-burundi',
  'flag-cambodia',
  'flag-cameroon',
  'flag-canada',
  'flag-chad',
  'flag-chile',
  'flag-china',
  'flag-colombia',
  'flag-croatia',
  'flag-cuba',
  'flag-cyprus',
  'flag-czech-republic',
  'flag-denmark',
  'flag-egypt',
  'flag-england',
  'flag-estonia',
  'flag-finland',
  'flag-france',
  'flag-germany',
  'flag-greece',
  'flag-hong-kong',
  'flag-hungary',
  'flag-iceland',
  'flag-india',
  'flag-indonesia',
  'flag-iran',
  'flag-iraq',
  'flag-ireland',
  'flag-israel',
  'flag-italy',
  'flag-japan',
  'flag-jordan',
  'flag-kazakhstan',
  'flag-kenya',
  'flag-south-korea',
  'flag-kuwait',
  'flag-latvia',
  'flag-lebanon',
  'flag-libya',
  'flag-lithuania',
  'flag-luxembourg',
  'flag-malaysia',
  'flag-mexico',
  'flag-morocco',
  'flag-netherlands',
  'flag-new-zealand',
  'flag-nigeria',
  'flag-norway',
  'flag-pakistan',
  'flag-peru',
  'flag-philippines',
  'flag-poland',
  'flag-portugal',
  'flag-qatar',
  'flag-romania',
  'flag-russia',
  'flag-saudi-arabia',
  'flag-scotland',
  'flag-singapore',
  'flag-slovakia',
  'flag-slovenia',
  'flag-south-africa',
  'flag-spain',
  'flag-sweden',
  'flag-switzerland',
  'flag-thailand',
  'flag-turkey',
  'flag-ukraine',
  'flag-united-arab-emirates',
  'flag-united-kingdom',
  'flag-united-states',
  'flag-vietnam',
  'flag-wales',
]

/** All icons for control selector */
const allIcons = [...regularIcons, ...flagIcons]

const meta = {
  title: 'Data Display/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    name: 'home',
    size: 'm',
  },
  argTypes: {
    name: {
      control: 'select',
      options: allIcons,
      description: 'Icon name (with or without xp- prefix)',
    },
    size: {
      control: 'select',
      options: iconSizes,
      description: 'Icon size variant',
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof Icon>

export const Default: Story = {
  args: {
    name: 'home',
    size: 'm',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'end', gap: 16 }}>
      {iconSizes.map((size) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Icon name="home" size={size} />
          <span style={{ fontSize: 12, color: '#666' }}>{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const IconsLibrary: Story = {
  render: () => (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 16 }}>
        Regular Icons ({regularIcons.length} shown)
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: 12,
          maxWidth: 800,
        }}
      >
        {regularIcons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 8,
            }}
            title={name}
          >
            <Icon name={name} size="m" />
            <span
              style={{
                fontSize: 9,
                color: '#666',
                textAlign: 'center',
                wordBreak: 'break-all',
                lineHeight: 1.2,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const FlagIcons: Story = {
  render: () => (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 16 }}>
        Flag Icons ({flagIcons.length} shown)
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 1fr)',
          gap: 12,
          maxWidth: 800,
        }}
      >
        {flagIcons.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 8,
            }}
            title={name}
          >
            <Icon name={name} size="m" />
            <span
              style={{
                fontSize: 9,
                color: '#666',
                textAlign: 'center',
                wordBreak: 'break-all',
                lineHeight: 1.2,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {name.replace('flag-', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const WithXpPrefix: Story = {
  args: {
    name: 'xp-home',
    size: 'm',
  },
}

export const CustomColor: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <span style={{ color: '#0066cc' }}>
        <Icon name="i-circle" size="l" />
      </span>
      <span style={{ color: '#2e7d32' }}>
        <Icon name="check-circle" size="l" />
      </span>
      <span style={{ color: '#d32f2f' }}>
        <Icon name="times-circle" size="l" />
      </span>
      <span style={{ color: '#ed6c02' }}>
        <Icon name="exclamation-triangle" size="l" />
      </span>
    </div>
  ),
}
