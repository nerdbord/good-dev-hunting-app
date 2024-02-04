'use client'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import SwitchInput from '@/components/Switch/Switch'
import Tooltip from '@/components/Tooltip/Tooltip'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import React, { useId } from 'react'
import { lockProfile } from '../../_actions/lockProfile'
import { unlockProfile } from '../../_actions/unlockProfile'
import styles from './ToogleOpenToWork.module.scss'

interface ToggleOpenToWorkProps {
  profileId: string
  isOpenForWork: boolean
}

export const ToggleOpenToWork: React.FC<ToggleOpenToWorkProps> = ({
  profileId,
  isOpenForWork,
}) => {
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
        label="I’m available for work"
        checked={isOpenForWork}
        onChange={() => handleToggleOpenForWork(!isOpenForWork)}
      >
        <Tooltip text="Switch changes automatically every 7 days if you don't visit the platform. That prevents GDH from having inactive profiles.">
          <ImportantIcon />
        </Tooltip>
      </SwitchInput>
    </div>
  )
}
