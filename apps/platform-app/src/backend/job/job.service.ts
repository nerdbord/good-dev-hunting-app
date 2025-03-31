import { type SubmissionFormData } from '@/app/[locale]/(jobs)/_utils/groq/schema'
import { prisma } from '@/lib/prismaClient'
import { Currency, PublishingState } from '@prisma/client'
import { type Job, type JobWithRelations } from './job.types'

export async function createJob(
    data: Partial<SubmissionFormData>,
    userId?: string,
): Promise<JobWithRelations> {
    // Prepare the base job data
    const jobData: any = {
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
        country: data.employmentDetails?.candidateLocations?.[0] || 'Poland',
        city: data.employmentDetails?.candidateLocations?.[1] || 'Warsaw',
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

    const job = await prisma.job.create({
        data: jobData,
        include: {
            techStack: true,
            createdBy: true,
            applications: true,
        },
    })

    return job as unknown as JobWithRelations
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
    console.log('DEBUG - job.service updateJob called with:', {
        id,
        dataKeys: Object.keys(data),
        state: data.state
    });

    // Ensure currency is always a valid value
    if (data.budgetType === 'requestQuote') {
        // For request quote, ensure currency is set to a default value
        data.currency = Currency.PLN

        // Set budget values to null for request quote
        data.minBudgetForProjectRealisation = null
        data.maxBudgetForProjectRealisation = null
    } else if (!data.currency) {
        // Ensure a default currency even for fixed budget if none is provided
        data.currency = Currency.PLN
    }

    console.log('DEBUG - Data after currency adjustments:', {
        budgetType: data.budgetType,
        currency: data.currency,
        minBudget: data.minBudgetForProjectRealisation,
        maxBudget: data.maxBudgetForProjectRealisation,
        state: data.state
    });

    const updatedJob = await prisma.job.update({
        where: {
            id,
        },
        data,
    })

    console.log('DEBUG - Updated job result:', {
        id: updatedJob.id,
        state: updatedJob.state
    });

    return updatedJob as unknown as Job
}

export async function publishJob(id: string): Promise<Job> {
    const publishedJob = await prisma.job.update({
        where: {
            id,
        },
        data: {
            state: PublishingState.APPROVED,
        },
    })

    return publishedJob as unknown as Job
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
