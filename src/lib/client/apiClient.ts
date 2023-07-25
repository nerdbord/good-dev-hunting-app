import { ProfilePayload } from '@/backend/profile/profile.types'

export interface UserRoutePayload {
  message: string
  data: ProfilePayload
}

export async function getProfilePayload(id: string) {
  const res = await fetch(`http://localhost:3000/api/profiles/${id}`, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const profilePayload: UserRoutePayload = await res.json()

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return profilePayload
}
