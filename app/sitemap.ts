import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { getCities, City } from './actions/get-cities'
import { getAllCityCategories } from './actions/get-city-category'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface BlogView {
  blog_id: number;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  description: string | null;
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
  en_description: string | null;
  image: string | null;
  city: string;
  state: string;
  country: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogPosts, places, cities, cityCategories] = await Promise.all([
    fetchAllBlogPosts(),
    fetchAllPlaces(),
    fetchAllCities(),
    getAllCityCategories(),
  ])

  const baseUrl = 'https://en.sairpromundo.com'

  const staticPages = [
    '',
    '/about',
    '/terms',
    '/privacy',
    '/explore',
    '/cities',
    '/sign-in',
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

  const cityRoutes = cities.map(city => ({
    url: `${baseUrl}/cities/${city.slug}`,
    lastModified: new Date(city.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const cityCategoryRoutes = cityCategories.map(cc => ({
    url: `${baseUrl}/cities/${cc.city_slug}/categories/${cc.category_en_slug}`,
    lastModified: new Date(), // You might want to fetch or calculate a more accurate last modified date
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogRoutes, ...placeRoutes, ...cityRoutes, ...cityCategoryRoutes]
}

async function fetchAllBlogPosts(): Promise<BlogView[]> {
  const pageSize = 1000
  let allPosts: BlogView[] = []
  let page = 0
  let hasMore = true

  while (hasMore) {
    const { data, error } = await supabase
      .from('vw_en_blogs')
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

async function fetchAllCities(): Promise<City[]> {
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

  return allCities
}

