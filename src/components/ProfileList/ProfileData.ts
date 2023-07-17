export interface ProfileListItems {
  id: number;
  name: string;
  seniority: string;
  stack: string; 
  others: string;
  country: string;
  city: string;
  remote: string;
  technology: string[];
  employmentType: string;
}

const filterLists = {
  technology: [
    'Javascript',
    'Python',
    'Node.js',
    'React.js',
    'Vue.js',
    'Angular',
    'MongoDB',
  ], 
};

function getRandomTechnologies(): string[] {
  const count = Math.floor(Math.random() * 7) + 1; 
  const technologies = filterLists.technology;
  const shuffledTechnologies = technologies.sort(() => 0.5 - Math.random());
  return shuffledTechnologies.slice(0, count);
}

export const ProfileData: ProfileListItems[] = [
  {
    id: 1,
    name: 'Ania Piwerko',
    seniority: 'Junior',
    stack: 'Frontend',
    others: '+5 more',
    country: 'Poland',
    city: 'Warsaw',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Full-time'
  },
  {
    id: 2,
    name: 'Jakub Sumiński',
    seniority: 'Senior',
    stack: 'Backend',
    others: '+5 more',
    country: 'Italy',
    city: 'Rome',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Part-time'
  },
  {
    id: 3,
    name: 'Daniel Sztuczka',
    seniority: 'Junior',
    stack: 'Frontend',
    others: '+5 more',
    country: 'Poland',
    city: 'Warsaw',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Contract'
  },
  {
    id: 4,
    name: 'Hubert Kwiatkowsky',
    seniority: 'Intern',
    stack: 'Fullstack',
    others: '+5 more',
    country: 'Poland',
    city: 'Warsaw',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Full-time'
  },
  {
    id: 5,
    name: 'Hania Mostowiak',
    seniority: 'Mid',
    stack: 'Backend',
    others: '+5 more',
    country: 'Poland',
    city: 'Warsaw',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Part-time'
  },
  {
    id: 6,
    name: 'Michał Rem',
    seniority: 'Mid',
    stack: 'Frontend',
    others: '+5 more',
    country: 'Italy',
    city: 'Rome',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Contract'
  },
  {
    id: 7,
    name: 'Wiktor Traktor',
    seniority: 'Junior',
    stack: 'Backend',
    others: '+5 more',
    country: 'United States',
    city: 'New York',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Full-time'
  },
  {
    id: 8,
    name: 'Pies Richard',
    seniority: 'Senior',
    stack: 'Fullstack',
    others: '+5 more',
    country: 'Spain',
    city: 'Barcelona',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Part-time'
  },
  {
    id: 9,
    name: 'Krzysztof Misiorny',
    seniority: 'Mid',
    stack: 'Frontend',
    others: '+5 more',
    country: 'United Arab Emirates',
    city: 'Dubai',
    remote: 'Remote',
    technology: getRandomTechnologies(),
    employmentType: 'Contract'
  },
];
