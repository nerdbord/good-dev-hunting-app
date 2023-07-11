import { FormikErrors } from 'formik';

export type Values = {
  fullName: string,
  contactEmail: string,
  bio: string,
  country: string
  city: string,
  remoteOnly: boolean,
  position: string[]
  seniority: string[]
  techStack: string
  employment: string[]
}

export function validate(values: Values): FormikErrors<Values> {
  const errors: FormikErrors<Values> = {};

  if (!values.fullName) {
    errors.fullName = 'Name is required';
  }
  if (!values.contactEmail) {
    errors.contactEmail = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.contactEmail)) {
    errors.contactEmail = 'Invalid email address';
  }
  if (!values.bio) {
    errors.bio = 'Bio is required';
  }
  if (!values.country) {
    errors.country = 'Country is required';
  }
  if (!values.city) {
    errors.city = 'City is required';
  }
  if (!values.remoteOnly) {
    errors.remoteOnly = 'This field must be checked';
  }
  if (!values.position.length) {
    errors.position = 'Position is required';
  }
  if (!values.seniority.length) {
    errors.seniority = 'Seniority is required';
  }
  if (!values.techStack) {
    errors.techStack = 'Tech stack is required';
  }
  if (!values.employment || values.employment.length === 0) {
    errors.employment = 'At least one employment type is required';
  }
  return errors;
}