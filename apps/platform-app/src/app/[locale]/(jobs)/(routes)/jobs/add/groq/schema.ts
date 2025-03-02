export const schema = {
  $defs: {
    Budget: {
      properties: {
        currency: { title: 'Currency', type: 'string' },
        min: { title: 'Minimum Budget', type: 'number' },
        max: { title: 'Maximum Budget', type: 'number' },
      },
      title: 'Budget',
      type: 'object',
    },
    EmploymentDetails: {
      properties: {
        contractType: { title: 'Contract Type', type: 'string' },
        workTime: {
          title: 'Work Time',
          type: 'string',
          enum: ['Full-time', 'Part-time', 'Contract', 'No-requirements'],
        },
        workMode: {
          title: 'Work Mode',
          type: 'string',
          enum: ['On-site', 'Hybrid', 'Remote', 'No-requirements'],
        },
        candidateLocations: {
          items: { type: 'string' },
          title: 'Candidate Locations',
          type: 'array',
        },
      },
      title: 'EmploymentDetails',
      type: 'object',
    },
  },
  properties: {
    taskName: { title: 'Task Name', type: 'string' },
    projectBrief: { title: 'Project Brief', type: 'string' },
    technologies: {
      items: { type: 'string' },
      title: 'Technologies',
      type: 'array',
    },
    budget: { $ref: '#/$defs/Budget' },
    employmentDetails: { $ref: '#/$defs/EmploymentDetails' },
  },
  title: 'FormData',
  type: 'object',
}

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
