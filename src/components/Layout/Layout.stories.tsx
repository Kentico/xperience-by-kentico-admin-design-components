import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'
import { Row } from './Row'
import { RowWrap } from './Row'
import { Column, Cols } from './Column'
import { Inline, InlineSpacingXDirection } from './Inline'
import { Grid } from './Grid'
import { LayoutAlignment, Spacing } from './Layout.types'

/** Helper component to visualize layout items */
const LayoutItem = ({
  children,
  color = '#e3f2fd',
}: {
  children: React.ReactNode
  color?: string
}) => (
  <div
    style={{
      background: color,
      padding: '12px 16px',
      borderRadius: 4,
      border: '1px solid #90caf9',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
)

// =============================================================================
// Stack Stories
// =============================================================================

const stackMeta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    align: {
      control: 'select',
      options: Object.values(LayoutAlignment),
      description: 'Horizontal alignment of children',
    },
    spacing: {
      control: 'number',
      description: 'Vertical spacing between children',
    },
    fullHeight: {
      control: 'boolean',
      description: 'Whether the stack should take full height',
    },
  },
  args: {
    fullHeight: false,
  },
} satisfies Meta<typeof Stack>

export default stackMeta
type StackStory = StoryObj<typeof stackMeta>

export const StackDefault: StackStory = {
  render: () => (
    <Stack spacing={Spacing.S}>
      <LayoutItem>Item 1</LayoutItem>
      <LayoutItem>Item 2</LayoutItem>
      <LayoutItem>Item 3</LayoutItem>
    </Stack>
  ),
}

export const StackWithSpacing: StackStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacing: XS (4px)
        </p>
        <Stack spacing={Spacing.XS}>
          <LayoutItem>Item 1</LayoutItem>
          <LayoutItem>Item 2</LayoutItem>
          <LayoutItem>Item 3</LayoutItem>
        </Stack>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacing: L (16px)
        </p>
        <Stack spacing={Spacing.L}>
          <LayoutItem>Item 1</LayoutItem>
          <LayoutItem>Item 2</LayoutItem>
          <LayoutItem>Item 3</LayoutItem>
        </Stack>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacing: XXL (32px)
        </p>
        <Stack spacing={Spacing.XXL}>
          <LayoutItem>Item 1</LayoutItem>
          <LayoutItem>Item 2</LayoutItem>
          <LayoutItem>Item 3</LayoutItem>
        </Stack>
      </div>
    </div>
  ),
}

export const StackAlignment: StackStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={{ width: 200 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          align: flex-start (stretch)
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Stack spacing={Spacing.S} align={LayoutAlignment.Start}>
            <LayoutItem>Short</LayoutItem>
            <LayoutItem>Medium Length</LayoutItem>
            <LayoutItem>Longer Content Here</LayoutItem>
          </Stack>
        </div>
      </div>
      <div style={{ width: 200 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          align: center
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Stack spacing={Spacing.S} align={LayoutAlignment.Center}>
            <LayoutItem>Short</LayoutItem>
            <LayoutItem>Medium Length</LayoutItem>
            <LayoutItem>Longer Content Here</LayoutItem>
          </Stack>
        </div>
      </div>
      <div style={{ width: 200 }}>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          align: flex-end
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Stack spacing={Spacing.S} align={LayoutAlignment.End}>
            <LayoutItem>Short</LayoutItem>
            <LayoutItem>Medium Length</LayoutItem>
            <LayoutItem>Longer Content Here</LayoutItem>
          </Stack>
        </div>
      </div>
    </div>
  ),
}

// =============================================================================
// Row Stories
// =============================================================================

export const RowDefault: StoryObj<typeof Row> = {
  render: () => (
    <Row spacing={Spacing.M}>
      <Column>
        <LayoutItem>Column 1</LayoutItem>
      </Column>
      <Column>
        <LayoutItem>Column 2</LayoutItem>
      </Column>
      <Column>
        <LayoutItem>Column 3</LayoutItem>
      </Column>
    </Row>
  ),
}

export const RowWithWrap: StoryObj<typeof Row> = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
        wrap: wrap (default) - maxWidth: 400px
      </p>
      <div style={{ border: '1px dashed #ccc', padding: 8 }}>
        <Row spacing={Spacing.S} wrap={RowWrap.Wrap}>
          <Column>
            <LayoutItem>Item 1</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 2</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 3</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 4</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 5</LayoutItem>
          </Column>
        </Row>
      </div>
    </div>
  ),
}

export const RowNoWrap: StoryObj<typeof Row> = {
  render: () => (
    <div style={{ maxWidth: 400, overflow: 'auto' }}>
      <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
        wrap: nowrap - maxWidth: 400px (scrollable)
      </p>
      <div style={{ border: '1px dashed #ccc', padding: 8, overflow: 'auto' }}>
        <Row spacing={Spacing.S} wrap={RowWrap.NoWrap}>
          <Column>
            <LayoutItem>Item 1</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 2</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 3</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 4</LayoutItem>
          </Column>
          <Column>
            <LayoutItem>Item 5</LayoutItem>
          </Column>
        </Row>
      </div>
    </div>
  ),
}

export const RowAlignment: StoryObj<typeof Row> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          alignX: flex-start
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Row spacing={Spacing.S} alignX={LayoutAlignment.Start}>
            <Column>
              <LayoutItem>A</LayoutItem>
            </Column>
            <Column>
              <LayoutItem>B</LayoutItem>
            </Column>
          </Row>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          alignX: center
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Row spacing={Spacing.S} alignX={LayoutAlignment.Center}>
            <Column>
              <LayoutItem>A</LayoutItem>
            </Column>
            <Column>
              <LayoutItem>B</LayoutItem>
            </Column>
          </Row>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          alignX: flex-end
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Row spacing={Spacing.S} alignX={LayoutAlignment.End}>
            <Column>
              <LayoutItem>A</LayoutItem>
            </Column>
            <Column>
              <LayoutItem>B</LayoutItem>
            </Column>
          </Row>
        </div>
      </div>
    </div>
  ),
}

// =============================================================================
// Column Stories
// =============================================================================

export const ColumnWithCols: StoryObj<typeof Column> = {
  render: () => (
    <div style={{ maxWidth: 800 }}>
      <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
        12-column grid system
      </p>
      <Row spacing={Spacing.S}>
        <Column cols={Cols.Col6}>
          <LayoutItem color="#bbdefb">col-6</LayoutItem>
        </Column>
        <Column cols={Cols.Col6}>
          <LayoutItem color="#c8e6c9">col-6</LayoutItem>
        </Column>
      </Row>
      <div style={{ marginTop: 16 }} />
      <Row spacing={Spacing.S}>
        <Column cols={Cols.Col4}>
          <LayoutItem color="#bbdefb">col-4</LayoutItem>
        </Column>
        <Column cols={Cols.Col4}>
          <LayoutItem color="#c8e6c9">col-4</LayoutItem>
        </Column>
        <Column cols={Cols.Col4}>
          <LayoutItem color="#fff9c4">col-4</LayoutItem>
        </Column>
      </Row>
      <div style={{ marginTop: 16 }} />
      <Row spacing={Spacing.S}>
        <Column cols={Cols.Col3}>
          <LayoutItem color="#bbdefb">col-3</LayoutItem>
        </Column>
        <Column cols={Cols.Col6}>
          <LayoutItem color="#c8e6c9">col-6</LayoutItem>
        </Column>
        <Column cols={Cols.Col3}>
          <LayoutItem color="#fff9c4">col-3</LayoutItem>
        </Column>
      </Row>
    </div>
  ),
}

export const ColumnResponsive: StoryObj<typeof Column> = {
  render: () => (
    <div>
      <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
        Responsive columns: col-12 on mobile, col-6 on md, col-4 on lg
      </p>
      <Row spacing={Spacing.S}>
        <Column cols={Cols.Col12} colsMd={Cols.Col6} colsLg={Cols.Col4}>
          <LayoutItem color="#bbdefb">Responsive 1</LayoutItem>
        </Column>
        <Column cols={Cols.Col12} colsMd={Cols.Col6} colsLg={Cols.Col4}>
          <LayoutItem color="#c8e6c9">Responsive 2</LayoutItem>
        </Column>
        <Column cols={Cols.Col12} colsMd={Cols.Col12} colsLg={Cols.Col4}>
          <LayoutItem color="#fff9c4">Responsive 3</LayoutItem>
        </Column>
      </Row>
    </div>
  ),
}

export const ColumnWithWidth: StoryObj<typeof Column> = {
  render: () => (
    <div>
      <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
        Fixed width using grid units (8px each)
      </p>
      <Row spacing={Spacing.S}>
        <Column width={10}>
          <LayoutItem color="#bbdefb">width: 10 (80px)</LayoutItem>
        </Column>
        <Column width={20}>
          <LayoutItem color="#c8e6c9">width: 20 (160px)</LayoutItem>
        </Column>
        <Column width={30}>
          <LayoutItem color="#fff9c4">width: 30 (240px)</LayoutItem>
        </Column>
      </Row>
    </div>
  ),
}

// =============================================================================
// Inline Stories
// =============================================================================

export const InlineDefault: StoryObj<typeof Inline> = {
  render: () => (
    <Inline spacing={Spacing.S}>
      <LayoutItem>Tag 1</LayoutItem>
      <LayoutItem>Tag 2</LayoutItem>
      <LayoutItem>Tag 3</LayoutItem>
      <LayoutItem>Tag 4</LayoutItem>
    </Inline>
  ),
}

export const InlineWithSpacing: StoryObj<typeof Inline> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacing: S (8px)
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Inline spacing={Spacing.S}>
            <LayoutItem>Item 1</LayoutItem>
            <LayoutItem>Item 2</LayoutItem>
            <LayoutItem>Item 3</LayoutItem>
          </Inline>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacing: M (12px)
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Inline spacing={Spacing.M}>
            <LayoutItem>Item 1</LayoutItem>
            <LayoutItem>Item 2</LayoutItem>
            <LayoutItem>Item 3</LayoutItem>
          </Inline>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacing: L (16px)
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Inline spacing={Spacing.L}>
            <LayoutItem>Item 1</LayoutItem>
            <LayoutItem>Item 2</LayoutItem>
            <LayoutItem>Item 3</LayoutItem>
          </Inline>
        </div>
      </div>
    </div>
  ),
}

export const InlineWithWrapping: StoryObj<typeof Inline> = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
        maxWidth: 300px - items wrap automatically
      </p>
      <div style={{ border: '1px dashed #ccc', padding: 8 }}>
        <Inline spacing={Spacing.S}>
          <LayoutItem>Tag Alpha</LayoutItem>
          <LayoutItem>Tag Beta</LayoutItem>
          <LayoutItem>Tag Gamma</LayoutItem>
          <LayoutItem>Tag Delta</LayoutItem>
          <LayoutItem>Tag Epsilon</LayoutItem>
        </Inline>
      </div>
    </div>
  ),
}

export const InlineSpacingDirection: StoryObj<typeof Inline> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacingXDirection: Left (default)
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Inline
            spacing={Spacing.M}
            spacingXDirection={InlineSpacingXDirection.Left}
          >
            <LayoutItem>Item 1</LayoutItem>
            <LayoutItem>Item 2</LayoutItem>
            <LayoutItem>Item 3</LayoutItem>
          </Inline>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          spacingXDirection: Right
        </p>
        <div style={{ border: '1px dashed #ccc', padding: 8 }}>
          <Inline
            spacing={Spacing.M}
            spacingXDirection={InlineSpacingXDirection.Right}
          >
            <LayoutItem>Item 1</LayoutItem>
            <LayoutItem>Item 2</LayoutItem>
            <LayoutItem>Item 3</LayoutItem>
          </Inline>
        </div>
      </div>
    </div>
  ),
}

// =============================================================================
// Grid Stories
// =============================================================================

export const GridDefault: StoryObj<typeof Grid> = {
  render: () => (
    <Grid cols={3} rowGap={Spacing.S} columnGap={Spacing.S}>
      <LayoutItem>1</LayoutItem>
      <LayoutItem>2</LayoutItem>
      <LayoutItem>3</LayoutItem>
      <LayoutItem>4</LayoutItem>
      <LayoutItem>5</LayoutItem>
      <LayoutItem>6</LayoutItem>
    </Grid>
  ),
}

export const GridColumns: StoryObj<typeof Grid> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          cols: 2
        </p>
        <Grid cols={2} rowGap={Spacing.S} columnGap={Spacing.S}>
          <LayoutItem>1</LayoutItem>
          <LayoutItem>2</LayoutItem>
          <LayoutItem>3</LayoutItem>
          <LayoutItem>4</LayoutItem>
        </Grid>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          cols: 4
        </p>
        <Grid cols={4} rowGap={Spacing.S} columnGap={Spacing.S}>
          <LayoutItem>1</LayoutItem>
          <LayoutItem>2</LayoutItem>
          <LayoutItem>3</LayoutItem>
          <LayoutItem>4</LayoutItem>
          <LayoutItem>5</LayoutItem>
          <LayoutItem>6</LayoutItem>
          <LayoutItem>7</LayoutItem>
          <LayoutItem>8</LayoutItem>
        </Grid>
      </div>
    </div>
  ),
}

export const GridGaps: StoryObj<typeof Grid> = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          Small gaps (4px)
        </p>
        <Grid cols={2} rowGap={Spacing.XS} columnGap={Spacing.XS}>
          <LayoutItem>1</LayoutItem>
          <LayoutItem>2</LayoutItem>
          <LayoutItem>3</LayoutItem>
          <LayoutItem>4</LayoutItem>
        </Grid>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          Medium gaps (12px)
        </p>
        <Grid cols={2} rowGap={Spacing.M} columnGap={Spacing.M}>
          <LayoutItem>1</LayoutItem>
          <LayoutItem>2</LayoutItem>
          <LayoutItem>3</LayoutItem>
          <LayoutItem>4</LayoutItem>
        </Grid>
      </div>
      <div>
        <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
          Large gaps (24px)
        </p>
        <Grid cols={2} rowGap={Spacing.XL} columnGap={Spacing.XL}>
          <LayoutItem>1</LayoutItem>
          <LayoutItem>2</LayoutItem>
          <LayoutItem>3</LayoutItem>
          <LayoutItem>4</LayoutItem>
        </Grid>
      </div>
    </div>
  ),
}

export const GridDifferentGaps: StoryObj<typeof Grid> = {
  render: () => (
    <div>
      <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
        rowGap: XL (24px), columnGap: S (8px)
      </p>
      <Grid cols={3} rowGap={Spacing.XL} columnGap={Spacing.S}>
        <LayoutItem>1</LayoutItem>
        <LayoutItem>2</LayoutItem>
        <LayoutItem>3</LayoutItem>
        <LayoutItem>4</LayoutItem>
        <LayoutItem>5</LayoutItem>
        <LayoutItem>6</LayoutItem>
      </Grid>
    </div>
  ),
}

// =============================================================================
// Combined Layout Examples
// =============================================================================

export const LayoutComposition: StoryObj<typeof Stack> = {
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <Stack spacing={Spacing.XL}>
        <LayoutItem color="#e8f5e9">Header Section</LayoutItem>
        <Row spacing={Spacing.M}>
          <Column cols={Cols.Col8}>
            <Stack spacing={Spacing.S}>
              <LayoutItem color="#e3f2fd">Main Content Area</LayoutItem>
              <Grid cols={2} rowGap={Spacing.S} columnGap={Spacing.S}>
                <LayoutItem color="#fff3e0">Card 1</LayoutItem>
                <LayoutItem color="#fff3e0">Card 2</LayoutItem>
                <LayoutItem color="#fff3e0">Card 3</LayoutItem>
                <LayoutItem color="#fff3e0">Card 4</LayoutItem>
              </Grid>
            </Stack>
          </Column>
          <Column cols={Cols.Col4}>
            <Stack spacing={Spacing.S}>
              <LayoutItem color="#f3e5f5">Sidebar</LayoutItem>
              <LayoutItem color="#fce4ec">Widget 1</LayoutItem>
              <LayoutItem color="#fce4ec">Widget 2</LayoutItem>
            </Stack>
          </Column>
        </Row>
        <LayoutItem color="#e0e0e0">Footer Section</LayoutItem>
      </Stack>
    </div>
  ),
}
