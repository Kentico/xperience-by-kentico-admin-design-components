import * as React from 'react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { Dimensions } from '@/components/Layout'
import { useOnScreenDetect } from '@/hooks/useOnScreenDetect'
import { useScrollableDividers } from '@/hooks/useScrollableDividers'
import { Button, ButtonColor, ButtonSize } from '@/components/Button'
import { Row } from '@/components/Layout'
import { Divider, DividerOrientation } from '@/components/Divider'
import { Tooltip } from '@/components/Tooltip'
import { Icon } from '@/components/Icon'
import { SidePanelCloseSource, SidePanelSize } from './SidePanel.types'
import type { SidePanelProps } from './SidePanel.types'
import { SidePanelPortal } from './SidePanelPortal'
import './SidePanel.css'

const gridUnit = parseInt(Dimensions.GridUnit, 10)
const sidebarWidth = 12 * gridUnit

/**
 * SidePanel component - a slide-in panel from the right side of the viewport.
 *
 * Features:
 * - Three size variants: Full, Wrapped, and Stackable
 * - Maximizable option (can expand to cover whole content)
 * - Click-outside to close behavior (configurable)
 * - Scrollable content with dividers
 * - Header with close/maximize buttons
 * - Footer for actions
 *
 * @example
 * ```tsx
 * <SidePanelManager>
 *   <SidePanel
 *     headline="Panel Title"
 *     size={SidePanelSize.Stackable}
 *     isVisible={isOpen}
 *     onClose={handleClose}
 *     footer={<Button>Save</Button>}
 *   >
 *     Panel content
 *   </SidePanel>
 * </SidePanelManager>
 * ```
 */
export const SidePanel = forwardRef<HTMLDivElement, SidePanelProps>(
  (
    {
      headline,
      children,
      footer,
      autofocusCancelButton,
      size,
      isVisible,
      className,
      notificationBar,
      onClose,
      isMaximizable = false,
      showCloseButton = true,
      isOutsideClickCloseable = true,
      tooltips,
      contentRef,
      contentClassName,
    },
    ref
  ) => {
    const [isInitiallyVisible] = useState(isVisible)
    const [isVisibleLocal, setIsVisibleLocal] = useState(isVisible)
    const [isCovered, setIsCovered] = useState(false)
    const [maximize, setMaximize] = useState(false)
    const cancelButtonRef = useRef<HTMLButtonElement>(null)
    const cancelButton = cancelButtonRef.current
    const cancelButtonOnScreen = useOnScreenDetect(cancelButtonRef)

    const scrollableContentContainerRef = useRef<HTMLDivElement | null>(null)
    const innerContentContainerRef = useRef<HTMLDivElement>(null)
    const detectWholeElementDisplayedOnScreen = 1
    const containerOnScreen = useOnScreenDetect(
      scrollableContentContainerRef,
      detectWholeElementDisplayedOnScreen
    )
    const { isTopDividerShown, onScroll } = useScrollableDividers(
      scrollableContentContainerRef,
      innerContentContainerRef,
      containerOnScreen
    )

    const wrapperClasses = classNames(
      'SidePanel-wrapper',
      size === SidePanelSize.Full && 'SidePanel-full',
      size === SidePanelSize.Wrapped && 'SidePanel-wrapped',
      size === SidePanelSize.Stackable && 'SidePanel-stackable',
      isVisibleLocal && !isInitiallyVisible && 'SidePanel-visible',
      isInitiallyVisible && 'SidePanel-animate',
      className
    )

    const contentClasses = classNames(
      'SidePanel-content',
      isVisibleLocal && 'SidePanel-visible',
      contentClassName
    )

    useEffect(() => {
      setIsVisibleLocal(isVisible)
    }, [isVisible])

    useEffect(() => {
      if (autofocusCancelButton && cancelButton && isVisible && cancelButtonOnScreen) {
        cancelButton.focus()
      }
    }, [autofocusCancelButton, isVisible, cancelButtonOnScreen, cancelButton])

    const toggleStage = () => {
      setMaximize((prevMaximize) => !prevMaximize)
    }

    const onCovered = useCallback((isUserInteractable: boolean) => {
      if (isUserInteractable) {
        setIsCovered(true)
      }
    }, [])

    const onRevealed = useCallback(() => {
      setIsCovered(false)
    }, [])

    const onContentRef = useCallback(
      (contentElement: HTMLDivElement) => {
        scrollableContentContainerRef.current = contentElement
        if (contentRef) {
          if (typeof contentRef === 'function') {
            contentRef(contentElement)
          } else {
            // Assign to ref object
            const mutableRef = contentRef as React.MutableRefObject<HTMLDivElement | null>
            mutableRef.current = contentElement
          }
        }
      },
      [contentRef]
    )

    const onButtonClose = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
          await onClose({
            source: SidePanelCloseSource.UserClosed,
            eventPath: event.nativeEvent.composedPath(),
          })
        } catch {
          // Ignore if closing failed
        }
      },
      [onClose]
    )

    return (
      <SidePanelPortal
        isVisible={isVisible}
        isOutsideClickCloseable={isOutsideClickCloseable}
        onCovered={onCovered}
        onRevealed={onRevealed}
        onClose={onClose}
      >
        {(panelRef, zIndex, panelOffset) => {
          const style: React.CSSProperties = {
            marginRight: `${panelOffset}px`,
            width:
              maximize || isCovered
                ? `${document.body.offsetWidth - panelOffset - sidebarWidth}px`
                : undefined,
            zIndex,
          }

          return (
            <div ref={ref} className={wrapperClasses} style={style}>
              <div ref={panelRef} className={'SidePanel'}>
                <div className={'SidePanel-header'}>
                  <div className={'SidePanel-headline'}>{headline}</div>
                  <Row className={'SidePanel-headerButtons'}>
                    {isMaximizable ? (
                      <Tooltip
                        tooltipText={maximize || isCovered ? tooltips?.minimize : tooltips?.maximize}
                      >
                        <Button
                          color={ButtonColor.Quinary}
                          onClick={toggleStage}
                          icon={<Icon name={maximize ? 'xp-resize' : 'xp-square'} size="s" />}
                          size={ButtonSize.S}
                          aria-label="maximize"
                        />
                      </Tooltip>
                    ) : null}
                    {showCloseButton ? (
                      <Tooltip tooltipText={tooltips?.close}>
                        <Button
                          buttonRef={cancelButtonRef}
                          color={ButtonColor.Quinary}
                          onClick={onButtonClose}
                          icon={<Icon name="xp-modal-close" size="s" />}
                          size={ButtonSize.S}
                          aria-label="close"
                        />
                      </Tooltip>
                    ) : null}
                  </Row>
                </div>
                <div
                  className={
                    isTopDividerShown ? 'SidePanel-dividerVisible' : 'SidePanel-dividerHidden'
                  }
                >
                  <Divider orientation={DividerOrientation.Horizontal} />
                </div>
                <div className={contentClasses} ref={onContentRef} onScroll={onScroll}>
                  <div ref={innerContentContainerRef} className={'SidePanel-innerContent'}>
                    {isVisibleLocal ? children : null}
                  </div>
                </div>
                <Divider orientation={DividerOrientation.Horizontal} />
                <div className={'SidePanel-footer'}>
                  {notificationBar ? (
                    <div className={'SidePanel-notification'}>{notificationBar}</div>
                  ) : null}
                  <div className={'SidePanel-footerActions'}>{footer}</div>
                </div>
              </div>
            </div>
          )
        }}
      </SidePanelPortal>
    )
  }
)

SidePanel.displayName = 'SidePanel'
