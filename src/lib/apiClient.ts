import { CreateProfilePayload } from '@/backend/profile/profile.types'
const API_URL = 'http://localhost:3000/api'

export const apiClient = {
  publishMyProfile: async (profileId: string) => {
    const response = await fetch(`${API_URL}/profiles/${profileId}/publish`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to publish profile')
    }
  },
}

export const getUserProfile = async () => {
  try {
    const response = await fetch('/api/profiles/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data.profile
    } else {
      console.error('Failed to fetch profile.')
    }
  } catch (error) {
    console.error(error)
  }
  return null
}

export const updateMyProfile = async (payload: CreateProfilePayload) => {
  const response = await fetch('/api/profiles/me', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (response.ok) {
    window.location.reload()
  } else {
    const errorData = await response.json()
    throw new Error(
      `Failed to edit profile. Error details: ${JSON.stringify(errorData)}`,
    )
  }

  return response.json()
}
