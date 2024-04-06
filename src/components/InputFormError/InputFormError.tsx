import { type ReactNode } from 'react'
import styles from './InputFormError.module.scss'

interface InputWrapperProps {
  error: string | boolean | undefined | string[]
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
