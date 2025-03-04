import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import LoginBtn from '@/components/LoginBtn/LoginBtn'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button, Container, Logo } from '@gdh/ui-system'
import { LogoGDH } from '@gdh/ui-system/icons'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { LogoWithTagline } from '../LogoWithTagline/LogoWithTagline'
import styles from './JobsHeader.module.scss'

interface JobsHeaderProps {
  logoWithTagLine?: boolean
}

export const JobsHeader = async ({
  logoWithTagLine = false,
}: JobsHeaderProps) => {
  const { user, userIsSpecialist } = await getAuthorizedUser()

  const tButtons = await getTranslations(I18nNamespaces.Buttons)

  return (
    <header className={styles.wrapper}>
      <Container>
        <div className={styles.container}>
          <div className={styles.logo}>
            {logoWithTagLine ? (
              <LogoWithTagline />
            ) : (
              <>
                <div className={styles.desktopLogo}>
                  <Logo />
                </div>
                <div className={styles.mobileLogo}>
                  <LogoGDH />
                </div>
              </>
            )}
          </div>
          <div className={styles.actions}>
            {!user && (
              <LoginBtn variant="secondary">{tButtons('logIn')}</LoginBtn>
            )}
            {user && (
              <Link href={AppRoutes.myJobs} className={styles.container}>
                <Button variant="secondary">{tButtons('myJobs')}</Button>
              </Link>
            )}
            {userIsSpecialist && (
              <Link href={AppRoutes.myProfile} className={styles.container}>
                <Button variant="secondary">{tButtons('myProfile')}</Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  )
}
