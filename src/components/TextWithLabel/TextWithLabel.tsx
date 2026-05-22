import * as React from 'react';
import { forwardRef } from 'react'
import dompurify from 'dompurify'
import type { TextWithLabelProps } from './TextWithLabel.types'
import './TextWithLabel.css'

export const TextWithLabel = forwardRef<HTMLDivElement, TextWithLabelProps>(
  ({ label, value, valueAsHtml, ...props }, ref) => {
    const sanitizer = (html: string) => dompurify.sanitize(html)
    const text = value ? value : '-'

    return (
      <div ref={ref} {...props}>
        {label ? <div className={'TextWithLabel-label'}>{label}</div> : null}
        <div className={'TextWithLabel-value'} data-readonly="true">
          {valueAsHtml ? (
            <div
              className={'TextWithLabel-dangerouslySetHtml'}
              dangerouslySetInnerHTML={{ __html: sanitizer(text) }}
            />
          ) : (
            <div>{text}</div>
          )}
        </div>
      </div>
    )
  }
)

TextWithLabel.displayName = 'TextWithLabel'
