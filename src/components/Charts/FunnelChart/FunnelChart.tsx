import * as React from 'react';
import { forwardRef, useLayoutEffect } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5ThemesAnimated from '@amcharts/amcharts5/themes/Animated'
import { getXbkTheme } from '../ChartTheme'
import { FunnelChartHelper } from './FunnelChartHelper'
import { FunnelOrientation, type FunnelChartProps } from './FunnelChart.types'
import './FunnelChart.css'

/**
 * FunnelChart renders a funnel/pyramid visualization using amCharts 5.
 *
 * The chart displays data as a series of stages, where each stage
 * is represented by a horizontal or vertical slice. The slices
 * use a gradient color scheme from light to dark blue.
 *
 * @example
 * ```tsx
 * <FunnelChart
 *   chartId="my-funnel"
 *   orientation="vertical"
 *   locale="en-US"
 *   data={[
 *     { stage: 'Awareness', interactions: 1000 },
 *     { stage: 'Interest', interactions: 800 },
 *     { stage: 'Decision', interactions: 400 },
 *     { stage: 'Action', interactions: 200 },
 *   ]}
 * />
 * ```
 */
export const FunnelChart = forwardRef<HTMLDivElement, FunnelChartProps>(
  ({ data, chartId, orientation, locale }, ref) => {
    useLayoutEffect(() => {
      const root = am5.Root.new(chartId)

      root.setThemes([am5ThemesAnimated.new(root), getXbkTheme(root)])

      root.numberFormatter.setAll({
        numberFormat: '#,###',
        numericFields: ['value'],
      })

      const localePackageName = locale.replace('-', '_')

      import(
        /* @vite-ignore */
        `@amcharts/amcharts5/locales/${localePackageName}`
      )
        .then((localePackage) => {
          root.locale = localePackage.default
        })
        .catch(async () => {
          const localePackage = await import('@amcharts/amcharts5/locales/en_US')
          root.locale = localePackage.default
        })

      const chart = root.container.children.push(
        am5percent.SlicedChart.new(root, {
          layout:
            orientation === FunnelOrientation.Horizontal
              ? root.horizontalLayout
              : root.verticalLayout,
        })
      )

      const series = chart.series.push(
        am5percent.FunnelSeries.new(root, {
          name: 'Series',
          categoryField: 'stage',
          valueField: 'interactions',
          orientation: orientation,
          bottomRatio: 0.5,
        })
      )

      const colors = data.map((_, index) => {
        return am5.color(
          FunnelChartHelper.getGradientColor(
            '#cce2fc',
            '#50b1f6',
            index / (data.length - 1)
          )
        )
      })

      series.get('colors')?.set('colors', colors)

      series.slices.template.setup = (item: am5percent.FunnelSlice) => {
        item.events.disableType('pointerover')
      }

      series.labels.template.setAll({
        rotation: 0,
        text: '{category}: {value}',
      })

      series.ticks.template.setAll({
        location: 0.5,
      })

      series.data.setAll(data)

      return () => {
        root.dispose()
      }
    }, [data, chartId, orientation, locale])

    return <div ref={ref} id={chartId} className={'FunnelChart'} />
  }
)

FunnelChart.displayName = 'FunnelChart'
