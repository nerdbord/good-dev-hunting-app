import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import groqService from '@/lib/groq.service'
import { type JobModel } from '../_models/job.model'

// System prompt for job-profile matching
const SYSTEM_PROMPT = `
You are an AI assistant specialized in matching job requirements with developer profiles.
Your task is to analyze the provided job and developer profiles and determine which profiles are the best match for the job.

For each profile, consider the following factors:
1. Technical skills match - How well do the developer's skills match the job requirements?
2. Experience level match - Is the developer's seniority appropriate for the job?
3. Employment preferences match - Do the job's employment type, mode, and location match the developer's preferences?

Return a JSON array of profile IDs sorted by match quality, with the best matches first.
Each item should include:
- profileId: The ID of the profile
- matchScore: A number between 0 and 100 indicating the match quality
- matchReason: A brief explanation of why this profile is a good match

Expected response:
{
    matches: [
        {
            profileId: 'profile-id-1',
            matchScore: 95,
            matchReason: 'Strong technical skills match with 8/10 required technologies. Senior level matches job requirements. Prefers remote work which matches job mode.',
        },
        {
            profileId: 'profile-id-2',
            matchScore: 80,
            matchReason: 'Good technical match with 6/10 required technologies. Mid-level developer for senior role. Location preference matches.',
        },
    ],
}
`

export interface MatchResult {
    profileId: string
    matchScore: number
    matchReason: string
}

export async function matchJobWithProfiles(
    job: JobModel,
    profiles: ProfileModel[],
): Promise<MatchResult[]> {
    try {
        // Prepare the job and profiles data for the LLM
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

        // Prepare the messages for the LLM
        const messages = [
            {
                role: 'system',
                content: SYSTEM_PROMPT,
            },
            {
                role: 'user',
                content: JSON.stringify({
                    job: jobData,
                    profiles: profilesData,
                }),
            },
        ]

        // Generate the response with JSON format
        const jsonResponse = await groqService.generateResponse(messages, {
            json: true,
            temperature: 0,
            maxTokens: 2000,
        })

        // Parse the JSON response
        const matches = JSON.parse(jsonResponse) as {
            matches: MatchResult[]
        }

        return matches.matches || []
    } catch (error) {
        console.error('Error matching job with profiles:', error)
        // Return empty array if matching fails
        return []
    }
}
