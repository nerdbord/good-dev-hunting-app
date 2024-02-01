'use server'

import { getTeamProfiles } from '@/backend/profile/profile.service'

export async function fetchTeam() {
  try {
    const teamProfiles = await getTeamProfiles()
    return teamProfiles
  } catch (error) {
    return
  }
}
