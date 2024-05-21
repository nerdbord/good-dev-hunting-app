import { type ReactNode } from 'react';
import styles from './Box.module.scss';

export const Box = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.box}>
      <div className={styles.boxContent}>{children}</div>
    </section>
  );
};
