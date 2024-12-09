export interface Job {
    title: string,
    brief: string, 
    requiredSkills: string[],
    usersWhoApplied: string[],
    videocallSlots: Date[], //when setting up a job, you will be able to set up possible videocall hours, like on znanylekarz.pl
}