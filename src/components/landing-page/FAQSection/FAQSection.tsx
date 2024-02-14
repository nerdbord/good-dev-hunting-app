import Accordion from '../../Accordion/Accordion'
import styles from './FAQSection.module.scss'

const FAQSection = () => {
  return (
    <section id="FAQ" className={styles.wrapper}>
      <div className={styles.heading}>
        <span>FAQ</span>
        <small>Let us know if&nbsp;you&nbsp;have any&nbsp;questions.</small>
      </div>
      <div className={styles.faq}>
        <Accordion title="What is reverted recruitment process?">
          <p>
            Reverse recruiting (also known as "reverse job hunting") is an
            approach in which the roles of jobseekers and employers are
            reversed. Instead of candidates applying for positions, employers or
            recruiters actively seek out potential candidates.
          </p>
        </Accordion>
        <Accordion title="How does GDH work exactly?">
          <p>
            It's really simple - all you need to do is create an account by
            logging in with your GitHub profile. Then, you'll create a profile
            by providing information about yourself. Once your profile is
            approved by our moderators, you're ready to be hunted by employers.
          </p>
        </Accordion>
        <Accordion title="Is it really free?">
          <p>
            Yes! Using our platform is free. You can create profile, and get
            hired without any additional costs.
          </p>
        </Accordion>
        <Accordion title="Do I need to have an account on GitHub?">
          To create a profile, having a GitHub account is necessary as we want
          to make sure that you are a real developer. We also use GitHub to
          fetch your profile picture and other public information to make the
          process of creating a profile as easy as possible. We do not store any
          GitHub tokens.
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection
