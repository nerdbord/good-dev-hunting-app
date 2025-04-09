import { prisma } from '@/lib/prismaClient'
import { type Prisma } from '@prisma/client'
import {
  type JobCandidate,
  type JobCandidateWithRelations,
  type MatchResultInput,
} from './job-candidate.types'

/**
 * Creates or updates job candidate matches for a specific job.
 * Uses upsert to avoid duplicates and allow re-running the matching process.
 *
 * @param jobId The ID of the job for which matches are being saved.
 * @param matches An array of match results from the AI service.
 * @returns A promise resolving to the list of created or updated JobCandidate records.
 */
export async function saveJobCandidates(
  jobId: string,
  matches: MatchResultInput[],
): Promise<JobCandidate[]> {
  console.log(
    `[saveJobCandidates] Saving ${matches.length} candidates for job ${jobId}`,
  )

  if (!matches || matches.length === 0) {
    console.log('[saveJobCandidates] No matches provided, skipping save.')
    return []
  }

  const operations = matches.map((match) => {
    const data: Prisma.JobCandidateCreateInput = {
      job: { connect: { id: jobId } },
      profile: { connect: { id: match.profileId } },
      matchScore: Math.round(match.matchScore), // Ensure integer score
      technicalSkillsScore: Math.round(match.matchBreakdown.technicalSkills),
      experienceLevelScore: Math.round(match.matchBreakdown.experienceLevel),
      employmentPreferencesScore: Math.round(
        match.matchBreakdown.employmentPreferences,
      ),
      additionalFactorsScore: Math.round(
        match.matchBreakdown.additionalFactors,
      ),
      matchReason: match.matchReason,
    }

    return prisma.jobCandidate.upsert({
      where: {
        jobId_profileId: {
          // Using the @@unique constraint
          jobId: jobId,
          profileId: match.profileId,
        },
      },
      create: data,
      update: {
        // Define what fields to update if the record exists
        matchScore: data.matchScore,
        technicalSkillsScore: data.technicalSkillsScore,
        experienceLevelScore: data.experienceLevelScore,
        employmentPreferencesScore: data.employmentPreferencesScore,
        additionalFactorsScore: data.additionalFactorsScore,
        matchReason: data.matchReason,
        updatedAt: new Date(), // Manually update updatedAt on upsert
      },
    })
  })

  try {
    // Execute all upsert operations within a transaction
    const savedCandidates = await prisma.$transaction(operations)
    console.log(
      `[saveJobCandidates] Successfully saved/updated ${savedCandidates.length} candidates for job ${jobId}`,
    )
    return savedCandidates
  } catch (error) {
    console.error(
      `[saveJobCandidates] Error saving candidates for job ${jobId}:`,
      error,
    )
    // Depending on requirements, you might want to handle partial failures
    // or simply re-throw the error.
    throw new Error(`Failed to save job candidates for job ${jobId}`)
  }
}

/**
 * Retrieves all matched candidates for a specific job, sorted by match score.
 *
 * @param jobId The ID of the job.
 * @param limit Optional limit for the number of results.
 * @returns A promise resolving to an array of JobCandidateWithRelations.
 */
export async function getJobCandidatesForJob(
  jobId: string,
  limit?: number,
): Promise<JobCandidateWithRelations[]> {
  console.log(`[getJobCandidatesForJob] Fetching candidates for job ${jobId}`)
  try {
    const candidates = await prisma.jobCandidate.findMany({
      where: { jobId },
      include: {
        // Include selected fields from related models
        job: {
          select: { id: true, jobName: true },
        },
        profile: {
          select: {
            id: true,
            fullName: true,
            slug: true,
            position: true,
            seniority: true,
            userId: true,
          },
        },
      },
      orderBy: {
        matchScore: 'desc', // Order by highest score first
      },
      take: limit, // Apply limit if provided
    })
    console.log(
      `[getJobCandidatesForJob] Found ${candidates.length} candidates for job ${jobId}`,
    )
    return candidates as JobCandidateWithRelations[] // Cast to the correct type
  } catch (error) {
    console.error(
      `[getJobCandidatesForJob] Error fetching candidates for job ${jobId}:`,
      error,
    )
    throw error
  }
}

/**
 * Deletes all candidate matches associated with a specific job.
 * Useful when a job is deleted or needs re-matching.
 *
 * @param jobId The ID of the job whose candidates should be deleted.
 * @returns A promise resolving to the count of deleted records.
 */
export async function deleteJobCandidatesForJob(
  jobId: string,
): Promise<{ count: number }> {
  console.log(
    `[deleteJobCandidatesForJob] Deleting candidates for job ${jobId}`,
  )
  try {
    const result = await prisma.jobCandidate.deleteMany({
      where: { jobId },
    })
    console.log(
      `[deleteJobCandidatesForJob] Deleted ${result.count} candidates for job ${jobId}`,
    )
    return result
  } catch (error) {
    console.error(
      `[deleteJobCandidatesForJob] Error deleting candidates for job ${jobId}:`,
      error,
    )
    throw error
  }
}

/**
 * Retrieves a specific job candidate match by its unique ID.
 *
 * @param id The unique ID of the JobCandidate record.
 * @returns A promise resolving to the JobCandidateWithRelations or null if not found.
 */
export async function getJobCandidateById(
  id: string,
): Promise<JobCandidateWithRelations | null> {
  console.log(`[getJobCandidateById] Fetching job candidate with ID ${id}`)
  try {
    const candidate = await prisma.jobCandidate.findUnique({
      where: { id },
      include: {
        job: {
          select: { id: true, jobName: true },
        },
        profile: {
          select: {
            id: true,
            fullName: true,
            slug: true,
            position: true,
            seniority: true,
            userId: true,
          },
        },
      },
    })
    if (candidate) {
      console.log(`[getJobCandidateById] Found candidate with ID ${id}`)
    } else {
      console.log(`[getJobCandidateById] Candidate with ID ${id} not found`)
    }
    return candidate as JobCandidateWithRelations | null
  } catch (error) {
    console.error(
      `[getJobCandidateById] Error fetching candidate with ID ${id}:`,
      error,
    )
    throw error
  }
}
