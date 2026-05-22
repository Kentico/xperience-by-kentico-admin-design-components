import {
  Bullet,
  color,
  Label,
  percent,
  Rectangle,
  Tooltip,
  type Root,
} from '@amcharts/amcharts5'
import {
  AxisRendererX,
  AxisRendererY,
  CategoryAxis,
  ColumnSeries,
  ValueAxis,
  XYCursor,
  type AxisRenderer,
  type XYChart,
} from '@amcharts/amcharts5/xy'
import { type ColumnChartData } from './ColumnChart.types'

/**
 * Column fill color.
 * Hardcoded because CSS custom properties cannot be used in amCharts JavaScript.
 */
const ColumnColor = '#5984ff'

/**
 * Black color for tooltip backgrounds.
 * Hardcoded because CSS custom properties cannot be used in amCharts JavaScript.
 */
const BlackColor = '#000000'

/**
 * Creates an XY cursor for chart interaction.
 * The cursor lines are hidden by default.
 *
 * @param root - The amCharts Root instance
 * @param chart - The XY chart to add the cursor to
 */
export const createCursor = (root: Root, chart: XYChart): void => {
  const cursor = chart.set('cursor', XYCursor.new(root, {}))
  cursor.lineY.setAll({
    visible: false,
  })
  cursor.lineX.setAll({
    visible: false,
  })
}

/**
 * Creates the X axis renderer with label configuration.
 *
 * @param root - The amCharts Root instance
 * @param chart - The XY chart
 * @param getColumnLabel - Callback to generate column labels
 * @returns The configured X axis renderer
 */
export const createXRenderer = (
  root: Root,
  chart: XYChart,
  getColumnLabel: (dataContext: ColumnChartData) => string
): AxisRendererX => {
  const xRenderer = AxisRendererX.new(root, {})

  addLabel(xRenderer, root, chart, getColumnLabel)

  xRenderer.grid.template.setAll({
    visible: false,
  })

  return xRenderer
}

/**
 * Configures labels for the X axis renderer.
 * Labels are positioned inside the chart area with truncation support.
 *
 * @param xRenderer - The X axis renderer to configure
 * @param root - The amCharts Root instance
 * @param chart - The XY chart
 * @param getColumnLabel - Callback to generate column labels
 */
export const addLabel = (
  xRenderer: AxisRendererX,
  root: Root,
  chart: XYChart,
  getColumnLabel: (dataContext: ColumnChartData) => string
): void => {
  xRenderer.labels.template.setAll({
    inside: true,
    textAlign: 'center',
    oversizedBehavior: 'truncate',
    tooltipY: percent(20),
    tooltipText: '{columnLabelTooltip}',
  })

  xRenderer.labels.template.setup = function (target) {
    target.set(
      'background',
      Rectangle.new(root, {
        fill: color(0x000000),
        fillOpacity: 0,
        height: 1000,
      })
    )
  }

  xRenderer.labels.template.adapters.add('dy', function () {
    return -chart.chartContainer.height()
  })

  xRenderer.labels.template.adapters.add('text', function (text, target) {
    if (target.dataItem && target.dataItem.dataContext) {
      const dataContext = target.dataItem.dataContext as ColumnChartData
      return getColumnLabel(dataContext)
    }
    return text
  })

  const tooltip = Tooltip.new(root, {})

  xRenderer.labels.template.adapters.add('tooltip', (_, target) => {
    const width = target.width()
    const maxWidth = target.get('maxWidth')

    tooltip.set('forceHidden', (maxWidth && width < maxWidth) || false)

    return tooltip
  })
}

/**
 * Creates the Y axis renderer.
 * The Y axis grid and labels are hidden.
 *
 * @param root - The amCharts Root instance
 * @returns The configured Y axis renderer
 */
export const createYRenderer = (root: Root): AxisRendererY => {
  const yRenderer = AxisRendererY.new(root, {})
  yRenderer.grid.template.setAll({
    visible: false,
  })

  yRenderer.labels.template.setAll({
    visible: false,
  })

  return yRenderer
}

/**
 * Creates the Y value axis.
 *
 * @param root - The amCharts Root instance
 * @param chart - The XY chart
 * @param yRenderer - The Y axis renderer
 * @returns The configured Y value axis
 */
export const createYAxis = (
  root: Root,
  chart: XYChart,
  yRenderer: AxisRendererY
): ValueAxis<AxisRenderer> => {
  const yAxis = chart.yAxes.push(
    ValueAxis.new(root, {
      extraMax: 0.4,
      renderer: yRenderer,
      min: 0,
    })
  )

  return yAxis
}

/**
 * Creates the X category axis.
 *
 * @param root - The amCharts Root instance
 * @param chart - The XY chart
 * @param xRenderer - The X axis renderer
 * @param chartData - The chart data array
 * @returns The configured X category axis
 */
export const createXAxis = (
  root: Root,
  chart: XYChart,
  xRenderer: AxisRendererX,
  chartData: ColumnChartData[]
): CategoryAxis<AxisRenderer> => {
  const xAxis = chart.xAxes.push(
    CategoryAxis.new(root, {
      categoryField: 'columnId',
      renderer: xRenderer,
    })
  )

  xAxis.onPrivate('cellWidth', function (cellWidth) {
    xRenderer.labels.template.set('maxWidth', cellWidth)
  })

  xAxis.data.setAll(chartData)

  return xAxis
}

/**
 * Creates the column series with tooltips and drop-off indicators.
 *
 * @param root - The amCharts Root instance
 * @param chart - The XY chart
 * @param xAxis - The X category axis
 * @param yAxis - The Y value axis
 * @param chartData - The chart data array
 * @param getBetweenColumnLabel - Callback for drop-off labels
 * @param getBetweenColumnTooltip - Callback for drop-off tooltips
 * @param getColumnTooltip - Callback for column tooltips
 * @returns The configured column series
 */
export const createSeries = (
  root: Root,
  chart: XYChart,
  xAxis: CategoryAxis<AxisRenderer>,
  yAxis: ValueAxis<AxisRenderer>,
  chartData: ColumnChartData[],
  getBetweenColumnLabel: (dataContext: ColumnChartData) => string,
  getBetweenColumnTooltip: (dataContext: ColumnChartData) => string,
  getColumnTooltip: (dataContext: ColumnChartData) => string
): ColumnSeries => {
  const series = chart.series.push(
    ColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: 'columnValue',
      categoryXField: 'columnId',
      fill: color(ColumnColor),
      maskBullets: false,
    })
  )

  series.data.setAll(chartData)

  series.columns.template.setAll({
    cornerRadiusBL: 5,
    cornerRadiusBR: 5,
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
    width: percent(90),
  })

  const tooltip = createTooltip(root)
  addTooltipToSeries(series, tooltip, getColumnTooltip)
  addDropOff(series, tooltip, getBetweenColumnLabel, getBetweenColumnTooltip)

  return series
}

/**
 * Adds tooltip functionality to the column series.
 *
 * @param series - The column series
 * @param tooltip - The tooltip instance
 * @param getColumnTooltip - Callback to generate column tooltips
 */
export const addTooltipToSeries = (
  series: ColumnSeries,
  tooltip: Tooltip,
  getColumnTooltip: (dataContext: ColumnChartData) => string
): void => {
  series.columns.template.set('tooltip', tooltip)

  series.columns.template.adapters.add('tooltipText', function (text, target) {
    if (target.dataItem && target.dataItem.dataContext) {
      const dataContext = target.dataItem.dataContext as ColumnChartData
      return getColumnTooltip(dataContext)
    }
    return text
  })
}

/**
 * Disables the zoom out button on the chart.
 *
 * @param chart - The XY chart
 */
export const disableZoomOutButton = (chart: XYChart): void => {
  if (chart.zoomOutButton) {
    chart.zoomOutButton.set('forceHidden', true)
  }
}

/**
 * Adds drop-off labels between columns.
 * These labels show the change between adjacent columns.
 *
 * @param series - The column series
 * @param tooltip - The tooltip instance for drop-off labels
 * @param getBetweenColumnLabel - Callback to generate drop-off labels
 * @param getBetweenColumnTooltip - Callback to generate drop-off tooltips
 */
export const addDropOff = (
  series: ColumnSeries,
  tooltip: Tooltip,
  getBetweenColumnLabel: (dataContext: ColumnChartData) => string,
  getBetweenColumnTooltip: (dataContext: ColumnChartData) => string
): void => {
  series.bullets.push(function (root) {
    const label = Label.new(root, {
      textAlign: 'center',
      tooltip: tooltip,
      tooltipY: 0,
    })

    label.set(
      'background',
      Rectangle.new(root, { fill: color(BlackColor), fillOpacity: 0 })
    )

    label.adapters.add('tooltipText', function (text, target) {
      if (target.dataItem && target.dataItem.dataContext) {
        const dataContext = target.dataItem.dataContext as ColumnChartData
        return getBetweenColumnTooltip(dataContext)
      }
      return text
    })

    label.adapters.add('text', function (text, target) {
      if (target.dataItem && target.dataItem.dataContext) {
        const dataContext = target.dataItem.dataContext as ColumnChartData
        return getBetweenColumnLabel(dataContext)
      }
      return text
    })

    return Bullet.new(root, {
      locationX: 1.03,
      locationY: 0,
      sprite: label,
    })
  })
}

/**
 * Creates a tooltip with black background styling.
 *
 * @param root - The amCharts Root instance
 * @returns The configured tooltip instance
 */
export const createTooltip = (root: Root): Tooltip => {
  const tooltip = Tooltip.new(root, {
    getFillFromSprite: false,
    autoTextColor: false,
  })

  const tooltipBackground = tooltip.get('background')
  if (tooltipBackground) {
    tooltipBackground.setAll({
      fill: color(BlackColor),
      stroke: color(BlackColor),
    })
  }

  return tooltip
}
