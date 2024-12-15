export interface Job {
    title: string,
    brief: string, 
    requiredSkills: string[],
    usersWhoApplied: string[],
    salaryRange: string
    scopeOfDuties: string[]
    requirements: string[]
    benefits: string[]
    teamSize: number
    numberOfVacancies: number
    recruitmentSteps: number
    videocallSlots: Date[], //when setting up a job, you will be able to set up possible videocall hours, like on znanylekarz.pl
}