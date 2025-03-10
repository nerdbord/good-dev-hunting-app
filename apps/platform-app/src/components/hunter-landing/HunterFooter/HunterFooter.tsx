'use client'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogoLight } from '../UI/LogoLight/LogoLight'
import styles from './HunterFooter.module.scss'

export const HunterFooter = () => {
  const t = useTranslations(I18nNamespaces.HunterFooter)
  const router = useRouter()
  const year = new Date().getFullYear()

  const handleAddJob = () => {
    router.push(AppRoutes.postJob)
  }

  const handleContact = () => {
    const encodedEmailParts = ['bWFpbHRv', 'OnRlYW1AZGV2aHVudGluZy5jby==']
    window.location.href = atob(encodedEmailParts.join(''))
  }

  return (
    <section id="HunterFooter" className={styles.footer}>
      <div className={styles.topBar}>
        <LogoLight />
        <div className={styles.contact}>
          <div onClick={handleContact}>{t('contact')}</div>
          <Link target={'_blank'} href={AppRoutes.devs}>
            {t('joinAsItSpecialist')}
          </Link>
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
