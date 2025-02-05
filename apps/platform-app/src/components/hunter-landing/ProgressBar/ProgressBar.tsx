import styles from './ProgressBar.module.scss'

type ProgressBarProps = {
  children: React.ReactNode
  currentStep: number
  maxSteps: number
}

const ProgressBar = ({ children, currentStep, maxSteps }: ProgressBarProps) => {
  const progress =
    currentStep <= maxSteps ? (currentStep / maxSteps) * 100 : 100

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  )
}

export { ProgressBar }
