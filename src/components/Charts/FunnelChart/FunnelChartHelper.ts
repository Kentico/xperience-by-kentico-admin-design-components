/**
 * Helper utilities for FunnelChart color calculations.
 *
 * FunnelChartHelper provides color gradient calculation functionality
 * used to create smooth color transitions between funnel chart slices.
 */
export class FunnelChartHelper {
  /**
   * Calculates an intermediate color between two hex colors based on a percentage.
   * Used to create gradient effects for funnel chart slices.
   *
   * @param startColor - Starting hex color (with or without #)
   * @param endColor - Ending hex color (with or without #)
   * @param percent - Percentage between 0 and 1 (0 = startColor, 1 = endColor)
   * @returns Hex color string with # prefix
   *
   * @example
   * ```ts
   * // Get color 50% between blue and green
   * const midColor = FunnelChartHelper.getGradientColor('#0066FF', '#00FF66', 0.5)
   * ```
   */
  public static getGradientColor = (
    startColor: string,
    endColor: string,
    percent: number
  ): string => {
    // Strip # and whitespace from hex colors
    const normalizedStart = startColor.replace(/(^\s*#)|(\s*$)/g, '')
    const normalizedEnd = endColor.replace(/(^\s*#)|(\s*$)/g, '')

    // Parse start color RGB components
    const startRed = parseInt(normalizedStart.slice(0, 2), 16)
    const startGreen = parseInt(normalizedStart.slice(2, 4), 16)
    const startBlue = parseInt(normalizedStart.slice(4, 6), 16)

    // Parse end color RGB components
    const endRed = parseInt(normalizedEnd.slice(0, 2), 16)
    const endGreen = parseInt(normalizedEnd.slice(2, 4), 16)
    const endBlue = parseInt(normalizedEnd.slice(4, 6), 16)

    // Calculate interpolated values
    const diffRed = (endRed - startRed) * percent + startRed
    const diffGreen = (endGreen - startGreen) * percent + startGreen
    const diffBlue = (endBlue - startBlue) * percent + startBlue

    // Convert to hex, ensuring 2-digit format
    let hexRed = diffRed.toString(16).split('.')[0]
    let hexGreen = diffGreen.toString(16).split('.')[0]
    let hexBlue = diffBlue.toString(16).split('.')[0]

    // Pad single-digit hex values with leading zero
    if (hexRed.length === 1) hexRed = '0' + hexRed
    if (hexGreen.length === 1) hexGreen = '0' + hexGreen
    if (hexBlue.length === 1) hexBlue = '0' + hexBlue

    return '#' + hexRed + hexGreen + hexBlue
  }
}
