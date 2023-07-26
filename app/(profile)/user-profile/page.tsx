import React from 'react'
import styles from './page.module.scss'
import UserProfileMain from '@/components/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileDetails from '@//components/UserProfile/UserProfileDetails/UserProfileDetails'

const UserProfilePage = async () => {
  return (
    <div className={styles.wrapper}>
      <UserProfileMain />
      <UserProfileDetails />
    </div>
  )
}

export default UserProfilePage
