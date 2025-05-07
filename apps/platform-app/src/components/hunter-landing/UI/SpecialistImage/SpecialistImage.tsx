import Image from 'next/image'
import React from 'react'
import specialistImage from './Specialist.png'

interface SpecialistImageProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export const SpecialistImage: React.FC<SpecialistImageProps> = ({
  width = 400,
  height = 435,
  className,
  alt = 'Specialist background',
}) => {
  return (
    <div className={className}>
      <Image src={specialistImage} width={width} height={height} alt={alt} />
    </div>
  )
}

export default SpecialistImage
