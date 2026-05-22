/**
 * SimpleStatus Component Barrel Export
 */

// Base component
export { BaseSimpleStatus } from './BaseSimpleStatus'

// Variant components
export {
  SimpleStatusDefault,
  SimpleStatusError,
  SimpleStatusSuccess,
  SimpleStatusWarning,
} from './SimpleStatus'

// Types & Colors
export {
  StatusColor,
  SimpleStatusAlign,
  SimpleStatusType,
  SimpleStatusSize,
  type SimpleStatusContent,
  type BaseSimpleStatusProps,
  type SimpleStatusDefaultProps,
  type SimpleStatusErrorProps,
  type SimpleStatusSuccessProps,
  type SimpleStatusWarningProps,
} from './SimpleStatus.types'
