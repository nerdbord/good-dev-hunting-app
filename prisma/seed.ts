import { PrismaClient, EmploymentType, PublishingState } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'dev@nerdbord.io' },
    update: {},
    create: {
      email: 'dev@nerdbord.io',
      profile: {
        create: {
          fullName: 'Richard Nerdbordowski',
          remoteOnly: true,
          bio: 'Little, sweet dog.',
          position: 'Front-end developer',
          seniority: 'Junior',
          state: PublishingState.APPROVED,
          employmentType: EmploymentType.CONTRACT,
          country: {
            create: {
              name: 'Poland',
              openForRelocation: true,
            },
          },
          city: {
            create: {
              name: 'Warsaw',
              openForRelocation: true,
            },
          },
        },
      },
    },
  })

  console.log({ user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
