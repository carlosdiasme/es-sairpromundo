import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface BlogView {
  blog_id: number;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  user_id: string;
  user_name: string | null;
  user_linkedin: string | null;
  tag_id: number | null;
  tag_title: string | null;
  tag_slug: string | null;
}

interface Place {
  id: number;
  created_at: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  city: string;
  state: string;
  country: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await fetchBlogPosts()
  const places = await fetchPlaces()

  const baseUrl = 'https://www.sairpromundo.com'

  const staticPages = [
    '',
    '/blog',
    '/places',
    '/about',
    '/contact',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }))

  const blogRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const placeRoutes = places.map(place => ({
    url: `${baseUrl}/places/${place.slug}`,
    lastModified: new Date(place.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogRoutes, ...placeRoutes]
}

async function fetchBlogPosts(): Promise<BlogView[]> {
  const { data, error } = await supabase
    .from('vw_blogs')
    .select('*')
  
  if (error) {
    console.error('Error fetching blog posts:', error)
    return []
  }
  
  return data
}

async function fetchPlaces(): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select('*')
  
  if (error) {
    console.error('Error fetching places:', error)
    return []
  }
  
  return data
}