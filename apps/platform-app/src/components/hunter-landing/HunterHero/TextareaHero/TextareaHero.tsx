"use client"
import styles from "./TextareaHero.module.scss"
import { useTranslations } from "next-intl"
import { I18nNamespaces } from "@/i18n/request"
import { useState, useEffect, useCallback } from "react"

type TextareaHeroProps = {
  tagsAnimate: string[];
  onTagChange: (tag: string) => void;
};

export const TextareaHero = ({ tagsAnimate, onTagChange }: TextareaHeroProps) => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [text, setText] = useState("");
  const staticPrefix = `${t("textareaLabel")}`;
  const [currentTag, setCurrentTag] = useState(tagsAnimate[0]);
  const [isAnimating, setIsAnimating] = useState(true);

  // Function to get random tag excluding the current one
  const getRandomTag = useCallback((currentTag: string) => {
    const availableTags = tagsAnimate.filter(tag => tag !== currentTag);
    const randomIndex = Math.floor(Math.random() * availableTags.length);
    return availableTags[randomIndex];
  }, [tagsAnimate]);

  useEffect(() => {
    const ANIMATION_DURATION = 3000; // Total cycle duration
    const TYPING_DURATION = 1500; // Duration of typing animation from CSS

    const interval = setInterval(() => {
      setIsAnimating(false);
      
      // Change text after a brief pause
      setTimeout(() => {
        const newTag = getRandomTag(currentTag);
        setCurrentTag(newTag);
        onTagChange(newTag);
        setIsAnimating(true);
      }, 200);

    }, ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, [currentTag, getRandomTag, onTagChange]);

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
      {!text && (
        <div className={styles.overlayText}>
          {staticPrefix}
          <span 
            className={`${styles.dynamicText} ${isAnimating ? styles.animating : ''}`}
          >
            {currentTag}
          </span>
        </div>
      )}
      <textarea
        className={styles.searchTextarea}
        value={text ? `${staticPrefix}${text}` : ""}
        onChange={handleChange}
      />
    </div>
  );
}