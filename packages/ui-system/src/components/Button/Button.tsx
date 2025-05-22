"use client";
import classNames from "classnames/bind";
import React, { type PropsWithChildren } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant:
    | "primary"
    | "secondary"
    | "tertiary"
    | "action"
    | "logout"
    | "standard"
    | "grayedOut"
    | "allpurple";
  type?: "button" | "submit";
  disabled?: boolean;
  loading?: boolean;
  dataTestId?: string;
}

export const Button = ({
  onClick,
  children,
  variant,
  disabled,
  loading,
  dataTestId,
  type = "button",
}: PropsWithChildren<ButtonProps>) => {
  const cx = classNames.bind(styles);
  const buttonClasses = cx({
    [variant]: true,
    [styles.disabled]: disabled || loading,
  });

  return (
    <button
      data-testid={dataTestId}
      className={`${buttonClasses}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
