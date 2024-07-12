"use client";
import classNames from "classnames/bind";
import { useState, type ReactNode } from "react";
import styles from "./Accordion.module.scss";
import AccordionIcon from "./icons/AccordionIcon";
const cx = classNames.bind(styles);

export enum AccordionIconType {
  Add = "add",
  Subtract = "subtract",
}

interface AccordionProps {
  title: string;
  children: ReactNode;
}

export const Accordion = (props: AccordionProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleOpen = () => {
    setAccordionOpen((prevOpen) => !prevOpen);
  };

  const getContentClasses = cx({
    [styles.accordionContent]: true,
    [styles.isOpen]: accordionOpen,
  });

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper} onClick={handleOpen}>
        <p>{props.title}</p>
        <div className={styles.iconWrapper}>
          <AccordionIcon
            type={
              accordionOpen ? AccordionIconType.Subtract : AccordionIconType.Add
            }
          />
        </div>
      </div>
      <div className={getContentClasses}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </section>
  );
};
