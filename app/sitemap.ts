import { MetadataRoute } from 'next'
import { getCities, City } from './actions/get-cities'
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

interface Category {
  slug: string;
  updated_at: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, places, categories] = await Promise.all([
    fetchAllBlogPosts(),
    fetchAllPlaces(),
    fetchAllCategories(),
  ])

  const baseUrl = 'https://sairpromundo.com'

  const staticPages = [
    '',
    '/sobre',
    '/termos',
    '/privacidade',
    '/explorar',
    '/cidades',
    '/entrar',
    '/blog',
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
    url: `${baseUrl}/${place.slug}`,
    lastModified: new Date(place.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const cityRoutes = await generateCityRoutes(baseUrl)
  const cityCategoryRoutes = await generateCityCategoryRoutes(baseUrl, categories)

  return [...staticPages, ...blogRoutes, ...placeRoutes, ...cityRoutes, ...cityCategoryRoutes]
}

async function fetchAllBlogPosts(): Promise<BlogView[]> {
  const pageSize = 1000
  let allPosts: BlogView[] = []
  let page = 0
  let hasMore = true

  while (hasMore) {
    const { data, error } = await supabase
      .from('vw_blogs')
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1)
    
    if (error) {
      console.error('Error fetching blog posts:', error)
      return allPosts
    }
    
    if (data) {
      allPosts = allPosts.concat(data)
      hasMore = data.length === pageSize
      page++
    } else {
      hasMore = false
    }
  }
  
  return allPosts
}

async function fetchAllPlaces(): Promise<Place[]> {
  const pageSize = 1000
  let allPlaces: Place[] = []
  let page = 0
  let hasMore = true

  while (hasMore) {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .range(page * pageSize, (page + 1) * pageSize - 1)
    
    if (error) {
      console.error('Error fetching places:', error)
      return allPlaces
    }
    
    if (data) {
      allPlaces = allPlaces.concat(data)
      hasMore = data.length === pageSize
      page++
    } else {
      hasMore = false
    }
  }
  
  return allPlaces
}

async function fetchAllCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('slug, updated_at')
  
  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  
  return data || []
}

async function generateCityRoutes(baseUrl: string): Promise<MetadataRoute.Sitemap> {
  const pageSize = 1000
  let allCities: City[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const { cities, totalCount } = await getCities(page, pageSize)
    allCities = allCities.concat(cities)
    hasMore = allCities.length < totalCount
    page++
  }

  return allCities.map(city => ({
    url: `${baseUrl}/cidades/${city.slug}`,
    lastModified: new Date(city.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))
}

async function generateCityCategoryRoutes(baseUrl: string, categories: Category[]): Promise<MetadataRoute.Sitemap> {
  const pageSize = 1000
  let allCities: City[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const { cities, totalCount } = await getCities(page, pageSize)
    allCities = allCities.concat(cities)
    hasMore = allCities.length < totalCount
    page++
  }

  return allCities.flatMap(city =>
    categories.map(category => ({
      url: `${baseUrl}/cidades/${city.slug}/categorias/${category.slug}`,
      lastModified: new Date(Math.max(new Date(city.created_at).getTime(), new Date(category.updated_at).getTime())),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )
}

