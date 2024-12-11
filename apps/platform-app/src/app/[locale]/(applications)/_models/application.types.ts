export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export interface Application {
    id: string
    profileId: string
    jobId: string
    status: ApplicationStatus
    appliedAt: string
    updatedAt: string
    coverLetter?: string
    notes?: string
}

export interface ApplicationWithRelations extends Application {
    job: {
        id: string
        title: string
        company: string
        location: string
        salary?: {
            min: number
            max: number
            currency: string
        }
    }
} 