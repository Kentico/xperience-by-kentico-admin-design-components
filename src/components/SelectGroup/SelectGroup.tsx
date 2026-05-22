import * as React from 'react';
import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type ForwardedRef,
  type RefObject,
} from 'react'
import classNames from 'classnames'
import { getDataAndAccessibilityProps } from '@/lib/getDataAndAccessibilityProps'
import { Paper, PaperElevation } from '@/components/Paper'
import { Divider, DividerOrientation } from '@/components/Divider'
import { DropDownActionMenu } from '@/components/DropDownActionMenu'
import { useSliceOverflowingItems } from '@/hooks/useSliceOverflowingItems'
import { SelectGroupCell } from './SelectGroupCell'
import type { SelectGroupProps } from './SelectGroup.types'
import './SelectGroup.css'

/**
 * Factory function to create a typed SelectGroup component.
 * Use this to create a SelectGroup with a specific select item shape.
 *
 * @example
 * ```tsx
 * interface MySelect { id: string; label: string }
 * const MySelectGroup = createSelectGroup<MySelect>()
 *
 * <MySelectGroup
 *   selects={mySelects}
 *   renderSelect={(select, onItemClick, visible, index) => (
 *     <SelectGroupCell label={select.label} onClick={onItemClick} />
 *   )}
 * />
 * ```
 */
export function createSelectGroup<Group>() {
  const SelectGroupComponent: FC<SelectGroupProps<Group>> = forwardRef(
    (
      { selects, renderSelect, minWidth, paperClassName, ...props }: SelectGroupProps<Group>,
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [ellipsisOpen, setEllipsisOpen] = useState(false)
      const [labelVisible, setLabelVisible] = useState(true)
      const [thresholdWidth, setThresholdWidth] = useState(Number.MAX_VALUE)
      const [width, setWidth] = useState(Number.MAX_VALUE)
      const localRef = useRef<HTMLDivElement>(null)
      const containerRef = (ref as RefObject<HTMLDivElement>) || localRef

      // Observe container width changes
      useLayoutEffect(() => {
        const element = containerRef.current
        if (!element) return

        const handleResize = () => {
          setWidth(element.offsetWidth || Number.MAX_VALUE)
        }

        // Initial measurement
        handleResize()

        const resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(element)

        return () => resizeObserver.disconnect()
      }, [containerRef])

      // Check whether content of SelectGroup fits into actual threshold width, otherwise hide label
      useLayoutEffect(() => {
        const visible = thresholdWidth >= (containerRef.current?.scrollWidth || 0)
        if (visible === labelVisible) {
          return
        }
        setLabelVisible(visible)
        if (!visible) {
          setThresholdWidth(0)
        }
      }, [thresholdWidth, labelVisible, containerRef])

      useLayoutEffect(() => {
        setEllipsisOpen(false)
        setThresholdWidth(width)
      }, [width])

      const { attachVisibleItemRef, visibleItems, hiddenItems } = useSliceOverflowingItems(
        selects,
        containerRef as RefObject<HTMLDivElement>,
        'Beginning'
      )

      // Use visibleItems/hiddenItems only when label is already hidden or there is more than 1 select
      const disableUseSliceOverflowingItems = labelVisible || selects.length <= 1
      const visibleSelects = disableUseSliceOverflowingItems ? selects : visibleItems
      const hiddenSelects = disableUseSliceOverflowingItems ? [] : hiddenItems

      return (
        <div ref={containerRef} className={'SelectGroup-container'} {...getDataAndAccessibilityProps(props)}>
          <div className={'SelectGroup-group'} style={{ minWidth: minWidth }}>
            <Paper className={classNames('SelectGroup-paper', paperClassName)} elevation={PaperElevation.Medium}>
              {/* Ellipsis dropdown for hidden selects */}
              {hiddenSelects.length > 0 && (
                <DropDownActionMenu
                  open={ellipsisOpen}
                  onToggle={setEllipsisOpen}
                  renderTrigger={(triggerRef, onTriggerClick) => (
                    <div className={'SelectGroup-select'} ref={triggerRef as RefObject<HTMLDivElement>}>
                      <SelectGroupCell icon="xp-ellipsis" ellipsis onClick={onTriggerClick} />
                      <Divider orientation={DividerOrientation.Vertical} />
                    </div>
                  )}
                >
                  {hiddenSelects.map((select, index) => (
                    <div key={index} className={'SelectGroup-select'}>
                      {renderSelect(select, () => setEllipsisOpen(false), true, index)}
                      {index + 1 < hiddenSelects.length && (
                        <Divider orientation={DividerOrientation.Vertical} />
                      )}
                    </div>
                  ))}
                </DropDownActionMenu>
              )}
              {/* Visible selects */}
              {visibleSelects.map((select, index) => (
                <div key={index} className={'SelectGroup-select'} ref={attachVisibleItemRef(index)}>
                  {renderSelect(select, () => {}, labelVisible, index)}
                  {index + 1 < visibleSelects.length && (
                    <Divider orientation={DividerOrientation.Vertical} />
                  )}
                </div>
              ))}
            </Paper>
          </div>
        </div>
      )
    }
  )

  SelectGroupComponent.displayName = 'SelectGroup'

  return SelectGroupComponent
}
