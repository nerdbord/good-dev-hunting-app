import LoginBtn from './LoginBtn'
import styles from './LoginBtn.module.scss'

const LoginBtnsWrapper = () => {
  return (
    <div className={styles.wrapper}>
      <LoginBtn variant="secondary">Login</LoginBtn>
    </div>
  )
}

export default LoginBtnsWrapper
