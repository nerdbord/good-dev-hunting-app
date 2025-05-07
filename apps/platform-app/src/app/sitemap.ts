import { getApprovedProfiles } from '@/backend/profile/profile.service'
import { type MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_ORIGIN_URL
  const profiles = await getApprovedProfiles()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/` },
    { url: `${baseUrl}/devs` },
    { url: `${baseUrl}/jobs` },
    { url: `${baseUrl}/profiles` },
  ]

  const profileRoutes: MetadataRoute.Sitemap = profiles
    .filter((profile) => profile.user.githubDetails?.username)
    .map((profile) => ({
      url: `${baseUrl}/devs/${profile.user.githubDetails?.username}`,
      lastModified: profile.updatedAt ?? profile.createdAt,
    }))

  return [...staticRoutes, ...profileRoutes]
}
