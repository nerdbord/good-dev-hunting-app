'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export interface FormValues {
  fullName: string
  contactEmail: string
  linkedin: string
  bio: string
  country: string
  city: string
  openToRelocationCountry: boolean
  openToRelocationCity: boolean
  remoteOnly: boolean
  position: string
  seniority: string
  employment: string[]
  techStack: string
  
}

export const initialValues: FormValues = {
  fullName: '',
  contactEmail: '',
  linkedin: '',
  bio: '',
  country: '',
  city: '',
  openToRelocationCountry: false,
  openToRelocationCity: false,
  remoteOnly: false,
  position: '',
  seniority: '',
  employment: [],
  techStack: '',
}

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  contactEmail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  bio: Yup.string().required('Bio is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  openToRelocationCountry: Yup.boolean().oneOf([true, false]),
  remoteOnly: Yup.boolean().oneOf([true], 'This field must be checked'),
  position: Yup.string().required('Position is required'),
  seniority: Yup.string().required('Seniority is required'),
  techStack: Yup.string().required('Tech stack is required'),
  employment: Yup.array().of(Yup.string()).min(1, 'Employment is required'),
})

export const useFormikInitialization = () => {
  return useFormik<FormValues>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })
}
