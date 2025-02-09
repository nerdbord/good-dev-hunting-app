import { currencyButtonTextDisplay } from '@/app/[locale]/(profile)/profile.mappers'
import InputFormError from '@/components/InputFormError/InputFormError'
import NumberInput from '@/components/NumberInput/NumberInput'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { Currency } from '@prisma/client'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { type CreateJobDetailsFormValues } from '../../../jobDetailsTypes'
import { Card } from '../Card/Card'
import styles from './Budget.module.scss'

export enum BudgetFormKeys {
  CURRENCY = 'currency',
  MIN_BUDGET_FOR_PROJECT_REALISATION = 'minBudgetForProjectRealisation',
  MAX_BUDGET_FOR_PROJECT_REALISATION = 'maxBudgetForProjectRealisation',
}

export const Budget = () => {
  const t = useTranslations(I18nNamespaces.Jobs)
  const { values, errors, setFieldValue, touched, handleBlur } =
    useFormikContext<CreateJobDetailsFormValues>()

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

  return (
    <Card>
      <div className={styles.left}>
        <div>{t('budget')}</div>
        <div className={styles.personalInfo}>{t('budgetDesc')}</div>
      </div>
      <div className={styles.right}>
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
            value={values[BudgetFormKeys.MIN_BUDGET_FOR_PROJECT_REALISATION]}
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
            value={values[BudgetFormKeys.MAX_BUDGET_FOR_PROJECT_REALISATION]}
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
            touched[BudgetFormKeys.CURRENCY] && errors[BudgetFormKeys.CURRENCY]
          }
        >
          <div className={styles.currencyButtonsContainer}>
            {Object.values(Currency).map((value, index) => (
              <Button
                key={index}
                variant={value === values.currency ? 'secondary' : 'grayedOut'}
                onClick={() => handleCurrencyChange(value)}
              >
                {currencyButtonTextDisplay(value)}
              </Button>
            ))}
          </div>
        </InputFormError>
      </div>
    </Card>
  )
}
