'use client'
import { jobSpecializationThemes } from '@/app/(profile)/helpers'
import { ProfileModel } from '@/app/(profile)/types'
import { useMemo } from 'react'

type Props = {
  data: ProfileModel
  classes?: string
}

export default function TechnologiesRenderer({ data, classes }: Props) {
  const specializationTheme = useMemo(
    () => ({
      color: jobSpecializationThemes[data.position],
    }),
    [data.position],
  )
  const renderTechnologies = () => {
    const sliceCount =
      typeof window !== 'undefined' && window.innerWidth <= 768 ? 2 : 3

    if (data.techStack.length <= sliceCount) {
      return data.techStack.map((tech, index) => (
        <span key={index}>{tech.name}</span>
      ))
    } else {
      const displayedTechnologies = data.techStack.slice(0, sliceCount)
      const othersCount = data.techStack.length - sliceCount
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
    <div className={classes} style={specializationTheme}>
      {renderTechnologies()}
    </div>
  )
}
