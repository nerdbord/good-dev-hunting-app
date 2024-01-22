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

// export const profileData: ProfileListItems[] = [
//   {
//     id: 1,
//     name: 'Karolina Morwinska',
//     seniority: 'Senior',
//     jobSpecialization: JobSpecialization.Fullstack,
//     others: '+5 more',
//     country: 'Poland',
//     city: 'Warsaw',
//     remote: 'Remote',
//     technology: ['Javascript', 'React', 'Vue.js'],
//   },
//   {
//     id: 2,
//     name: 'Kristin Watson',
//     seniority: 'Junior',
//     jobSpecialization: JobSpecialization.Frontend,
//     others: '+5 more',
//     country: 'Poland',
//     city: 'Warsaw',
//     remote: 'Remote',
//     technology: ['Javascript', 'React', 'Vue.js'],
//   },
//   {
//     id: 3,
//     name: 'Veres Panna',
//     seniority: 'Mid',
//     jobSpecialization: JobSpecialization.Fullstack,
//     others: '+5 more',
//     country: 'Poland',
//     city: 'Warsaw',
//     remote: 'Remote',
//     technology: ['Javascript', 'React', 'Vue.js'],
//   },
// ]
