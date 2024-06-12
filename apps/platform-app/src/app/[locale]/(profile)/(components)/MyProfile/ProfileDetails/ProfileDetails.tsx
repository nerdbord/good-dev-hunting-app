import { findProfileById } from '@/app/[locale]/(profile)/_actions'
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
            <div className={styles.languages}>
              <p className={styles.title}>Languages</p>
              <div className={styles.techStackList}>
                {profile?.language.map((item, index) => (
                  <p key={index} className={styles.techStackItem}>
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.techStack}>
            <p className={styles.title}>Languages</p>
            <div className={styles.techStackList}>
              {profile?.language.map((item, index) => (
                <p key={index} className={styles.techStackItem}>
                  {item.name}
                </p>
              ))}
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
