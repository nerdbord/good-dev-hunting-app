import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import openaiService from '@/lib/openai.service'
import { type JobModel } from '../_models/job.model'

const SYSTEM_PROMPT = `
You are an AI recruitment specialist designed to match job requirements with developer candidates. Your task is to analyze the provided job description and candidate profiles, then identify up to 10 best-matching candidates.

## Input
You will receive:
1. A job description with requirements, responsibilities, and preferences
2. Multiple candidate profiles containing skills, experience, and preferences

## Evaluation Criteria
For each candidate, carefully evaluate:

1. Technical Skills Match (40% weight)
   - Required skills: How many critical required skills does the candidate possess?
   - Nice-to-have skills: What additional relevant skills does the candidate have?
   - Skill proficiency: How experienced is the candidate with each required technology?

2. Experience Level Match (30% weight)
   - Years of experience: Does the candidate meet the required experience threshold?
   - Seniority level: Is the candidate's career level appropriate (junior, mid, senior)?
   - Project complexity: Has the candidate worked on similar complexity projects?

3. Employment Preferences Match (20% weight)
   - Employment type: Does the contract type match (full-time, part-time, contract)?
   - Work mode: Do remote/hybrid/on-site preferences align?
   - Location: Is the candidate's location compatible with the position?

4. Additional Factors (10% weight)
   - Industry experience: Has the candidate worked in relevant industries?
   - Cultural fit indicators: Does the candidate's background suggest alignment with company culture?
   - Availability: When can the candidate start?

## Output Format
Return a JSON object with an array of up to 10 candidate matches, sorted by match quality (highest first):

{
  "matches": [
    {
      "profileId": "candidate-123",
      "matchScore": 92,
      "matchBreakdown": {
        "technicalSkills": 38,
        "experienceLevel": 27,
        "employmentPreferences": 18,
        "additionalFactors": 9
      },
      "matchReason": "Excellent technical match with 9/10 required skills. Senior level experience (8 years) matches job requirements. Prefers remote work which aligns with position. Has experience in the financial sector."
    }
  ]
}
`

export interface MatchResult {
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

export async function matchJobWithProfiles(
  job: JobModel,
  profiles: ProfileModel[],
): Promise<MatchResult[]> {
  try {
    const jobData = {
      id: job.id,
      name: job.jobName,
      description: job.projectBrief,
      technologies: job.techStack.map((tech) => tech.name),
      employmentTypes: job.employmentTypes,
      employmentModes: job.employmentModes,
      location: {
        country: job.country,
        city: job.city,
        remoteOnly: job.remoteOnly,
      },
    }

    const profilesData = profiles.map((profile) => ({
      id: profile.id,
      name: profile.fullName,
      position: profile.position,
      seniority: profile.seniority,
      technologies: profile.techStack.map((tech) => tech.name),
      employmentTypes: profile.employmentTypes,
      remoteOnly: profile.remoteOnly,
      location: {
        country: profile.country,
        city: profile.city,
        openForCountryRelocation: profile.openForCountryRelocation,
        openForCityRelocation: profile.openForCityRelocation,
      },
    }))

    const messages = [
      {
        role: 'system' as const,
        content: `${SYSTEM_PROMPT} \nCandidate profiles: ${JSON.stringify(
          profilesData,
        )}`,
      },
      {
        role: 'user' as const,
        content: JSON.stringify({
          job: jobData,
        }),
      },
    ]

    const matchesResult = await openaiService.generateJson<{
      matches: MatchResult[]
    }>(messages, {
      model: 'gpt-4-turbo',
      temperature: 0,
      max_tokens: 2000,
    })
    // console.log(matchesResult)
    return matchesResult.matches || []
  } catch (error) {
    console.error('Error matching job with profiles:', error)
    return []
  }
}
