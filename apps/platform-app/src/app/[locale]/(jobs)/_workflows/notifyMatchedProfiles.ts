import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import groqService from '@/lib/groq.service'
import { type JobModel } from '../_models/job.model'
import { matchJobWithProfiles, MatchResult } from './matchJobWithProfiles'
import { findAllApprovedProfiles } from '../../(profile)/_actions'

// System prompt for generating email content
const EMAIL_PROMPT = `
You are an AI assistant specialized in writing personalized job opportunity emails.
Your task is to write an email to a developer informing them about a job opportunity that matches their skills and preferences.

The email should:
1. Be professional but friendly in tone
2. Highlight why this job is a good match for the developer's skills and experience
3. Include key details about the job (title, description, technologies, employment type)
4. Include a call to action to view the job and apply

Keep the email concise (max 200 words) and engaging.
`

interface EmailContent {
    subject: string
    body: string
}

export async function generateEmailContent(
    job: JobModel,
    profile: ProfileModel,
    matchReason: string,
): Promise<EmailContent> {
    try {
        // Prepare the job and profile data for the LLM
        const jobData = {
            title: job.jobName,
            description: job.projectBrief,
            technologies: job.techStack.map((tech) => tech.name).join(', '),
            employmentTypes: job.employmentTypes.join(', '),
            employmentModes: job.employmentModes.join(', '),
            location: job.remoteOnly ? 'Remote' : `${job.city}, ${job.country}`,
            url: `https://gooddevhunting.com/jobs/${job.id}`,
        }

        const profileData = {
            name: profile.fullName,
            skills: profile.techStack.map((tech) => tech.name).join(', '),
            position: profile.position,
            seniority: profile.seniority,
        }

        // Prepare the messages for the LLM
        const messages = [
            {
                role: 'system',
                content: EMAIL_PROMPT,
            },
            {
                role: 'user',
                content: JSON.stringify({
                    job: jobData,
                    profile: profileData,
                    matchReason,
                }),
            },
        ]

        // Generate the response with JSON format
        const jsonResponse = await groqService.generateResponse(messages, {
            json: true,
            temperature: 0.7, // Higher temperature for more creative emails
            maxTokens: 1000,
        })

        // Parse the JSON response
        const emailContent = JSON.parse(jsonResponse) as EmailContent

        return emailContent
    } catch (error) {
        console.error('Error generating email content:', error)
        // Return generic email content if generation fails
        return {
            subject: `New Job Opportunity: ${job.jobName}`,
            body: `
        Hello ${profile.fullName},
        
        We found a new job opportunity that matches your skills and preferences.
        
        Job Title: ${job.jobName}
        
        Check it out and apply at: https://gooddevhunting.com/jobs/${job.id}
        
        Best regards,
        Good Dev Hunting Team
      `,
        }
    }
}

export async function notifyMatchedProfiles(
    job: JobModel,
    matchingResults: MatchResult[],
): Promise<void> {
    try {

        // Filter matches with score above threshold (e.g., 70)
        const goodMatches = matchingResults.filter((match) => match.matchScore >= 70)
        const approvedProfiles = await findAllApprovedProfiles()

        // Find the corresponding profiles for good matches
        const matchedProfiles = goodMatches
            .map((match) => {
                const profile = approvedProfiles.find((p) => p.id === match.profileId)
                return {
                    profile,
                    matchReason: match.matchReason,
                }
            })
            .filter((item) => item.profile) // Filter out undefined profiles

        // Generate and send emails to each matched profile
        for (const { profile, matchReason } of matchedProfiles) {
            if (!profile) continue

            // Generate personalized email content
            const emailContent = await generateEmailContent(job, profile, matchReason)

            // TODO: Send the email using your email service
            console.log(`Sending email to ${profile.email}:`, emailContent)

            // Here you would call your email service, e.g.:
            // await emailService.sendEmail({
            //   to: profile.email,
            //   subject: emailContent.subject,
            //   body: emailContent.body
            // })
        }
    } catch (error) {
        console.error('Error notifying matched profiles:', error)
    }
}
