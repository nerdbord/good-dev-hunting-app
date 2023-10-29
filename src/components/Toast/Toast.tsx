'use client'
import { useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './toast.module.scss'
import { ToastStatus, useToast } from '@/contexts/ToastContext'

const cx = classNames.bind(styles)

export default function Toast() {
  const { message, toastStatus, setToast } = useToast()

  useEffect(() => {
    if (toastStatus === ToastStatus.HIDDEN) return
    const showTimeout = setTimeout(() => {
      setToast(ToastStatus.HIDDEN, '')
    }, 5000)
    return () => {
      clearTimeout(showTimeout)
    }
  }, [toastStatus])

  return (
    <div
      className={cx('toast', {
        [styles.success]: toastStatus === ToastStatus.SUCCESS,
        [styles.invalid]: toastStatus === ToastStatus.INVALID,
      })}
    >
      <span>{message}</span>
    </div>
  )
}
