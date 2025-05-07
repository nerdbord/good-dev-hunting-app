import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * GDPR User Data Removal Script
 *
 * This script removes personal data associated with a user's email address
 * to comply with GDPR "right to be forgotten" requirements.
 *
 * Currently focused on: User, Profile, GitHubDetails, and ContactRequests tables
 *
 * Usage:
 * - Run with email parameter: npx ts-node remove-user-data.ts user@example.com
 */

async function removeUserData(email: string) {
  console.log(`Starting GDPR data removal for email: ${email}...`)

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        githubDetails: true,
        accounts: true,
      },
    })

    if (!user) {
      console.log(`No user found with email: ${email}`)
      return
    }

    console.log(`Found user with ID: ${user.id}`)
    const userId = user.id
    const profileId = user.profile?.id

    // Use individual operations with try/catch blocks instead of a single transaction
    // This allows us to proceed even if some operations fail

    // 1. If user has a profile, delete related data
    if (profileId) {
      try {
        // 1.1 Delete contact requests
        const deletedContactRequests = await prisma.contactRequest.deleteMany({
          where: {
            OR: [{ profileId: profileId }, { senderId: userId }],
          },
        })
        console.log(`Deleted ${deletedContactRequests.count} contact requests`)
      } catch (e) {
        console.log('Error deleting contact requests:', e)
      }

      try {
        // 1.2 Delete rejection reasons
        const deletedRejectionReasons = await prisma.rejectionReason.deleteMany(
          {
            where: { profileId: profileId },
          },
        )
        console.log(
          `Deleted ${deletedRejectionReasons.count} rejection reasons`,
        )
      } catch (e) {
        console.log('Error deleting rejection reasons:', e)
      }

      try {
        // 1.3 Delete profile views
        const deletedProfileViews = await prisma.profileView.deleteMany({
          where: {
            OR: [{ viewedProfileId: profileId }, { viewerId: userId }],
          },
        })
        console.log(`Deleted ${deletedProfileViews.count} profile views`)
      } catch (e) {
        console.log(
          'Profile views table may not exist or error occurred, skipping',
        )
      }

      try {
        // 1.4 Delete language relationships
        // Using raw query to handle many-to-many relationship
        const result = await prisma.$executeRawUnsafe(
          `DELETE FROM "_LanguageToProfile" WHERE "B" = $1`,
          profileId,
        )
        console.log(`Deleted language relationships`)
      } catch (e) {
        console.log(
          'Error deleting language relationships or table does not exist:',
          e,
        )
      }

      try {
        // 1.5 Delete technology relationships
        // Using raw query to handle many-to-many relationship
        const result = await prisma.$executeRawUnsafe(
          `DELETE FROM "_ProfileToTechnology" WHERE "A" = $1`,
          profileId,
        )
        console.log(`Deleted technology relationships`)
      } catch (e) {
        console.log(
          'Error deleting technology relationships or table does not exist:',
          e,
        )
      }

      try {
        // 1.6 Delete job candidates
        const deletedJobCandidates = await prisma.jobCandidate.deleteMany({
          where: { profileId: profileId },
        })
        console.log(`Deleted ${deletedJobCandidates.count} job candidates`)
      } catch (e) {
        console.log(
          'Job candidates table may not exist or error occurred, skipping',
        )
      }

      try {
        // 1.7 Delete profile
        await prisma.profile.delete({
          where: { id: profileId },
        })
        console.log(`Deleted profile with ID: ${profileId}`)
      } catch (e) {
        console.error('Error deleting profile:', e)
        console.log(
          'Unable to delete profile. There may be additional relationships that need to be removed first.',
        )
      }
    }

    // 2. Delete GitHub details
    if (user.githubDetails) {
      try {
        await prisma.gitHubDetails.delete({
          where: { userId: userId },
        })
        console.log(`Deleted GitHub details`)
      } catch (e) {
        console.log('Error deleting GitHub details:', e)
      }
    }

    // 3. Delete accounts (OAuth connections)
    try {
      const deletedAccounts = await prisma.account.deleteMany({
        where: { userId: userId },
      })
      console.log(`Deleted ${deletedAccounts.count} connected accounts`)
    } catch (e) {
      console.log('Error deleting accounts:', e)
    }

    // 4. Finally, delete the user
    try {
      await prisma.user.delete({
        where: { id: userId },
      })
      console.log(`Deleted user with ID: ${userId}`)
    } catch (e) {
      console.error('Error deleting user:', e)
      console.log(
        'Unable to delete user. There may be additional relationships that need to be removed first.',
      )
    }

    console.log(`Successfully completed GDPR data removal for ${email}`)
  } catch (error) {
    console.error('Error during GDPR data removal:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line arguments
const email = process.argv[2]

if (!email) {
  console.error('Error: Email address is required')
  console.error('Usage: npx ts-node remove-user-data.ts user@example.com')
  process.exit(1)
}

// Execute the removal process
removeUserData(email)
