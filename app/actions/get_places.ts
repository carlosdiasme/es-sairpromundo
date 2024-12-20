'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Place {
  place_id: number
  created_at: string
  name: string
  tags: string
  category_id: number
  size: number
  slug: string
  user_id: string
  updated_at: string
  about: string
  en_about: string
  es_about: string
  website: string
  instagram: string
  tiktok: string
  google_maps: string
  zip_code: string
  address: string
  cnpj: string
  admin: string
  city_id: number
  region_id: number
  country_id: number
  logo: string
  image_1: string
  image_2: string
  image_3: string
  image_4: string
  category_slug: string
  category_title: string
  category_plural: string
  category_description: string
  category_image: string
  city_name: string
  city_slug: string
  city_complete: string
  city_image: string
  city_region_id: number
  region_name: string
  region_country_id: number
  country_name: string
  country_continent_id: number
  continent_name: string
  admin_id: string
  admin_name: string
  admin_email: string
  admin_linkedin: string
  claim: boolean
  specialty_title: string
  specialty_slug: string
  activity_slug: string
  activity_title: string
}

export async function fetchPlaces(page: number, itemsPerPage: number, query: string = ''): Promise<{ places: Place[], totalCount: number }> {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage - 1

  let queryBuilder = supabase
    .from('vw_places')
    .select('*', { count: 'exact' })

  if (query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${query}%, tags.ilike.%${query}%`)
  }

  const { data, error, count } = await queryBuilder
    .range(start, end)
    .order('name')

  if (error) {
    console.error('Error fetching places:', error)
    throw new Error('Failed to fetch places')
  }

  const places: Place[] = data ?? []

  return { 
    places,
    totalCount: count ?? 0
  }
}