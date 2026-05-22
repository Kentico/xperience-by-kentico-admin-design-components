import * as React from 'react';
import { type SVGProps } from 'react'

export const PointingElementUp = (props: SVGProps<SVGSVGElement>) => (
  <svg width="8" height="4" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5 .485c-.552-.647-1.448-.647-2 0L0 4h8L5 .485z" fill="currentColor" fillRule="evenodd" />
  </svg>
)
