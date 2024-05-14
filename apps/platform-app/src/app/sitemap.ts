import { getApprovedProfiles } from '@/backend/profile/profile.service'
import { type MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles = await getApprovedProfiles()

  const profileUrls: MetadataRoute.Sitemap = profiles.map((profile) => ({
    url: `${process.env.NEXTAUTH_URL}/profile/${profile.user.githubDetails?.username}`,
  }))

  return [
    {
      url: `${process.env.NEXTAUTH_URL}`,
    },
    ...profileUrls,
  ]
}
