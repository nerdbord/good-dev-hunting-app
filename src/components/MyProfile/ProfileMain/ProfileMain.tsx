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
import { GoBackButton } from '@/components/GoBackButton/GoBackButton'
import { AppRoutes } from '@/utils/routes'

const ProfileMain = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect(AppRoutes.home)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  return (
    <>
      <section className={styles.container}>
        <div className={styles.nav}>
          <GoBackButton>Go Back</GoBackButton>
          {/* //tutaj była ul z socialami */}
        </div>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Image
              src="https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg"
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
              <p>Niderlands, Nistelrode</p>
            </div>
            <div className={styles.location}>Open to relocation</div>
            <div className={styles.location}>Remote only</div>
          </div>
          <div className={styles.addInfoBox}>
            <span className={styles.seniority}>Senior Frontend Developer</span>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>Part-time</div>
            </div>
          </div>
          <ul className={styles.social}>
            <li className={styles.socialItem}>
              <a
                href={'http://localhost:3000/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
                <GithubIcon2 />
              </a>
            </li>

            <li className={styles.socialItem}>
              <a
                href={'http://localhost:3000/'}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <LinkedIn />
              </a>
            </li>

            <li className={styles.socialItem}>
              <CopyEmail email="test@nerdbord.io" />
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default ProfileMain
