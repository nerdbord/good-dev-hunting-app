import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting profile updates...')

  // Find all profiles with users that have GitHub details
  const profilesWithGithub = await prisma.profile.findMany({
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
    },
  })

  console.log(`Found ${profilesWithGithub.length} profiles to process`)

  for (const profile of profilesWithGithub) {
    const githubUsername = profile.user.githubDetails?.username

    if (!githubUsername) {
      console.log(`Skipping profile ${profile.id} - no GitHub username found`)
      continue
    }

    await prisma.profile.update({
      where: { id: profile.id },
      data: { slug: githubUsername },
    })

    console.log(
      `Updated profile slug for ${profile.fullName} to: ${githubUsername}`,
    )
  }

  console.log(`Processed ${profilesWithGithub.length} profiles successfully!`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
