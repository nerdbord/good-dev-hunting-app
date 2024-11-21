import styles from "./Loader.module.scss";

export const Loader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loading}>
        <p>
          {children} <span className={styles.dot1}>.</span>
          <span className={styles.dot2}>.</span>
          <span className={styles.dot3}>.</span>
        </p>
      </div>
    </div>
  );
};
