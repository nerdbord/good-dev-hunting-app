// import Link from "next/link"
import { CreateProfileFormValues } from '@/app/(profile)/types'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import { useFormikContext } from 'formik'
import Link from 'next/link'
import styles from './TermsOfUse.module.scss'

const terms = 'terms'
export default function TermsOfUse() {
  const { values, errors, setFieldValue, touched } =
    useFormikContext<CreateProfileFormValues>()
  return (
    <div className={styles.container}>
      <div className={styles.left}>Terms of use</div>
      <div className={styles.right}>
        <CheckboxInput
          id={terms}
          label=""
          checked={!!values.terms}
          onChange={() => {
            setFieldValue(terms, !values.terms)
          }}
          name="terms"
        >
          <span className={styles.label}>
            I have read and accept{' '}
            <Link
              target="_blank"
              href="https://glory-licorice-2e2.notion.site/Good-Dev-Hunting-User-Terms-and-Conditions-77b1c52963f94edbb898a36e2a2ac512"
              className={styles.link}
            >
              Terms & conditions
            </Link>{' '}
            and{' '}
            <Link
              target="_blank"
              href="https://glory-licorice-2e2.notion.site/Privacy-policy-6c075e8ad0de4927addf9592bb29de6e?pvs=4"
              className={styles.link}
            >
              Privacy Policy
            </Link>
          </span>
        </CheckboxInput>
      </div>
    </div>
  )
}
