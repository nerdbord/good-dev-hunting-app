import { I18nNamespaces } from '@/i18n'
import { useLocale, useTranslations } from 'next-intl'
import { LocaleSwitcherSelect } from './LocaleSwitcherSelect'

// export const LocaleSwitcher = () => {
//   const t = useTranslations(I18nNamespaces.LocaleSwitcher)
//   console.log(t('locale'))
//   const locale = useLocale()
//   return (
//     <>
//       <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
//         {locales.map((current) => (
//           <option key={current} value={current}>
//             {t('locale', { locale: current })}
//           </option>
//         ))}
//       </LocaleSwitcherSelect>
//     </>
//   )
// }
export const LocaleSwitcher = () => {
  const t = useTranslations(I18nNamespaces.LocaleSwitcher)
  const locale = useLocale()

  return <LocaleSwitcherSelect defaultValue={locale} label={t('label')} />
}
