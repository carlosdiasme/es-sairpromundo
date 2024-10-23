import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: [
      'https://www.sairpromundo.com/sitemap.xml',
      'https://www.sairpromundo.com/sitemap-places.xml',
      'https://www.sairpromundo.com/sitemap-blogs.xml',
    ],
    host: 'https://www.sairpromundo.com',
  }
}