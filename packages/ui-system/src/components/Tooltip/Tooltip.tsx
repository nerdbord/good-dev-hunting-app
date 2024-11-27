"use client";
import React, { useState } from "react";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  text: string | null;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className={`${styles.tooltip} ${styles.tooltipTriangle} `}>
          {text}
        </div>
      )}
    </div>
  );
};
