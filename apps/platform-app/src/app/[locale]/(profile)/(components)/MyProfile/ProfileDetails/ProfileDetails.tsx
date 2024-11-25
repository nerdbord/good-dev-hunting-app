import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { MarkdownReader } from '@/components/MarkdownReader/MarkdownReader'
import { PublishingState } from '@prisma/client'
import { findLatestRejectionReason } from '../../../_actions/queries/findLatestRejectionReason'
import { EditProfileButton } from '../../EditProfileButton'
import { TogglePublishButton } from '../../TogglePublishButton/TogglePublishButton'
import styles from './ProfileDetails.module.scss'

interface ProfileDetailsProps {
  profileId: string
}

const ProfileDetails = async (props: ProfileDetailsProps) => {
  const profile = await findProfileById(props.profileId)
  const isRejected = profile.state === PublishingState.REJECTED
  const reason = await findLatestRejectionReason(props.profileId)

  const sortedLanguages =
    profile?.language.sort((a, b) => a.name.localeCompare(b.name)) || []
  const sortedTechStack =
    profile?.techStack.sort((a, b) => a.name.localeCompare(b.name)) || []

  return (
    <>
      <section className={styles.container}>
        <div className={styles.mobileView}>
          <EditProfileButton />
          <TogglePublishButton
            state={profile.state}
            profileId={profile.id}
            lastRejectionReason={isRejected ? reason : ''}
          />
        </div>{' '}
        <div className={styles.left}>
          <div className={styles.techStack}>
            <p className={styles.title}>Tech stack</p>
            <div className={styles.techStackList}>
              {sortedTechStack.map((item, index) => (
                <p key={index} className={styles.techStackItem}>
                  {item.name}
                </p>
              ))}
            </div>
            <div className={styles.languages}>
              <p className={styles.title}>Languages</p>
              <div className={styles.techStackList}>
                {sortedLanguages.map((item, index) => (
                  <p key={index} className={styles.techStackItem}>
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.title}>Bio</p>
          <MarkdownReader
            text={profile?.bio || 'This user has not written a bio yet.'}
          />
        </div>
      </section>
    </>
  )
}

export default ProfileDetails
