import React from 'react'
import styles from './HowItWorks.module.scss'
import TraitTemplate from './TraitTemplate/TraitTemplate'
import GithubIcon from '@/assets/icons/GithubIcon'
import GlobeIcon from '@/assets/icons/GlobeIcon'
import DollarIcon from '@/assets/icons/DollarIcon'
import ConnectIcon from '@/assets/icons/ConnectIcon'
import Step from './Step/Step'

const HowItWorks = () => {
  return (
    <section id="HowItWorks" className={styles.wrapper}>
      <div className={styles.titleBox}>
        <span className={styles.sectionName}>How it works</span>
        <span className={styles.title}>Reverted recruitment process</span>
      </div>
      <div className={styles.steps}>
        <Step
          title="Step 1 – CREATE PROFILE"
          description1="Describe your skillset,"
          description2="personality and availability."
        />
        <Step
          title="Step 2 – SIMPLY WAIT"
          description1="Grow and get found."
          description2="Update your availability regularly."
        />
      </div>

      <div className={styles.traitsBox}>
        <div className={styles.traits}>
          <TraitTemplate
            icon={<GlobeIcon />}
            title="Open source"
            description="All of the programs are focused on teaching problem-solving skills and processes."
          />
          <TraitTemplate
            icon={<DollarIcon />}
            title="Completely free"
            description="Each program has an assigned mentor who guides mentees and provides feedback on their work."
          />
          <TraitTemplate
            icon={<GithubIcon />}
            title="Connected to Github"
            description="Invest as much time as you wish. The amount of work that you put into the program is completely up to you. "
          />
          <TraitTemplate
            icon={<ConnectIcon />}
            title="Use as portfolio"
            description="Receive more in-depth and detailed evaluation of your work, as mentors review and provide feedback to your tasks."
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
