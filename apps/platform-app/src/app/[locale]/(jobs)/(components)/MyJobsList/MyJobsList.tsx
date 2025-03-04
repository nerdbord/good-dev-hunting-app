import type { JobPublishingState } from '../../(routes)/jobs/my-jobs/mockData'
import { MyJobCard } from '../MyJobCard/MyJobCard'
import styles from './MyJobsList.module.scss'

interface MyJobsListProps {
  jobs: {
    name: string
    PublishingState: JobPublishingState
    createdDate: string
    id?: string
  }[]
}

export const MyJobsList = ({ jobs }: MyJobsListProps) => {
  return (
    <div className={styles.myJobsList}>
      {jobs.map((job, i) => (
        <MyJobCard
          job={job}
          key={job?.id || i} //TODO: remove "i" from key
        />
      ))}
    </div>
  )
}
