'use client'
import React, { useState } from 'react';
import styles from './Select.module.css';

interface SelectProps {
  children: React.ReactNode;
  onValueChange?: (value: string) => void;
}


interface SelectChildProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedValue: string;
    handleSelect: (value: string) => void;
  }
  

export function Select({ children, onValueChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.select}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<SelectChildProps>(child)) {
          return React.cloneElement(child, {
            isOpen,
            setIsOpen,
            selectedValue,
            handleSelect,
          });
        }
        return child;
      })}
    </div>
  );
}

interface SelectTriggerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

export function SelectTrigger({ children, isOpen, setIsOpen }: SelectTriggerProps) {
  return (
    <div className={styles.trigger} onClick={() => setIsOpen?.(true)}>
      {children}
      <span>{isOpen ? '▲' : '▼'}</span>
    </div>
  );
}

interface SelectContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

export function SelectContent({ children, isOpen }: SelectContentProps) {
  return isOpen ? (
    <div className={styles.content} data-show={isOpen}>
      {children}
    </div>
  ) : <></>;
}

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  handleSelect?: (value: string) => void;
}

export function SelectItem({ children, value, handleSelect }: SelectItemProps) {
  return (
    <div className={styles.item} onClick={() => handleSelect?.(value)}>
      {children}
    </div>
  );
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <span>{placeholder}</span>;
}

