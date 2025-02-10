'use client'

import { type CreateJobDetailsFormValues } from '@/app/[locale]/(jobs)/types'
import InputFormError from '@/components/InputFormError/InputFormError'
import { TechStackInput } from '@/components/TechStackInput/TechStackInput'
import TextInput from '@/components/TextInput/TextInput'
import { I18nNamespaces } from '@/i18n/request'
import { Tooltip, type DropdownOption } from '@gdh/ui-system'
import { ImportantIcon } from '@gdh/ui-system/icons'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { ProjectBriefTextArea } from '../../ProjectBriefTextArea/ProjectBriefTextArea'
import { Card } from '../Card/Card'
import styles from './BasicInfo.module.scss'

export enum BasicInfoFormKeys {
  JOB_NAME = 'jobName',
  BRIEF = 'projectBrief',
  TECHNOLOGIES = 'techStack',
}

export const BasicInfo = () => {
  const t = useTranslations(I18nNamespaces.PersonalInfo)
  const tt = useTranslations(I18nNamespaces.WorkInformation)
  const ttt = useTranslations(I18nNamespaces.Jobs)
  const { values, handleChange, setFieldValue, errors, touched, handleBlur } =
    useFormikContext<CreateJobDetailsFormValues>()

  const handleTechSelect = (tech: DropdownOption) => {
    if (!values[BasicInfoFormKeys.TECHNOLOGIES].includes(tech)) {
      setFieldValue(BasicInfoFormKeys.TECHNOLOGIES, [
        ...values[BasicInfoFormKeys.TECHNOLOGIES],
        tech,
      ])
    }
  }

  const handleTechRemove = (techToRemove: DropdownOption) => {
    if (Array.isArray(values[BasicInfoFormKeys.TECHNOLOGIES])) {
      setFieldValue(
        BasicInfoFormKeys.TECHNOLOGIES,
        values[BasicInfoFormKeys.TECHNOLOGIES].filter(
          (tech) => tech.value !== techToRemove.value,
        ),
      )
    }
  }
  return (
    <Card>
      <div className={styles.left}>
        <div className={styles.cardHeader}>{ttt('basicInfo')}</div>
        <div className={styles.personalInfo}>{ttt('basicInfoDesc')}</div>
      </div>
      <div className={styles.right}>
        <InputFormError
          error={
            touched[BasicInfoFormKeys.JOB_NAME] &&
            errors[BasicInfoFormKeys.JOB_NAME]
          }
        >
          <TextInput
            onBlur={handleBlur}
            label={ttt('jobName')}
            placeholder={ttt('jobNamePlaceholder')}
            value={values[BasicInfoFormKeys.JOB_NAME]}
            onChange={handleChange}
            name={BasicInfoFormKeys.JOB_NAME}
            dataTestId={BasicInfoFormKeys.JOB_NAME}
            maxLength={255}
          />
        </InputFormError>
        <div>
          <InputFormError
            error={
              touched[BasicInfoFormKeys.BRIEF] &&
              errors[BasicInfoFormKeys.BRIEF]
            }
          >
            <label className={styles.formLabel}>
              {ttt('brief')}
              <Tooltip text={ttt('briefTooltip')}>
                <ImportantIcon />
              </Tooltip>
            </label>
            <div className={styles.lettersCountParent}>
              <ProjectBriefTextArea
                onBlur={handleBlur}
                placeholder={ttt('briefPlaceholder')}
                value={values[BasicInfoFormKeys.BRIEF]}
                onChange={handleChange}
                name={BasicInfoFormKeys.BRIEF}
                maxLength={1500}
                dataTestId={BasicInfoFormKeys.BRIEF}
              />
              <div className={styles.lettersCount}>
                {values[BasicInfoFormKeys.BRIEF].length} / 1500{' '}
                {t('characters')}
              </div>
            </div>
          </InputFormError>
        </div>
        <InputFormError
          error={
            touched[BasicInfoFormKeys.TECHNOLOGIES] &&
            ((errors[BasicInfoFormKeys.TECHNOLOGIES] as string) || '')
          }
        >
          <TechStackInput
            chips={values[BasicInfoFormKeys.TECHNOLOGIES]}
            label={tt('techstack')}
            placeholder={tt('startTyping')}
            name={BasicInfoFormKeys.TECHNOLOGIES}
            onTechSelect={handleTechSelect}
            onTechRemove={handleTechRemove}
            addImportantIcon={true}
            tooltipText={ttt('techStackTooltip')}
          />
        </InputFormError>
        <div className={styles.addInfo}>
          {tt('techstackInfo')} <br />
          {tt('techstackChoose')}
        </div>
      </div>
    </Card>
  )
}
