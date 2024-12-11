import { ApplicationWithRelations } from './application.types'

export const mockApplication: ApplicationWithRelations = {
    id: 'app-001',
    profileId: '99c68fc0-02e6-4f68-adbd-62a57c856f5c',
    jobId: 'job-001',
    status: 'pending',
    appliedAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    coverLetter: 'I am very interested in this position and believe my skills match your requirements...',
    notes: 'Candidate has strong React experience',
    job: {
        id: 'job-001',
        title: 'Senior Frontend Developer',
        company: 'Tech Corp',
        location: 'Remote',
        salary: {
            min: 80000,
            max: 120000,
            currency: 'USD'
        }
    }
}

export const findApplicationById = async (id: string): Promise<ApplicationWithRelations | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockApplication
} 