const languages: string[] = [
  'English',
  'Spanish',
  'French',
  'Chinese',
  'Hindi',
  'Arabic',
  'Portuguese',
  'Russian',
  'Japanese',
  'German',
  'Italian',
  'Dutch',
  'Swedish',
  'Korean',
  'Finnish',
  'Turkish',
  'Polish',
  'Danish',
  'Czech',
  'Hungarian',
  'Greek',
  'Thai',
  'Norwegian',
]

const uniqueLanguages = [...new Set(languages)]
uniqueLanguages.sort()

export default uniqueLanguages
