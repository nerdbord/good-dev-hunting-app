import React from 'react'
import styles from './ProfileMain.module.scss'
import Image from 'next/image'
import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'
import PolandFlag from '@/assets/images/🇵🇱.jpg'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { GoBackButton } from '@/components/GoBackButton/GoBackButton'
import CopyEmail from '@/components/CopyEmail/Copyemail'
const ProfileMain = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const profile = await getProfileByUserEmail(session.user.email)

  return (
    <>
      <section className={styles.container}>
        <div className={styles.nav}>
          <GoBackButton>Go Back</GoBackButton>
          <ul className={styles.social}>
            <li className={styles.socialItem}>
              Github
              <GithubIcon2 />
            </li>
            {profile?.linkedIn && (
              <li className={styles.socialItem}>
                <a
                  href={profile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <LinkedIn />
                </a>
              </li>
            )}
            <li className={styles.socialItem}>
              <CopyEmail email={session.user.email} />
            </li>
          </ul>
        </div>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Image
              src={session.user.image}
              width={100}
              height={100}
              alt="user's avatar"
              className={styles.avatar}
            />
            <div className={styles.name}>{session?.user.name}</div>
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
              <p>
                {profile?.country.name} {profile?.city.name}
              </p>
            </div>

            {profile?.country.openForRelocation && (
              <div className={styles.location}>Open to relocation</div>
            )}
            {profile?.remoteOnly && (
              <div className={styles.location}>Remote only</div>
            )}
          </div>
          <div className={styles.addInfoBox}>
            <span className={styles.seniority}>
              {profile?.seniority} {profile?.position} Developer
            </span>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {profile?.employmentType}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileMain
