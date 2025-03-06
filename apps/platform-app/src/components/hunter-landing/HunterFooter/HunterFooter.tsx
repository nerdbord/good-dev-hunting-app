'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { LogoLight } from '../LogoLight/LogoLight'
import styles from './HunterFooter.module.scss'

type Props = {}

export const HunterFooter = (props: Props) => {
  const t = useTranslations(I18nNamespaces.HunterFooter)
  const year = new Date().getFullYear()

  const handleAddJob = () => {
    console.log('Job added')
  }

  const handleContact = () => {
    const encodedEmailParts = ['bWFpbHRv', 'OnRlYW1AZGV2aHVudGluZy5jby==']
    window.location.href = atob(encodedEmailParts.join(''))
  }

  const handleJoinAsItSpecialist = () => {
    console.log('Joined as IT specialist')
  }

  return (
    <section id="HunterFooter" className={styles.footer}>
      <div className={styles.topBar}>
        <LogoLight />

        <div className={styles.contact}>
          <div onClick={handleContact}>{t('contact')}</div>
          <div onClick={handleJoinAsItSpecialist}>
            {t('joinAsItSpecialist')}
          </div>
          <Button variant="allpurple" onClick={handleAddJob}>
            {t('addJob')}
          </Button>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <span className={styles.copyright}>
          Copyright © {year} Nerdbord OU All rights reserved.
        </span>
        <div className={styles.terms}>
          <Link
            target={'_blank'}
            href="https://glory-licorice-2e2.notion.site/Privacy-policy-6c075e8ad0de4927addf9592bb29de6e?pvs=4"
          >
            {t('privacyPolicy')}{' '}
          </Link>
          <Link
            target={'_blank'}
            href="https://glory-licorice-2e2.notion.site/Good-Dev-Hunting-User-Terms-and-Conditions-77b1c52963f94edbb898a36e2a2ac512"
          >
            {t('termsOfService')}{' '}
          </Link>
        </div>
      </div>
    </section>
  )
}
