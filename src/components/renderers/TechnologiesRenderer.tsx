import { ProfileModel } from '@/data/frontend/profile/types'

type Props = {
  data: ProfileModel
  classes: string
}

export default function TechnologiesRenderer({ data, classes }: Props) {
  const renderTechnologies = () => {
    const sliceCount = window.innerWidth <= 768 ? 2 : 3

    if (data.techStack.length <= sliceCount) {
      return data.techStack.map((tech, index) => (
        <span key={index}>{tech}</span>
      ))
    } else {
      const displayedTechnologies = data.techStack.slice(0, sliceCount)
      const othersCount = data.techStack.length - sliceCount
      return (
        <>
          {displayedTechnologies.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
          <span>{`+ ${othersCount} Others`}</span>
        </>
      )
    }
  }

  return <div className={classes}>{renderTechnologies()}</div>
}
