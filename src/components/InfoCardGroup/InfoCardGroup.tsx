import * as React from 'react';
import { InfoCard } from '@/components/InfoCard'
import { type InfoCardGroupProps } from './InfoCardGroup.types'
import './InfoCardGroup.css'

export const InfoCardGroup = ({ cards }: InfoCardGroupProps) => {
  return (
    <div className={'InfoCardGroup-cardGroup'}>
      {cards.map((card, index) => (
        <InfoCard
          key={index}
          caption={card.caption}
          tooltip={card.tooltip}
          details={card.details}
          text={card.text}
        />
      ))}
    </div>
  )
}

InfoCardGroup.displayName = 'InfoCardGroup'
