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
import { CopyEmail } from '@/components/CopyEmail/CopyEmail'
import { AppRoutes } from '@/utils/routes'
import { findUserByEmail } from '@/backend/user/user.service'
import { mapEmploymentType } from '@/data/frontend/profile/mappers'
import { fetchUserAvatar } from '@/actions/user/fetchUserAvatar'
const ProfileMain = async () => {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    redirect(AppRoutes.home)
  }
  const profile = await getProfileByUserEmail(session.user.email)
  if (!profile) {
    redirect(AppRoutes.home)
  }

  const user = await findUserByEmail(session.user.email)

  if (!user) {
    redirect(AppRoutes.home)
  }

  const githubUsername = user.githubDetails?.username
  const avatarUrl = await fetchUserAvatar()

  return (
    <>
      <section className={styles.container}>
        <ul className={styles.social}>
          <li className={styles.socialItem}>
            <a
              className={styles.socialLink}
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
              <GithubIcon2 />
            </a>
          </li>
          {profile.linkedIn && (
            <li className={styles.socialItem}>
              <a
                className={styles.socialLink}
                href={'http://localhost:3000/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <LinkedIn />
              </a>
            </li>
          )}
          <li className={styles.copyEmail}>
            <CopyEmail email="test@nerdbord.io" />
          </li>
        </ul>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Image
              src={avatarUrl}
              key={avatarUrl}
              width={100}
              height={100}
              alt="user's avatar"
              className={styles.avatar}
            />
            <div className={styles.name}>{session.user.name}</div>
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
                {profile.country.name}, {profile.city.name}
              </p>
            </div>
            {profile.country.openForRelocation && (
              <div className={styles.location}>Open to relocation</div>
            )}
            {profile.remoteOnly && (
              <div className={styles.location}>Remote only</div>
            )}
          </div>
          <div className={styles.addInfoBox}>
            <span className={styles.seniority}>
              {profile.seniority} {profile.position} Developer
            </span>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {mapEmploymentType(profile.employmentType)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileMain
