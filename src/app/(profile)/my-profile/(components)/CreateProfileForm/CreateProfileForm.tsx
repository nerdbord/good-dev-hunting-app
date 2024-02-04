'use client'
import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { serverUpdateUserAvatar } from '@/app/(auth)/_actions/updateUserAvatar'
import { uploadImage } from '@/app/(files)/_actions/uploadImage'
import { createProfile } from '@/app/(profile)/_actions/createProfile'
import CreateProfileTopBar from '@/app/(profile)/my-profile/(components)/CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '@/app/(profile)/my-profile/(components)/CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '@/app/(profile)/my-profile/(components)/CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '@/app/(profile)/my-profile/(components)/CreateProfile/WorkInformation/WorkInformation'
import styles from '@/app/(profile)/my-profile/create/page.module.scss'
import {
  CreateProfileFormValues,
  CreateProfilePayload,
} from '@/app/(profile)/types'
import { initialFilterOption } from '@/contexts/FilterContext'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { AppRoutes } from '@/utils/routes'
import { PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'

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
  position: initialFilterOption,
  seniority: initialFilterOption,
  employment: [],
  techStack: [],
  githubUsername: '',
  state: PublishingState.DRAFT,
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
})

const CreateProfileForm = () => {
  const { data: session } = useSession()
  const { runAsync } = useAsyncAction()
  const router = useRouter()
  const { formDataWithFile } = useUploadContext()

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
      },
      openForCountryRelocation: values.openToRelocationCountry,
      city: {
        name: values.city,
      },
      isOpenForWork: true,
      openForCityRelocation: values.openToRelocationCity,
      remoteOnly: values.remoteOnly,
      position: values.position.value,
      seniority: values.seniority.value,
      techStack: values.techStack.map((tech) => ({
        techName: tech.value,
      })),
      employmentTypes: values.employment,
      githubUsername: session.user.name,
      state: PublishingState.DRAFT,
    }

    try {
      runAsync(async () => {
        const uploadedFileUrl = formDataWithFile
          ? await uploadImage(formDataWithFile)
          : null

        uploadedFileUrl && (await serverUpdateUserAvatar(uploadedFileUrl))

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
        <CreateProfileTopBar />
        <div className={styles.formBox}>
          <PersonalInfo />
          <LocationPreferences />
          <WorkInformation />
        </div>
        <LogOutBtn />
      </div>
    </Formik>
  )
}

export default CreateProfileForm
