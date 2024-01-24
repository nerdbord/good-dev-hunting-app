export interface ProfileListItems {
  id: number
  name: string
  seniority: string
  jobSpecialization: JobSpecialization
  others: string
  country: string
  city: string
  remote: string
  technology: string[]
}

export const filterLists = {
  technology: [
    'Javascript',
    'Python',
    'Node.js',
    'React.js',
    'Vue.js',
    'Angular',
    'MongoDB',
  ],
}

export enum JobSpecialization {
  Frontend = 'Frontend',
  Backend = 'Backend',
  Fullstack = 'Fullstack',
}
