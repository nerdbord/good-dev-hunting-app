import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import styles from './UserProfileDetails.module.scss'

const UserProfileDetails = ({
  userProfile,
}: {
  userProfile: ProfileModelSimplified
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.techStack}>
            <div className={styles.title}>Tech stack</div>
            <div className={styles.techStackList}>
              {userProfile?.techStack.map((item, index) => (
                <div key={index} className={styles.techStackItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.gitActivities}>
            <div className={styles.title}>Git activity</div>
            <div className={styles.gitActivityBox}>
              <div className={styles.gitActivity}>Commits</div>
              <div className={styles.gitActivityValue}>23</div>
            </div>
            <div className={styles.gitActivityBox}>
              <div className={styles.gitActivity}>Pull requests</div>
              <div className={styles.gitActivityValue}>48</div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>Bio</div>
          <div className={styles.desc}>{userProfile?.bio}</div>
        </div>
      </div>
    </>
  )
}

export default UserProfileDetails
