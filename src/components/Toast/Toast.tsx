'use client'
import { ToastStatus, type ToastType } from '@/contexts/ToastContext'
import classNames from 'classnames/bind'
import { useEffect } from 'react'
import styles from './toast.module.scss'

const cx = classNames.bind(styles)

export default function Toast({
  id,
  message,
  toastStatus,
  onRemove,
}: ToastType) {
  useEffect(() => {
    if (toastStatus === ToastStatus.HIDDEN) return
    const showTimeout = setTimeout(() => {
      onRemove()
    }, 4000)
    return () => {
      clearTimeout(showTimeout)
    }
  }, [])

  return (
    <div
      key={id}
      className={cx('toast', {
        [styles.success]: toastStatus === ToastStatus.SUCCESS,
        [styles.invalid]: toastStatus === ToastStatus.INVALID,
      })}
    >
      <span>{message}</span>
    </div>
  )
}
