import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/panel', '/panel/*'],
      },
    ],
    sitemap: [
      'https://es.sairpromundo.com/sitemap.xml',
      'https://es.sairpromundo.com/sitemap-places.xml',
      'https://es.sairpromundo.com/sitemap-blogs.xml',
    ],
    host: 'https://es.sairpromundo.com',
  }
}