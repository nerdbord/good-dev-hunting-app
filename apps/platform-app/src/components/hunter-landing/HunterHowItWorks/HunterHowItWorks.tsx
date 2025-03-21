import Image from 'next/image'
import React from 'react'
import LandingProfileImg2 from '../../../assets/images/LandingProfileImg2.webp'
import ProfilePictureCEO from '../../../assets/images/ProfilePictureCEO.webp'
import { AgreementIcon } from '../../icons/AgreementIcon'
import { EnvelopeIcon } from '../../icons/EnvelopeIcon'
import { VectorIcon } from '../../icons/VectorIcon'
import styles from './HunterHowItWorks.module.scss'

interface StepCardProps {
  stepNumber: number
  title: string
  description: React.ReactNode
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
          description={
            <>
              Opisz swoje potrzeby i dodaj swoje zlecenie{' '}
              <strong>w 1 minutę</strong>.
            </>
          }
        >
          <div className={styles.clientExample}>
            <div className={styles.clientCard}>
              <div className={styles.clientHeader}>
                <div className={styles.clientAvatar}>
                  <Image
                    src={ProfilePictureCEO}
                    alt="Profile"
                    width={50}
                    height={50}
                    className={styles.avatarPlaceholder}
                  />
                </div>
                <div className={styles.clientInfo}>
                  <h4>Dawid Kowalczyk</h4>
                  <p>CEO startupu, budującego chatboty dla pacjentów</p>
                </div>
              </div>
            </div>

            <div className={styles.arrowDown}>
              <VectorIcon />
            </div>

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
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
                <div className={styles.offerContent}>
                  <h4>Marcin odpowiedział na twoje zlecenie</h4>
                  <p>Senior Software Engineer / AI Specialist</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
                <div className={styles.offerContent}>
                  <h4>Aleksandra odpowiedziała na twoje zlecenie</h4>
                  <p>Full Stack Developer / Healthcare Tech</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
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
                <Image
                  src={ProfilePictureCEO}
                  alt="Profile"
                  width={40}
                  height={40}
                  className={styles.avatarPlaceholder}
                />
                <div className={styles.connectIcon}>
                  <AgreementIcon />
                </div>
                <Image
                  src={LandingProfileImg2}
                  alt="Profile"
                  width={40}
                  height={40}
                  className={styles.avatarPlaceholder}
                />
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
