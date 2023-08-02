'use client'
import React, { PropsWithChildren } from 'react'
import { Formik } from 'formik'
import {
  initialValues,
  validationSchema,
  useFormikInitialization,
} from '@/services/create-profile-form-service'

const CreateProfileFormWrapper = ({ children }: PropsWithChildren) => {
  const { onSubmit } = useFormikInitialization()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {children}
    </Formik>
  )
}

export default CreateProfileFormWrapper