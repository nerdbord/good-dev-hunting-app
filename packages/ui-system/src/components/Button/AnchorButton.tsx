import { type PropsWithChildren } from "react";

import Link from "next/link";
import styles from "./AnchorButton.module.scss";
import { ensureProtocol } from "@/utils/routes";

interface AnchorButton {
  href: string;
  icon?: React.ReactElement;
}


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
