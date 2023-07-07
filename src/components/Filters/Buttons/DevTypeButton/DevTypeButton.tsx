'use client'
import React, { PropsWithChildren } from 'react'
import styles from './DevTypeButton.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface DevTypeButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant: 'frontend' | 'backend' | 'fullstack'
}

export const DevTypeButton = ({
  onClick,
  children,
  variant,
}: PropsWithChildren<DevTypeButtonProps>) => {

    const getDevTypeButtonClasses = cx({
        [styles.default]: true,
        [variant]: true,
     });


  return (
    <button className={getDevTypeButtonClasses} onClick={onClick}>
      {children}
    </button>
  )
}
