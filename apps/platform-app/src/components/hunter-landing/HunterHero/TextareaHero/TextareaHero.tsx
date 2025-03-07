"use client"
import styles from "./TextareaHero.module.scss"
import { useTranslations } from "next-intl"
import { I18nNamespaces } from "@/i18n/request"
import { useState, useEffect, useCallback } from "react"

type TextareaHeroProps = {
  tagsAnimate: string[];
  onTagChange: (tag: string) => void;
  selectedTag: string | null;
  mockText: string;
  onEmpty: () => void;
};

export const TextareaHero = ({ tagsAnimate, onTagChange, selectedTag, mockText, onEmpty }: TextareaHeroProps) => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [text, setText] = useState("");
  const staticPrefix = `${t("textareaLabel")}`;
  const [currentTag, setCurrentTag] = useState(tagsAnimate[0]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // Function to get random tag excluding the current one
  const getRandomTag = useCallback((currentTag: string) => {
    const availableTags = tagsAnimate.filter(tag => tag !== currentTag);
    const randomIndex = Math.floor(Math.random() * availableTags.length);
    return availableTags[randomIndex];
  }, [tagsAnimate]);

  useEffect(() => {
    if (selectedTag) {
      setText(mockText);
      setShowPlaceholder(false);
      return;
    }

    const ANIMATION_DURATION = 3500; // Total cycle duration
    const DELETE_DURATION = 500; // Duration of delete animation

    const interval = setInterval(() => {
      setIsAnimating(false); // Start delete animation
      
      // Wait for delete animation to complete before changing text
      setTimeout(() => {
        const newTag = getRandomTag(currentTag);
        setCurrentTag(newTag);
        onTagChange(newTag);
        setIsAnimating(true); // Start typing animation
      }, DELETE_DURATION);

    }, ANIMATION_DURATION);

    return () => clearInterval(interval);
  }, [currentTag, getRandomTag, onTagChange, selectedTag, mockText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    
    // If text is being deleted completely
    if (newValue === "") {
      setText("");
      setShowPlaceholder(true);
      onEmpty(); // Notify parent component that textarea is empty
      return;
    }

    if (!selectedTag && newValue.startsWith(staticPrefix)) {
      setText(newValue.slice(staticPrefix.length));
    } else {
      setText(newValue);
      setShowPlaceholder(false);
    }
  };

  return (
    <div className={styles.textareaWrapper}>
      {showPlaceholder && !text && (
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
        value={selectedTag ? text : text ? `${staticPrefix}${text}` : ""}
        onChange={handleChange}
      />
    </div>
  );
}