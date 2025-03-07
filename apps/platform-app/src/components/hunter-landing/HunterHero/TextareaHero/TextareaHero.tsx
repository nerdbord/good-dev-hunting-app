"use client"
import styles from "./TextareaHero.module.scss"
import { useTranslations } from "next-intl"
import { I18nNamespaces } from "@/i18n/request"
import { useState, useEffect } from "react"

type TextareaHeroProps = {
  tagsAnimate: string[];
  // t: (key: string) => string;
};

export const TextareaHero = ({ tagsAnimate }: TextareaHeroProps) => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState(tagsAnimate[0]);
  const staticPrefix = `${t("textareaLabel")}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % tagsAnimate.length;
      setPlaceholder(tagsAnimate[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [tagsAnimate]);

  return (
    <div className={styles.textareaWrapper}>
      <div className={styles.overlayText}>
        {staticPrefix}
        <span className={styles.dynamicText}>{text}</span>
      </div>
      <textarea
        className={styles.searchTextarea}
        placeholder={placeholder}
        value={`${staticPrefix}${text}`}
        onChange={(e) => setText(e.target.value.replace(staticPrefix, ""))}
      />
    </div>
  );
}