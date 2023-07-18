import React, { ReactNode } from 'react'
import styles from '../../../app/(profile)/create-profile/page.module.scss'
interface InputWrapperProps {
  error: string | string[] | undefined
  children: ReactNode
}

const InputFormError = ({ error, children }: InputWrapperProps) => {
  return (
    <div className={error ? styles.errorMsg : ''}>
      {children}
      {error && <p>{error}</p>}
    </div>
  )
}

export default InputFormError
