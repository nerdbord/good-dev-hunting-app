'use client'
import { uploadImage } from '@/app/(files)/_actions/uploadImage'
import { updateMyAvatar } from '@/app/[locale]/(auth)/_actions/mutations/updateMyAvatar'
import { mapProfileModelToEditProfileFormValues } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/EditProfileForm/mappers'
import { saveMyProfile } from '@/app/[locale]/(profile)/_actions'
import { checkSlugIsFree } from '@/app/[locale]/(profile)/_actions/queries/checkSlugIsFree'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import {
  type JobSpecialization,
  type ProfileFormValues,
} from '@/app/[locale]/(profile)/profile.types'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { AppRoutes } from '@/utils/routes'
import { Currency, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import * as Yup from 'yup'
import styles from '../../edit/page.module.scss'
import CreateProfileTopBar from '../CreateProfile/CreateProfileTopBar/CreateProfileTopBar'
import LocationPreferences from '../CreateProfile/LocationPreferences/LocationPreferences'
import PersonalInfo from '../CreateProfile/PersonalInfo/PersonalInfo'
import WorkInformation from '../CreateProfile/WorkInformation/WorkInformation'
import { FormNavigationWarning } from '../FormStateMonitor/FormStateMonitor'

export const validationSchema = Yup.object().shape({
  slug: Yup.string()
    .required('Slug is required')
    .min(3, 'Slug must be at least 3 characters long')
    .max(50, 'Slug cannot exceed 50 characters')
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug can only contain lowercase letters, numbers, and hyphens (e.g. "my-profile-123")',
    )
    .test('is-unique', 'This slug is already taken', async (slug) => {
      if (!slug) return true
      const slugIsFree = await checkSlugIsFree(slug)
      return slugIsFree
    }),
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
  currency: Yup.string()
    .oneOf(Object.keys(Currency), `Invalid currency`)
    .required('Currency is required.'),
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
  language: Yup.array()
    .of(Yup.object({ name: Yup.string(), value: Yup.string() }))
    .min(1, 'At least one language is required'),
})

const EditProfileForm = ({ profile }: { profile: ProfileModel }) => {
  const { update: updateSession, data: session } = useSession()
  const { runAsync, loading: isSubmitting } = useAsyncAction()
  const router = useRouter()
  const { formDataWithFile } = useUploadContext()

  const mappedInitialValues: ProfileFormValues = useMemo(() => {
    if (!profile) {
      return {
        slug: '',
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
        hourlyRateMin: 0,
        hourlyRateMax: 0,
        currency: Currency.EUR,
        language: [],
      }
    }

    return mapProfileModelToEditProfileFormValues(profile)
  }, [profile])

  const handleEditProfile = async (values: ProfileFormValues) => {
    const updateParams: ProfileModel = {
      ...profile,
      slug: values.slug,
      fullName: values.fullName,
      avatarUrl: session?.user?.avatarUrl || null,
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
      hourlyRateMin: values.hourlyRateMin,
      hourlyRateMax: values.hourlyRateMax,
      currency: values.currency,
      language: values.language.map((language) => {
        return {
          name: language.value,
        }
      }),
    }

    await runAsync(async () => {
      const uploadedFileUrl = formDataWithFile
        ? await uploadImage(formDataWithFile)
        : null
      uploadedFileUrl && (await updateMyAvatar(uploadedFileUrl))
      const savedProfile = await saveMyProfile(updateParams)
      savedProfile &&
        updateSession({
          ...session,
          user: {
            ...session?.user,
            avatarUrl: savedProfile.avatarUrl,
            name: savedProfile.fullName,
            profileId: savedProfile.id,
            profileSlug: savedProfile.slug,
          },
        })

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
        <FormNavigationWarning />
      </div>
    </Formik>
  )
}

export default EditProfileForm
