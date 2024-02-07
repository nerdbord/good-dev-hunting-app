import * as Yup from 'yup'

export interface ContactFormValues {
  senderFullName: string
  senderEmail: string
  subject: string
  message: string
}

export interface ContactFormValuesWithChecks extends ContactFormValues {
  terms: boolean
  captcha: boolean
}

export interface ContactFormRequest extends ContactFormValues {
  profileId: string
}

export const initialValues: ContactFormValuesWithChecks = {
  senderFullName: '',
  senderEmail: '',
  subject: `Job offer - let's talk!`,
  message: '',
  terms: false,
  captcha: false,
}

export const validationSchema = Yup.object().shape({
  senderFullName: Yup.string().required('Full name is required'),
  senderEmail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
  terms: Yup.boolean()
    .required('Agreement is required')
    .oneOf([true], 'Agreement is required'),
  catcha: Yup.boolean()
    .required('Captcha verification is required')
    .oneOf([true], 'Captcha verification is required'),
})
