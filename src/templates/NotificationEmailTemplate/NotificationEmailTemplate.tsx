import * as React from 'react';
import {
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { Paper, Spinner } from '@/components'
import type {
  NotificationEmailPreviewResult,
  NotificationEmailPreviewPageTemplateProps,
  NotificationEmailContentPageTemplateProps,
} from './NotificationEmailTemplate.types'
import './NotificationEmailTemplate.css'

// ============================================================================
// Translations (local dictionary pattern)
// ============================================================================

const translations = {
  subjectLabel: 'Subject',
  templateNotConfigured: 'Email template is not configured.',
}

// ============================================================================
// Commands
// ============================================================================

/**
 * Commands for the NotificationEmailPreviewPageTemplate.
 */
export const NotificationEmailPreviewPageCommands = {
  GetPreview: 'GetPreview',
} as const

// ============================================================================
// Stub: usePageCommand
// ============================================================================

/**
 * Stub implementation of usePageCommand hook.
 * In the real application, this executes server-side commands.
 */
function usePageCommand<T>(
  _commandName: string,
  options?: { after?: (data: T | null) => void }
): { execute: () => Promise<T | null> } {
  return {
    execute: async () => {
      // Stub: Return null - no server-side preview in standalone mode
      const result = null
      options?.after?.(result)
      return result
    },
  }
}

// ============================================================================
// Stub: PageMessagePane
// ============================================================================

/**
 * Stub PageMessagePane component for displaying empty state messages.
 */
function PageMessagePane({ title }: { title: string }) {
  return (
    <div className={'NotificationEmailTemplate-pageMessagePane'}>
      <p className={'NotificationEmailTemplate-pageMessageTitle'}>{title}</p>
    </div>
  )
}

// ============================================================================
// Stub: EditTemplate
// ============================================================================

/**
 * Stub implementation of EditTemplate.
 * The full EditTemplate will be extracted in a later phase.
 * This stub provides a basic layout structure.
 */
function EditTemplateStub({
  children,
}: {
  actionsPortalID?: string
  fullWidth?: boolean
  children?: ReactNode
}) {
  return (
    <div className={'NotificationEmailTemplate-editTemplateStub'}>
      <div className={'NotificationEmailTemplate-editTemplateContent'}>{children}</div>
    </div>
  )
}

// ============================================================================
// NotificationEmailPreviewPageTemplate
// ============================================================================

/**
 * NotificationEmailPreviewPageTemplate - Preview template for notification emails.
 *
 * Displays a preview of a notification email including:
 * - Email subject with resolved placeholders
 * - Email content rendered in a sandboxed iframe
 *
 * Features:
 * - Auto-fetches preview content on mount (via usePageCommand or custom getPreview)
 * - Dynamically calculates content height based on viewport
 * - Uses sandboxed iframe for secure HTML content rendering
 * - Shows message when template is not configured
 */
export function NotificationEmailPreviewPageTemplate({
  initialSubject,
  initialContent,
  getPreview: customGetPreview,
  notConfiguredMessage = translations.templateNotConfigured,
}: NotificationEmailPreviewPageTemplateProps) {
  const subjectRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [notificationEmailContent, setNotificationEmailContent] = useState<
    string | undefined
  >(initialContent)
  const [notificationEmailSubject, setNotificationEmailSubject] = useState<
    string | undefined
  >(initialSubject)
  const [contentHeight, setContentHeight] = useState('100%')

  // Use custom getPreview or stub usePageCommand
  const { execute: getPreviewFromCommand } =
    usePageCommand<NotificationEmailPreviewResult>(
      NotificationEmailPreviewPageCommands.GetPreview,
      {
        after: (data) => {
          if (data) {
            setNotificationEmailContent(data.content)
            setNotificationEmailSubject(data.subject)
          }
        },
      }
    )

  useEffect(() => {
    const fetchPreview = async () => {
      if (customGetPreview) {
        const data = await customGetPreview()
        if (data) {
          setNotificationEmailContent(data.content)
          setNotificationEmailSubject(data.subject)
        }
      } else {
        await getPreviewFromCommand()
      }
    }
    void fetchPreview()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const calculateContentHeight = () => {
    if (subjectRef.current && parentRef.current) {
      const subjectHeight = subjectRef.current.clientHeight
      const parentHeight = parentRef.current.clientHeight

      const calculatedHeight = parentHeight - subjectHeight
      setContentHeight(`${calculatedHeight}px`)
    }
  }

  useEffect(() => {
    calculateContentHeight()

    const handleResize = () => {
      calculateContentHeight()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [notificationEmailSubject, notificationEmailContent])

  return (
    <div style={{ height: '100%' }} ref={parentRef}>
      <Suspense fallback={<Spinner />}>
        {notificationEmailSubject && (
          <div ref={subjectRef} className={'NotificationEmailTemplate-subjectWrapper'}>
            <p className={'NotificationEmailTemplate-subjectHeader'}>{translations.subjectLabel}</p>
            <p className={'NotificationEmailTemplate-subject'}>{notificationEmailSubject}</p>
          </div>
        )}
        <Paper>
          {notificationEmailContent && (
            <iframe
              style={{ height: contentHeight }}
              title="notification-email-preview"
              className={'NotificationEmailTemplate-previewIframe'}
              sandbox=""
              srcDoc={notificationEmailContent}
            />
          )}
          {!notificationEmailContent && (
            <PageMessagePane title={notConfiguredMessage} />
          )}
        </Paper>
      </Suspense>
    </div>
  )
}

// ============================================================================
// NotificationEmailContentPageTemplate
// ============================================================================

/**
 * NotificationEmailContentPageTemplate - Template for managing notification email content.
 *
 * This is a specialized wrapper around EditTemplate for editing notification
 * email content. It uses full width layout and renders actions in the
 * application header portal.
 *
 * Note: Uses EditTemplateStub until the full EditTemplate is extracted.
 */
export function NotificationEmailContentPageTemplate({
  actionsPortalID = 'applicationHeader',
  fullWidth = true,
  children,
  ...props
}: NotificationEmailContentPageTemplateProps) {
  return (
    <EditTemplateStub
      actionsPortalID={actionsPortalID}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </EditTemplateStub>
  )
}
