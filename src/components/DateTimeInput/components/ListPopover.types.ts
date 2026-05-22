import type { Key, RefObject } from 'react'

export interface ListPopoverProps {
  readonly items: Readonly<{ key: Key; label: string; disabled?: boolean }[]>
  readonly triggerRef?: RefObject<Element | null>
}
