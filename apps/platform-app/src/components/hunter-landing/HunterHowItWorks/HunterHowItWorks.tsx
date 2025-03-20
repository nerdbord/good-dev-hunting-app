import React from 'react'
import styles from './HunterHowItWorks.module.scss'

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  children: React.ReactNode
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  children,
}) => {
  return (
    <div className={styles.stepSection}>
      <div className={styles.stepContent}>
        <h2 className={styles.stepTitle}>
          {stepNumber}. {title}
        </h2>
        <p className={styles.stepDescription}>{description}</p>
      </div>
      <div className={styles.stepVisual}>{children}</div>
    </div>
  )
}

export function HunterHowItWorks() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            <span className={styles.highlight}>JAK TO DZIAŁA</span>
          </h2>
          <h3 className={styles.headerSubtitle}>
            3 kroki do znalezienia eksperta
          </h3>
        </div>

        <StepCard
          stepNumber={1}
          title="Dodaj Zlecenie"
          description="Opisz swoje potrzeby i dodaj swoje zlecenie w 1 minutę."
        >
          <div className={styles.clientExample}>
            <div className={styles.clientCard}>
              <div className={styles.clientHeader}>
                <div className={styles.clientAvatar}>
                  {/* Replace with actual image */}
                  <div className={styles.avatarPlaceholder}></div>
                </div>
                <div className={styles.clientInfo}>
                  <h4>Dawid Kowalczyk</h4>
                  <p>CEO startupu, budującego chatboty dla pacjentów</p>
                </div>
              </div>
            </div>

            <div className={styles.arrowDown}></div>

            <div className={styles.requirementCard}>
              <p>
                Potrzebuję specjalisty od chatbotów, który zbuduje mi chatbota
                dla pacjentów na bazie ich historii choroby i zaleceń od
                lekarza.
              </p>
            </div>

            <button className={styles.addRequestButton}>
              Dodaj zlecenie za darmo
            </button>
          </div>
        </StepCard>

        <StepCard
          stepNumber={2}
          title="Otrzymaj Oferty"
          description="Otrzymaj zgłoszenia od zweryfikowanych specjalistów zainteresowanych Twoim projektem."
        >
          <div className={styles.offersExample}>
            <div className={styles.offersList}>
              <div className={styles.offerCard}>
                <div className={styles.offerIcon}></div>
                <div className={styles.offerContent}>
                  <h4>Marcin odpowiedział na twoje zlecenie</h4>
                  <p>Senior Software Engineer / AI Specialist</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}></div>
                <div className={styles.offerContent}>
                  <h4>Aleksandra odpowiedziała na twoje zlecenie</h4>
                  <p>Full Stack Developer / Healthcare Tech</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}></div>
                <div className={styles.offerContent}>
                  <h4>Kamil odpowiedział na twoje zlecenie</h4>
                  <p>Backend Developer / Chatbot Architect</p>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        <StepCard
          stepNumber={3}
          title="Zatrudnij Eksperta"
          description="Przejrzyj profile i wybierz osobę, która najlepiej pasuje do Twojego projektu i rozpocznij współpracę."
        >
          <div className={styles.hireExample}>
            <div className={styles.collaborationCard}>
              <h4>Zaproszenie do współpracy</h4>

              <div className={styles.collaborationAvatars}>
                <div className={styles.avatarPlaceholder}></div>
                <div className={styles.connectIcon}></div>
                <div className={styles.avatarPlaceholder}></div>
              </div>

              <p>Dawid zaprasza Cię do zlecenia:</p>
              <p>Chatbot dla branży healthtech</p>
            </div>
          </div>
        </StepCard>
      </div>
    </div>
  )
}
