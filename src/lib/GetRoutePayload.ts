import { ProfilePayload } from '@/backend/profile/profile.types'
import { UserPayload } from '@/backend/user/user.types'

export interface UserRoutePayload {
  message: string
  data: UserPayload | UserPayload[] | ProfilePayload | ProfilePayload[]
}

async function getRoutePayload(routeUrl: string, id?: string) {
  const url = id ? `${routeUrl}/${id}` : routeUrl
  console.log(url)

  const res = await fetch(url, {
    cache: 'no-store',
    method: 'GET',
    headers: {
      'Content-Type': 'aplication/json',
    },
  })

  const routePayload: UserRoutePayload = await res.json()

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return routePayload
}

export default getRoutePayload
