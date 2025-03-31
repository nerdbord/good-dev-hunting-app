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

// Helper function to compare objects and see if they have changed
function hasJobDataChanged(existingJob: JobWithRelations, newData: JobDataWithTechStack): boolean {
    console.log('DEBUG - Comparing job data:');
    console.log('Existing job state:', existingJob.state);
    
    // Fields to check for meaningful changes
    const fieldsToCompare = [
        'jobName', 'projectBrief', 'budgetType', 'currency', 
        'minBudgetForProjectRealisation', 'maxBudgetForProjectRealisation',
        'contractType', 'country', 'city', 'remoteOnly'
    ] as (keyof Job)[];
    
    for (const field of fieldsToCompare) {
        if (field in newData && newData[field] !== existingJob[field]) {
            console.log('DEBUG - Field changed:', field);
            console.log('  Old value:', existingJob[field]);
            console.log('  New value:', newData[field]);
            return true;
        }
    }
    
    // Check arrays separately (need special handling)
    if (newData.employmentTypes && JSON.stringify(newData.employmentTypes.sort()) !== JSON.stringify(existingJob.employmentTypes.sort())) {
        console.log('DEBUG - Employment types changed');
        console.log('  Old:', existingJob.employmentTypes);
        console.log('  New:', newData.employmentTypes);
        return true;
    }
    
    if (newData.employmentModes && JSON.stringify(newData.employmentModes.sort()) !== JSON.stringify(existingJob.employmentModes.sort())) {
        console.log('DEBUG - Employment modes changed');
        console.log('  Old:', existingJob.employmentModes);
        console.log('  New:', newData.employmentModes);
        return true;
    }
    
    // Check techStack if present (more complex structure)
    if (newData.techStack?.connectOrCreate && existingJob.techStack) {
        const existingTechNames = existingJob.techStack.map(tech => tech.name).sort();
        const newTechNames = newData.techStack.connectOrCreate.map((item: { create: { name: string } }) => item.create.name).sort();
        
        if (JSON.stringify(existingTechNames) !== JSON.stringify(newTechNames)) {
            console.log('DEBUG - Tech stack changed');
            console.log('  Old:', existingTechNames);
            console.log('  New:', newTechNames);
            return true;
        }
    }
    
    console.log('DEBUG - No changes detected in job data');
    return false;
}

export const updateJobAction = withSentry(
    async (id: string, data: JobDataWithTechStack) => {
        console.log('DEBUG - updateJobAction called with id:', id);
        
        const { user } = await getAuthorizedUser()

        // For anonymous jobs, user can be optional (not logged in)
        const job = await getJobById(id)

        if (!job) {
            throw new Error(`Job with id ${id} not found`)
        }

        console.log('DEBUG - Current job state:', job.state);
        console.log('DEBUG - Received update data:', JSON.stringify(data, null, 2));

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
        console.log('DEBUG - Has job data changed?', hasChanged);

        // If job is anonymous or user is the owner, proceed with update
        const updatedJob = await updateJob(id, {
            ...data,
            // Only set state to DRAFT if data has actually changed
            ...(hasChanged ? { state: PublishingState.DRAFT } : {})
        })
        
        console.log('DEBUG - Job state after update:', updatedJob.state);
        return updatedJob
    },
)
