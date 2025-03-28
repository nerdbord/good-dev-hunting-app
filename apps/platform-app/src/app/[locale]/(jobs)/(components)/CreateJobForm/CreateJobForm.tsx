'use client'

import { FormNavigationWarning } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/FormStateMonitor/FormStateMonitor'
import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import { useModal } from '@/contexts/ModalContext'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Currency, PublishingState } from '@prisma/client'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'
import { updateJobAction } from '../../_actions/mutations/updateJob'
import {
  BudgetType,
  JobContractType,
  type CreateJobFormValues,
} from '../../_utils/types'
import styles from './CreateJobForm.module.scss'
import { BasicInfo } from './CreateJobFormDetails/BasicInfo/BasicInfo'
import { Budget } from './CreateJobFormDetails/Budget/Budget'
import { Employment } from './CreateJobFormDetails/Employment/Employment'
import { Location } from './CreateJobFormDetails/Location/Location'

interface CreateJobFormProps {
  initialValues?: CreateJobFormValues
}

export const CreateJobForm = ({ initialValues }: CreateJobFormProps) => {
  const t = useTranslations(I18nNamespaces.Jobs)
  const tButtons = useTranslations(I18nNamespaces.Buttons)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { id: jobId } = useParams()
  const { showModal, closeModal } = useModal()

  const defaultValues: CreateJobFormValues = {
    jobName: '',
    projectBrief: '',
    techStack: [],
    budgetType: BudgetType.REQUEST_QUOTE,
    currency: Currency.PLN,
    minBudgetForProjectRealisation: null,
    maxBudgetForProjectRealisation: null,
    contractType: { name: 'B2B', value: JobContractType.B2B },
    employmentType: [],
    employmentMode: [],
    country: '',
    city: '',
    remoteOnly: true,
    terms: true,
    state: PublishingState.DRAFT,
  }

  const validationSchema = Yup.object().shape({
    jobName: Yup.string().required(
      t('jobNameRequired', { defaultValue: 'Job name is required' }),
    ),
    projectBrief: Yup.string().required(
      t('projectBriefRequired', { defaultValue: 'Project brief is required' }),
    ),
    techStack: Yup.array()
      .of(Yup.object({ name: Yup.string(), value: Yup.string() }))
      .max(16, t('maxTechStack', { defaultValue: 'Max 16 technologies' })),
    contractType: Yup.object({
      name: Yup.string(),
      value: Yup.string(),
    }).required(
      t('contractTypeRequired', { defaultValue: 'Contract type is required' }),
    ),
    employmentType: Yup.array().min(
      1,
      t('employmentTypeRequired', {
        defaultValue: 'At least one employment type is required',
      }),
    ),
    employmentMode: Yup.array().min(
      1,
      t('employmentModeRequired', {
        defaultValue: 'At least one employment mode is required',
      }),
    ),
    currency: Yup.string().when('budgetType', {
      is: BudgetType.FIXED,
      then: () => 
        Yup.string().required(
          t('currencyRequired', { defaultValue: 'Currency is required' })
        ),
      otherwise: () => Yup.string().notRequired(),
    }),
    minBudgetForProjectRealisation: Yup.number().when('budgetType', {
      is: BudgetType.FIXED,
      then: () =>
        Yup.number()
          .min(
            0,
            t('minBudgetNonNegative', {
              defaultValue: 'The minimum amount must not be less than 0',
            }),
          )
          .required(
            t('minBudgetRequired', {
              defaultValue: 'The minimum amount is required',
            }),
          ),
      otherwise: () => Yup.number().notRequired().nullable(),
    }),
    maxBudgetForProjectRealisation: Yup.number().when('budgetType', {
      is: BudgetType.FIXED,
      then: () =>
        Yup.number()
          .min(
            1,
            t('maxBudgetGreaterThan0', {
              defaultValue: 'The maximum amount must be greater than 0',
            }),
          )
          .test(
            'greater-than-min',
            t('maxBudgetGreaterThanMin', {
              defaultValue:
                'The maximum amount must be greater than the minimum',
            }),
            function (value) {
              return value
                ? value > this.parent.minBudgetForProjectRealisation
                : false
            },
          )
          .required(
            t('maxBudgetRequired', {
              defaultValue: 'The maximum amount is required',
            }),
          ),
      otherwise: () => Yup.number().notRequired().nullable(),
    }),
    budgetType: Yup.string().required(
      t('budgetTypeRequired', { defaultValue: 'Budget type is required' }),
    ),
    country: Yup.string().required(
      t('countryRequired', { defaultValue: 'Country is required' }),
    ),
    city: Yup.string().required(
      t('cityRequired', { defaultValue: 'City is required' }),
    ),
    terms: Yup.boolean().oneOf(
      [true],
      t('termsRequired', { defaultValue: 'You must accept the terms' }),
    ),
  })

  const handleUpdateJob = async (values: CreateJobFormValues) => {
    if (!jobId) {
      console.error('No job ID provided')
      return
    }

    try {
      setIsSubmitting(true)

      // Set default currency value if budgetType is requestQuote
      const currency =
        values.budgetType === BudgetType.REQUEST_QUOTE
          ? Currency.PLN // Always use PLN for REQUEST_QUOTE
          : values.currency || Currency.PLN // Fallback to PLN if undefined

      // Transform form values to job data
      const jobData = {
        jobName: values.jobName,
        projectBrief: values.projectBrief,
        techStack: {
          connectOrCreate: values.techStack.map((tech) => ({
            where: { name: tech.name },
            create: { name: tech.name },
          })),
        },
        budgetType: values.budgetType,
        currency: currency, // Use the determined currency
        minBudgetForProjectRealisation:
          values.budgetType === BudgetType.REQUEST_QUOTE
            ? null
            : values.minBudgetForProjectRealisation,
        maxBudgetForProjectRealisation:
          values.budgetType === BudgetType.REQUEST_QUOTE
            ? null
            : values.maxBudgetForProjectRealisation,
        contractType: values.contractType.value,
        employmentTypes: values.employmentType,
        employmentModes: values.employmentMode,
        country: values.country,
        city: values.city,
        remoteOnly: values.remoteOnly,
        terms: values.terms,
      }

      await updateJobAction(jobId as string, jobData)

      // Navigate to job preview page
      router.push(`${AppRoutes.jobs}/${jobId}`)
    } catch (error) {
      console.error('Error updating job:', error)
      showModal(
        <div>
          <h2>Error Updating Job</h2>
          <p>
            {error instanceof Error
              ? error.message
              : 'An unknown error occurred'}
          </p>
          <Button variant="primary" onClick={closeModal}>
            Close
          </Button>
        </div>,
        'narrow',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues || defaultValues}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnMount
      enableReinitialize={true}
      onSubmit={(values) => {
        handleUpdateJob(values)
      }}
    >
      {({ isValid, handleSubmit }) => (
        <form className={styles.wrapper} onSubmit={handleSubmit}>
          <div className={styles.formBox}>
            <BasicInfo />
            <Budget />
            <Employment />
            <Location />
          </div>
          <ProgressBar currentStep={2} maxSteps={3}>
            <Button
              variant="secondary"
              disabled={isSubmitting}
              onClick={() => router.back()}
            >
              {tButtons('goBack')}
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? 'Saving...' : tButtons('saveAndPreview')}
            </Button>
          </ProgressBar>
          <FormNavigationWarning />
        </form>
      )}
    </Formik>
  )
}
