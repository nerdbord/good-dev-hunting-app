import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import PersonalInfo from '@/components/CreateProfile/PersonalInfo/PersonalInfo'
import LocationPreferences from '@/components/CreateProfile/LocationPreferences/LocationPreferences'
import CreateProfileTopBar from '@/components/CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import WorkInformation from '@/components/CreateProfile/WorkInformation/WorkInformation'
import CreateProfileFormWrapper from '@/components/CreateProfileForm/CreateProfileFormWrapper'
/* import { AppRoutes } from '@/utils/routes' */

const CreateProfilePage = async () => {
  /*const session = await getServerSession(authOptions)

    if (!session) {
    redirect(AppRoutes.home)
  } */

  return (
    <CreateProfileFormWrapper>
      <div className={styles.wrapper}>
        <CreateProfileTopBar />
        <div className={styles.formBox}>
          <PersonalInfo />
          <LocationPreferences />
          <WorkInformation />
        </div>
      </div>
    </CreateProfileFormWrapper>
  )
}

export default CreateProfilePage
