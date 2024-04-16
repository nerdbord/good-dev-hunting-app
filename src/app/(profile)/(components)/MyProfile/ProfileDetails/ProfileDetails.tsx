import { findProfileById } from '@/app/(profile)/_actions'
import { MarkdownReader } from '@/components/MarkdownReader/MarkdownReader'
import { EditProfileButton } from '../../EditProfileButton'
import { TogglePublishButton } from '../../TogglePublishButton/TogglePublishButton'
import styles from './ProfileDetails.module.scss'

interface ProfileDetailsProps {
  profileId: string
}

const ProfileDetails = async (props: ProfileDetailsProps) => {
  const profile = await findProfileById(props.profileId)
  return (
    <>
      <section className={styles.container}>
        <div className={styles.mobileView}>
          <EditProfileButton />
          <TogglePublishButton state={profile.state} profileId={profile.id} />
        </div>{' '}
        <div className={styles.left}>
          <div className={styles.techStack}>
            <p className={styles.title}>Tech stack</p>
            <div className={styles.techStackList}>
              {profile?.techStack.map((item, index) => (
                <p key={index} className={styles.techStackItem}>
                  {item.name}
                </p>
              ))}
            </div>
          </div>

          {/* this feature below will be added in the future */}
          {/*         <div className={styles.gitActivities}>
            <div className={styles.title}>Git activity</div>
            <div className={styles.gitActivityBox}>
              <div className={styles.gitActivity}>Commits</div>
              <div className={styles.gitActivityValue}>23</div>
            </div>
            <div className={styles.gitActivityBox}>
              <div className={styles.gitActivity}>Pull requests</div>
              <div className={styles.gitActivityValue}>48</div>
            </div>
          </div>  */}
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
