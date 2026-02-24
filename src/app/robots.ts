import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/portfolio-data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}
