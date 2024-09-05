import { type PropsWithChildren } from "react";

import Link from "next/link";
import styles from "./AnchorButton.module.scss";

interface AnchorButton {
  href: string;
  icon?: React.ReactElement;
}

const ensureProtocol = (url: string) => {
  // Check if the URL starts with "http://" or "https://"
  if (/^(https?:\/\/)/i.test(url)) {
    return url; // Return the URL as it is if it has a protocol
  }
  return `https://${url}`; // Prepend https:// if no protocol is present
};

export const AnchorButton = (props: PropsWithChildren<AnchorButton>) => {
  return (
    <Link
      className={styles.socialItem}
      href={ensureProtocol(props.href)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
      {props.icon}
    </Link>
  );
};
