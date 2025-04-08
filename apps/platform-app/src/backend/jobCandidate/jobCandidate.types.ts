import { type Job, type Profile } from '@prisma/client'

// Base type mirroring the Prisma model
export interface JobCandidate {
  id: string
  jobId: string
  profileId: string
  matchScore: number
  technicalSkillsScore: number
  experienceLevelScore: number
  employmentPreferencesScore: number
  additionalFactorsScore: number
  matchReason: string
  createdAt: Date
  updatedAt: Date
}

// Type including relations, useful for service function returns
export interface JobCandidateWithRelations extends JobCandidate {
  job: Pick<Job, 'id' | 'jobName'> // Include basic job info
  profile: Pick<Profile, 'id' | 'fullName' | 'slug' | 'position' | 'seniority'> // Include basic profile info
}

// Type matching the input structure from matchJobWithProfiles.ts
export interface MatchResultInput {
  profileId: string
  matchScore: number
  matchBreakdown: {
    technicalSkills: number
    experienceLevel: number
    employmentPreferences: number
    additionalFactors: number
  }
  matchReason: string
}
