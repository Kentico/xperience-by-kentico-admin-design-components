/**
 * Data point for the FunnelChart.
 * Each data point represents a stage in the funnel visualization.
 */
export interface FunnelChartData {
  /**
   * Stage of the funnel to be displayed in its label.
   */
  readonly stage: string
  /**
   * Number to be visualized for the particular stage.
   */
  readonly interactions: number
}

/**
 * Orientation options for the funnel chart.
 */
export const FunnelOrientation = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const

export type FunnelOrientation =
  (typeof FunnelOrientation)[keyof typeof FunnelOrientation]

/**
 * Props for the FunnelChart component.
 * FunnelChart renders a funnel/pyramid visualization using amCharts 5.
 */
export interface FunnelChartProps {
  /**
   * Data to be displayed in the chart.
   * Each item represents a stage in the funnel with a label and value.
   */
  readonly data: FunnelChartData[]
  /**
   * Unique ID for the chart container element.
   * Must be unique when multiple charts are rendered on the same page.
   */
  readonly chartId: string
  /**
   * Orientation of the funnel chart.
   * @default 'vertical'
   */
  readonly orientation: FunnelOrientation
  /**
   * Locale to use for formatting numbers (e.g., 'en-US', 'de-DE').
   * Affects how numbers are displayed in tooltips and labels.
   */
  readonly locale: string
}
