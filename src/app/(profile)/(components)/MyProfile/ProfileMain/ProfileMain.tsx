import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/mappers'
import { ProfileModel } from '@/app/(profile)/types'
import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'
import { SeniorityLevel } from '@/backend/profile/profile.types'
import { Avatar } from '@/components/Avatar/Avatar'
import { AnchorButton } from '@/components/Button/AnchorButton'
import { countries } from '@/data/countries'
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
          <li>
            <AnchorButton
              href={`https://github.com/${githubUsername}`}
              icon={<GithubIcon2 />}
            >
              Github
            </AnchorButton>
          </li>
          {profile.linkedIn && (
            <li>
              <AnchorButton href={profile.linkedIn} icon={<LinkedIn />}>
                LinkedIn
              </AnchorButton>
            </li>
          )}
          {isConnectedToNerdbord && (
            <li>
              <AnchorButton href={`https://nerdbord.io/p/${githubUsername}`}>
                Portfolio ↗︎
              </AnchorButton>
            </li>
          )}
        </ul>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Avatar src={avatarUrl || ''} size={100} />
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
              {mapSeniorityLevel(profile.seniority as SeniorityLevel) ||
                profile.seniority}{' '}
              {mapSpecializationToTitle(profile.position)}
            </span>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {/* TODO: https://www.figma.com/file/PIj2atelHFirCiOoFoTO64/Good-Dev-Hunting-x-Nerdbord?type=design&node-id=47-11819&mode=design&t=npBqi8TnjgduU999-4 */}
                {mapEmploymentTypes(profile.employmentTypes).join(' / ')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileMain
