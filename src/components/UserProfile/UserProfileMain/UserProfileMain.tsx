'use client'
import React from 'react'
import styles from './UserProfileMain.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import GithubIcon2 from '@/assets/icons/GithubIcon2'
import CopyEmail from '@/assets/icons/CopyEmail'
import LinkedIn from '@/assets/icons/LinkedIn'
import PolandFlag from '@/assets/images/🇵🇱.jpg'
import { profileData } from '@/components/ProfileList/profile-data'
import ProfilePicture from '../../../assets/images/ProfilePicture.png'

const UserProfileMain = () => {
  const router = useRouter()

  const selectedUser = profileData.find((user) => user.id === 9)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.back} onClick={() => router.back()}>
            Go back
          </div>
          <div className={styles.social}>
            <div className={styles.socialItem}>
              Github
              <GithubIcon2 />
            </div>
            <div className={styles.socialItem}>
              LinkedIn
              <LinkedIn />
            </div>
            <div className={styles.socialItem}>
              Copy email
              <CopyEmail />
            </div>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Image
              src={ProfilePicture}
              width={100}
              height={100}
              alt="user's avatar"
              className={styles.avatar}
            />
            <div className={styles.name}>{selectedUser?.name}</div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.country}>
              <Image
                src={PolandFlag}
                alt="Poland Flag"
                width={20}
                height={20}
                className={styles.flag}
              />
              {selectedUser?.country}, {selectedUser?.city}
            </div>
            <div className={styles.location}>Open to relocation</div>
            <div className={styles.location}>Remote only</div>
          </div>
          <div className={styles.addInfoBox}>
            <div className={styles.seniority}>
              {selectedUser?.seniority} {selectedUser?.jobSpecialization}{' '}
              Developer
            </div>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {selectedUser?.employmentType}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfileMain
