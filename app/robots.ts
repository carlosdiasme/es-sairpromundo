import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard', '/dashboard/*'],
      },
    ],
    sitemap: [
      'https://en.sairpromundo.com/sitemap.xml',
      'https://en.sairpromundo.com/sitemap-places.xml',
      'https://en.sairpromundo.com/sitemap-blogs.xml',
    ],
    host: 'https://en.sairpromundo.com',
  }
}