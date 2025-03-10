"use client";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AppRoutes } from "../../utils/routes";
import styles from "./Logo.module.scss";

interface LogoProps {
  withLink?: boolean;
}

export const Logo = ({ withLink = true }: LogoProps) => {
  const { isDarkTheme } = useContext(ThemeContext);

  const logoContent = (
    <>
      <svg
        width="44"
        height="26"
        viewBox="0 0 44 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${styles.logoSvg} ${
          isDarkTheme ? styles.darkTheme : styles.lightTheme
        }`}
      >
        <rect
          x="0.8"
          y="0.8"
          width="42.4"
          height="24.4"
          rx="12.2"
          fill="var(--bg-color4)"
          stroke="#7D54F1"
          strokeWidth="1.6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34 6H32.4V12.4L25.2 12.4V6H23.6V9.89829C22.403 7.5828 19.9863 6.00005 17.2 6.00005C13.2235 6.00005 10 9.2236 10 13.2C10 17.1765 13.2235 20.4 17.2 20.4C19.8322 20.4 22.1345 18.9876 23.3903 16.8792C23.4638 16.7557 23.5338 16.6299 23.6 16.5018V20.4H25.2V14L32.4 14V20.4H34V6ZM17.2 7.60005C20.0212 7.60005 22.3551 9.68619 22.7433 12.4H18V14H22.7433C22.6403 14.7199 22.4004 15.3957 22.0508 16C21.0826 17.6739 19.2728 18.8 17.2 18.8C14.1072 18.8 11.6 16.2928 11.6 13.2C11.6 10.1073 14.1072 7.60005 17.2 7.60005Z"
          fill="#7D54F1"
        />
        <path d="M18 12.4V6H23.6V12.4H18Z" fill="var(--bg-color4)" />
      </svg>
      <div className={styles.title}>Good Dev Hunting</div>
    </>
  );

  if (withLink) {
    return (
      <Link href={AppRoutes.home} className={styles.logo}>
        {logoContent}
      </Link>
    );
  }

  return <div className={styles.logo}>{logoContent}</div>;
};
