/**
 * MagicGrid - Flexible Masonry Layout Implementation
 *
 * @credits emmanuelolaojo https://github.com/e-oj/Magic-Grid
 *
 * The MagicGrid class is an implementation of a flexible
 * grid layout that positions elements in a masonry-style pattern.
 */

import type { Column, ConfigType, MagicGridType } from './MagicGrid.types'

class MagicGrid implements MagicGridType {
  private container: HTMLElement
  private containerClass: string
  private static: boolean
  private size: number
  private gutter: number
  private maxColumns: number
  private useMin: boolean
  private useTransform: boolean
  private animate: boolean
  private center: boolean
  private styledItems: Set<unknown>

  /**
   * Initializes the necessary variables for a magic grid.
   *
   * @param config configuration object
   */
  constructor(config: ConfigType) {
    if (config.container === null) {
      throw new Error('Container cannot be null.')
    }

    if (config.container instanceof HTMLElement) {
      this.container = config.container
      this.containerClass = config.container.className
    } else {
      this.containerClass = config.container
      const el = document.querySelector<HTMLElement>(config.container)

      if (el) {
        this.container = el
      } else {
        throw new Error('Container element not found.')
      }
    }

    if (!config.static && !config.items) {
      throw new Error('Items are required for dynamic content.')
    }

    this.static = config.static ?? false
    this.size = config.items
    this.gutter = config.gutter ?? 25
    this.maxColumns = config.maxColumns ?? 5
    this.useMin = config.useMin ?? false
    this.useTransform = config.useTransform ?? true
    this.animate = config.animate ?? false
    this.center = config.center ?? false
    this.styledItems = new Set()
  }

  /**
   * Initializes styles for container and items.
   */
  private initStyles(): void {
    if (!this.ready()) return

    this.container.style.position = 'relative'
    const items = this.items()

    for (let i = 0; i < items.length; i++) {
      if (this.styledItems.has(items[i])) continue

      const style = (items[i] as HTMLElement).style

      style.position = 'absolute'

      if (this.animate) {
        style.transition = `${this.useTransform ? 'transform' : 'top, left'} 0.2s ease`
      }

      this.styledItems.add(items[i])
    }
  }

  /**
   * Gets a collection of all items in a grid.
   */
  private items(): HTMLCollection {
    return this.container.children
  }

  /**
   * Calculates the width of a column.
   *
   * @return width of a column in the grid
   */
  private colWidth(): number {
    return this.items()[0].getBoundingClientRect().width + this.gutter
  }

  /**
   * Finds the shortest column in a column list.
   *
   * @param cols list of columns
   * @return shortest column
   */
  private getMin(cols: Column[]): Column {
    let min = cols[0]

    for (const col of cols) {
      if (col.height < min.height) min = col
    }

    return min
  }

  /**
   * Initializes an array of empty columns
   * and calculates the leftover whitespace.
   */
  private setup(): { cols: Column[]; wSpace: number } {
    const width = this.container.getBoundingClientRect().width
    const colWidth = this.colWidth()
    let numCols = Math.floor(width / colWidth) || 1
    const cols: Column[] = []

    if (this.maxColumns && numCols > this.maxColumns) {
      numCols = this.maxColumns
    }

    for (let i = 0; i < numCols; i++) {
      cols[i] = { height: 0, index: i }
    }

    const wSpace = width - numCols * colWidth + this.gutter

    return { cols, wSpace }
  }

  /**
   * Gets the next available column.
   *
   * @param cols list of columns
   * @param i index of dom element
   * @return next available column
   */
  private nextCol(cols: Column[], i: number): Column {
    if (this.useMin) {
      return this.getMin(cols)
    }

    return cols[i % cols.length]
  }

  /**
   * Positions each item in the grid, based on their corresponding
   * column's height and index then stretches the container to
   * the height of the grid.
   */
  public positionItems(): void {
    const { cols, wSpace: rawWSpace } = this.setup()
    let maxHeight = 0
    const colWidth = this.colWidth()
    const items = this.items()

    const wSpace = this.center ? Math.floor(rawWSpace / 2) : 0

    this.initStyles()

    for (let i = 0; i < items.length; i++) {
      const col = this.nextCol(cols, i)
      const item = items[i] as HTMLElement
      const topGutter = col.height ? this.gutter : 0
      const left = col.index * colWidth + wSpace + 'px'
      const top = col.height + topGutter + 'px'

      if (this.useTransform) {
        item.style.transform = `translate(${left}, ${top})`
      } else {
        item.style.top = top
        item.style.left = left
      }

      col.height += item.getBoundingClientRect().height + topGutter

      if (col.height > maxHeight) {
        maxHeight = col.height
      }
    }

    this.container.style.height = maxHeight + this.gutter + 'px'
  }

  /**
   * Checks if every item has been loaded in the dom.
   *
   * @return true if every item is present
   */
  private ready(): boolean {
    if (this.static) return true
    return this.items().length >= this.size
  }

  /**
   * Periodically checks that all items have been loaded in the dom.
   * Calls this.listen() once all the items are present.
   */
  private getReady(): void {
    const interval = setInterval(() => {
      const el = document.querySelector<HTMLElement>(this.containerClass)

      if (el) {
        this.container = el
      }

      if (this.ready()) {
        clearInterval(interval)
        this.listen()
      }
    }, 100)
  }

  /**
   * Positions all the items and repositions them whenever
   * the window size changes.
   */
  public listen(): void {
    if (this.ready()) {
      let timeout: ReturnType<typeof setTimeout> | null

      window.addEventListener('resize', () => {
        if (!timeout) {
          timeout = setTimeout(() => {
            this.positionItems()
            timeout = null
          }, 200)
        }
      })

      this.positionItems()
    } else {
      this.getReady()
    }
  }
}

export default MagicGrid
