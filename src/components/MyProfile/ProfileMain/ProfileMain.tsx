import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'
import { countries } from '@/data/frontend/profile/countries/countries'
import { mapEmploymentType } from '@/data/frontend/profile/mappers'
import { ProfileModel } from '@/data/frontend/profile/types'
import Image from 'next/image'
import styles from './ProfileMain.module.scss'

const ProfileMain = async ({
  profile,
  isConnectedToNerdbord,
}: {
  profile: ProfileModel
  isConnectedToNerdbord: boolean
}) => {
  const githubUsername = profile.githubUsername
  const avatarUrl = profile.avatarUrl
  const countryFlag =
    countries.find((country) => country.name === profile.country.name)?.flag ||
    ''

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
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
                <LinkedIn />
              </a>
            </li>
          )}
          {isConnectedToNerdbord && (
            <li className={styles.socialItem}>
              <a
                className={styles.socialLink}
                href={`https://nerdbord.io/p/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio ↗︎
              </a>
            </li>
          )}
        </ul>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Image
              src={avatarUrl || ''}
              key={avatarUrl}
              width={100}
              height={100}
              alt="user's avatar"
              className={styles.avatar}
              object-fit="cover"
            />
            <div className={styles.name}>{profile.fullName}</div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.country}>
              <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />

              <p>
                {profile.country.name}, {profile.city.name}
              </p>
            </div>

            <div className={styles.optionBox}>
              {profile.openForCountryRelocation && (
                <div className={styles.location}>
                  Open to country relocation
                </div>
              )}
              {profile.openForCityRelocation && (
                <div className={styles.location}>Open to city relocation</div>
              )}
              {profile.remoteOnly && (
                <div className={styles.location}>Remote only</div>
              )}
            </div>
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
