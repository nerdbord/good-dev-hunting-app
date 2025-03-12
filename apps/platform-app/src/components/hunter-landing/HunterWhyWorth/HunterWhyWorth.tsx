import styles from './HunterWhyWorth.module.scss'

type Props = {}

export const HunterWhyWorth = (props: Props) => {
  return (
    <div className={styles.fullWidthWrapper}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Dlaczego warto korzystać z DevHunting?</h2>

        <div className={styles.contentContainer}>
          <div className={styles.textContainer}>
            <div className={styles.reason}>
              <h3 className={styles.reasonTitle}>Całkowicie za darmo</h3>
              <p className={styles.reasonDescription}>
                Dodaj swoje zlecenie bez opłat i otrzymaj oferty od specjalistów
                IT.
              </p>
            </div>

            <div className={styles.reason}>
              <h3 className={styles.reasonTitle}>Prosty i szybki proces</h3>
              <p className={styles.reasonDescription}>
                Nie trać czasu na poszukiwania - programiści sami zgłoszą się do
                Ciebie z dostosowanymi propozycjami.
              </p>
            </div>

            <div className={styles.reason}>
              <h3 className={styles.reasonTitle}>
                Nie musisz znać technologii
              </h3>
              <p className={styles.reasonDescription}>
                Opisz swój pomysł, a AI przekształci go w brief projektowy dla
                odpowiednich ekspertów.
              </p>
            </div>
          </div>

          <div className={styles.imageContainer} />
        </div>
      </div>
    </div>
  )
}
