import type { ReactNode, Ref, RefObject } from 'react'

/**
 * SidePanel size variants.
 * Converted from enum to const + type for erasableSyntaxOnly compliance.
 */
export const SidePanelSize = {
  Full: 'Full',
  Wrapped: 'Wrapped',
  Stackable: 'Stackable',
} as const

export type SidePanelSize = (typeof SidePanelSize)[keyof typeof SidePanelSize]

/**
 * Sources that can trigger a SidePanel close event.
 * Converted from enum to const + type for erasableSyntaxOnly compliance.
 */
export const SidePanelCloseSource = {
  /**
   * Clicking on the close button.
   */
  UserClosed: 'user_closed',
  /**
   * When the user clicks outside the SidePanel's content.
   */
  ClickedOutside: 'clicked_outside',
  /**
   * Foreign panel wants to be open, so it requests all other panels to close.
   */
  ForeignPanelOpen: 'foreign_panel_open',
  /**
   * The request for panel side opening has been blocked.
   */
  BlockedByForeignPanel: 'blocked_by_foreign_panel',
  /**
   * Parent panel wants to close, so it requests all child panels to close.
   */
  ParentPanelClosed: 'parent_panel_closed',
} as const

export type SidePanelCloseSource =
  (typeof SidePanelCloseSource)[keyof typeof SidePanelCloseSource]

/**
 * Emitted when the side panel has been requested to close.
 */
export interface SidePanelCloseEvent {
  /**
   * Source of the closing event.
   */
  readonly source: SidePanelCloseSource
  /**
   * Event's target path.
   */
  readonly eventPath?: EventTarget[]
}

/**
 * Tooltip configuration for SidePanel header buttons.
 */
export interface SidePanelTooltips {
  /**
   * Close button tooltip.
   */
  readonly close?: string
  /**
   * Minimize button tooltip.
   */
  readonly minimize?: string
  /**
   * Maximize button tooltip.
   */
  readonly maximize?: string
}

/**
 * SidePanel component props.
 */
export interface SidePanelProps {
  /**
   * Headline of the SidePanel.
   */
  readonly headline: ReactNode

  /**
   * Children of the SidePanel.
   */
  readonly children: ReactNode

  /**
   * Footer of the SidePanel.
   */
  readonly footer?: ReactNode

  /**
   * Notification bar.
   */
  readonly notificationBar?: ReactNode

  /**
   * Indicates whether the cancel button should be automatically focused
   * when the SidePanel is presented to the user.
   */
  readonly autofocusCancelButton?: boolean

  /**
   * SidePanel size.
   */
  readonly size: SidePanelSize

  /**
   * Indicates the visibility of the SidePanel.
   */
  readonly isVisible: boolean

  /**
   * Class name of the SidePanel.
   */
  readonly className?: string

  /**
   * Called when the panel should close due to some action specified in event.
   * @param event Specifying close information
   * @returns May return a promise if the closing is not instantaneous or closing can be rejected.
   */
  readonly onClose: (event: SidePanelCloseEvent) => Promise<void> | void

  /**
   * Can the side panel maximize and cover whole content?
   * This will add minimize/maximize button to panel's header.
   * By default false.
   */
  readonly isMaximizable?: boolean

  /**
   * Indicates if the side-panel has close button in panel's header.
   * By default true.
   */
  readonly showCloseButton?: boolean

  /**
   * Indicated if the side-panel can be closed by clicking outside.
   * By default true.
   */
  readonly isOutsideClickCloseable?: boolean

  /**
   * Add tooltip text to header buttons.
   */
  readonly tooltips?: SidePanelTooltips

  /**
   * Class name of the content holding inner component.
   */
  readonly contentClassName?: string

  /**
   * Reference to the content wrapper.
   */
  readonly contentRef?: Ref<HTMLDivElement>
}

/**
 * Configuration for a registered SidePanel instance.
 */
export interface SidePanelConfig {
  /**
   * Reference to the panel's root element.
   */
  ref: RefObject<HTMLDivElement>
  /**
   * Requests the panel to close.
   * @param event Information about what triggered the panel closing.
   * @returns If void is returned, it is assumed the panel closed right away.
   * @throws Throws if the closing has been blocked by the panel.
   */
  close: (event: SidePanelCloseEvent) => Promise<void> | void
  /**
   * Called when panel becomes on top of panel stack.
   */
  onRevealed?: () => void
  /**
   * Called when panel becomes overlaid by another panel.
   * @param isUserInteractable Specifies if user can interact with the panel even though the panel is covered.
   */
  onCovered?: (isUserInteractable: boolean) => void
  /**
   * Specifies if the panel will close when user clicks outside of the panel.
   */
  isOutsideClickCloseable: boolean
  /**
   * Width of the panel provided by the resize observer.
   */
  readonly panelWidth: number
}

/**
 * Branded type for SidePanel IDs.
 * Provides type safety when passing panel IDs between components.
 */
export type SidePanelId = string & { __type: 'SidePanelId' }

/**
 * Context type for the SidePanelManager.
 */
export interface SidePanelManagerContextType {
  /**
   * Gets the current side panel id.
   */
  readonly getCurrentSidePanel: () => SidePanelId | undefined
  /**
   * Adds the side panel under the sidePanelId.
   */
  readonly addSidePanel: (
    sidePanelId: SidePanelId,
    parentSidePanelId: SidePanelId | undefined,
    config: SidePanelConfig
  ) => Promise<void>
  /**
   * Removes the side panel from the provider.
   */
  readonly removeSidePanel: (sidePanelId: SidePanelId) => void
  /**
   * Updates the side panel with the new config.
   * @param sidePanelId Side panel id.
   * @param config Side panel config.
   */
  readonly updateSidePanel: (
    sidePanelId: SidePanelId,
    config: SidePanelConfig
  ) => void
  /**
   * Gets the side panel offset of the sidePanelId.
   */
  readonly getSidePanelOffset: (sidePanelId: SidePanelId) => number
  /**
   * Gets the current side panel ref.
   */
  readonly getCurrentSidePanelRef: () => RefObject<HTMLDivElement> | null
  /**
   * Container holding all side panels.
   */
  readonly sidePanelContainer?: HTMLDivElement
}

/**
 * SidePanelManager component props.
 */
export interface SidePanelManagerProps {
  readonly children: ReactNode
}
