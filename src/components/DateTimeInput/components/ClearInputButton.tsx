import * as React from 'react';
import { useTranslations } from '@/hooks/useTranslations'
import { ButtonIcon } from './ButtonIcon'
import type { ClearInputButtonProps } from './ClearInputButton.types'

export const ClearInputButton = (props: ClearInputButtonProps) => {
  const { t } = useTranslations()
  return (
    <ButtonIcon
      icon="xp-times-circle"
      aria-label={t('kxp.components.datetimeinput.clearinputbutton.clear')}
      onPress={props.onClear}
      slot={null}
    />
  )
}
