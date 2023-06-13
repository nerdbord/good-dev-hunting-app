import React, { PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    variant: 'primary' | 'secondary';
}

export const Button = ({
                           onClick,
                           children,
                           variant,
                       }: PropsWithChildren<ButtonProps>) => {
    const buttonClassName =
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary;

    return (
        <button className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    );
};