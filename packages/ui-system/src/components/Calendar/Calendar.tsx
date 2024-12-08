'use client'
import React, { useState } from 'react';
import styles from './Calendar.module.css';
import { Button } from '../Button/Button';

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  availableDays?: Date[]
}

export function Calendar({ value, onChange, availableDays }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value || new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);    
    setCurrentDate(newDate)
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = availableDays?.some(
        (day) =>
          day.getDate() === i &&
          day.getMonth() === currentDate.getMonth() &&
          day.getFullYear() === currentDate.getFullYear()
      );
      days.push(
        <div
          key={i}
          className={`${styles.day} ${isSelected ? styles.selected : ''}`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <Button variant='primary' onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
          &lt;
        </Button>
        <span>{currentDate.toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</span>
        <Button variant='primary' onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
          &gt;
        </Button>
      </div>
      <div className={styles.dayNames}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className={styles.days}>
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {renderDays()}
      </div>
    </div>
  );
}

