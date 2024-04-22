'use client'
import { sendProfileContactRequest } from '@/app/(profile)/_actions/mutations/sendProfileContactRequest'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { useProfiles } from '@/app/(profile)/_providers/Profiles.provider'
import { Button } from '@/components/Button/Button'
import CaptchaCheckbox from '@/components/Checkbox/CaptchaCheckbox/CaptchaCheckbox'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import InputFormError from '@/components/InputFormError/InputFormError'
import TextArea from '@/components/TextArea/TextArea'
import TextInput from '@/components/TextInput/TextInput'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PlausibleEvents } from '@/lib/plausible'
import { useFormik } from 'formik'
import { usePlausible } from 'next-plausible'
import Link from 'next/link'
import styles from './ContactForm.module.scss'
import {
  initialValues,
  validationSchema,
  type ContactFormValuesWithChecks,
} from './schema'

export default function ContactForm({
  userProfile,
  closeModal,
  showSuccessMsg,
}: {
  userProfile: ProfileModel
  closeModal: () => void
  showSuccessMsg: () => void
}) {
  const { runAsync, loading } = useAsyncAction()
  const { addToast } = useToast()
  const plausible = usePlausible()
  const { handleSetProfileContactRequest } = useProfiles()

  const handleSendEmail = (values: ContactFormValuesWithChecks) => {
    runAsync(async () => {
      try {
        const contactRequest = await sendProfileContactRequest({
          senderEmail: values.senderEmail,
          senderFullName: values.senderFullName,
          profileId: userProfile.id,
          message: values.message,
          subject: values.subject,
        })

        handleSetProfileContactRequest(contactRequest)

        plausible(PlausibleEvents.ContactDeveloper, {
          props: {
            username: userProfile.githubUsername,
            senderEmail: values.senderEmail,
          },
        })
        showSuccessMsg()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } catch (error) {
        addToast(
          `${error || 'An error occurred while sending the email'} `,
          ToastStatus.INVALID,
        )
      }
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSendEmail,
    validateOnChange: false,
    validateOnBlur: false,
  })

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <h4>Contact {userProfile.fullName}</h4>
        <div className={styles.formContainer}>
          <p className={styles.info}>
            Send a message to this candidate. We&rsquo;ll make sure it&rsquo;ll
            be delivered safely.
          </p>

          <InputFormError error={formik.errors.senderFullName}>
            <TextInput
              label="Your full name"
              placeholder="eg. Monica Griffin"
              value={formik.values.senderFullName}
              onChange={formik.handleChange}
              name="senderFullName"
            />
          </InputFormError>

          <InputFormError error={formik.errors.senderEmail}>
            <TextInput
              label="Your email"
              placeholder="eg. monica.griffin@watercompany.com"
              value={formik.values.senderEmail}
              onChange={formik.handleChange}
              name="senderEmail"
            />
          </InputFormError>

          <InputFormError error={formik.errors.subject}>
            <TextInput
              label="Subject"
              placeholder="eg. Job offer - let&rsquo;s talk!"
              value={formik.values.subject}
              onChange={formik.handleChange}
              name="subject"
              customClass={styles.subject}
            />
          </InputFormError>

          <InputFormError error={formik.errors.message}>
            <TextArea
              label="Message"
              placeholder="eg. Hey! We&rsquo;re looking for a talent in our company..."
              value={formik.values.message}
              onChange={formik.handleChange}
              name="message"
              height={195}
            />
          </InputFormError>
          <InputFormError error={formik.errors.terms}>
            <CheckboxInput
              id="terms"
              label=""
              checked={formik.values.terms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
          </InputFormError>
          <InputFormError error={formik.errors.captcha}>
            <CaptchaCheckbox
              id="captcha"
              label="Confirm your humanity with a quick click"
              name="captcha"
              checked={formik.values.captcha}
              onChange={formik.setFieldValue}
            />
          </InputFormError>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.primaryBtn} data-test-id="submitBtn">
            <Button
              type="submit"
              variant="primary"
              onClick={() => formik.handleSubmit}
              loading={loading}
            >
              Send
            </Button>
          </div>
          <Button variant={'secondary'} onClick={() => closeModal()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
