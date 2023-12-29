'use client'
import React, { PropsWithChildren } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { CreateProfilePayload } from '@/data/frontend/profile/types'
import { apiClient } from '@/lib/apiClient'
import { useSession } from 'next-auth/react'
import { EmploymentType, PublishingState } from '@prisma/client'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'

export interface CreateProfileFormValues {
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
  techStack: string[]
  githubUsername: string | null
  state: PublishingState
}

const initialValues: CreateProfileFormValues = {
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
  techStack: [],
  githubUsername: '',
  state: PublishingState.DRAFT,
}

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  openToRelocationCountry: Yup.boolean().oneOf([true, false]),
  remoteOnly: Yup.boolean().oneOf([true, false], 'This field must be checked'),
  position: Yup.string().required('Position is required'),
  seniority: Yup.string().required('Seniority is required'),
  techStack: Yup.array().of(Yup.string()).required('Tech stack is required'),
  linkedin: Yup.string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/(.*)$/,
      'Invalid LinkedIn URL',
    ),
})

const CreateProfileFormWrapper = ({ children }: PropsWithChildren) => {
  const { data: session } = useSession()
  const { runAsync } = useAsyncAction()
  const router = useRouter()

  if (!session) {
    return null
  }

  const handleCreateProfile = async (values: CreateProfileFormValues) => {
    const payload: CreateProfilePayload = {
      userId: session.user.id,
      fullName: values.fullName,
      avatarUrl: session.user.image || null,
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
      techStack: values.techStack,
      employmentType: values.employment,
      githubUsername: session.user.name,
      state: PublishingState.DRAFT,
    }

    try {
      runAsync(async () => {
        await apiClient.createMyProfile(payload)
        router.push(AppRoutes.myProfile)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleCreateProfile}
    >
      {children}
    </Formik>
  )
}

export default CreateProfileFormWrapper
