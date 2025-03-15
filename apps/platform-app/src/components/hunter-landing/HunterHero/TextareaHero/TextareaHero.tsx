"use client"
import styles from "./TextareaHero.module.scss"
import { useTranslations } from "next-intl"
import { I18nNamespaces } from "@/i18n/request"
import { useState, useEffect, useCallback, useRef } from "react"
import { useTextareaAnimation } from "../../hooks/useTextareaAnimation"

type TextareaHeroProps = {
  tagsAnimate: string[];
  onTagChange: (tag: string) => void;
  selectedTag: string | null;
  mockText: string;
  onEmpty: () => void;
};

export const TextareaHero = ({
  tagsAnimate,
  onTagChange,
  selectedTag,
  mockText,
  onEmpty,
}: TextareaHeroProps) => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const staticPrefix = `${t("textareaLabel")}`;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Use custom hook for textarea animation
  const {
    text,
    setText,
    currentTag,
    isAnimating,
    showPlaceholder,
    setShowPlaceholder,
  } = useTextareaAnimation({
    tagsAnimate,
    onTagChange,
    selectedTag,
    mockText,
  });

  // Adjust textarea height based on content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '121px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = scrollHeight + 'px';
    }
  }, []);

  // Handle text change in textarea
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
    
    adjustHeight();
  };

  // Adjust height when text changes
  useEffect(() => {
    if (selectedTag) {
      setTimeout(adjustHeight, 0);
    }
  }, [selectedTag, adjustHeight]);

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
        ref={textareaRef}
        className={styles.searchTextarea}
        value={selectedTag ? text : text ? `${staticPrefix}${text}` : ""}
        onChange={handleChange}
      />
    </div>
  );
}