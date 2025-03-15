import Image from 'next/image'
import styles from './TechIcon.module.scss'

export interface TechIconProps {
  src: string
  alt: string
  className?: string
  style?: React.CSSProperties
}

export const TechIcon = ({ src, alt, className, style }: TechIconProps) => {
  return (
    <div className={`${styles.icon} ${className || ''}`} style={style}>
      <div className={styles.gradientOuter}>
        <div className={styles.gradientInner}>
          <div className={styles.backgroundShadow}>
            <Image
              src={src}
              alt={alt}
              width={48}
              height={65}
              className={styles.techImage}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 