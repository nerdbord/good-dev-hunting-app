import { City, Country, Profile, User } from '@prisma/client'

// export const serializeProfilesToProfilePayload = (
//   data:
//     | (Profile & {
//         user: User
//         country: Country
//         city: City
//       })[]
//     | undefined,
// ): ProfilePayload[] | undefined => {
//   if (data) {
//     return data.map((profile) => ({
//       id: profile.id,
//       fullName: profile.fullName,
//       email: profile.user.email,
//       linkedIn: profile.linkedIn,
//       userId: profile.userId,
//       bio: profile.bio,
//       country: {
//         name: profile.country.name,
//         openForRelocation: profile.country.openForRelocation,
//       },
//       city: {
//         name: profile.city.name,
//         openForRelocation: profile.city.openForRelocation,
//       },
//       remoteOnly: profile.remoteOnly,
//       position: profile.position,
//       seniority: profile.seniority,
//       techStack: profile.techStack,
//       employmentType: profile.employmentType,
//       isPublished: profile.isPublished,
//     }))
//   } else {
//     return undefined
//   }
// }

export const serializeProfilesToProfilePayload = (
  data: Profile & {
    user: User
    country: Country
    city: City
  },
) => {
  const serializedProfile: ProfilePayload = {
    id: data.id,
    fullName: data.fullName,
    email: data.user.email,
    linkedIn: data.linkedIn,
    userId: data.userId,
    bio: data.bio,
    country: {
      name: data.country.name,
      openForRelocation: data.country.openForRelocation,
    },
    city: {
      name: data.city.name,
      openForRelocation: data.city.openForRelocation,
    },
    remoteOnly: data.remoteOnly,
    position: data.position,
    seniority: data.seniority,
    techStack: data.techStack,
    employmentType: data.employmentType,
    isPublished: data.isPublished,
  }

  return serializedProfile
}
