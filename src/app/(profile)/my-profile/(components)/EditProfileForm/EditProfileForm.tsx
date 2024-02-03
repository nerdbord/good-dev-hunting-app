'use client'
import { mapProfileModelToEditProfileFormValues } from '@/app/(profile)/my-profile/(components)/EditProfileForm/mappers'
import { EditProfilePayload, ProfileModel } from '@/app/(profile)/types'
import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { EmploymentType, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren } from 'react'

import { serverUpdateUserAvatar } from '@/app/(auth)/_actions/updateUserAvatar'
import { uploadImage } from '@/app/(auth)/_actions/uploadImage'
import { updateMyProfile } from '@/app/(profile)/_actions/updateMyProfile'
import CreateProfileTopBar from '@/app/(profile)/my-profile/(components)/CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '@/app/(profile)/my-profile/(components)/CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '@/app/(profile)/my-profile/(components)/CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '@/app/(profile)/my-profile/(components)/CreateProfile/WorkInformation/WorkInformation'
import styles from '@/app/(profile)/my-profile/edit/page.module.scss'
import { AppRoutes } from '@/utils/routes'
import * as Yup from 'yup'

export interface EditProfileFormValues {
  fullName: string
  linkedin: string | null
  bio: string
  country: string
  city: string
  openForCountryRelocation: boolean
  openForCityRelocation: boolean
  remoteOnly: boolean
  position: DropdownOption
  seniority: DropdownOption
  employment: EmploymentType[]
  techStack: DropdownOption[]
  githubUsername: string | null
  state: PublishingState
}

export const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  bio: Yup.string().required('Bio is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  openToRelocationCountry: Yup.boolean().oneOf([true, false]),
  remoteOnly: Yup.boolean().oneOf([true, false], 'This field must be checked'),
  position: Yup.object({
    name: Yup.string(),
    value: Yup.string(),
  }).required('Position is required'),
  seniority: Yup.object({
    name: Yup.string(),
    value: Yup.string(),
  }).required('Seniority is required'),
  techStack: Yup.array()
    .of(Yup.object({ name: Yup.string(), value: Yup.string() }))
    .min(1, 'At least one technology is required')
    .max(8, 'Max 8 technologies'),
  linkedin: Yup.string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/(.*)$/,
      'Invalid LinkedIn URL',
    ),
})

interface EditProfileFormWrapperProps {
  profile: ProfileModel
}

const EditProfileForm = ({
  profile,
}: PropsWithChildren<EditProfileFormWrapperProps>) => {
  const { data: session } = useSession()
  const { runAsync, loading: isSubmitting } = useAsyncAction()
  const router = useRouter()
  const { formDataWithFile } = useUploadContext()

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
      },
      openForCountryRelocation: values.openForCountryRelocation,
      city: {
        name: values.city,
      },
      openForCityRelocation: values.openForCityRelocation,
      isOpenForWork: true,
      remoteOnly: values.remoteOnly,
      position: values.position.value,
      seniority: values.seniority.value,
      techStack: values.techStack.map((tech) => ({
        techName: tech.value,
      })),
      employmentTypes: values.employment,
      githubUsername: session.user.name,
      state: PublishingState.PENDING,
    }

    await runAsync(async () => {
      const uploadedFileUrl = formDataWithFile
        ? await uploadImage(formDataWithFile)
        : null

      uploadedFileUrl && (await serverUpdateUserAvatar(uploadedFileUrl))
      await updateMyProfile(payload)
      router.push(AppRoutes.myProfile)
    })
  }

  const mappedInitialValues: EditProfileFormValues =
    mapProfileModelToEditProfileFormValues(profile)

  return (
    <Formik
      initialValues={mappedInitialValues}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={handleEditProfile}
      validateOnMount
    >
      <div className={styles.wrapper}>
        <CreateProfileTopBar isSubmitting={isSubmitting} />
        <div className={styles.formBox}>
          <PersonalInfo />
          <LocationPreferences />
          <WorkInformation />
        </div>
      </div>
    </Formik>
  )
}

export default EditProfileForm
