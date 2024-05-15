'use client'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { jobSpecializationThemes } from '@/app/[locale]/(profile)/profile.helpers'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useMemo } from 'react'

type Props = {
  data: ProfileModel
  classes?: string
}

export default function TechnologiesRenderer({ data, classes }: Props) {
  const isMobile = useMediaQuery()
  const specializationTheme = useMemo(
    () => ({
      color: jobSpecializationThemes[data.position],
    }),
    [data.position],
  )
  const renderTechnologies = () => {
    const sliceCount = isMobile ? 2 : 3

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
