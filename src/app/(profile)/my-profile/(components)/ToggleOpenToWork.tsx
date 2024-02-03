'use client'
import Switch from '@/components/Switch/Switch'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useId } from 'react'

import { lockProfile } from '../../_actions/lockProfile'
import { unlockProfile } from '../../_actions/unlockProfile'

interface ToggleOpenToWorkProps {
  profileId: string
  isOpenForWork: boolean
}

export const ToggleOpenToWork = (props: ToggleOpenToWorkProps) => {
  const switchId = useId()
  const { runAsync } = useAsyncAction()

  const handleToggleOpenForWork = (isOpenForWork: boolean) => {
    runAsync(async () => {
      const shouldLockProfile = !isOpenForWork

      shouldLockProfile
        ? await lockProfile(props.profileId)
        : await unlockProfile(props.profileId)
    })
  }

  return (
    <div>
      <Switch
        name="open-to-work"
        id={switchId}
        label={'I’m available for work'}
        onChange={() => {
          handleToggleOpenForWork(!props.isOpenForWork)
        }}
        checked={props.isOpenForWork}
      />
    </div>
  )
}
