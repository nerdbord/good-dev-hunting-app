'use client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import classNames from 'classnames'
import styles from './TechnologiesRenderer.module.scss'

type Props = {
  techStack: { name: string }[]
  color: { color: string }
}

const cx = classNames.bind(styles)

export default function TechnologiesRenderer({ techStack, color }: Props) {
  const isMobile = useMediaQuery()

  const getTechnologyClasses = cx({
    [styles.technology]: true,
  })

  const renderTechnologies = () => {
    const sliceCount = isMobile ? 2 : 3

    if (techStack.length <= sliceCount) {
      return techStack.map((tech, index) => (
        <span key={index}>{tech.name}</span>
      ))
    } else {
      const displayedTechnologies = techStack.slice(0, sliceCount)
      const othersCount = techStack.length - sliceCount
      return (
        <>
          {displayedTechnologies.map((tech, index) => (
            <span key={index}>{tech.name}</span>
          ))}
          <span
            style={{ whiteSpace: 'nowrap' }}
          >{`+ ${othersCount} Others`}</span>
        </>
      )
    }
  }

  return (
    <div className={getTechnologyClasses} style={color}>
      {renderTechnologies()}
    </div>
  )
}
