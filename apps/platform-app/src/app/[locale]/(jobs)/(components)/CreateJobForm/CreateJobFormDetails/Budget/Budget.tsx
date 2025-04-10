'use client'

import { currencyButtonTextDisplay } from '@/app/[locale]/(profile)/profile.mappers'
import InputFormError from '@/components/InputFormError/InputFormError'
import NumberInput from '@/components/NumberInput/NumberInput'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { Currency } from '@prisma/client'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { BudgetType, type CreateJobFormValues } from '../../../../_utils/types'
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
  const [initialized, setInitialized] = useState(false)

  // Ensure budget type is properly set on initialization
  useEffect(() => {
    if (!initialized) {
      const budgetType = determineBudgetType(values)
      setFieldValue(BudgetFormKeys.BUDGET_TYPE, budgetType)
      setInitialized(true)
    }
  }, [initialized, setFieldValue, values])

  // Add another effect to handle when values change after initialization
  useEffect(() => {
    if (initialized) {
      // Check if budget type needs to be updated based on min/max values
      if (
        values.minBudgetForProjectRealisation !== null &&
        values.minBudgetForProjectRealisation !== undefined &&
        values.maxBudgetForProjectRealisation !== null &&
        values.maxBudgetForProjectRealisation !== undefined &&
        values.budgetType !== BudgetType.FIXED
      ) {
        setFieldValue(BudgetFormKeys.BUDGET_TYPE, BudgetType.FIXED)
      }
    }
  }, [
    initialized,
    values.minBudgetForProjectRealisation,
    values.maxBudgetForProjectRealisation,
    values.budgetType,
    setFieldValue,
  ])

  const determineBudgetType = (values: CreateJobFormValues): BudgetType => {
    // If both min and max budget are present, it's a fixed budget
    if (
      values.minBudgetForProjectRealisation !== null &&
      values.minBudgetForProjectRealisation !== undefined &&
      values.maxBudgetForProjectRealisation !== null &&
      values.maxBudgetForProjectRealisation !== undefined
    ) {
      return BudgetType.FIXED
    }

    // If budgetType is explicitly specified, use that
    if (values.budgetType) {
      // Make sure it's a valid BudgetType
      if (
        values.budgetType === BudgetType.FIXED ||
        values.budgetType === BudgetType.REQUEST_QUOTE
      ) {
        return values.budgetType
      }
    }

    // Default to REQUEST_QUOTE if we can't determine
    return BudgetType.REQUEST_QUOTE
  }

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
    // Force the type to be a valid BudgetType enum value
    const budgetTypeValue =
      type === BudgetType.FIXED ? BudgetType.FIXED : BudgetType.REQUEST_QUOTE

    await setFieldValue(BudgetFormKeys.BUDGET_TYPE, budgetTypeValue)
    await setFieldTouched(BudgetFormKeys.BUDGET_TYPE)

    if (type === BudgetType.REQUEST_QUOTE) {
      // Set a default currency value to avoid validation errors
      await setFieldValue(BudgetFormKeys.CURRENCY, Currency.PLN)
      // Set to null instead of 0 for budget fields
      await setFieldValue(
        BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION,
        null,
      )
      await setFieldValue(
        BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION,
        null,
      )

      // Validate budget type but not other fields for REQUEST_QUOTE
      await validateField(BudgetFormKeys.BUDGET_TYPE)
    }

    if (type === BudgetType.FIXED) {
      // Set a default currency if none is selected
      if (!values.currency) {
        await setFieldValue(BudgetFormKeys.CURRENCY, Currency.PLN)
      }

      // Touch fields so validation errors show up
      await setFieldTouched(BudgetFormKeys.CURRENCY, true)
      await setFieldTouched(
        BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION,
        true,
      )
      await setFieldTouched(
        BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION,
        true,
      )

      // Validate all fields for FIXED budget type
      await validateField(BudgetFormKeys.BUDGET_TYPE)
      await validateField(BudgetFormKeys.CURRENCY)
      await validateField(BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION)
      await validateField(BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION)
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
              checked={
                String(values[BudgetFormKeys.BUDGET_TYPE]) ===
                String(BudgetType.FIXED)
              }
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
                String(values[BudgetFormKeys.BUDGET_TYPE]) ===
                String(BudgetType.REQUEST_QUOTE)
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
                min={
                  values[BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION] || 0
                }
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
                      value === values.currency ||
                      (value === Currency.PLN && !values.currency)
                        ? 'secondary'
                        : 'grayedOut'
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
