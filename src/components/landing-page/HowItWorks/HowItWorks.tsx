import ConnectIcon from '@/assets/icons/ConnectIcon'
import DollarIcon from '@/assets/icons/DollarIcon'
import GithubIcon from '@/assets/icons/GithubIcon'
import GlobeIcon from '@/assets/icons/GlobeIcon'
import styles from './HowItWorks.module.scss'
import Step from './Step/Step'
import TraitTemplate from './TraitTemplate/TraitTemplate'

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
            title="Reversed recruitment"
            description="Open the doors to a world of opportunities where employers and project owners across the globe seek you out. Embrace the simplicity of being discovered."
          />
          <TraitTemplate
            icon={<GithubIcon />}
            title="Open source"
            description="The source code is available to the public, allowing you to inspect, modify, and distribute the code. You're welcome to contribute to the codebase, enhance features and fix bugs."
          />
          <TraitTemplate
            icon={<ConnectIcon />}
            title="Be noticed"
            description="Your profile isn't just another CV. With Good Dev Hunt, it's a dynamic portfolio that puts your best work front and center."
          />
          <TraitTemplate
            icon={<DollarIcon />}
            title="Completely free access"
            description="With Good Dev Hunt, creating your profile and engaging with the platform costs you nothing."
          />
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
