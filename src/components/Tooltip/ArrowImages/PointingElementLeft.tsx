import * as React from 'react';
import { type SVGProps } from 'react'

export const PointingElementLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg width="4" height="8" viewBox="0 0 4 8" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M.485 3c-.647.552-.647 1.448 0 2L4 8V0L.485 3z" fill="currentColor" fillRule="evenodd" />
  </svg>
)
