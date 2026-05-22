import * as React from 'react';
import { useCallback, type FC } from 'react'
import { Dialog } from '@/components/Dialog'
import { Button, ButtonColor } from '@/components/Button'
import { Icon } from '@/components/Icon'
import './VersionDialog.css'

export interface VersionDialogProps {
  /** Callback to close the dialog */
  readonly onClose: () => void
  /** Callback after the dialog opens */
  readonly onAfterOpen?: () => void
  /** Product name to display */
  readonly productName?: string
  /** Application version to display */
  readonly version?: string
}

/**
 * A dialog showing the application version with a copy button.
 */
export const VersionDialog: FC<VersionDialogProps> = ({
  onClose,
  onAfterOpen,
  productName = 'Xperience by Kentico',
  version = '30.0.0',
}) => {
  const versionText = `${productName} Version ${version}`

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(versionText)
  }, [versionText])

  return (
    <Dialog
      isOpen
      onClose={onClose}
      onAfterOpen={onAfterOpen}
      isDismissable
      headline="About"
    >
      <div className={'VersionDialog-content'}>
        <span className={'VersionDialog-version'}>{versionText}</span>
        <Button
          color={ButtonColor.Quinary}
          icon={<Icon name="xp-doc-copy" size="s" />}
          onClick={handleCopy}
          title="Copy version"
        />
      </div>
    </Dialog>
  )
}

VersionDialog.displayName = 'VersionDialog'
