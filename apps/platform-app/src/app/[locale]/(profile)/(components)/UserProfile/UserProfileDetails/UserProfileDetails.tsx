import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { MarkdownReader } from '@/components/MarkdownReader/MarkdownReader'
import styles from './UserProfileDetails.module.scss'

interface UserProfileDetailsProps {
  profileId: string
}

const UserProfileDetails = async (props: UserProfileDetailsProps) => {
  const profile = await findProfileById(props.profileId)
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.techStack}>
            <div className={styles.title}>Tech stack</div>
            <div className={styles.techStackList}>
              {profile?.techStack.map((item, index) => (
                <div key={index} className={styles.techStackItem}>
                  {item.name}
                </div>
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
          <div className={styles.title}>Bio</div>
          <MarkdownReader
            text={profile.bio || 'This user has not written a bio yet.'}
          />
        </div>
      </div>
    </>
  )
}

export default UserProfileDetails
