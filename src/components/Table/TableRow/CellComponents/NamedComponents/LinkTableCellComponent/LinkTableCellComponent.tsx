import * as React from 'react';
import { Link } from '@/components/Link'
import { StringCell } from '../../StringCell'
import './LinkTableCellComponent.css'

export interface LinkTableCellComponentProps {
  /**
   * Text of the link.
   */
  readonly text: string
  /**
   * URL of the link.
   */
  readonly url: string
}

/**
 * LinkTableCellComponent renders a link within a table cell.
 * Falls back to StringCell if no URL is provided.
 */
export const LinkTableCellComponent = ({ text, url }: LinkTableCellComponentProps) => {
  if (!url) {
    return <StringCell value={text} />
  }

  return (
    <div title={text} className={'LinkTableCellComponent-link'}>
      <Link href={url} text={text} target="_blank" ellipsis />
    </div>
  )
}

LinkTableCellComponent.displayName = 'LinkTableCellComponent'
