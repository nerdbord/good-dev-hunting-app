import React from 'react'
import styles from "./ProfileDetails.module.scss"

const ProfileDetails = () => {

    const techStackItems = ["Javascript", "React.js", "Vue.js", "GraphSQL", "Angular", "Java", "Mobile", "Ruby on rails"]

  return (
    <>
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.techStack}>
                <div className={styles.title}>Tech stack</div>
                <div className={styles.techStackList}>
                {techStackItems.map((item, index) => (
              <div key={index} className={styles.techStackItem}>{item}</div>
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
            <div className={styles.desc}>Hello, my name is [Name], and I am an aspiring software developer.
                <br/>
                <br/>
                I have always been fascinated by the power of technology and how it can be used to solve real-world problems. I am passionate about learning new technologies and programming languages, and I am constantly looking for ways to improve my skills.
                Currently, I have experience with programming languages such as Python and JavaScript, and I have worked on a variety of projects that range from web development to data analysis. I am always eager to take on new challenges and learn new skills to help me become a better developer.
                <br/>
                <br/>
                One of the things that excites me most about the tech industry is the potential to make a positive impact through my work. I believe that technology has the power to change the world, and I am eager to be a part of that change. Whether it's building applications that improve people's lives or developing new tools that help businesses operate more efficiently, I am committed to making a difference through my work.
                <br/>
                <br/>
                In my free time, I enjoy exploring new technologies and learning about the latest trends in the industry. I also enjoy collaborating with other developers and contributing to open-source projects. Ultimately, my goal is to become a skilled and knowledgeable software developer who can make a meaningful contribution to the tech industry.
            </div>
        </div>
    </div>
    </>
  )
}

export default ProfileDetails