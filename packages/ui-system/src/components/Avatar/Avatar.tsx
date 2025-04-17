import Image, { type StaticImageData } from "next/image";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  src: string | StaticImageData | null;
  alt?: string;
  size?: number;
}

export const Avatar = ({ src, size = 50, alt }: AvatarProps) => {
  return (
    <div
      className={styles.avatarWrapper}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    >
      {src && (
        <Image
          src={src}
          alt={alt || "User Avatar"}
          width={size}
          height={size}
          className={styles.avatar}
        />
      )}
    </div>
  );
};
