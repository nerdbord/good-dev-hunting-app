import { City, Country, Profile, User } from '@prisma/client'

export const mockProfiles: (Profile & {
  user: { id: string; email: string; profile: string; githubDetails: string }
  country: {
    id: string
    name: string
    openForRelocation: boolean
    profile: string[]
  }
  city: {
    id: string
    name: string
    openForRelocation: boolean
    profile: string[]
  }
})[] = [
  {
    id: '1',
    user: {
      id: '123',
      email: 'john.doe@example.com',
      profile: 'r6789',
      githubDetails: '6789iju',
    },
    userId: '123',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    linkedIn: 'linkedin.com/in/johndoe',
    bio: 'Lorem ipsum dolor sit amet.',
    country: {
      id: '10',
      name: 'United States',
      openForRelocation: true,
      profile: ['78i', '68790uh'],
    },
    countryId: '10',
    city: {
      id: '20',
      name: 'New York',
      openForRelocation: true,
      profile: ['23454', '2354675'],
    },
    cityId: '20',
    remoteOnly: false,
    position: 'Software Engineer',
    seniority: 'Senior',
    techStack: ['JavaScript', 'React', 'Node.js'],
    employmentType: 'FULL_TIME',
    isPublished: true,
  },
  {
    id: '2',
    user: {
      id: '456',
      email: 'jane.smith@example.com',
      profile: 'ertvh',
      githubDetails: 'tv',
    },
    userId: '456',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    linkedIn: 'linkedin.com/in/janesmith',
    bio: 'Lorem ipsum dolor sit amet.',
    country: {
      id: '11',
      name: 'Canada',
      openForRelocation: true,
      profile: [],
    },
    countryId: '11',
    city: {
      id: '21',
      name: 'Toronto',
      openForRelocation: true,
      profile: [],
    },
    cityId: '21',
    remoteOnly: true,
    position: 'Frontend Developer',
    seniority: 'Mid',
    techStack: ['HTML', 'CSS', 'JavaScript'],
    employmentType: 'CONTRACT',
    isPublished: true,
  },
  // Add more mock profiles here if needed
]
