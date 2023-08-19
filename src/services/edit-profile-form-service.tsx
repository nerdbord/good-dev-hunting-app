'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSession } from 'next-auth/react'
import { CreateProfilePayload } from '@/backend/profile/profile.types'
import { EmploymentType } from '@/utils/constants'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import { updateMyProfile } from '@/lib/apiClient'
import { useState, useEffect } from 'react'
import { getUserProfile } from '@/lib/apiClient'

export const useProfile = () => {
  const { data: session } = useSession()
  const [fetchedProfile, setFetchedProfile] = useState(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log(fetchedProfile)
  if (!session) {
    redirect(AppRoutes.home)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true)
      try {
        const profile = await getUserProfile()
        if (profile) {
          setFetchedProfile(profile)
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  return {
    fetchedProfile,
    isLoading,
  }
}

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
  //employment: Yup.array().of(Yup.string().oneOf(['FULL_TIME', 'PART_TIME', 'CONTRACT'])).min(1, 'Employment type is required'),
})

export const useEditFormInitialization = (
  initialState: FormValues = initialValues,
) => {
  const { data: session } = useSession()

  if (!session) {
    redirect(AppRoutes.home)
  }
  useProfile()

  const onSubmit = async (values: FormValues) => {
    const payload: CreateProfilePayload = {
      userId: session.user.id,
      fullName: values.fullName,
      avatarUrl: session?.user.image || null,
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
    try {
      await updateMyProfile(payload)
      console.log('Profile edited successfully')
    } catch (error) {
      console.log(error)
    }
  }
  const formik = useFormik<FormValues>({
    initialValues: initialState,
    validationSchema,
    onSubmit,
  })
  return {
    formik,
    onSubmit,
  }
}
