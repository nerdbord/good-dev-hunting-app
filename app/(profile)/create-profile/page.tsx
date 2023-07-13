'use client'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import PersonalInfo from '@/components/CreateProfile/PersonalInfo/PersonalInfo'
import LocationPreferences from '@/components/CreateProfile/LocationPreferences/LocationPreferences'
import CreateProfileHeader from '@/components/CreateProfile/CreateProfileHeader/CreateProfileHeader'
import WorkInformation from '@/components/CreateProfile/WorkInformation/WorkInformation'
import { Formik, Form } from 'formik'
import { useFormikInitialization } from '@/services/formService'
const CreateProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }


  const formik = useFormikInitialization()

  return (
    <Formik {...formik}>
      <Form>
        <div className={styles.wrapper}>
          <CreateProfileHeader />
          <div className={styles.formBox}>
            <PersonalInfo />
            <LocationPreferences />
            <WorkInformation />
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default CreateProfilePage