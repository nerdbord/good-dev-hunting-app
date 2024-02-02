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
            approach in which the roles of job seekers and employers are
            reversed. Instead of candidates applying for positions, employers or
            recruiters actively seek out potential candidates.
          </p>
        </Accordion>
        <Accordion title="How does GDH work exactly?">
          <p>
            It's really simple - all you need to do is create an account by
            logging in with your GitHub profile. Then, you'll create a profile
            by providing information about yourself. Once your profile is
            approved by our moderators, you're ready to be hunted by employers
          </p>
        </Accordion>
        <Accordion title="Is it really free?">
          <p>Yes! Creating a profile comes with no charges, no hidden fees!</p>
        </Accordion>
        <Accordion title="Do I need to have an account on GitHub and Nerdbord?">
          To create a profile, having a GitHub account is necessary. Connecting
          with Nerdbord is optional, but we strongly encourage you to consider
          enhancing your profile with this option. This allows employers to get
          to know your work better through an attractive and user-friendly
          Nerdbord portfolio."
        </Accordion>
      </div>
    </section>
  )
}

export default FAQSection
