/**
 * Data point for the ColumnChart.
 * Each data point represents a column in the chart visualization.
 */
export interface ColumnChartData {
  /**
   * Unique identifier for the column.
   * Used to identify the column in callbacks and data operations.
   */
  readonly columnId: string
  /**
   * Numeric value of the column.
   * Determines the height of the column in the chart.
   */
  readonly columnValue: number
  /**
   * Optional tooltip text for the column label.
   * Displayed when hovering over the column's category label.
   */
  readonly columnLabelTooltip?: string
}

/**
 * Props for the ColumnChart component.
 * ColumnChart renders a column/bar chart visualization using amCharts 5.
 */
export interface ColumnChartProps {
  /**
   * Data to be displayed in the chart.
   * Each item represents a column with an ID, value, and optional tooltip.
   */
  readonly data: ColumnChartData[]
  /**
   * Unique ID for the chart container element.
   * Must be unique when multiple charts are rendered on the same page.
   */
  readonly chartId: string
  /**
   * Callback to generate the label displayed below each column.
   * @param dataContext - The data context for the column
   * @returns The label string to display
   */
  readonly getColumnLabel: (dataContext: ColumnChartData) => string
  /**
   * Callback to generate the label displayed between columns (drop-off indicator).
   * @param dataContext - The data context for the column
   * @returns The label string to display between columns
   */
  readonly getBetweenColumnLabel: (dataContext: ColumnChartData) => string
  /**
   * Callback to generate the tooltip for the label between columns.
   * @param dataContext - The data context for the column
   * @returns The tooltip string for the between-column label
   */
  readonly getBetweenColumnTooltip: (dataContext: ColumnChartData) => string
  /**
   * Callback to generate the tooltip displayed when hovering over a column.
   * @param dataContext - The data context for the column
   * @returns The tooltip string for the column
   */
  readonly getColumnTooltip: (dataContext: ColumnChartData) => string
}
