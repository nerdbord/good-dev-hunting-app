import {
  Currency,
  EmploymentType,
  PrismaClient,
  PublishingState,
  Role,
} from '@prisma/client'

const prisma = new PrismaClient()

// Function to generate a random avatar URL following the scheme from GitHub
function getRandomAvatarUrl(): string {
  // Generates a random number between 10,000,000 and 999,999,999 (8 or 9 digits)
  const randomId =
    Math.floor(Math.random() * (999999999 - 10000000 + 1)) + 10000000
  return `https://avatars.githubusercontent.com/u/${randomId}?v=4`
}

// Helper function to create tech stack entries
const createTechStack = (techNames: string[]) => {
  return {
    connectOrCreate: techNames.map((name) => ({
      where: { name },
      create: { name },
    })),
  }
}

// Helper function to create language entries
const createLanguages = (langNames: string[]) => {
  return {
    connectOrCreate: langNames.map((name) => ({
      where: { name },
      create: { name },
    })),
  }
}

async function main() {
  console.log('Starting seeding process...')

  // Clear existing users and profiles to avoid conflicts (optional, but recommended for clean seeding)
  // Be careful with this in production environments!
  console.log('Deleting existing profiles and users...')
  await prisma.profile.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('Existing data deleted.')

  // --- Frontend Developers ---

  // Frontend Dev 1: Intern React Developer
  await prisma.user.create({
    data: {
      email: 'anna.kowalska.fe.intern@example.com', // Zmieniono email dla jasności
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'anna-kowalska-frontend-intern', // Zmieniono slug
          fullName: 'Anna Kowalska',
          linkedIn: 'https://linkedin.com/in/annakowalskafeintern',
          bio: 'Ambitna stażystka frontendowa skupiona na React i tworzeniu interaktywnych UI. Szybko się uczy i chętnie podejmuje nowe wyzwania technologiczne.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: false,
          position: 'Frontend',
          seniority: 'Intern', // Zmieniono na string 'Intern'
          isOpenForWork: true,
          techStack: createTechStack([
            'React',
            'JavaScript',
            'HTML',
            'CSS',
            'Git',
          ]),
          employmentTypes: { set: [EmploymentType.PART_TIME] }, // Dopasowano typ zatrudnienia
          state: PublishingState.APPROVED,
          hourlyRateMin: 20, // Dostosowano stawkę dla stażysty
          hourlyRateMax: 40,
          currency: Currency.PLN,
          language: createLanguages(['Polish', 'English']),
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

  // Frontend Dev 2: Mid-level Vue Developer
  await prisma.user.create({
    data: {
      email: 'piotr.zielinski.fe.mid@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'piotr-zielinski-frontend-mid',
          fullName: 'Piotr Zieliński',
          linkedIn: 'https://linkedin.com/in/piotrzielinskifemid',
          bio: 'Doświadczony frontend developer specjalizujący się w Vue.js i ekosystemie Nuxt. Potrafi budować złożone aplikacje SPA i dba o jakość kodu oraz testy.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'Frontend',
          seniority: 'Mid-level', // Zmieniono na string 'Mid-level'
          isOpenForWork: true,
          techStack: createTechStack([
            'Vue',
            'Nuxt.js',
            'TypeScript',
            'Pinia',
            'Tailwind CSS',
          ]),
          employmentTypes: {
            set: [EmploymentType.FULL_TIME, EmploymentType.CONTRACT],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 80,
          hourlyRateMax: 120,
          currency: Currency.PLN,
          language: createLanguages(['Polish', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Krakow' },
              create: { name: 'Krakow' },
            },
          },
        },
      },
    },
  })

  // Frontend Dev 3: Senior Angular Developer
  await prisma.user.create({
    data: {
      email: 'eva.schmidt.fe.sr@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST, Role.TEAM] },
      profile: {
        create: {
          slug: 'eva-schmidt-frontend-sr',
          fullName: 'Eva Schmidt',
          linkedIn: 'https://linkedin.com/in/evaschmidtfesr',
          bio: 'Senior Frontend Engineer with deep expertise in Angular, RxJS, and state management patterns. Focused on building scalable enterprise applications and mentoring junior developers.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'Frontend',
          seniority: 'Senior', // Zmieniono na string 'Senior'
          isOpenForWork: true,
          techStack: createTechStack([
            'Angular',
            'TypeScript',
            'RxJS',
            'NgRx',
            'SCSS',
            'Jest',
          ]),
          employmentTypes: {
            set: [EmploymentType.CONTRACT, EmploymentType.FULL_TIME],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 60,
          hourlyRateMax: 90,
          currency: Currency.EUR,
          language: createLanguages(['German', 'English']),
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

  // Frontend Dev 4: Mid-level React/Next.js Developer
  await prisma.user.create({
    data: {
      email: 'marek.jankowski.fe.mid2@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'marek-jankowski-frontend-mid2',
          fullName: 'Marek Jankowski',
          linkedIn: 'https://linkedin.com/in/marekjankowskifemid',
          bio: 'Frontend developer z doświadczeniem w React i Next.js. Interesuje się performance webowym i Server-Side Renderingiem. Lubi pracować w zwinnych metodykach.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'Frontend',
          seniority: 'Mid-level', // Zmieniono na string 'Mid-level'
          isOpenForWork: true,
          techStack: createTechStack([
            'React',
            'Next.js',
            'TypeScript',
            'GraphQL',
            'Styled Components',
          ]),
          employmentTypes: {
            set: [EmploymentType.FULL_TIME, EmploymentType.CONTRACT],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 90,
          hourlyRateMax: 130,
          currency: Currency.PLN,
          language: createLanguages(['Polish', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Wroclaw' },
              create: { name: 'Wroclaw' },
            },
          },
        },
      },
    },
  })

  // Frontend Dev 5: Junior Svelte Developer
  await prisma.user.create({
    data: {
      email: 'sofia.muller.fe.jr@example.com', // Zmieniono email
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'sofia-muller-frontend-jr', // Zmieniono slug
          fullName: 'Sofia Müller',
          linkedIn: 'https://linkedin.com/in/sofiamullerfejr',
          bio: 'Enthusiastic junior frontend developer exploring the Svelte framework. Eager to contribute to innovative projects and learn modern web development practices.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: false,
          position: 'Frontend',
          seniority: 'Junior', // Zmieniono na string 'Junior'
          isOpenForWork: true,
          techStack: createTechStack([
            'Svelte',
            'SvelteKit',
            'JavaScript',
            'HTML',
            'CSS',
          ]),
          employmentTypes: { set: [EmploymentType.FULL_TIME] }, // Usunięto Internship
          state: PublishingState.APPROVED,
          hourlyRateMin: 35,
          hourlyRateMax: 55,
          currency: Currency.EUR,
          language: createLanguages(['German', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Munich' },
              create: { name: 'Munich' },
            },
          },
        },
      },
    },
  })

  // --- Backend Developers ---

  // Backend Dev 1: Intern Node.js Developer
  await prisma.user.create({
    data: {
      email: 'tomasz.nowak.be.intern@example.com', // Zmieniono email
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'tomasz-nowak-backend-intern', // Zmieniono slug
          fullName: 'Tomasz Nowak',
          linkedIn: 'https://linkedin.com/in/tomasznowakbeintern',
          bio: 'Początkujący stażysta backendowy zafascynowany Node.js i budowaniem REST API. Chętny do nauki i pracy nad skalowalnymi rozwiązaniami serwerowymi.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: false,
          position: 'Backend',
          seniority: 'Intern', // Zmieniono na string 'Intern'
          isOpenForWork: true,
          techStack: createTechStack([
            'Node.js',
            'Express',
            'MongoDB',
            'JavaScript',
            'Git',
          ]),
          employmentTypes: { set: [EmploymentType.PART_TIME] }, // Dopasowano typ zatrudnienia
          state: PublishingState.APPROVED,
          hourlyRateMin: 25, // Dostosowano stawkę
          hourlyRateMax: 45,
          currency: Currency.PLN,
          language: createLanguages(['Polish', 'English']),
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

  // Backend Dev 2: Mid-level Python/Django Developer
  await prisma.user.create({
    data: {
      email: 'katarzyna.lis.be.mid@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'katarzyna-lis-backend-mid',
          fullName: 'Katarzyna Lis',
          linkedIn: 'https://linkedin.com/in/katarzynalisbemid',
          bio: 'Backend developerka z doświadczeniem w Pythonie i frameworku Django. Buduje wydajne API i pracuje z relacyjnymi bazami danych. Zna podstawy Dockera.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'Backend',
          seniority: 'Mid-level', // Zmieniono na string 'Mid-level'
          isOpenForWork: true,
          techStack: createTechStack([
            'Python',
            'Django',
            'PostgreSQL',
            'REST API',
            'Docker',
          ]),
          employmentTypes: {
            set: [EmploymentType.FULL_TIME, EmploymentType.CONTRACT],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 90,
          hourlyRateMax: 140,
          currency: Currency.PLN,
          language: createLanguages(['Polish', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Gdansk' },
              create: { name: 'Gdansk' },
            },
          },
        },
      },
    },
  })

  // Backend Dev 3: Senior Java/Spring Developer
  await prisma.user.create({
    data: {
      email: 'markus.bauer.be.sr@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST, Role.TEAM] },
      profile: {
        create: {
          slug: 'markus-bauer-backend-sr',
          fullName: 'Markus Bauer',
          linkedIn: 'https://linkedin.com/in/markusbauerbesr',
          bio: 'Highly experienced Senior Backend Engineer specializing in Java, Spring Boot, microservices architecture, and cloud platforms like AWS. Proven track record in designing and implementing large-scale, resilient systems.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'Backend',
          seniority: 'Senior', // Zmieniono na string 'Senior'
          isOpenForWork: true,
          techStack: createTechStack([
            'Java',
            'Spring Boot',
            'Microservices',
            'Kafka',
            'Kubernetes',
            'AWS',
            'SQL',
          ]),
          employmentTypes: {
            set: [EmploymentType.CONTRACT, EmploymentType.FULL_TIME],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 70,
          hourlyRateMax: 110,
          currency: Currency.EUR,
          language: createLanguages(['German', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Frankfurt' },
              create: { name: 'Frankfurt' },
            },
          },
        },
      },
    },
  })

  // Backend Dev 4: Mid-level Ruby on Rails Developer
  await prisma.user.create({
    data: {
      email: 'david.jones.be.mid2@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'david-jones-backend-mid2',
          fullName: 'David Jones',
          linkedIn: 'https://linkedin.com/in/davidjonesbemid',
          bio: 'Mid-level Backend Developer proficient in Ruby on Rails. Experienced in building web applications, working with databases, and writing tests. Familiar with Heroku deployment.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'Backend',
          seniority: 'Mid-level', // Zmieniono na string 'Mid-level'
          isOpenForWork: true,
          techStack: createTechStack([
            'Ruby',
            'Ruby on Rails',
            'PostgreSQL',
            'RSpec',
            'Sidekiq',
            'Heroku',
          ]),
          employmentTypes: {
            set: [EmploymentType.FULL_TIME, EmploymentType.CONTRACT],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 55,
          hourlyRateMax: 80,
          currency: Currency.USD,
          language: createLanguages(['English']),
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

  // Backend Dev 5: Senior Go Developer
  await prisma.user.create({
    data: {
      email: 'lucas.meyer.be.sr2@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'lucas-meyer-backend-sr2',
          fullName: 'Lucas Meyer',
          linkedIn: 'https://linkedin.com/in/lucasmeyerbesr',
          bio: 'Senior Backend Developer specializing in Go (Golang) for high-performance systems and microservices. Experienced with gRPC, distributed systems, and cloud-native technologies (GCP).',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'Backend',
          seniority: 'Senior', // Zmieniono na string 'Senior'
          isOpenForWork: true,
          techStack: createTechStack([
            'Go',
            'Gin',
            'gRPC',
            'Microservices',
            'Docker',
            'Kubernetes',
            'GCP',
          ]),
          employmentTypes: {
            set: [EmploymentType.CONTRACT, EmploymentType.FULL_TIME],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 75,
          hourlyRateMax: 120,
          currency: Currency.EUR,
          language: createLanguages(['German', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'Germany' },
              create: { name: 'Germany' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Munich' },
              create: { name: 'Munich' },
            },
          },
        },
      },
    },
  })

  // --- Game Developers ---

  // Game Dev 1: Intern Unity Developer (C#)
  await prisma.user.create({
    data: {
      email: 'jan.wisniewski.gd.intern@example.com', // Zmieniono email
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'jan-wisniewski-gamedev-intern', // Zmieniono slug
          fullName: 'Jan Wiśniewski',
          linkedIn: 'https://linkedin.com/in/janwisniewskigdintern',
          bio: 'Stażysta game developer pasjonujący się tworzeniem gier w Unity przy użyciu C#. Skupiony na mechanikach rozgrywki 2D i nauce silnika.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: false,
          position: 'GameDev',
          seniority: 'Intern', // Zmieniono na string 'Intern'
          isOpenForWork: true,
          techStack: createTechStack([
            'Unity',
            'C#',
            'Git',
            '2D Game Development',
          ]),
          employmentTypes: { set: [EmploymentType.PART_TIME] }, // Dopasowano typ zatrudnienia
          state: PublishingState.APPROVED,
          hourlyRateMin: 20, // Dostosowano stawkę
          hourlyRateMax: 40,
          currency: Currency.PLN,
          language: createLanguages(['Polish', 'English']),
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

  // Game Dev 2: Mid-level Unreal Engine Developer (C++)
  await prisma.user.create({
    data: {
      email: 'lena.hoffman.gd.mid@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'lena-hoffman-gamedev-mid',
          fullName: 'Lena Hoffman',
          linkedIn: 'https://linkedin.com/in/lenahoffmangdmid',
          bio: 'Game developer with experience in Unreal Engine, C++, and Blueprints. Focused on 3D game development, level design, and implementing core gameplay systems.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'GameDev',
          seniority: 'Mid-level', // Zmieniono na string 'Mid-level'
          isOpenForWork: true,
          techStack: createTechStack([
            'Unreal Engine',
            'C++',
            'Blueprints',
            '3D Modeling Basics',
            'Version Control',
          ]),
          employmentTypes: {
            set: [EmploymentType.FULL_TIME, EmploymentType.CONTRACT],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 50,
          hourlyRateMax: 75,
          currency: Currency.EUR,
          language: createLanguages(['German', 'English']),
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

  // Game Dev 3: Senior C++/Graphics Programmer
  await prisma.user.create({
    data: {
      email: 'alex.chen.gd.sr@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST, Role.TEAM] },
      profile: {
        create: {
          slug: 'alex-chen-gamedev-sr',
          fullName: 'Alex Chen',
          linkedIn: 'https://linkedin.com/in/alexchengsr',
          bio: 'Senior Game Programmer specializing in C++, engine development, and graphics programming (OpenGL/Vulkan). Experienced in performance optimization and complex physics simulation.',
          cvUrl: null,
          openForCountryRelocation: true,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'GameDev',
          seniority: 'Senior', // Zmieniono na string 'Senior'
          isOpenForWork: true,
          techStack: createTechStack([
            'C++',
            'OpenGL',
            'Vulkan',
            'Game Engine Architecture',
            'Physics Programming',
            'Performance Optimization',
          ]),
          employmentTypes: {
            set: [EmploymentType.CONTRACT, EmploymentType.FULL_TIME],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 80,
          hourlyRateMax: 130,
          currency: Currency.USD,
          language: createLanguages(['English', 'Mandarin']),
          country: {
            connectOrCreate: {
              where: { name: 'USA' },
              create: { name: 'USA' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'San Francisco' },
              create: { name: 'San Francisco' },
            },
          },
        },
      },
    },
  })

  // Game Dev 4: Mid-level Godot Developer
  await prisma.user.create({
    data: {
      email: 'michal.kaminski.gd.mid2@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'michal-kaminski-gamedev-mid2',
          fullName: 'Michał Kamiński',
          linkedIn: 'https://linkedin.com/in/michalkaminskigdmid',
          bio: 'Game developer z doświadczeniem w silniku Godot i języku GDScript. Tworzy gry 2D i 3D, interesuje się tworzeniem narzędzi dla gier i rozwojem gier mobilnych.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: false,
          remoteOnly: true,
          position: 'GameDev',
          seniority: 'Mid-level', // Zmieniono na string 'Mid-level'
          isOpenForWork: true,
          techStack: createTechStack([
            'Godot Engine',
            'GDScript',
            'C# (Godot)',
            'Mobile Game Development',
            'Tool Development',
          ]),
          employmentTypes: {
            set: [EmploymentType.FULL_TIME, EmploymentType.CONTRACT],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 70,
          hourlyRateMax: 110,
          currency: Currency.PLN,
          language: createLanguages(['Polish', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'Poland' },
              create: { name: 'Poland' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Krakow' },
              create: { name: 'Krakow' },
            },
          },
        },
      },
    },
  })

  // Game Dev 5: Senior Unity/Multiplayer Developer
  await prisma.user.create({
    data: {
      email: 'olivia.martin.gd.sr2@example.com',
      avatarUrl: getRandomAvatarUrl(),
      roles: { set: [Role.SPECIALIST] },
      profile: {
        create: {
          slug: 'olivia-martin-gamedev-sr2',
          fullName: 'Olivia Martin',
          linkedIn: 'https://linkedin.com/in/oliviamartingdsr',
          bio: 'Senior Unity Developer with a strong focus on multiplayer game development (Netcode/Photon) and systems architecture using DOTS/ECS. Passionate about creating engaging online experiences.',
          cvUrl: null,
          openForCountryRelocation: false,
          openForCityRelocation: true,
          remoteOnly: true,
          position: 'GameDev',
          seniority: 'Senior', // Zmieniono na string 'Senior'
          isOpenForWork: true,
          techStack: createTechStack([
            'Unity',
            'C#',
            'DOTS/ECS',
            'Multiplayer Networking',
            'Netcode for GameObjects',
            'Photon Engine',
            'Systems Design',
          ]),
          employmentTypes: {
            set: [EmploymentType.CONTRACT, EmploymentType.FULL_TIME],
          },
          state: PublishingState.APPROVED,
          hourlyRateMin: 70,
          hourlyRateMax: 115,
          currency: Currency.EUR,
          language: createLanguages(['French', 'English']),
          country: {
            connectOrCreate: {
              where: { name: 'France' },
              create: { name: 'France' },
            },
          },
          city: {
            connectOrCreate: {
              where: { name: 'Paris' },
              create: { name: 'Paris' },
            },
          },
        },
      },
    },
  })

  console.log(
    'Seed data created: 5 Frontend Devs, 5 Backend Devs, 5 Game Devs with varied seniority (string format) and tech stacks.',
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Seeding finished successfully.')
  })
  .catch(async (e) => {
    console.error('Error during seeding:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
