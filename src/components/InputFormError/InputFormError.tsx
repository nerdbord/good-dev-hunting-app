import React, { ReactNode } from 'react'
import styles from './InputFormError.module.scss'
interface InputWrapperProps {
  error: string | string[] | undefined
  children: ReactNode
  touched?: boolean
}

const InputFormError = ({ error, children, touched }: InputWrapperProps) => {
  return (
    <div className={error && touched ? styles.errorMsg : ''}>
      {children}
      {error && touched && <p>{error}</p>}
    </div>
  )
}

export default InputFormError
