import { type MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/*', '/profile/*', '/my-profile/*', '/dashboard/*'],
      },
    ],
    sitemap: `${process.env.NEXTAUTH_URL}/sitemap.xml`,
  }
}
