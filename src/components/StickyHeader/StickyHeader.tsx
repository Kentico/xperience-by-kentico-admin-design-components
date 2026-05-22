import * as React from 'react';
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import type { StickyHeaderProps } from './StickyHeader.types'
import './StickyHeader.css'

export const StickyHeader = ({ children, className }: StickyHeaderProps) => {
  const [isSticking, setIsSticking] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const current = ref.current
    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticking(e.intersectionRatio < 1)
      },
      { threshold: [1] }
    )

    observer.observe(current)

    return () => {
      observer.unobserve(current)
    }
  }, [])

  const headerClasses = classNames(
    'StickyHeader-header',
    isSticking && 'StickyHeader-shadowVisible',
    className
  )

  return (
    <div className={'StickyHeader-sticky'} ref={ref}>
      <div className={headerClasses}>{children}</div>
    </div>
  )
}
