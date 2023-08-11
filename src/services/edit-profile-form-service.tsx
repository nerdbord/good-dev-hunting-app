'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSession } from 'next-auth/react'
import { ProfilePayload } from '@/backend/profile/profile.types'
import { EmploymentType } from '@/utils/constants'
/* import { getUserProfile } from '@/lib/apiClient' */

/* const profile = getUserProfile() */

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
  employment: EmploymentType
  techStack: string
  isPublished: boolean
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
  employment: EmploymentType.FULL_TIME,
  techStack: '',
  isPublished: false,
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
  remoteOnly: Yup.boolean().oneOf([true, false], 'This field must be checked'),
  position: Yup.string().required('Position is required'),
  seniority: Yup.string().required('Seniority is required'),
  techStack: Yup.string().required('Tech stack is required'),
})

export const useFormikInitialization = () => {
  const { data: session } = useSession()

  const onSubmit = async (values: FormValues) => {
    const payload: ProfilePayload = {
      id: session?.user.id,
      fullName: values.fullName,
      email: session?.user.email || null,
      linkedIn: values.linkedin,
      bio: values.bio,
      country: {
        name: values.country,
        openForRelocation: values.openToRelocationCountry,
      },
      city: {
        name: values.city,
        openForRelocation: values.openToRelocationCity,
      },
      remoteOnly: values.remoteOnly,
      position: values.position,
      seniority: values.seniority,
      techStack: values.techStack.split(',').map((s) => s.trim()),
      employmentType: values.employment,
      isPublished: values.isPublished,
    }

    const response = await fetch('/api/profiles/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      console.log('Profile created successfully')
    } else {
      console.log('Failed to create profile.')
      const errorData = await response.json()
      console.log('Error details:', errorData)
    }
  }

  return {
    formik: useFormik<FormValues>({
      initialValues,
      validationSchema,
      onSubmit,
    }),
    onSubmit,
  }
}
