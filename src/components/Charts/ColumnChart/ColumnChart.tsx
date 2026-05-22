import * as React from 'react';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
import { Root } from '@amcharts/amcharts5'
import {
  type AxisRenderer,
  AxisRendererX,
  CategoryAxis,
  ColumnSeries,
  XYChart,
} from '@amcharts/amcharts5/xy'
import am5ThemesAnimated from '@amcharts/amcharts5/themes/Animated'
import am5themesResponsive from '@amcharts/amcharts5/themes/Responsive'
import { getXbkTheme } from '../ChartTheme'
import {
  createSeries,
  createCursor,
  createXAxis,
  createXRenderer,
  createYAxis,
  createYRenderer,
  disableZoomOutButton,
  addDropOff,
  addLabel,
  createTooltip,
  addTooltipToSeries,
} from './ColumnChartCreator'
import { type ColumnChartProps } from './ColumnChart.types'
import './ColumnChart.css'

/**
 * Width of each column in pixels.
 * Used to calculate minimum chart width based on data length.
 */
const ColumnWidth = 150

/**
 * ColumnChart renders a column/bar visualization using amCharts 5.
 *
 * The chart displays data as a series of columns with customizable labels,
 * tooltips, and drop-off indicators between columns. It supports responsive
 * resizing and animated appearances.
 *
 * @example
 * ```tsx
 * <ColumnChart
 *   chartId="my-column-chart"
 *   data={[
 *     { columnId: 'q1', columnValue: 1000 },
 *     { columnId: 'q2', columnValue: 800 },
 *     { columnId: 'q3', columnValue: 600 },
 *   ]}
 *   getColumnLabel={(d) => d.columnId}
 *   getBetweenColumnLabel={(d) => `-${d.columnValue}`}
 *   getBetweenColumnTooltip={(d) => `Change: -${d.columnValue}`}
 *   getColumnTooltip={(d) => `Value: ${d.columnValue}`}
 * />
 * ```
 */
export const ColumnChart = forwardRef<HTMLDivElement, ColumnChartProps>(
  (
    {
      data,
      chartId,
      getColumnLabel,
      getBetweenColumnLabel,
      getBetweenColumnTooltip,
      getColumnTooltip,
    },
    ref
  ) => {
    const chartWrapperRef = useRef<HTMLDivElement>(null)

    const rootRef = useRef<Root | null>(null)
    const chartRef = useRef<XYChart | null>(null)
    const seriesRef = useRef<ColumnSeries | null>(null)
    const xRendererRef = useRef<AxisRendererX | null>(null)
    const xAxisRef = useRef<CategoryAxis<AxisRenderer> | null>(null)

    // Set dynamic width based on data length
    useEffect(() => {
      if (chartWrapperRef.current) {
        if (data.length <= 0) {
          chartWrapperRef.current.style.setProperty('--columns', '0px')
        } else {
          chartWrapperRef.current.style.setProperty(
            '--columns',
            `${data.length * ColumnWidth}px`
          )
        }
      }
    }, [data.length])

    // Initialize chart on mount
    useLayoutEffect(() => {
      const root = Root.new(chartId)
      rootRef.current = root

      root.setThemes([
        am5ThemesAnimated.new(root),
        am5themesResponsive.new(root),
        getXbkTheme(root),
      ])

      const chart = root.container.children.push(
        XYChart.new(root, { layout: root.verticalLayout, paddingBottom: 80 })
      )

      disableZoomOutButton(chart)
      chartRef.current = chart

      createCursor(root, chart)

      const xRenderer = createXRenderer(root, chart, getColumnLabel)
      xRendererRef.current = xRenderer

      const xAxis = createXAxis(root, chart, xRenderer, data)
      xAxisRef.current = xAxis

      const yRenderer = createYRenderer(root)
      const yAxis = createYAxis(root, chart, yRenderer)

      const series = createSeries(
        root,
        chart,
        xAxis,
        yAxis,
        data,
        getBetweenColumnLabel,
        getBetweenColumnTooltip,
        getColumnTooltip
      )
      seriesRef.current = series

      void series.appear(2000, 1000)

      return () => {
        root.dispose()
      }
      // We want to render the chart only once
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartId])

    // Update chart data when props change
    useLayoutEffect(() => {
      if (rootRef.current !== null && chartRef.current !== null) {
        const tooltip = createTooltip(rootRef.current)
        if (seriesRef.current) {
          addDropOff(
            seriesRef.current,
            tooltip,
            getBetweenColumnLabel,
            getBetweenColumnTooltip
          )
          seriesRef.current.data.setAll(data)
          addTooltipToSeries(seriesRef.current, tooltip, getColumnTooltip)
          void seriesRef.current.appear(1000, 400)
        }
        if (xRendererRef.current) {
          addLabel(
            xRendererRef.current,
            rootRef.current,
            chartRef.current,
            getColumnLabel
          )
          xAxisRef.current?.data.setAll(data)
          void xRendererRef.current.appear(2000, 500)
        }
      }
      return () => {
        xAxisRef.current?.labelsContainer.children.clear()
        seriesRef.current?.bullets.clear()
      }
    }, [
      data,
      getBetweenColumnLabel,
      getBetweenColumnTooltip,
      getColumnLabel,
      getColumnTooltip,
    ])

    return (
      <div className={'ColumnChart-chartWrapper'} ref={chartWrapperRef}>
        <div ref={ref} id={chartId} className={'ColumnChart-chart'} />
      </div>
    )
  }
)

ColumnChart.displayName = 'ColumnChart'
