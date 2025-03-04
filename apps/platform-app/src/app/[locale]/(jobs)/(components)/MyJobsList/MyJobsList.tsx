import type { JobPublishingState } from '../../(routes)/jobs/my-jobs/mockData'
import { MyJobCard } from '../MyJobCard/MyJobCard'
import styles from './myJobsList.module.scss'

interface MyJobsListProps {
  jobs: {
    name: string
    PublishingState: JobPublishingState
    createdDate: string
  }[]
}

export const MyJobsList = ({ jobs }: MyJobsListProps) => {
  return (
    <div className={styles.myJobsList}>
      {jobs.map((job) => (
        <MyJobCard job={job} />
      ))}
    </div>
  )
}
