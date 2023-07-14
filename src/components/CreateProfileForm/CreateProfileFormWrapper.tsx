'use client'
import React, { PropsWithChildren } from 'react'
import { Formik } from 'formik'
import {
  initialValues,
  validationSchema,
} from '@/services/createProfileFormService'

const CreateProfileFormWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={() => console.log('a')}
    >
      {children}
    </Formik>
  )
}

export default CreateProfileFormWrapper
