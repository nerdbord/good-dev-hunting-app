'use client'
import { updateMyAvatar } from '@/app/(auth)/_actions/mutations/updateMyAvatar'
import { mapProfileModelToEditProfileFormValues } from '@/app/(profile)/(routes)/my-profile/(components)/EditProfileForm/mappers'
import {
  type JobSpecialization,
  type ProfileFormValues,
  type ProfileUpdateParams,
} from '@/app/(profile)/profile.types'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

import { uploadImage } from '@/app/(files)/_actions/uploadImage'
import { useProfileModel } from '@/app/(profile)/_providers/Profile.provider'
import { AppRoutes } from '@/utils/routes'
import * as Yup from 'yup'
import styles from '../../edit/page.module.scss'
import CreateProfileTopBar from '../CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '../CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '../CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '../CreateProfile/WorkInformation/WorkInformation'

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
    .max(16, 'Max 16 technologies'),
  linkedin: Yup.string()
    .nullable()
    .notRequired()
    .matches(
      /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/(.*)$/,
      'Invalid LinkedIn URL',
    ),
})

const EditProfileForm = () => {
  const { data: session, update: updateSession } = useSession()
  const { runAsync, loading: isSubmitting } = useAsyncAction()
  const router = useRouter()
  const { formDataWithFile } = useUploadContext()
  const { profile } = useProfileModel()

  const mappedInitialValues: ProfileFormValues = useMemo(() => {
    if (!profile) {
      return {
        fullName: '',
        linkedin: '',
        bio: '',
        country: '',
        openForCountryRelocation: false,
        city: '',
        openForCityRelocation: false,
        remoteOnly: false,
        position: { name: '', value: '' },
        seniority: { name: '', value: '' },
        techStack: [],
        employment: [],
        githubUsername: '',
        state: PublishingState.PENDING,
        viewCount: 0,
      }
    }

    return mapProfileModelToEditProfileFormValues(profile)
  }, [profile])

  if (!session || !profile) {
    return null
  }

  const handleEditProfile = async (values: ProfileFormValues) => {
    const updateParams: ProfileUpdateParams = {
      fullName: values.fullName,
      avatarUrl: session.user.image || null,
      linkedIn: values.linkedin,
      bio: values.bio,
      country: values.country,
      openForCountryRelocation: values.openForCountryRelocation,
      city: values.city,
      openForCityRelocation: values.openForCityRelocation,
      isOpenForWork: true,
      remoteOnly: values.remoteOnly,
      position: values.position.value as JobSpecialization,
      seniority: values.seniority.value,
      techStack: values.techStack.map((tech) => {
        return {
          name: tech.value,
        }
      }),
      employmentTypes: values.employment,
      githubUsername: session.user.name,
      state: PublishingState.PENDING,
      viewCount: values.viewCount,
    }

    await runAsync(async () => {
      const uploadedFileUrl = formDataWithFile
        ? await uploadImage(formDataWithFile)
        : null
      uploadedFileUrl && (await updateMyAvatar(uploadedFileUrl))
      const savedProfile = await profile.save(updateParams)
      savedProfile &&
        updateSession({ ...session.user, name: savedProfile.fullName })

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
