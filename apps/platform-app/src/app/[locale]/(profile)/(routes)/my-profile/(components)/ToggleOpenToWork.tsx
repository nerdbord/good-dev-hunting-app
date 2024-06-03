'use client'
import SwitchInput from '@/components/Switch/Switch'
import Tooltip from '@/components/Tooltip/Tooltip'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { I18nNamespaces } from '@/i18n'
import { ImportantIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import React, { useId } from 'react'
import { lockProfile } from '../../../_actions/mutations/lockProfile'
import { unlockProfile } from '../../../_actions/mutations/unlockProfile'
import styles from './ToogleOpenToWork.module.scss'

interface ToggleOpenToWorkProps {
  profileId: string
  isOpenForWork: boolean
}

export const ToggleOpenToWork: React.FC<ToggleOpenToWorkProps> = ({
  profileId,
  isOpenForWork,
}) => {
  const t = useTranslations(I18nNamespaces.Index)
  const switchId = useId()
  const { runAsync } = useAsyncAction()

  const handleToggleOpenForWork = (isOpenForWork: boolean) => {
    runAsync(async () => {
      isOpenForWork
        ? await unlockProfile(profileId)
        : await lockProfile(profileId)
    })
  }

  return (
    <div className={styles.toggleOpenToWorkContainer}>
      <SwitchInput
        id={switchId}
        name="open-to-work"
        label={t('availability')}
        checked={isOpenForWork}
        onChange={() => handleToggleOpenForWork(!isOpenForWork)}
      >
        <div className={styles.tooltipContainer}>
          <Tooltip text="Switch changes automatically every 7 days if you don't visit the platform. That prevents GDH from having inactive profiles.">
            <ImportantIcon />
          </Tooltip>
        </div>
      </SwitchInput>
    </div>
  )
}
