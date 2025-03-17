export type JobPublishingState = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED'

const JOB_TITLES = [
  'Pomoc w zaprojektowaniu i developmencie strony wizytówki, Pomoc w zaprojektowaniu i developmencie strony wizytówki',
  'Optymalizacja wydajności aplikacji webowej',
  'Integracja API płatności online',
  'Stworzenie panelu administracyjnego dla aplikacji SaaS, Stworzenie panelu administracyjnego dla aplikacji SaaS',
  'Refaktoryzacja kodu aplikacji mobilnej',
  'Migracja aplikacji na nową wersję frameworka',
  'Testowanie jednostkowe i end-to-end dla platformy e-commerce',
  'Automatyzacja procesu CI/CD',
  'Implementacja systemu powiadomień push',
  'Rozwój i utrzymanie aplikacji React.js',
]

const STATES: Array<JobPublishingState> = [
  'DRAFT',
  'PENDING',
  'APPROVED',
  'REJECTED',
]

function getRandomDate() {
  const now = new Date()
  const hoursToSubtract = Math.floor(Math.random() * (24 * 14)) // Losowo do 14 dni wstecz
  now.setHours(now.getHours() - hoursToSubtract)
  return now.toISOString()
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const mockJobs = Array.from({ length: 10 }, (_, index) => ({
  name: JOB_TITLES[index],
  PublishingState: getRandomElement(STATES),
  createdAt: getRandomDate(),
}))
