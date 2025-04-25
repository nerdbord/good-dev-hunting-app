import { type SubmissionFormData } from '@/app/[locale]/(jobs)/_utils/schema'
import { prisma } from '@/lib/prismaClient'
import { Currency, PublishingState, type Prisma } from '@prisma/client'
import { type Job, type JobWithRelations } from './job.types'

export async function createJob(
  data: Partial<SubmissionFormData>,
  userId?: string,
): Promise<JobWithRelations> {
  console.log(`[createJob] Creating new job with data:`, {
    taskName: data.taskName,
    technologies: data.technologies?.length,
    budget: data.budget
      ? {
          min: data.budget.min,
          max: data.budget.max,
          currency: data.budget.currency,
        }
      : null,
    userId: userId ?? 'anonymous',
  })

  // Prepare the base job data

  const jobData: Prisma.JobCreateInput = {
    jobName: data.taskName || 'Untitled Job',
    projectBrief: data.projectBrief || '',
    techStack: {
      connectOrCreate: (data.technologies || []).map((tech: string) => ({
        where: { name: tech },
        create: { name: tech },
      })),
    },
    budgetType:
      data.budget?.min && data.budget?.max ? 'FIXED' : 'REQUEST_QUOTE',
    currency: (data.budget?.currency as Currency) || Currency.PLN,
    minBudgetForProjectRealisation: data.budget?.min || null,
    maxBudgetForProjectRealisation: data.budget?.max || null,
    contractType: (data.employmentDetails?.contractType || 'B2B') as string,
    employmentTypes: data.employmentDetails?.workTime
      ? [data.employmentDetails.workTime as string]
      : ['FULL_TIME'],
    employmentModes: data.employmentDetails?.workMode
      ? [data.employmentDetails.workMode as string]
      : ['Remote'],
    country: data.employmentDetails?.country || 'Poland',
    city: data.employmentDetails?.city || 'Warsaw',
    remoteOnly: data.employmentDetails?.workMode === 'Remote',
    state: PublishingState.DRAFT,
    terms: true,
  }

  // Add user relation only if userId is provided
  if (userId) {
    jobData.createdBy = {
      connect: {
        id: userId,
      },
    }
  }

  try {
    const job = await prisma.job.create({
      data: jobData,
      include: {
        techStack: true,
        createdBy: true,
        applications: true,
      },
    })

    console.log(
      `[createJob] Job created successfully with ID ${job.id}, state: ${job.state}`,
    )
    return job as unknown as JobWithRelations
  } catch (error) {
    console.error('[createJob] Error creating job:', error)
    throw error
  }
}

export async function getJobById(id: string): Promise<JobWithRelations | null> {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
    include: {
      techStack: true,
      createdBy: true,
      applications: true,
    },
  })

  return job as unknown as JobWithRelations | null
}

export async function updateJob(id: string, data: Partial<Job>): Promise<Job> {
  const existingJob = await getJobById(id)
  if (!existingJob) {
    throw new Error(`Job with id ${id} not found`)
  }

  console.log(
    `[updateJob] Updating job ${id}, current state: ${existingJob.state}, updating fields:`,
    Object.keys(data).join(', '),
  )

  // Ensure currency is always a valid value
  if (data.budgetType === 'requestQuote') {
    data.currency = Currency.PLN
    data.minBudgetForProjectRealisation = null
    data.maxBudgetForProjectRealisation = null
  } else if (!data.currency) {
    data.currency = Currency.PLN
  }

  try {
    const updatedJob = await prisma.job.update({
      where: { id },
      data,
    })

    if (data.state && data.state !== existingJob.state) {
      console.log(
        `[updateJob] Job ${id} state changed from ${existingJob.state} to ${data.state}`,
      )
    }

    console.log(
      `[updateJob] Job ${id} updated successfully, new state: ${updatedJob.state}`,
    )
    return updatedJob as unknown as Job
  } catch (error) {
    console.error(`[updateJob] Error updating job ${id}:`, error)
    throw error
  }
}

export async function publishJob(id: string): Promise<Job> {
  try {
    // First check if the job exists
    const job = await getJobById(id)
    if (!job) {
      throw new Error(`Job with id ${id} not found`)
    }

    console.log(
      `[publishJob] Publishing job ${id}, current state: ${job.state}`,
    )

    // Update the job state to APPROVED
    const publishedJob = await prisma.job.update({
      where: {
        id,
      },
      data: {
        state: PublishingState.APPROVED,
      },
    })

    // Verify the state was updated successfully
    if (publishedJob.state !== PublishingState.APPROVED) {
      console.warn(
        `[publishJob] State not updated correctly for job ${id}, forcing update`,
      )

      // Force a second update if needed (should rarely happen)
      await prisma.job.update({
        where: { id },
        data: { state: PublishingState.APPROVED },
      })
    }

    return publishedJob as unknown as Job
  } catch (error) {
    console.error(`[publishJob] Error publishing job ${id}:`, error)
    throw error
  }
}

export async function getJobsByUserId(
  userId: string,
): Promise<JobWithRelations[]> {
  const jobs = await prisma.job.findMany({
    where: {
      createdById: userId,
    },
    include: {
      techStack: true,
      applications: true,
    },
  })

  return jobs as unknown as JobWithRelations[]
}

export async function getPublishedJobs(): Promise<JobWithRelations[]> {
  const jobs = await prisma.job.findMany({
    where: {
      state: PublishingState.APPROVED,
    },
    include: {
      techStack: true,
      createdBy: true,
    },
  })

  return jobs as unknown as JobWithRelations[]
}

/**
 * Rejects a job by setting its state to REJECTED
 * Used when a job fails verification during the publishing process
 */
export async function rejectJob(id: string): Promise<Job> {
  try {
    // First check if the job exists
    const job = await getJobById(id)
    if (!job) {
      throw new Error(`Job with id ${id} not found`)
    }

    console.log(`[rejectJob] Rejecting job ${id}, current state: ${job.state}`)

    // Update the job state to REJECTED
    const rejectedJob = await prisma.job.update({
      where: {
        id,
      },
      data: {
        state: PublishingState.REJECTED,
      },
    })

    console.log(`[rejectJob] Job ${id} rejected successfully`)
    return rejectedJob as unknown as Job
  } catch (error) {
    console.error(`[rejectJob] Error rejecting job ${id}:`, error)
    throw error
  }
}

/**
 * Expires job listings that are older than the specified number of days
 * @param daysOld The number of days after which a job should be expired
 * @returns The number of jobs that were expired
 */
export async function expireOldJobs(daysOld = 30): Promise<{ count: number }> {
  // Calculate the date threshold (now - daysOld)
  const thresholdDate = new Date()
  thresholdDate.setDate(thresholdDate.getDate() - daysOld)

  // Find all APPROVED jobs that were created before the threshold date
  const result = await prisma.job.updateMany({
    where: {
      state: PublishingState.APPROVED,
      createdAt: {
        lt: thresholdDate,
      },
    },
    data: {
      state: PublishingState.DRAFT, // Mark as DRAFT to hide from public view
    },
  })

  return { count: result.count }
}

/**
 * Deletes anonymous job postings (those without a user association)
 * that are older than the specified number of days
 * @param daysOld The number of days after which an anonymous job should be deleted
 * @returns The number of jobs that were deleted
 */
export async function cleanupAnonymousJobs(
  daysOld = 7,
): Promise<{ count: number }> {
  // Calculate the date threshold (now - daysOld)
  const thresholdDate = new Date()
  thresholdDate.setDate(thresholdDate.getDate() - daysOld)

  // Find and delete anonymous jobs (createdById is null) that are older than the threshold
  const result = await prisma.job.deleteMany({
    where: {
      createdById: null,
      createdAt: {
        lt: thresholdDate,
      },
    },
  })

  return { count: result.count }
}
