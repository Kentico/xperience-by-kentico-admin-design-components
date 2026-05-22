import * as React from 'react';
import { Tag } from '@/components/Tag'
import type { CrossSiteTagTableCellComponentProps } from './CrossSiteTagTableCellComponent.types'
import './CrossSiteTagTableCellComponent.css'

/**
 * CrossSiteTagTableCellComponent renders a Tag with a value for cross-site activity display in tables.
 * If value is empty/falsy, renders nothing.
 */
export const CrossSiteTagTableCellComponent = ({
  value,
  tagLabel = 'Yes',
}: CrossSiteTagTableCellComponentProps) => {
  if (!value) {
    return null
  }

  return (
    <div className={'CrossSiteTagTableCellComponent-wrapper'}>
      <Tag label={tagLabel} />
      <span className={'CrossSiteTagTableCellComponent-value'} title={value}>
        {value}
      </span>
    </div>
  )
}

CrossSiteTagTableCellComponent.displayName = 'CrossSiteTagTableCellComponent'
