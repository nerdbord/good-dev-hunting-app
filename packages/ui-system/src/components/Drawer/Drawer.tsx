"use client";
import { useEffect } from "react";
import styles from "./Drawer.module.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const DrawerHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.header}>{children}</div>;
};

export const Drawer = ({ isOpen, onClose, children, title }: DrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      // lock scroll
      document.body.style.overflow = "hidden";
    } else {
      // unlock scroll
      document.body.style.overflow = "unset";
    }

    return () => {
      // unlock scroll
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <button onClick={onClose} className={styles.closeButton}>
            ×
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
