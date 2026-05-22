import * as React from 'react';
import classNames from 'classnames'
import './Spinner.css'

export interface SpinnerProps {
  /** Size of the spinner */
  size?: 'small' | 'medium' | 'large'
  /** Additional CSS class */
  className?: string
}

export const Spinner = ({ size = 'medium', className }: SpinnerProps) => {
  return (
    <span
      className={classNames('Spinner', `Spinner-${size}`, className)}
      role="status"
      aria-label="Loading"
    >
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1 8a7 7 0 0 1 7-7 .5.5 0 1 1 0 1 6 6 0 1 0 4.363 1.882.5.5 0 0 1 .728-.687A7 7 0 1 1 1 8Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}
