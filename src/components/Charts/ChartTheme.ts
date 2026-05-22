import { Theme, type Root } from '@amcharts/amcharts5'

/**
 * Creates a custom amCharts theme with GT Walsheim font family.
 * This theme applies the design system's typography to chart labels.
 *
 * @example
 * ```tsx
 * import * as am5 from '@amcharts/amcharts5'
 * import { getXbkTheme } from './ChartTheme'
 *
 * const root = am5.Root.new('chartdiv')
 * root.setThemes([getXbkTheme(root)])
 * ```
 *
 * @param root - The amCharts Root instance to create the theme for
 * @returns A Theme instance configured with GT Walsheim font
 */
export const getXbkTheme = (root: Root): Theme => {
  const xbkTheme = Theme.new(root)
  xbkTheme.rule('Label').setAll({
    fontFamily: 'GT Walsheim, sans-serif',
  })
  return xbkTheme
}
