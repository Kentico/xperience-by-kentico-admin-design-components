import * as React from 'react';
import { type SVGProps } from 'react'

export const PointingElementDown = (props: SVGProps<SVGSVGElement>) => (
  <svg width="8" height="4" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 3.515c.552.647 1.448.647 2 0L8 0H0l3 3.515z" fill="currentColor" fillRule="evenodd" />
  </svg>
)
