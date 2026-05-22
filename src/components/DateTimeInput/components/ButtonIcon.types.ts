export interface ButtonIconProps {
  readonly icon: string
  readonly 'aria-label': string
  readonly isDisabled?: boolean
  readonly onPress?: () => void
  readonly slot?: string | null
}
