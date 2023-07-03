import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import PersonalInfo from '@/components/CreateProfile/PersonalInfo/PersonalInfo'
import CreateProfileButton from '@/components/CreateProfile/CreateProfileButton/CreateProfileButton'

const CreateProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className={styles.main}>
      <div className={styles.titleBox}>
        <span>Create profile page</span>
        <CreateProfileButton />
      </div>
      <div className={styles.formBox}>
        <PersonalInfo />
      </div>
    </div>
  )
}

export default CreateProfilePage
