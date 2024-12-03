import { EmploymentType, PrismaClient, PublishingState } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'dev@nerdbord.io' },
    update: {},
    create: {
      email: 'dev@nerdbord.io',
      profile: {
        create: {
          slug: 'richard',
          fullName: 'Richard Nerdbordowski',
          remoteOnly: true,
          bio: 'Little, sweet dog.',
          position: 'Front-end developer',
          seniority: 'Junior',
          state: PublishingState.APPROVED,
          employmentTypes: {
            set: [EmploymentType.FULL_TIME],
          },
          country: {
            create: {
              name: 'Poland',
            },
          },
          openForCountryRelocation: true,
          city: {
            create: {
              name: 'Warsaw',
            },
          },
          openForCityRelocation: true,
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
