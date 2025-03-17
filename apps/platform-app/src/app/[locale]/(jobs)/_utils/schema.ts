export interface Budget {
  currency: string
  min: number
  max: number
}

export interface EmploymentDetails {
  contractType:
    | 'B2B'
    | 'Employment Contract'
    | 'Work Contract'
    | 'Mandate Contract'
    | 'No-requirements'
    | ''
  workTime: 'Full-time' | 'Part-time' | 'Contract' | 'No-requirements' | ''
  workMode: 'On-site' | 'Hybrid' | 'Remote' | 'No-requirements' | ''
  candidateLocations: string[]
}

export interface SubmissionFormData {
  taskName: string
  projectBrief: string
  technologies: string[]
  budget: Budget
  employmentDetails: EmploymentDetails
}
