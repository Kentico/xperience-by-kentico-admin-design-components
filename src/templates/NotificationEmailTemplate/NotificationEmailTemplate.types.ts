import type { ReactNode } from 'react'

/**
 * Result returned from the NotificationEmailPreview get preview command.
 */
export interface NotificationEmailPreviewResult {
  /**
   * Notification email subject with resolved placeholders.
   */
  readonly subject: string
  /**
   * Notification email content with resolved placeholders.
   */
  readonly content: string
}

/**
 * Props for the NotificationEmailPreviewPageTemplate component.
 */
export interface NotificationEmailPreviewPageTemplateProps {
  /**
   * Optional initial subject for the preview.
   */
  readonly initialSubject?: string
  /**
   * Optional initial content for the preview.
   */
  readonly initialContent?: string
  /**
   * Optional callback to get the preview content.
   * If not provided, uses stub usePageCommand hook.
   */
  readonly getPreview?: () => Promise<NotificationEmailPreviewResult | null>
  /**
   * Optional message to show when template is not configured.
   */
  readonly notConfiguredMessage?: string
  /**
   * Children to render (optional)
   */
  readonly children?: ReactNode
}

/**
 * Props for EditTemplateStub used by NotificationEmailContentPageTemplate.
 */
export interface EditTemplateStubProps {
  /**
   * Portal ID for actions
   */
  readonly actionsPortalID?: string
  /**
   * Whether to use full width layout
   */
  readonly fullWidth?: boolean
  /**
   * Form configuration
   */
  readonly form?: unknown
  /**
   * Callout configuration
   */
  readonly callout?: unknown
  /**
   * Children to render
   */
  readonly children?: ReactNode
}

/**
 * Props for the NotificationEmailContentPageTemplate component.
 */
export interface NotificationEmailContentPageTemplateProps extends EditTemplateStubProps {
  /**
   * Any additional props passed through to EditTemplate
   */
  readonly [key: string]: unknown
}
