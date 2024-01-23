import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import styles from './ProfileDetails.module.scss'

const ProfileDetails = async ({
  profile,
}: {
  profile: ProfileModelSimplified
}) => {
  return (
    <>
      <section className={styles.container}>
        <div className={styles.left}>
          <div className={styles.techStack}>
            <p className={styles.title}>Tech stack</p>
            <div className={styles.techStackList}>
              {profile?.techStack.map((item, index) => (
                <p key={index} className={styles.techStackItem}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.gitActivities}>
            <p className={styles.title}>Git activity</p>
            <div className={styles.gitActivityBox}>
              <p className={styles.gitActivity}>Commits</p>
              <p className={styles.gitActivityValue}>23</p>
            </div>
            <div className={styles.gitActivityBox}>
              <p className={styles.gitActivity}>Pull requests</p>
              <p className={styles.gitActivityValue}>48</p>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.title}>Bio</p>
          <p className={styles.desc}>{profile?.bio}</p>
        </div>
      </section>
    </>
  )
}

export default ProfileDetails
