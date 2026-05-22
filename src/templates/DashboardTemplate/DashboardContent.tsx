import * as React from 'react';
import { useEffect, useState } from 'react'
import {
  ActionTile,
  ActionTileSize,
  ActionTileType,
} from '@/components'
import { useMediaBreakpoints } from '@/hooks'
import type { ApplicationCategory } from '../App/App.types'
import { MasonryLayout } from './masonry-layout'
import type { DashboardContentProps } from './DashboardContent.types'
import './DashboardContent.css'

/**
 * DashboardContent - Displays application categories in a masonry grid layout.
 *
 * Renders application tiles organized by category. Uses masonry layout for
 * desktop and a simple vertical stack for mobile. Tile sizes are responsive
 * based on viewport width.
 */
export function DashboardContent({ categories }: DashboardContentProps) {
  const { mobile, isLarge } = useMediaBreakpoints()
  const [actionTileSize, setActionTileSize] = useState<ActionTileSize>(ActionTileSize.L)

  useEffect(() => {
    if (mobile) {
      setActionTileSize(ActionTileSize.XS)
    } else {
      setActionTileSize(isLarge ? ActionTileSize.L : ActionTileSize.S)
    }
  }, [mobile, isLarge])

  const categoriesList = !categories
    ? []
    : categories.map((category: ApplicationCategory) => (
        <div className={'DashboardContent-category'} key={category.codeName}>
          <div className={'DashboardContent-categoryTitle'}>
            <span>{category.name}</span>
          </div>
          <div className={'DashboardContent-applications'}>
            {category.applications.map((application, index) => (
              <ActionTile
                key={index}
                icon={application.icon}
                label={application.name}
                size={actionTileSize}
                type={ActionTileType.Dashboard}
                href={`../${application.path}`}
              />
            ))}
          </div>
        </div>
      ))

  return (
    <div className={'DashboardContent-categories'}>
      {mobile ? (
        <>{categoriesList}</>
      ) : (
        categoriesList.length !== 0 && (
          <MasonryLayout
            items={categoriesList.length}
            useMin
            gutter={0} // gutter is used between columns and rows, should not be the same
            center={false}
          >
            {categoriesList}
          </MasonryLayout>
        )
      )}
    </div>
  )
}
