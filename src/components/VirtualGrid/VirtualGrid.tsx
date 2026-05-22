import * as React from 'react';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual'
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type ForwardedRef,
  type ReactElement,
} from 'react'
import type { VirtualGridProps } from './VirtualGrid.types'

const VirtualGridInner = <TValue,>(
  props: VirtualGridProps<TValue>,
  ref: ForwardedRef<HTMLDivElement>
): ReactElement => {
  const parentRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => parentRef.current as HTMLDivElement)

  const rowCount = Math.ceil(
    props.items && props.columnCount ? props.items.length / props.columnCount : 0
  )

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => props.estimateRowHeight ?? 100,
    overscan: 1,
  })

  const parentStyle: CSSProperties = {
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  }

  return (
    <div ref={parentRef} className={props.className} style={parentStyle} role="list">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize().toString()}px`,
          width: '100%',
          position: 'relative',
        }}
        role="presentation"
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
          const rowStartIndex = virtualRow.index * props.columnCount
          const rowItems = props.items?.slice(rowStartIndex, rowStartIndex + props.columnCount) ?? []
          const isLastRow = virtualRow.index === rowCount - 1

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={rowVirtualizer.measureElement}
              role="presentation"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualRow.start.toString()}px)`,
                display: 'grid',
                gridTemplateColumns: `repeat(${props.columnCount.toString()}, minmax(0, 1fr))`,
                columnGap: props.columnGap,
                paddingBottom: !isLastRow && props.rowGap ? props.rowGap : undefined,
              }}
            >
              {rowItems.map((item, index) => (
                <div
                  key={`${rowStartIndex + index}`}
                  role="listitem"
                  aria-setsize={props.items?.length}
                  aria-posinset={rowStartIndex + index + 1}
                >
                  {props.children(item)}
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const VirtualGrid = forwardRef(VirtualGridInner) as <TValue>(
  props: VirtualGridProps<TValue> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReactElement

;(VirtualGrid as { displayName?: string }).displayName = 'VirtualGrid'
