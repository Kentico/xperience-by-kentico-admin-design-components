import * as React from 'react';
/**
 * MagicGridWrapper - React adapter for MagicGrid
 *
 * @credits amytych https://github.com/amytych/react-magic-grid
 *
 * A React wrapper component that provides a masonry layout using MagicGrid.
 */

import { useEffect, useRef } from 'react'
import MagicGrid from './MagicGrid'
import type { MagicGridType, ReactMagicGridProps } from './MagicGrid.types'

export function MagicGridWrapper({
  as: Component = 'div',
  children,
  ...props
}: ReactMagicGridProps) {
  const container = useRef<HTMLDivElement>(null)
  const timeout = useRef<number | null>(null)

  useEffect(() => {
    if (!container.current) return

    const grid: MagicGridType = new MagicGrid({
      container: container.current,
      ...props,
    })

    // magic-grid handles resizing via its own `listen` method
    // unfortunately event listener it creates is not being cleaned up
    // that's why we don't use it and have our own instead
    // see: https://github.com/e-oj/Magic-Grid/issues/24
    const resize = () => {
      if (!timeout.current) {
        timeout.current = window.setTimeout(() => {
          grid && grid.positionItems()
          if (timeout.current) {
            clearTimeout(timeout.current)
            timeout.current = null
          }
        }, 200)
      }
    }

    window.addEventListener('resize', resize)
    grid.positionItems()

    return () => {
      window.removeEventListener('resize', resize)
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [props.items, props.gutter, props.maxColumns, props.useMin, props.useTransform, props.animate, props.center])

  return <Component ref={container}>{children}</Component>
}
