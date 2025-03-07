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
  const staticPrefix = `${t("textareaLabel")}`;
  const [currentTag, setCurrentTag] = useState(tagsAnimate[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % tagsAnimate.length;
      setCurrentTag(tagsAnimate[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [tagsAnimate]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.startsWith(staticPrefix)) {
      setText(newValue.slice(staticPrefix.length));
    } else {
      setText(newValue);
    }
  };

  return (
    <div className={styles.textareaWrapper}>
      {/* <div className={styles.overlayText}>
        {staticPrefix}
        <span className={styles.dynamicText}>{text}</span>
      </div> */}
      <textarea
        className={styles.searchTextarea}
        placeholder={`${staticPrefix}${currentTag}`}
        value={text ? `${staticPrefix}${text}` : ""}
        onChange={handleChange}
      />
    </div>
  );
}