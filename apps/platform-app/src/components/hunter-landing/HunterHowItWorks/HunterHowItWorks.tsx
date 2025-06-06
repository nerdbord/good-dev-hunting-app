import PointingIcon from '@/components/icons/PointingIcon'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import React from 'react'
import LandingProfileImg2 from '../../../assets/images/LandingProfileImg2.webp'
import ProfilePictureCEO from '../../../assets/images/ProfilePictureCEO.webp'
import { AgreementIcon } from '../../icons/AgreementIcon'
import { EnvelopeIcon } from '../../icons/EnvelopeIcon'
import { VectorIcon } from '../../icons/VectorIcon'
import { AnimatedReveal } from '../UI/AnimatedReveal/AnimatedReveal'
import styles from './HunterHowItWorks.module.scss'

interface StepCardProps {
  stepNumber: number
  title: string
  description: React.ReactNode
  children: React.ReactNode
  isReversed?: boolean
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  description,
  children,
  isReversed = false,
}) => {
  const sectionClass = `${styles.stepSection} ${
    isReversed ? styles.reversed : ''
  }`

  return (
    <div className={sectionClass}>
      <div className={styles.stepContent}>
        <h3 className={styles.stepTitle}>
          {stepNumber}. {title}
        </h3>
        <p className={styles.stepDescription}>{description}</p>
      </div>
      <div className={styles.stepVisual}>{children}</div>
    </div>
  )
}

export async function HunterHowItWorks() {
  const t = await getTranslations(I18nNamespaces.HunterHowItWorks)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>
          <span className={styles.highlight}>{t('howItWorks')}</span>
        </h2>
        <h2 className={styles.headerSubtitle}>{t('stepsToFindExpert')}</h2>
      </div>

      <AnimatedReveal direction="right" amount={0.2}>
        <StepCard
          stepNumber={1}
          title={t('addJob')}
          description={
            <>
              {t('describeNeeds')} <strong>{t('inOneMinute')}</strong>.
            </>
          }
          isReversed
        >
          <div className={styles.clientExample}>
            <div className={styles.clientCard}>
              <div className={styles.clientHeader}>
                <div className={styles.clientAvatar}>
                  <Image
                    src={ProfilePictureCEO}
                    alt={t('ceopicture')}
                    width={50}
                    height={50}
                    className={styles.avatarPlaceholder}
                  />
                </div>
                <div className={styles.clientInfo}>
                  <p>{t('exampleClientName')}</p>
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

            <a href={AppRoutes.postJob}>
              <button className={styles.addJobButton}>
                {t('addJobForFree')}
              </button>
            </a>
            <div className={styles.pointingIconWrapper}>
              <PointingIcon />
            </div>
          </div>
        </StepCard>
      </AnimatedReveal>

      <AnimatedReveal direction="left" amount={0.2}>
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
                  <p>{t('offerResponse1')}</p>
                  <p>{t('offerPosition1')}</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
                <div className={styles.offerContent}>
                  <p>{t('offerResponse2')}</p>
                  <p>{t('offerPosition2')}</p>
                </div>
              </div>

              <div className={styles.offerCard}>
                <div className={styles.offerIcon}>
                  <EnvelopeIcon width={35} height={27} />
                </div>
                <div className={styles.offerContent}>
                  <p>{t('offerResponse3')}</p>
                  <p>{t('offerPosition3')}</p>
                </div>
              </div>
            </div>
          </div>
        </StepCard>
      </AnimatedReveal>

      <AnimatedReveal direction="right" amount={0.3}>
        <StepCard
          stepNumber={3}
          title={t('hireExpert')}
          description={t('hireExpertDescription')}
          isReversed
        >
          <div className={styles.hireExample}>
            <div className={styles.collaborationCard}>
              <p>{t('collaborationInvite')}</p>

              <div className={styles.collaborationAvatars}>
                <Image
                  src={ProfilePictureCEO}
                  alt={t('ceopicture')}
                  width={40}
                  height={40}
                  className={styles.avatarPlaceholder}
                />
                <div className={styles.connectIcon}>
                  <AgreementIcon />
                </div>
                <Image
                  src={LandingProfileImg2}
                  alt={t('clientpicture')}
                  width={40}
                  height={40}
                  className={styles.avatarPlaceholder}
                />
              </div>
              <div>
                {' '}
                <p>{t('clientInvites')}</p>
                <p>{t('projectTitle')}</p>
              </div>
            </div>
          </div>
        </StepCard>
      </AnimatedReveal>
    </div>
  )
}
