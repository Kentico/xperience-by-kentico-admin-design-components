import * as React from 'react';
import { Icon } from '@/components/Icon'
import { Tooltip, TooltipPlacement } from '@/components/Tooltip'

import { type LabelWithTooltipProps } from './LabelWithTooltip.types'
import './LabelWithTooltip.css'

/**
 * Component for displaying label with tooltip visible when hovering over information icon.
 */
export const LabelWithTooltip = ({ label, tooltipText }: LabelWithTooltipProps) => {
  return (
    <div className={'LabelWithTooltip-container'}>
      <span className={'LabelWithTooltip-label'}>{label}</span>
      <Tooltip tooltipText={tooltipText} placement={TooltipPlacement.Top}>
        <span className={'LabelWithTooltip-icon'}>
          <Icon name="xp-i-circle" size="s" />
        </span>
      </Tooltip>
    </div>
  )
}

LabelWithTooltip.displayName = 'LabelWithTooltip'
