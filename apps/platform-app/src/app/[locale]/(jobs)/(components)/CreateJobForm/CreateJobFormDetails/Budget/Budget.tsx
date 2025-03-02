'use client'

import { currencyButtonTextDisplay } from '@/app/[locale]/(profile)/profile.mappers'
import InputFormError from '@/components/InputFormError/InputFormError'
import NumberInput from '@/components/NumberInput/NumberInput'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { Currency } from '@prisma/client'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { BudgetType, type CreateJobFormValues } from '../../../../types'
import { Card } from '../Card/Card'
import styles from './Budget.module.scss'

export enum BudgetFormKeys {
  CURRENCY = 'currency',
  MIN_BUDGET_FOR_PROJECT_REALISATION = 'minBudgetForProjectRealisation',
  MAX_BUDGET_FOR_PROJECT_REALISATION = 'maxBudgetForProjectRealisation',
  BUDGET_TYPE = 'budgetType',
}

export const Budget = () => {
  const t = useTranslations(I18nNamespaces.Jobs)
  const {
    values,
    errors,
    setFieldValue,
    touched,
    handleBlur,
    validateField,
    setFieldTouched,
  } = useFormikContext<CreateJobFormValues>()

  const handleCurrencyChange = (chosenCurrency: Currency) => {
    setFieldValue(BudgetFormKeys.CURRENCY, chosenCurrency)
  }

  const handleBudgetChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: BudgetFormKeys,
  ) => {
    const value = e.target.value ? parseInt(e.target.value, 10) : 0
    if (value >= 0) {
      setFieldValue(field, value)
    }
  }

  const handleBudgetTypeChange = async (type: BudgetType) => {
    await setFieldValue(BudgetFormKeys.BUDGET_TYPE, type)
    await setFieldTouched(BudgetFormKeys.BUDGET_TYPE)

    // Reset budget-related fields when switching to REQUEST_QUOTE
    if (type === BudgetType.REQUEST_QUOTE) {
      setFieldValue(BudgetFormKeys.CURRENCY, '')
      setFieldValue(BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION, 0)
      setFieldValue(BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION, 0)
      validateField(BudgetFormKeys.BUDGET_TYPE)
    }

    if (type === BudgetType.FIXED) {
      setFieldTouched(BudgetFormKeys.CURRENCY)
      setFieldTouched(BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION)
      setFieldTouched(BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION)

      validateField(BudgetFormKeys.CURRENCY)
      validateField(BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION)
      validateField(BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION)
    }
  }

  return (
    <Card>
      <div className={styles.left}>
        <div className={styles.cardHeader}>{t('budget')}</div>
        <div className={styles.personalInfo}>{t('budgetDesc')}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.budgetTypeContainer}>
          <label className={styles.radioLabel}>
            <input
              className={styles.radioInput}
              type="radio"
              name={BudgetFormKeys.BUDGET_TYPE}
              value={BudgetType.FIXED}
              checked={values[BudgetFormKeys.BUDGET_TYPE] === BudgetType.FIXED}
              onChange={() => handleBudgetTypeChange(BudgetType.FIXED)}
            />
            <span className={styles.customRadio}></span>
            <span className={styles.radioText}>{t('fixedBudget')}</span>
          </label>

          <label className={styles.radioLabel}>
            <input
              className={styles.radioInput}
              type="radio"
              name={BudgetFormKeys.BUDGET_TYPE}
              value={BudgetType.REQUEST_QUOTE}
              checked={
                values[BudgetFormKeys.BUDGET_TYPE] === BudgetType.REQUEST_QUOTE
              }
              onChange={() => handleBudgetTypeChange(BudgetType.REQUEST_QUOTE)}
            />
            <span className={styles.customRadio}></span>
            <span className={styles.radioText}>{t('budgetRequestQuote')}</span>
          </label>
        </div>

        {values[BudgetFormKeys.BUDGET_TYPE] === BudgetType.FIXED && (
          <>
            <InputFormError
              error={
                touched[BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION] &&
                errors[BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION]
              }
            >
              <NumberInput
                onBlur={handleBlur}
                label={t('minBudgetForProjectRealisation')}
                placeholder={t('minBudgetForProjectRealisationPlaceholder')}
                value={
                  values[BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION]
                }
                onChange={(e) =>
                  handleBudgetChange(
                    e,
                    BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION,
                  )
                }
                name={BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION}
                dataTestId={BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION}
                min={0}
              />
            </InputFormError>
            <InputFormError
              error={
                touched[BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION] &&
                errors[BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION]
              }
            >
              <NumberInput
                onBlur={handleBlur}
                label={t('maxBudgetForProjectRealisation')}
                placeholder={t('maxBudgetForProjectRealisationPlaceholder')}
                value={
                  values[BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION]
                }
                onChange={(e) =>
                  handleBudgetChange(
                    e,
                    BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION,
                  )
                }
                name={BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION}
                dataTestId={BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION}
                min={values[BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION]}
              />
            </InputFormError>
            <InputFormError
              error={
                touched[BudgetFormKeys.CURRENCY] &&
                errors[BudgetFormKeys.CURRENCY]
              }
            >
              <div className={styles.currencyButtonsContainer}>
                {Object.values(Currency).map((value, index) => (
                  <Button
                    key={index}
                    variant={
                      value === values.currency ? 'secondary' : 'grayedOut'
                    }
                    onClick={() => handleCurrencyChange(value)}
                  >
                    {currencyButtonTextDisplay(value)}
                  </Button>
                ))}
              </div>
            </InputFormError>
          </>
        )}
        {values[BudgetFormKeys.BUDGET_TYPE] === BudgetType.REQUEST_QUOTE && (
          <p className={styles.requestQuoteDescription}>
            {t('requestQuoteDescription')}
          </p>
        )}
      </div>
    </Card>
  )
}
