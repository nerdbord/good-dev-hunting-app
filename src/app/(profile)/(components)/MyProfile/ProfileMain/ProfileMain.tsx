import { findProfileById } from '@/app/(profile)/_actions'
import { ProfileModel } from '@/app/(profile)/_models/profile.model'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/(profile)/profile.mappers'
import GithubIcon2 from '@/assets/icons/GithubIcon2'
import LinkedIn from '@/assets/icons/LinkedIn'
import { type SeniorityLevel } from '@/backend/profile/profile.types'
import { Avatar } from '@/components/Avatar/Avatar'
import { AnchorButton } from '@/components/Button/AnchorButton'
import { countries } from '@/data/countries'
import styles from './ProfileMain.module.scss'

interface ProfileMainProps {
  profileId: string
}

const ProfileMain = async (props: ProfileMainProps) => {
  const profile = await findProfileById(props.profileId)
  const profileModel = new ProfileModel(profile)

  const githubUsername = profileModel.githubUsername
  const avatarUrl = profileModel.avatarUrl
  const countryFlag =
    countries.find((country) => country.name === profileModel.country)?.flag ||
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
          {profileModel.linkedIn && (
            <li>
              <AnchorButton href={profileModel.linkedIn} icon={<LinkedIn />}>
                LinkedIn
              </AnchorButton>
            </li>
          )}
          {/*{profile.isConnectedToNerdbord && (*/}
          {/*  <li>*/}
          {/*    <AnchorButton href={`https://nerdbord.io/p/${githubUsername}`}>*/}
          {/*      Portfolio ↗︎*/}
          {/*    </AnchorButton>*/}
          {/*  </li>*/}
          {/*)}*/}
        </ul>
        <div className={styles.profile}>
          <div className={styles.user}>
            <Avatar src={avatarUrl || ''} size={100} />
            <div className={styles.name}>{profileModel.fullName}</div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.country}>
              <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />

              <p>
                {profileModel.country}, {profileModel.city}
              </p>
            </div>

            <div className={styles.optionBox}>
              {profileModel.openForCountryRelocation && (
                <div className={styles.location}>
                  Open to country relocation
                </div>
              )}
              {profileModel.openForCityRelocation && (
                <div className={styles.location}>Open to city relocation</div>
              )}
              {profileModel.remoteOnly && (
                <div className={styles.location}>Remote only</div>
              )}
            </div>
          </div>
          <div className={styles.addInfoBox}>
            <span className={styles.seniority}>
              {mapSeniorityLevel(profileModel.seniority as SeniorityLevel) ||
                profileModel.seniority}{' '}
              {mapSpecializationToTitle(profileModel.position)}
            </span>
            <div className={styles.addInfo}>
              <div className={styles.addInfoItem}>
                {/* TODO: https://www.figma.com/file/PIj2atelHFirCiOoFoTO64/Good-Dev-Hunting-x-Nerdbord?type=design&node-id=47-11819&mode=design&t=npBqi8TnjgduU999-4 */}
                {mapEmploymentTypes(profileModel.employmentTypes).join(' / ')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfileMain
