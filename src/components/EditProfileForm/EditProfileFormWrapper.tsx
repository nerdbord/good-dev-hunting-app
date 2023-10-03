'use client'
import React, { PropsWithChildren } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { EditProfilePayload, ProfileModel } from '@/data/frontend/profile/types'
import { apiClient } from '@/lib/apiClient'
import { useSession } from 'next-auth/react'
import { EmploymentType } from '@prisma/client'
import { mapProfileModelToEditProfileFormValues } from '@/components/EditProfileForm/mappers'

export interface EditProfileFormValues {
  fullName: string
  linkedin: string | null
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

export const initialValues: EditProfileFormValues = {
  fullName: '',
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
  bio: Yup.string().required('Bio is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  openToRelocationCountry: Yup.boolean().oneOf([true, false]),
  remoteOnly: Yup.boolean().oneOf([true, false], 'This field must be checked'),
  position: Yup.string().required('Position is required'),
  seniority: Yup.string().required('Seniority is required'),
  techStack: Yup.string().required('Tech stack is required'),
})

interface EditProfileFormWrapperProps {
  profile: ProfileModel
}

const EditProfileFormWrapper = ({
  children,
  profile,
}: PropsWithChildren<EditProfileFormWrapperProps>) => {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  const handleEditProfile = async (values: EditProfileFormValues) => {
    const payload: EditProfilePayload = {
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
      techStack: values.techStack.split(',').map((s) => s.trim()),
      employmentType: values.employment,
      isPublished: values.isPublished,
    }
    try {
      console.log(payload)
      await apiClient.updateMyProfile(payload)
      console.log('Profile edited successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const mappedInitialValues: EditProfileFormValues =
    mapProfileModelToEditProfileFormValues(profile)

  return (
    <Formik
      initialValues={mappedInitialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleEditProfile}
    >
      {children}
    </Formik>
  )
}

export default EditProfileFormWrapper
