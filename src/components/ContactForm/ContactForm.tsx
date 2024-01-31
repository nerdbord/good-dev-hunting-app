import {
  deleteSavedContactRequest,
  saveContactRequest,
} from '@/actions/contact-request/saveContactRequest'
import { sendContactRequestEmail } from '@/actions/mailing/sendContactRequestEmail'
import { Button } from '@/components/Button/Button'
import InputFormError from '@/components/InputFormError/InputFormError'
import TextArea from '@/components/TextArea/TextArea'
import TextInput from '@/components/TextInput/TextInput'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useFormik } from 'formik'
import styles from './ContactForm.module.scss'
import { ContactFormValues, initialValues, validationSchema } from './schema'

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

  const handleSendEmail = (values: ContactFormValues) => {
    runAsync(async () => {
      // try {
      // Handle submit actions
      try {
        const saveResult = await saveContactRequest({
          ...values,
          profileId: userProfile.id,
        })
        // Handle submit actions
        // console.log('Handle submit', values)
        try {
          await sendContactRequestEmail({
            senderEmail: values.senderEmail,
            senderFullName: values.senderFullName,
            recipientEmail: userProfile.userEmail,
            subject: values.subject,
          })
          showSuccessMsg()
        } catch (error) {
          try {
            await deleteSavedContactRequest(values.senderEmail, userProfile.id)
          } catch (error) {
            addToast(
              `We've failed to process your request, please try again later`,
              ToastStatus.INVALID,
            )
          }
          addToast(
            `We've failed to deliver your message, please try again.`,
            ToastStatus.INVALID,
          )
        }
      } catch (error) {
        addToast(
          `Your message was not sent, because you've already contacted this
        developer`,
          ToastStatus.INVALID,
        )
      }
      // console.log('Handle submit', values)
      // } catch (error) {
      //   console.error('Error sending email', error)
      // }
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
