import * as React from 'react';
import { Popover, ListBox, ListBoxItem } from 'react-aria-components'
import { Paper, PaperElevation, BorderRadius } from '@/components/Paper'
import type { ListPopoverProps } from './ListPopover.types'
import { usePopoverContainerRef } from '@/contexts/PopoverRefContext'
import './ListPopover.css'

export const ListPopover = (props: ListPopoverProps) => {
  const portalContainer = usePopoverContainerRef()
  return (
    <Popover
      triggerRef={props.triggerRef}
      {...(portalContainer
        ? { UNSTABLE_portalContainer: portalContainer }
        : {})}
    >
      <Paper
        elevation={PaperElevation.Medium}
        borderRadius={BorderRadius.Medium}
        className={'ListPopover-paperWrapper'}
      >
        <ListBox
          className={'ListPopover-menu'}
          selectionMode="single"
          items={props.items}
        >
          {(option) => (
            <ListBoxItem
              key={option.key}
              id={option.key.toString()}
              className={'ListPopover-menuItem'}
              isDisabled={option.disabled}
            >
              {option.label}
            </ListBoxItem>
          )}
        </ListBox>
      </Paper>
    </Popover>
  )
}
