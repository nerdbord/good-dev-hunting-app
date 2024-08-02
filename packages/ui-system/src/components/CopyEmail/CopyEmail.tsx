"use client";
import React from "react";
import { EmailIcon } from "../../assets/icons/EmailIcon";
import styles from "./CopyEmail.module.scss";

interface CopyEmailProps {
  email: string;
}
export const CopyEmail = ({ email }: CopyEmailProps) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).catch(console.error);
  };

  return (
    <div>
      <div className={styles.wrapper} onClick={handleCopyEmail}>
        Copy email
        <EmailIcon />
      </div>
    </div>
  );
};

export default CopyEmail;
