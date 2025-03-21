import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations(I18nNamespaces.HunterHowItWorks)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>
            <span className={styles.highlight}>{t('howItWorks')}</span>
          </h2>
          <h3 className={styles.headerSubtitle}>{t('stepsToFindExpert')}</h3>
        </div>

        <StepCard
          stepNumber={1}
          title={t('addRequest')}
          description={
            <>
              {t('describeNeeds')} <strong>{t('inOneMinute')}</strong>.
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
                  <h4>{t('exampleClientName')}</h4>
                  <p>{t('exampleClientPosition')}</p>
                </div>
              </div>
            </div>

            <div className={styles.arrowDown}>
              <VectorIcon />
            </div>

            <div className={styles.requirementCard}>
              <p>{t('exampleRequest')}</p>
            </div>

            <button className={styles.addRequestButton}>
              {t('addRequestFree')}
            </button>
          </div>
        </StepCard>

        <StepCard
          stepNumber={2}
          title={t('receiveOffers')}
          description={t('receiveOffersDescription')}
        >
          <div className={styles.offersExample}>
            <div className={styles.offersList}>
              <div className={styles.offerCard}>
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
                <div className={styles.offerContent}>
                  <h4>{t('offerResponse1')}</h4>
                  <p>{t('offerPosition1')}</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
                <div className={styles.offerContent}>
                  <h4>{t('offerResponse2')}</h4>
                  <p>{t('offerPosition2')}</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
                <div className={styles.offerContent}>
                  <h4>{t('offerResponse3')}</h4>
                  <p>{t('offerPosition3')}</p>
                </div>
              </div>
            </div>
          </div>
        </StepCard>

        <StepCard
          stepNumber={3}
          title={t('hireExpert')}
          description={t('hireExpertDescription')}
        >
          <div className={styles.hireExample}>
            <div className={styles.collaborationCard}>
              <h4>{t('collaborationInvite')}</h4>

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

              <p>{t('clientInvites')}</p>
              <p>{t('projectTitle')}</p>
            </div>
          </div>
        </StepCard>
      </div>
    </div>
  )
}
