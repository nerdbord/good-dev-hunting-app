import React from 'react'
import styles from './ProfileDetails.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'

const ProfileDetails = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  const profile = await getProfileByUserEmail(session.user.email)

  return (
    <>
      <section className={styles.container}>
        <div className={styles.left}>
          <div className={styles.techStack}>
            <p className={styles.title}>Tech stack</p>
            <div className={styles.techStackList}>
              <p className={styles.techStackItem}>JavaScript</p>
              <p className={styles.techStackItem}>React</p>
              <p className={styles.techStackItem}>Phyton</p>
              <p className={styles.techStackItem}>Node</p>
              <p className={styles.techStackItem}>Słodkie kotki</p>
              <p className={styles.techStackItem}>Husky</p>
              <p className={styles.techStackItem}>MUI</p>
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
          <p className={styles.desc}>
            Hello, my name is [Name], and I am an aspiring software developer. I
            have always been fascinated by the power of technology and how it
            can be used to solve real-world problems. I am passionate about
            learning new technologies and programming languages, and I am
            constantly looking for ways to improve my skills.
            <br />
            <br /> Currently, I have experience with programming languages such
            as Python and JavaScript, and I have worked on a variety of projects
            that range from web development to data analysis. I am always eager
            to take on new challenges and learn new skills to help me become a
            better developer. One of the things that excites me most about the
            tech industry is the potential to make a positive impact through my
            work.
            <br />
            <br />I believe that technology has the power to change the world,
            and I am eager to be a part of that change. Whether it's building
            applications that improve people's lives or developing new tools
            that help businesses operate more efficiently, I am committed to
            making a difference through my work.
            <br />
            <br /> In my free time, I enjoy exploring new technologies and
            learning about the latest trends in the industry. I also enjoy
            collaborating with other developers and contributing to open-source
            projects. Ultimately, my goal is to become a skilled and
            knowledgeable software developer who can make a meaningful
            contribution to the tech industry.
          </p>
        </div>
      </section>
    </>
  )
}

export default ProfileDetails
