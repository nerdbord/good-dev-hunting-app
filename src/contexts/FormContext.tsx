'use client'
import React, { createContext, useContext } from 'react'
import { useFormik } from 'formik'
import { validate } from '../validation/FormValidation'

const initialValues = {
  fullName: '',
  contactEmail: '',
  linkedin: '',
  bio: '',
  country: '',
  city: '',
  openToRelocationCountry: false,
  openToRelocationCity: false,
  remoteOnly: false,
  position: [],
  seniority: [],
  employment: [],
  techStack: '',
}

const FormContext = createContext<ReturnType<typeof useFormik> | null>(null)

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values)
    },
    validate,
  })

  return <FormContext.Provider value={formik}>{children}</FormContext.Provider>
}

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }

  return context;
};