import * as Yup from 'yup'

export interface ContactFormValues {
  senderFullName: string
  senderEmail: string
  subject: string
  message: string
}

export const initialValues: ContactFormValues = {
  senderFullName: '',
  senderEmail: '',
  subject: `Job offer - let's talk!`,
  message: '',
}

export const validationSchema = Yup.object().shape({
  senderFullName: Yup.string().required('Full name is required'),
  senderEmail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
})
