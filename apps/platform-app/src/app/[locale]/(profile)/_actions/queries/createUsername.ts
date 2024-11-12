import { findLinkedinUsernamesByUsernameBase } from '@/backend/linkedin-details/linkedin-details.service'

export const createUsername = async (fullName: string) => {
  if (!fullName) {
    throw new Error('Full name must be provided')
  }
  // Split the full name into first name and last name
  const nameParts = fullName.split(' ')
  if (nameParts.length !== 2) {
    throw new Error(
      'Full name must contain exactly one space separating the first name and last name',
    )
  }
  const firstName = nameParts[0]
  const lastName = nameParts[1]
  // Get the first letter of the first name
  const firstLetter = firstName.charAt(0).toLowerCase()
  // Concatenate the first letter of the first name with the last name
  const baseUsername = firstLetter + lastName.toLowerCase()
  // Check for existing usernames with the same base, including deleted ones
  const existingUsernames: string[] = await findLinkedinUsernamesByUsernameBase(
    baseUsername,
  )
  // If the username already exists, append a number to make it unique
  let username = baseUsername
  let counter = 1
  while (existingUsernames.includes(username)) {
    username = `${baseUsername}${counter}`
    counter++
  }

  console.log(username)
  return username
}
