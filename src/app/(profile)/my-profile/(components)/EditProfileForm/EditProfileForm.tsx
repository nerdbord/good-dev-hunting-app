'use client'
import { updateUserAvatar } from '@/app/(auth)/_actions/updateUserAvatar'
import { saveMyProfile } from '@/app/(profile)/_actions/saveMyProfile'
import { mapProfileModelToEditProfileFormValues } from '@/app/(profile)/my-profile/(components)/EditProfileForm/mappers'
import {
  ProfileFormValues,
  ProfileModel,
  ProfilePayload,
} from '@/app/(profile)/types'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useMemo } from 'react'

import { uploadImage } from '@/app/(files)/_actions/uploadImage'
import { AppRoutes } from '@/utils/routes'
import * as Yup from 'yup'
import CreateProfileTopBar from '../../(components)/CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '../../(components)/CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '../../(components)/CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '../../(components)/CreateProfile/WorkInformation/WorkInformation'
import styles from '../../../my-profile/edit/page.module.scss'

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

  const mappedInitialValues: ProfileFormValues = useMemo(
    () => mapProfileModelToEditProfileFormValues(profile),
    [profile],
  )

  const handleEditProfile = async (values: ProfileFormValues) => {
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
      openForCityRelocation: values.openForCityRelocation,
      isOpenForWork: true,
      remoteOnly: values.remoteOnly,
      position: values.position.value,
      seniority: values.seniority.value,
      techStack: values.techStack.map((tech) => {
        return {
          name: tech.value,
        }
      }),
      employmentTypes: values.employment,
      githubUsername: session.user.name,
      state: PublishingState.PENDING,
    }

    await runAsync(async () => {
      const uploadedFileUrl = formDataWithFile
        ? await uploadImage(formDataWithFile)
        : null
      uploadedFileUrl && (await updateUserAvatar(uploadedFileUrl))
      await saveMyProfile(payload)
      router.push(AppRoutes.myProfile)
    })
  }

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
