import Image, { type StaticImageData } from 'next/image'
import styles from './Avatar.module.scss'

interface AvatarProps {
  src: string | StaticImageData
  size?: number
}

export const Avatar = ({ src, size = 50 }: AvatarProps) => {
  return (
    <div
      className={styles.avatarWrapper}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    >
      <Image
        src={src}
        alt="User Avatar"
        width={size}
        height={size}
        objectFit="cover"
        className={styles.avatar}
      />
    </div>
  )
}
