import { FormikErrors } from 'formik'

export type Values = {
  fullName: string
  contactEmail: string
  bio: string
  country: string
  city: string
  remoteOnly: boolean
  position: string[]
  seniority: string[]
  techStack: string
  employment: string[]
}

const validateEmail = (email: string) => {
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  if (!email) {
    return 'Email is required'
  } else if (!EMAIL_REGEX.test(email)) {
    return 'Invalid email address'
  }
}

const validateNotEmptyArray = (arr: unknown[], fieldName: string) => {
  if (!arr || arr.length === 0) {
    return `${fieldName} is required`;
  }
}

const validateNotEmpty = (str: string, fieldName: string) => {
  if (!str) {
    return `${fieldName} is required`;
  }
}

export function validate(values: Values): FormikErrors<Values> {
  const errors: FormikErrors<Values> = {}

  errors.contactEmail = validateEmail(values.contactEmail);
  errors.fullName = validateNotEmpty(values.fullName, 'Name');
  errors.bio = validateNotEmpty(values.bio, 'Bio');
  errors.country = validateNotEmpty(values.country, 'Country');
  errors.city = validateNotEmpty(values.city, 'City');
  errors.position = validateNotEmptyArray(values.position, 'Position');
  errors.seniority = validateNotEmptyArray(values.seniority, 'Seniority');
  errors.techStack = validateNotEmpty(values.techStack, 'Tech stack');
  errors.employment = validateNotEmptyArray(values.employment, 'Employment');

  if (!values.remoteOnly) {
    errors.remoteOnly = 'This field must be checked';
  }

  return errors;
}