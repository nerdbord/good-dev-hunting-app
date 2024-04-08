'use client'
import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { updateUserAvatar } from '@/app/(auth)/_actions/updateUserAvatar'
import { uploadImage } from '@/app/(files)/_actions/uploadImage'
import { createProfile } from '@/app/(profile)/_actions/createProfile'
import CreateProfileTopBar from '@/app/(profile)/my-profile/(components)/CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '@/app/(profile)/my-profile/(components)/CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '@/app/(profile)/my-profile/(components)/CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '@/app/(profile)/my-profile/(components)/CreateProfile/WorkInformation/WorkInformation'
import styles from '@/app/(profile)/my-profile/create/page.module.scss'
import {
  type CreateProfileFormValues,
  type JobSpecialization,
  type ProfilePayload,
} from '@/app/(profile)/types'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { AppRoutes } from '@/utils/routes'
import { PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import TermsOfUse from '../CreateProfile/TermsOfUse/TermsOfUse'

const initialValues: CreateProfileFormValues = {
  fullName: '',
  linkedin: '',
  bio: '',
  country: '',
  city: '',
  openForCountryRelocation: false,
  openForCityRelocation: false,
  remoteOnly: false,
  position: { name: '', value: '' },
  seniority: { name: '', value: '' },
  employment: [],
  techStack: [],
  githubUsername: '',
  state: PublishingState.DRAFT,
  terms: false,
  viewCount: 0,
}

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  position: Yup.object({
    value: Yup.string().required('Position is required'),
  }),
  seniority: Yup.object({
    value: Yup.string().required('Seniority is required'),
  }),
  techStack: Yup.array()
    .of(
      Yup.object({
        name: Yup.string(),
        value: Yup.string(),
      }),
    )
    .min(1, 'Tech stack is required'),
  linkedin: Yup.string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/(.*)$/,
      'Invalid LinkedIn URL',
    ),
  terms: Yup.boolean()
    .required('Agreement is required')
    .oneOf([true], 'Agreement is required'),
})

const CreateProfileForm = () => {
  const { data: session, update } = useSession()
  const { runAsync, loading: isCreatingProfile } = useAsyncAction()
  const router = useRouter()
  const { formDataWithFile } = useUploadContext()
  const { addToast } = useToast()
  if (!session) {
    return null
  }

  const handleCreateProfile = async (values: CreateProfileFormValues) => {
    if (!values.terms) {
      addToast(
        'You have to agree to our Terms of use and Privacy Policy in order to continue.',
        ToastStatus.INVALID,
      )
    }
    const payload: ProfilePayload = {
      fullName: values.fullName,
      avatarUrl: session.user.image || null,
      linkedIn: values.linkedin,
      bio: values.bio,
      country: {
        name: values.country,
      },
      openForCountryRelocation: values.openForCountryRelocation,
      city: {
        name: values.city,
      },
      isOpenForWork: true,
      openForCityRelocation: values.openForCityRelocation,
      remoteOnly: values.remoteOnly,
      position: values.position.value as JobSpecialization,
      seniority: values.seniority.value,
      techStack: values.techStack.map((tech) => ({
        name: tech.value,
      })),
      employmentTypes: values.employment,
      githubUsername: session.user.name,
      state: PublishingState.DRAFT,
      viewCount: values.viewCount,
    }

    try {
      runAsync(async () => {
        const uploadedFileUrl = formDataWithFile
          ? await uploadImage(formDataWithFile)
          : null

        uploadedFileUrl && (await updateUserAvatar(uploadedFileUrl))

        await createProfile(payload)
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
      enableReinitialize
      validateOnMount
      onSubmit={handleCreateProfile}
    >
      <div className={styles.wrapper}>
        <CreateProfileTopBar isSubmitting={isCreatingProfile} />
        <div className={styles.formBox}>
          <PersonalInfo />
          <LocationPreferences />
          <WorkInformation />
          <TermsOfUse />
        </div>
        <LogOutBtn />
      </div>
    </Formik>
  )
}

export default CreateProfileForm
