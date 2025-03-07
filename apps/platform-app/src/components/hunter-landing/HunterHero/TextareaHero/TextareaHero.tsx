"use client"
import styles from "./TextareaHero.module.scss"
import { useTranslations } from "next-intl"
import { I18nNamespaces } from "@/i18n/request"
export const TextareaHero = () => {
    const t = useTranslations(I18nNamespaces.HunterHero)
    return <textarea
    className={styles.searchTextarea}
    placeholder={t('textareaLabel')}
    rows={3}
  />
  }