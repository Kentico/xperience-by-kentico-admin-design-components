import * as React from 'react';
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { ApplicationTile, ApplicationTileState } from '../ApplicationTile'
import type { ApplicationCategory, Application } from '@/templates/App/App.types'
import type { ApplicationMenuMobileProps } from './ApplicationMenu.types'
import { getPathWithoutBasePath } from './utils'
import './ApplicationMenuMobile.css'

export const ApplicationMenuMobile = forwardRef<HTMLDivElement, ApplicationMenuMobileProps>(
  (
    {
      categories,
      className,
      applicationListVisible,
      setApplicationListVisible,
    },
    ref
  ) => {
    const [isLocatedOnApplication, setLocatedOnApplication] = useState(false)
    const [isHomeActive, setHomeActive] = useState(false)

    const location = useLocation()
    const localRef = useRef<HTMLDivElement>(null)
    const applicationMenuRef = ref || localRef

    useEffect(() => {
      const path = getPathWithoutBasePath(location.pathname).substring(1)
      const appPath = path.split('/')[0].toLowerCase()
      const applicationFound = categories.some((category: ApplicationCategory) =>
        category.applications.some(
          (application: Application) =>
            application.path.replace(/^\//, '').toLowerCase() === appPath
        )
      )
      setLocatedOnApplication(applicationFound)
    }, [location, categories, setLocatedOnApplication])

    useEffect(() => {
      setHomeActive(!applicationListVisible && !isLocatedOnApplication)
    }, [setHomeActive, applicationListVisible, isLocatedOnApplication])

    const showApplicationList = () => {
      setApplicationListVisible(!applicationListVisible)
    }

    const handleHomeClick = () => {
      setApplicationListVisible(false)
    }

    return (
      <div
        className={cn('ApplicationMenuMobile', className)}
        ref={applicationMenuRef}
      >
        <ApplicationTile
          iconName="xp-home"
          label="Home"
          state={isHomeActive ? ApplicationTileState.Activated : ApplicationTileState.Default}
          onClick={handleHomeClick}
          link="/"
        />
        <ApplicationTile
          iconName="xp-menu"
          label="Applications"
          state={isHomeActive ? ApplicationTileState.Default : ApplicationTileState.Activated}
          onClick={showApplicationList}
        />
      </div>
    )
  }
)

ApplicationMenuMobile.displayName = 'ApplicationMenuMobile'
