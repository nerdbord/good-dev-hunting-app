'use client'
import { CreateJobDetailsForm } from '@/app/[locale]/(jobs)/(components)/CreateJobDetailsForm/CreateJobDetailsForm'
import { mockJobDetails } from '@/app/[locale]/(jobs)/mockData'
import styles from './page.module.scss'

export default function EditJobDetailsPage() {
  return (
    <div className={styles.container}>
      <CreateJobDetailsForm initialValues={mockJobDetails} />
    </div>
  )
} 