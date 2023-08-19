'use client'
import React, { PropsWithChildren } from 'react'
import { Formik } from 'formik'
import {
  initialValues,
  validationSchema,
  useEditFormInitialization,
} from '@/services/edit-profile-form-service'

const EditProfileFormWrapper = ({ children }: PropsWithChildren) => {
  const { onSubmit } = useEditFormInitialization()

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

export default EditProfileFormWrapper
