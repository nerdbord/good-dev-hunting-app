import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import { type MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const profiles = await getPublishedProfilesPayload()

  const profileUrls: MetadataRoute.Sitemap = profiles.map((profile) => ({
    url: `${process.env.NEXTAUTH_URL}/profile/${profile.githubUsername}`,
  }))

  return [
    {
      url: `${process.env.NEXTAUTH_URL}`,
    },
    ...profileUrls,
  ]
}
