import styles from "./VisitorBanner.module.scss";

export const VisitorBanner = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.wrapper}>
      <span>{children} </span>
    </div>
  );
};
