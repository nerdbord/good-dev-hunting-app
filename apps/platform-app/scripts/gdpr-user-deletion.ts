import { PrismaClient } from '@prisma/client'
import readline from 'readline'

const prisma = new PrismaClient()

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Function to prompt for email
function promptForEmail(): Promise<string> {
  return new Promise((resolve) => {
    rl.question('Enter user email to delete: ', (email) => {
      resolve(email.trim())
    })
  })
}

async function deleteUserData(email: string) {
  console.log(`Starting GDPR deletion process for user with email: ${email}...`)

  // Find the user by email
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      profile: {
        include: {
          contactRequests: true,
          jobMatches: true,
          profileViews: true,
          rejectionReasons: true,
        },
      },
      githubDetails: true,
      accounts: true,
      sentApplications: true,
      receivedApplications: true,
      contactRequests: true,
      createdJobs: {
        include: {
          matchedCandidates: true,
          techStack: true,
        },
      },
      messages: true,
      viewedProfiles: true,
    },
  })

  if (!user) {
    console.log(`No user found with email: ${email}`)
    return
  }

  console.log(`Found user: ${user.id}`)

  // Start a transaction to ensure all related data is deleted or none
  try {
    await prisma.$transaction(async (tx) => {
      // Delete messages sent by the user
      if (user.messages.length > 0) {
        console.log(`Deleting ${user.messages.length} messages...`)
        await tx.message.deleteMany({
          where: { senderId: user.id },
        })
      }

      // Delete profile views
      if (user.viewedProfiles.length > 0) {
        console.log(`Deleting ${user.viewedProfiles.length} profile views...`)
        await tx.profileView.deleteMany({
          where: { viewerId: user.id },
        })
      }

      // Delete contact requests created by the user
      if (user.contactRequests.length > 0) {
        console.log(
          `Deleting ${user.contactRequests.length} contact requests...`,
        )
        await tx.contactRequest.deleteMany({
          where: { senderId: user.id },
        })
      }

      // Delete sent applications
      if (user.sentApplications.length > 0) {
        console.log(
          `Deleting ${user.sentApplications.length} sent job applications...`,
        )
        await tx.application.deleteMany({
          where: { applicantId: user.id },
        })
      }

      // Delete received applications
      if (user.receivedApplications.length > 0) {
        console.log(
          `Deleting ${user.receivedApplications.length} received job applications...`,
        )
        await tx.application.deleteMany({
          where: { jobOwnerId: user.id },
        })
      }

      // Delete jobs created by the user
      if (user.createdJobs.length > 0) {
        for (const job of user.createdJobs) {
          // First delete job candidates
          if (job.matchedCandidates.length > 0) {
            console.log(`Deleting job candidates for job ${job.id}...`)
            await tx.jobCandidate.deleteMany({
              where: { jobId: job.id },
            })
          }

          // Delete job tech stack
          if (job.techStack.length > 0) {
            console.log(`Deleting tech stack for job ${job.id}...`)
            await tx.technology.deleteMany({
              where: { jobId: job.id },
            })
          }
        }

        console.log(`Deleting ${user.createdJobs.length} created jobs...`)
        await tx.job.deleteMany({
          where: { createdById: user.id },
        })
      }

      // Delete accounts (OAuth connections)
      if (user.accounts.length > 0) {
        console.log(`Deleting ${user.accounts.length} connected accounts...`)
        await tx.account.deleteMany({
          where: { userId: user.id },
        })
      }

      // Delete GitHub details if they exist
      if (user.githubDetails) {
        console.log('Deleting GitHub details...')
        await tx.gitHubDetails.delete({
          where: { userId: user.id },
        })
      }

      // Delete profile if it exists
      if (user.profile) {
        // First delete profile related data
        if (user.profile.profileViews.length > 0) {
          console.log(
            `Deleting ${user.profile.profileViews.length} profile views...`,
          )
          await tx.profileView.deleteMany({
            where: { viewedProfileId: user.profile.id },
          })
        }

        if (user.profile.contactRequests.length > 0) {
          console.log(
            `Deleting ${user.profile.contactRequests.length} contact requests...`,
          )
          await tx.contactRequest.deleteMany({
            where: { profileId: user.profile.id },
          })
        }

        if (user.profile.rejectionReasons.length > 0) {
          console.log(
            `Deleting ${user.profile.rejectionReasons.length} rejection reasons...`,
          )
          await tx.rejectionReason.deleteMany({
            where: { profileId: user.profile.id },
          })
        }

        if (user.profile.jobMatches.length > 0) {
          console.log(
            `Deleting ${user.profile.jobMatches.length} job matches...`,
          )
          await tx.jobCandidate.deleteMany({
            where: { profileId: user.profile.id },
          })
        }

        console.log('Deleting user profile...')
        await tx.profile.delete({
          where: { userId: user.id },
        })
      }

      // Finally, delete the user
      console.log('Deleting user account...')
      await tx.user.delete({
        where: { id: user.id },
      })
    })

    console.log(`Successfully deleted all data for user with email: ${email}`)

    // Log the deletion for audit purposes
    const now = new Date()
    console.log(`GDPR deletion completed at: ${now.toISOString()}`)

    // Here you could also write to a log file or database for compliance records
    // For a complete GDPR compliance, you might want to create a separate table to log deletions
  } catch (error) {
    console.error('Error during deletion process:', error)
    throw error
  }
}

async function main() {
  try {
    const email = await promptForEmail()
    await deleteUserData(email)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  } finally {
    rl.close()
    await prisma.$disconnect()
  }
}

main()
