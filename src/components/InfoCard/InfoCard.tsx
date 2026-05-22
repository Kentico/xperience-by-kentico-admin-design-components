import * as React from 'react';
import { Paper, PaperElevation } from '@/components/Paper'
import { Tooltip } from '@/components/Tooltip'
import { Icon } from '@/components/Icon'
import './InfoCard.css'

/**
 * Represents result returned from the load funnel configuration command.
 */
export interface InfoCardData {
  readonly caption: string
  readonly tooltip: string
  readonly text: string
  readonly details: string
}

export interface InfoCardProps extends InfoCardData {}

export const InfoCard = ({ caption, tooltip, text, details }: InfoCardProps) => {
  return (
    <Paper className={'InfoCard-card'} elevation={PaperElevation.Small}>
      <div className={'InfoCard-cardStrip'}>
        <div>{caption}</div>
        <Tooltip tooltipText={tooltip}>
          <div className={'InfoCard-infoIcon'}>
            <Icon name="xp-i-circle" size="s" />
          </div>
        </Tooltip>
      </div>
      <div className={'InfoCard-cardText'}>{text}</div>
      <div className={'InfoCard-cardDetail'}>{details}</div>
    </Paper>
  )
}

InfoCard.displayName = 'InfoCard'
