import {
  Currency,
  EmploymentType,
  PrismaClient,
  PublishingState,
  Role,
} from '@prisma/client'

const prisma = new PrismaClient()
//
// Function to generate a random avatar URL following the scheme from GitHub
function getRandomAvatarUrl(): string {
  // Generates a random number between 10,000,000 and 999,999,999 (8 or 9 digits)
  const randomId =
    Math.floor(Math.random() * (999999999 - 10000000 + 1)) + 10000000
  return `https://avatars.githubusercontent.com/u/${randomId}?v=4`
}

async function main() {
  // --- Users from Poland (Warsaw) ---
  // User 1: Frontend Developer - Alice Johnson
  await prisma.user.create({
    data: {
      email: 'alice@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'alice-frontend',
          fullName: 'Alice Johnson',
          linkedIn: 'https://linkedin.com/in/alicejohnson',
          bio: 'Alice is a passionate frontend developer with a keen eye for design. She loves translating complex design challenges into intuitive and engaging user interfaces. In her free time, she experiments with new web technologies and frameworks.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: true,
          remoteOnly: false,
          position: 'Frontend',
          seniority: 'Junior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'React' }, create: { name: 'React' } },
              { where: { name: 'TypeScript' }, create: { name: 'TypeScript' } },
              { where: { name: 'HTML' }, create: { name: 'HTML' } },
              { where: { name: 'CSS' }, create: { name: 'CSS' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.FULL_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 30,
          hourlyRateMax: 50,
          currency: Currency.PLN,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
              { where: { name: 'Polish' }, create: { name: 'Polish' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Warsaw' },
              create: { name: 'Warsaw' },
            },
          },
        },
      },
    },
  })

  // User 2: Backend Developer - Bob Smith
  await prisma.user.create({
    data: {
      email: 'bob@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST, Role.TEAM] },
      profile: {
        create: {
          slug: 'bob-backend',
          fullName: 'Bob Smith',
          linkedIn: 'https://linkedin.com/in/bobsmith',
          bio: 'Bob is an experienced backend developer specializing in building scalable APIs and microservices. His analytical approach and problem-solving skills have driven numerous projects to success. Always eager to learn new techniques in cloud computing and database optimization.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'Backend',
          seniority: 'Mid-level',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Node.js' }, create: { name: 'Node.js' } },
              { where: { name: 'Express' }, create: { name: 'Express' } },
              { where: { name: 'PostgreSQL' }, create: { name: 'PostgreSQL' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.CONTRACT] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 40,
          hourlyRateMax: 60,
          currency: Currency.PLN,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Warsaw' },
              create: { name: 'Warsaw' },
            },
          },
        },
      },
    },
  })

  // User 3: Fullstack Developer - Charlie Davis
  await prisma.user.create({
    data: {
      email: 'charlie@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'charlie-fullstack',
          fullName: 'Charlie Davis',
          linkedIn: 'https://linkedin.com/in/charliedavis',
          bio: 'Charlie is a fullstack developer with extensive experience in both frontend and backend technologies. He is known for his ability to design and implement complete solutions from scratch. His proficiency in modern web architectures makes him a valuable asset to any tech team.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'Fullstack',
          seniority: 'Senior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Angular' }, create: { name: 'Angular' } },
              { where: { name: 'Node.js' }, create: { name: 'Node.js' } },
              { where: { name: 'GraphQL' }, create: { name: 'GraphQL' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.PART_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 50,
          hourlyRateMax: 80,
          currency: Currency.PLN,
          language: {
            connectOrCreate: [
              { where: { name: 'Polish' }, create: { name: 'Polish' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Warsaw' },
              create: { name: 'Warsaw' },
            },
          },
        },
      },
    },
  })

  // User 4: Mobile Developer - Dana Lee
  await prisma.user.create({
    data: {
      email: 'dana@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'dana-mobile',
          fullName: 'Dana Lee',
          linkedIn: 'https://linkedin.com/in/danalee',
          bio: 'Dana is a mobile developer specializing in both iOS and Android platforms. With a flair for innovative app design, she continuously delivers intuitive mobile experiences. Her commitment to quality and user-centric design is evident in every project she undertakes.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: false,
          remoteOnly: false,
          position: 'Mobile',
          seniority: 'Junior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Swift' }, create: { name: 'Swift' } },
              { where: { name: 'Kotlin' }, create: { name: 'Kotlin' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.FULL_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 35,
          hourlyRateMax: 55,
          currency: Currency.PLN,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
              { where: { name: 'Polish' }, create: { name: 'Polish' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Warsaw' },
              create: { name: 'Warsaw' },
            },
          },
        },
      },
    },
  })

  // User 5: DevOps Specialist - Edward Brown
  await prisma.user.create({
    data: {
      email: 'edward@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'edward-devops',
          fullName: 'Edward Brown',
          linkedIn: 'https://linkedin.com/in/edwardbrown',
          bio: 'Edward is a seasoned DevOps specialist with a deep understanding of infrastructure automation and cloud services. He has a proven track record of optimizing deployment pipelines and ensuring high system availability. His expertise spans containerization, orchestration, and continuous integration.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'DevOps',
          seniority: 'Senior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Docker' }, create: { name: 'Docker' } },
              { where: { name: 'Kubernetes' }, create: { name: 'Kubernetes' } },
              { where: { name: 'AWS' }, create: { name: 'AWS' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.CONTRACT] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 60,
          hourlyRateMax: 90,
          currency: Currency.PLN,
          language: {
            connectOrCreate: [
              { where: { name: 'Polish' }, create: { name: 'Polish' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Warsaw' },
              create: { name: 'Warsaw' },
            },
          },
        },
      },
    },
  })

  // --- Users from Germany (Berlin) ---
  // User 6: QA Engineer - Fiona Müller
  await prisma.user.create({
    data: {
      email: 'fiona@example.de',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'fiona-qa',
          fullName: 'Fiona Müller',
          linkedIn: 'https://linkedin.com/in/fionamuller',
          bio: 'Fiona is a dedicated QA engineer with a sharp eye for detail. She excels in designing test cases and automating test suites to ensure robust software quality. Her systematic approach has significantly reduced bugs in multiple high-profile projects.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'QA',
          seniority: 'Mid-level',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Selenium' }, create: { name: 'Selenium' } },
              { where: { name: 'Cypress' }, create: { name: 'Cypress' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.FULL_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 35,
          hourlyRateMax: 55,
          currency: Currency.EUR,
          language: {
            connectOrCreate: [
              { where: { name: 'German' }, create: { name: 'German' } },
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Berlin' },
              create: { name: 'Berlin' },
            },
          },
        },
      },
    },
  })

  // User 7: Project Manager - George Schmidt
  await prisma.user.create({
    data: {
      email: 'george@example.de',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST, Role.TEAM] },
      profile: {
        create: {
          slug: 'george-pm',
          fullName: 'George Schmidt',
          linkedIn: 'https://linkedin.com/in/georgeschmidt',
          bio: 'George is an accomplished project manager who brings order and clarity to complex projects. His strategic planning and communication skills have led cross-functional teams to consistently meet deadlines and exceed expectations. He thrives in dynamic environments where collaboration is key.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: false,
          remoteOnly: false,
          position: 'PM',
          seniority: 'Senior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'JIRA' }, create: { name: 'JIRA' } },
              { where: { name: 'Confluence' }, create: { name: 'Confluence' } },
              { where: { name: 'Slack' }, create: { name: 'Slack' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.PART_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 45,
          hourlyRateMax: 70,
          currency: Currency.EUR,
          language: {
            connectOrCreate: [
              { where: { name: 'German' }, create: { name: 'German' } },
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Berlin' },
              create: { name: 'Berlin' },
            },
          },
        },
      },
    },
  })

  // User 8: Data Scientist - Helen Fischer
  await prisma.user.create({
    data: {
      email: 'helen@example.de',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'helen-datascience',
          fullName: 'Helen Fischer',
          linkedIn: 'https://linkedin.com/in/helenfischer',
          bio: 'Helen is a data scientist with a knack for uncovering insights hidden in complex datasets. Her expertise in statistical modeling, machine learning, and data visualization has driven innovation in various data-centric projects. She is always exploring new analytical techniques to solve business challenges.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'DataScience',
          seniority: 'Junior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Python' }, create: { name: 'Python' } },
              { where: { name: 'Pandas' }, create: { name: 'Pandas' } },
              { where: { name: 'TensorFlow' }, create: { name: 'TensorFlow' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.FULL_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 50,
          hourlyRateMax: 75,
          currency: Currency.EUR,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Berlin' },
              create: { name: 'Berlin' },
            },
          },
        },
      },
    },
  })

  // User 9: Game Developer - Ian Weber
  await prisma.user.create({
    data: {
      email: 'ian@example.de',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'ian-gamedev',
          fullName: 'Ian Weber',
          linkedIn: 'https://linkedin.com/in/ianweber',
          bio: 'Ian is a creative game developer who specializes in crafting immersive gameplay experiences. His expertise in game physics, real-time rendering, and interactive storytelling has been showcased in several indie titles. He is passionate about pushing the boundaries of interactive entertainment.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'GameDev',
          seniority: 'Mid-level',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Unity' }, create: { name: 'Unity' } },
              { where: { name: 'C#' }, create: { name: 'C#' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.CONTRACT] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 40,
          hourlyRateMax: 65,
          currency: Currency.EUR,
          language: {
            connectOrCreate: [
              { where: { name: 'German' }, create: { name: 'German' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Berlin' },
              create: { name: 'Berlin' },
            },
          },
        },
      },
    },
  })

  // User 10: VR/AR Developer - Jessica Klein
  await prisma.user.create({
    data: {
      email: 'jessica@example.de',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'jessica-vr-ar',
          fullName: 'Jessica Klein',
          linkedIn: 'https://linkedin.com/in/jessicaklein',
          bio: 'Jessica is a VR/AR developer with an innovative approach to immersive technologies. She leverages cutting-edge tools to create virtual environments that blur the lines between reality and simulation. Her projects have been featured in tech conferences across Europe.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: true,
          remoteOnly: false,
          position: 'VR_AR',
          seniority: 'Senior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              {
                where: { name: 'Unreal Engine' },
                create: { name: 'Unreal Engine' },
              },
              { where: { name: 'C++' }, create: { name: 'C++' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.FULL_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 55,
          hourlyRateMax: 85,
          currency: Currency.EUR,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Berlin' },
              create: { name: 'Berlin' },
            },
          },
        },
      },
    },
  })

  // --- Users from USA (New York) ---
  // User 11: UX/UI Specialist - Kevin Taylor
  await prisma.user.create({
    data: {
      email: 'kevin@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'kevin-ux-ui',
          fullName: 'Kevin Taylor',
          linkedIn: 'https://linkedin.com/in/kevintaylor',
          bio: 'Kevin is a UX/UI specialist who excels at crafting intuitive digital experiences. His design philosophy centers on user empathy and iterative prototyping, ensuring that every interface is both beautiful and functional. He keeps up with the latest trends to deliver modern, accessible designs.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'UX_UI',
          seniority: 'Mid-level',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Figma' }, create: { name: 'Figma' } },
              { where: { name: 'Sketch' }, create: { name: 'Sketch' } },
              { where: { name: 'Adobe XD' }, create: { name: 'Adobe XD' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.PART_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 45,
          hourlyRateMax: 70,
          currency: Currency.USD,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'USA' },
              create: { name: 'USA' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'New York' },
              create: { name: 'New York' },
            },
          },
        },
      },
    },
  })

  // User 12: Crypto Developer - Laura Wilson
  await prisma.user.create({
    data: {
      email: 'laura@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'laura-crypto',
          fullName: 'Laura Wilson',
          linkedIn: 'https://linkedin.com/in/laurawilson',
          bio: 'Laura is a crypto developer deeply immersed in blockchain technologies. With expertise in smart contract development and decentralized applications, she has contributed to several innovative projects in the crypto space. Her forward-thinking approach drives secure and efficient digital asset solutions.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'Crypto',
          seniority: 'Senior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Solidity' }, create: { name: 'Solidity' } },
              { where: { name: 'Web3.js' }, create: { name: 'Web3.js' } },
              { where: { name: 'Ethereum' }, create: { name: 'Ethereum' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.CONTRACT] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 60,
          hourlyRateMax: 100,
          currency: Currency.USD,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'USA' },
              create: { name: 'USA' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'New York' },
              create: { name: 'New York' },
            },
          },
        },
      },
    },
  })

  // User 13: CyberSecurity Analyst - Mike Anderson
  await prisma.user.create({
    data: {
      email: 'mike@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST, Role.TEAM] },
      profile: {
        create: {
          slug: 'mike-cybersecurity',
          fullName: 'Mike Anderson',
          linkedIn: 'https://linkedin.com/in/mikeanderson',
          bio: 'Mike is a cybersecurity analyst with a strong foundation in protecting digital assets. His practical experience with threat analysis and penetration testing has helped organizations bolster their defenses. He is committed to continuous learning in the rapidly evolving field of cybersecurity.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'CyberSecurity',
          seniority: 'Junior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Firewalls' }, create: { name: 'Firewalls' } },
              { where: { name: 'IDS/IPS' }, create: { name: 'IDS/IPS' } },
              { where: { name: 'Metasploit' }, create: { name: 'Metasploit' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.FULL_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 40,
          hourlyRateMax: 65,
          currency: Currency.USD,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'USA' },
              create: { name: 'USA' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'New York' },
              create: { name: 'New York' },
            },
          },
        },
      },
    },
  })

  // User 14: SysAdmin - Nina Roberts
  await prisma.user.create({
    data: {
      email: 'nina@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'nina-sysadmin',
          fullName: 'Nina Roberts',
          linkedIn: 'https://linkedin.com/in/ninaroberts',
          bio: 'Nina is a reliable system administrator with comprehensive expertise in managing Linux environments and automation tools. Her proactive maintenance and troubleshooting skills ensure that IT infrastructures run smoothly and securely. She is a key contributor in optimizing server performance.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: false,
          remoteOnly: false,
          position: 'SysAdmin',
          seniority: 'Mid-level',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              { where: { name: 'Linux' }, create: { name: 'Linux' } },
              { where: { name: 'Bash' }, create: { name: 'Bash' } },
              { where: { name: 'Ansible' }, create: { name: 'Ansible' } },
            ],
          },
          employmentTypes: { set: [EmploymentType.PART_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 35,
          hourlyRateMax: 55,
          currency: Currency.USD,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'USA' },
              create: { name: 'USA' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'New York' },
              create: { name: 'New York' },
            },
          },
        },
      },
    },
  })

  // User 15: Product Designer - Oliver Martinez
  await prisma.user.create({
    data: {
      email: 'oliver@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST, Role.TEAM] },
      profile: {
        create: {
          slug: 'oliver-productdesigner',
          fullName: 'Oliver Martinez',
          linkedIn: 'https://linkedin.com/in/olivermartinez',
          bio: 'Oliver is a creative product designer who blends aesthetics with functionality. With a solid background in user research and prototyping, he creates designs that not only look appealing but also offer exceptional usability. His iterative approach has helped many products achieve market success.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: true,
          remoteOnly: false,
          position: 'Product_Designer',
          seniority: 'Senior',
          isOpenForWork: true,
          techStack: {
            connectOrCreate: [
              {
                where: { name: 'Adobe Creative Suite' },
                create: { name: 'Adobe Creative Suite' },
              },
              { where: { name: 'InVision' }, create: { name: 'InVision' } },
              {
                where: { name: 'UserTesting' },
                create: { name: 'UserTesting' },
              },
            ],
          },
          employmentTypes: { set: [EmploymentType.FULL_TIME] },
          state: PublishingState.APPROVED,
          hourlyRateMin: 50,
          hourlyRateMax: 80,
          currency: Currency.USD,
          language: {
            connectOrCreate: [
              { where: { name: 'English' }, create: { name: 'English' } },
              { where: { name: 'Spanish' }, create: { name: 'Spanish' } },
            ],
          },
          country: {
            connectOrCreate: {
              where: { name: 'USA' },
              create: { name: 'USA' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'New York' },
              create: { name: 'New York' },
            },
          },
        },
      },
    },
  })

  console.log(
    'Seed data created: 15 diverse developer/specialist profiles with random GitHub avatars',
  )
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
