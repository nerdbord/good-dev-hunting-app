import LoginBtn from './LoginBtn'
import styles from './LoginBtn.module.scss'

const LoginBtnsWrapper = () => {
  return (
    <div className={styles.wrapper}>
      <LoginBtn variant="secondary">Login</LoginBtn>
      {/* <div className={styles.btnSeparator}></div> */}
      {/* <LoginBtn variant="secondary">Join as Hunter</LoginBtn> */}
    </div>
  )
}

export default LoginBtnsWrapper
