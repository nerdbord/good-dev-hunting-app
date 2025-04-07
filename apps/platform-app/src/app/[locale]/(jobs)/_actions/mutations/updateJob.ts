'use server'

import { getJobById, updateJob } from '@/backend/job/job.service'
import { type Job, type JobWithRelations } from '@/backend/job/job.types'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { withSentry } from '@/utils/errHandling'
import { PublishingState } from '@prisma/client'

// Type for job data with tech stack
interface JobDataWithTechStack extends Partial<Job> {
    techStack?: {
        connectOrCreate?: Array<{
            where: { name: string };
            create: { name: string };
        }>;
    };
}

/**
 * Helper function to compare two values in a way that handles specific edge cases:
 * - String comparisons are case-insensitive (very important for enum values like budgetType)
 * - Objects and arrays are compared by their JSON string representation
 * - null and undefined are treated as equal
 */
function safeCompare(a: unknown, b: unknown): boolean {
    // Handle null/undefined
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    
    // Handle strings - compare case-insensitive
    if (typeof a === 'string' && typeof b === 'string') {
        return a.toLowerCase() === b.toLowerCase();
    }
    
    // Handle arrays
    if (Array.isArray(a) && Array.isArray(b)) {
        return JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());
    }
    
    // Handle objects (excluding arrays)
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null && !Array.isArray(a) && !Array.isArray(b)) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    
    // For all other types, use strict equality
    return a === b;
}

/**
 * Check if any meaningful job data has changed
 * @param existingJob The current job data
 * @param newData The new job data being submitted
 * @returns True if the job data has changed meaningfully
 */
function hasJobDataChanged(existingJob: JobWithRelations, newData: JobDataWithTechStack): boolean {
    // Fields to check for meaningful changes
    const fieldsToCompare = [
        'jobName', 'projectBrief', 'budgetType', 'currency', 
        'minBudgetForProjectRealisation', 'maxBudgetForProjectRealisation',
        'contractType', 'country', 'city', 'remoteOnly'
    ] as (keyof Job)[];
    
    // Check each simple field for changes
    for (const field of fieldsToCompare) {
        if (field in newData && !safeCompare(newData[field], existingJob[field])) {
            return true;
        }
    }
    
    // Check arrays separately (need special handling)
    if (newData.employmentTypes && !safeCompare(newData.employmentTypes, existingJob.employmentTypes)) {
        return true;
    }
    
    if (newData.employmentModes && !safeCompare(newData.employmentModes, existingJob.employmentModes)) {
        return true;
    }
    
    // Check techStack if present (more complex structure)
    if (newData.techStack?.connectOrCreate && existingJob.techStack) {
        console.log(`[hasJobDataChanged] Comparing tech stack:`, {
            existingTechStack: existingJob.techStack.map(tech => tech.name),
            newTechStack: newData.techStack.connectOrCreate.map((item: { create: { name: string } }) => item.create.name)
        });
        
        const existingTechNames = existingJob.techStack.map(tech => tech.name).sort();
        const newTechNames = newData.techStack.connectOrCreate.map((item: { create: { name: string } }) => item.create.name).sort();
        
        if (!safeCompare(newTechNames, existingTechNames)) {
            return true;
        }
    }
    
    // No changes detected
    return false;
}

export const updateJobAction = withSentry(
    async (id: string, data: JobDataWithTechStack) => {
        const { user } = await getAuthorizedUser()

        // For anonymous jobs, user can be optional (not logged in)
        const job = await getJobById(id)

        if (!job) {
            throw new Error(`Job with id ${id} not found`)
        }

        // Handle three scenarios:
        // 1. Job is anonymous (no createdById) - anyone can update it
        // 2. Job has an owner and user is logged in as the owner
        // 3. Job has an owner but user is not the owner or not logged in

        if (job.createdById) {
            // If job has an owner, check if user is authorized
            if (!user) {
                throw new Error('User not logged in')
            }

            if (job.createdById !== user.id) {
                throw new Error('You are not authorized to update this job')
            }
        }

        // Check if any data has actually changed
        const hasChanged = hasJobDataChanged(job, data);

        // If job is anonymous or user is the owner, proceed with update
        const updatedJob = await updateJob(id, {
            ...data,
            // Only set state to DRAFT if data has actually changed and the job is not already in DRAFT state
            ...(hasChanged && job.state !== PublishingState.DRAFT ? { state: PublishingState.DRAFT } : {})
        })
        
        return updatedJob
    },

)
