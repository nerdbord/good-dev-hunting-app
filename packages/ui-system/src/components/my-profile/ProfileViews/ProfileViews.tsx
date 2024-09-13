import { ViewIcon } from "@gdh/ui-system/icons";

import styles from "./ProfileViews.module.scss";

export const ProfileViews = ({
  viewCount,
  children,
}: {
  viewCount: number;
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.profileViewsContainer}>
      <div className={styles.profileViews}>
        <ViewIcon />
        {children} <span>{viewCount}</span>
      </div>
    </div>
  );
};
