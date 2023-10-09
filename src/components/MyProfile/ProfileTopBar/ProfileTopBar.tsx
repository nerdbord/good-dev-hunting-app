import React, { useState, useEffect } from 'react'
import styles from './ProfileTopBar.module.scss'
import { Button } from '@/components/Button/Button'
import { redirect, useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import { TogglePublishButton } from '@/components/TogglePublishButton/TogglePublishButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { EditProfileButton } from '@/components/EditProfileButton'
import { PublishingState } from '@prisma/client'

interface ProfileTopBarProps {
  profileId: string
}
const ProfileTopBar = async ({ profileId }: ProfileTopBarProps) => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect(AppRoutes.home)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>Profile preview</span>
      <div className={styles.buttonBox}>
        <EditProfileButton />
        <TogglePublishButton
          state={profile.state}
          profileId={profile.id}
        />
      </div>
    </div>
  )
}

export default ProfileTopBar
