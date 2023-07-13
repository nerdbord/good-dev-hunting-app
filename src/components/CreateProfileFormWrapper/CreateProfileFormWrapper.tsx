'use client'
import React, { PropsWithChildren } from 'react'
import { Formik } from 'formik'
// import { useFormikInitialization } from '@/services/formService'
import { initialValues, validationSchema } from '@/services/formService'
const CreateProfileFormWrapper =  ({children}: PropsWithChildren)  => {

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={() => console.log('a')}>{children}</Formik>
  )
}

export default CreateProfileFormWrapper