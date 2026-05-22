import * as React from 'react';
import DOMPurify from 'dompurify'
import { type StickyBannerProps, StickyBannerType } from './StickyBanner.types'
import './StickyBanner.css'

/**
 * Displays a sticky banner on top of the view with a message.
 */
export const StickyBanner = ({
  bannerType,
  message,
  messageAsHtml,
}: StickyBannerProps) => {
  const typeClass = bannerType === StickyBannerType.Info ? 'StickyBanner-info' : 'StickyBanner-error'

  return (
    <div className={typeClass} data-testid="sticky-banner">
      {messageAsHtml ? (
        <div
          className={'StickyBanner-banner'}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message) }}
        />
      ) : (
        <div className={'StickyBanner-banner'}>{message}</div>
      )}
    </div>
  )
}
