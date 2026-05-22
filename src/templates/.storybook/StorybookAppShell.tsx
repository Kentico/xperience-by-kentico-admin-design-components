import * as React from 'react';
import { useEffect, type ReactNode } from 'react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import {
  ApplicationMenu,
  BreadcrumbsProvider,
  SidePanelManager,
  StatusBar,
  useBreadcrumbs,
} from '@/components'
import { mockCategories, mockUserProfile } from './mockData'
import '../AppTemplate/Main.css'

interface BreadcrumbEntry {
  path: string
  label: string
}

function BreadcrumbsPopulator({ breadcrumbs }: { breadcrumbs: BreadcrumbEntry[] }) {
  const { push } = useBreadcrumbs()

  useEffect(() => {
    for (const crumb of breadcrumbs) {
      const isFirst = breadcrumbs.indexOf(crumb) === 0
      push(crumb.path, isFirst, crumb.label)
    }
  }, [push, breadcrumbs])

  return null
}

export interface StorybookAppShellProps {
  children: ReactNode
  initialRoute?: string
  breadcrumbs?: BreadcrumbEntry[]
}

export function StorybookAppShell({
  children,
  initialRoute = '/',
  breadcrumbs,
}: StorybookAppShellProps) {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route
          path="*"
          element={
            <BreadcrumbsProvider>
              <SidePanelManager>
                <div className={'Main-container'}>
                  <div className={'Main'}>
                    <div className={'Main-contentArea'}>
                      <ApplicationMenu
                        categories={mockCategories}
                        userProfile={mockUserProfile}
                      />
                      <div className={'Main-content'}>
                        {breadcrumbs && breadcrumbs.length > 0 && (
                          <BreadcrumbsPopulator breadcrumbs={breadcrumbs} />
                        )}
                        <StatusBar />
                        <div className={'Main-canvas'}>
                          <div className={'Main-placeholder'}>{children}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SidePanelManager>
            </BreadcrumbsProvider>
          }
        />
      </Routes>
    </MemoryRouter>
  )
}
