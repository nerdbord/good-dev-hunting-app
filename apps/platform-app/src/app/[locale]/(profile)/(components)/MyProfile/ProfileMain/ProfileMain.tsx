import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { getHourlyRateDisplay } from '@/app/[locale]/(profile)/profile.helpers'
import {
  mapEmploymentTypes,
  mapSeniorityLevel,
  mapSpecializationToTitle,
} from '@/app/[locale]/(profile)/profile.mappers'
import { type SeniorityLevel } from '@/backend/profile/profile.types'
import { countries } from '@/data/countries'
import { ensureProtocol } from '@/utils/routes'
import { AnchorButton, Avatar } from '@gdh/ui-system'
import { GithubIcon2, LinkedIn } from '@gdh/ui-system/icons'
import styles from './ProfileMain.module.scss'

interface ProfileMainProps {
  profileId: string
}

const ProfileMain = async (props: ProfileMainProps) => {
  const profile = await findProfileById(props.profileId)

  const githubUsername = profile.githubUsername
  const avatarUrl = profile.avatarUrl
  const hourlyRateMin = profile.hourlyRateMin
  const hourlyRateMax = profile.hourlyRateMax
  const currency = profile.currency
  const countryFlag =
    countries.find((country) => country.name === profile.country)?.flag || ''

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
              <AnchorButton
                href={ensureProtocol(profile.linkedIn)}
                icon={<LinkedIn />}
              >
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
            <div className={styles.name}>{profile.fullName}</div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.country}>
              <img src={`https://flagsapi.com/${countryFlag}/flat/24.png`} />

              <p>
                {profile.country}, {profile.city}
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
          <p className={styles.salary}>
            {getHourlyRateDisplay(hourlyRateMin, currency, hourlyRateMax)}
          </p>
        </div>
      </section>
    </>
  )
}

export default ProfileMain
