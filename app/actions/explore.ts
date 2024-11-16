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
  title: string
  tags: string
  category_id: number
  size: number
  slug: string
  user_id: string
  updated_at: string
  about: string
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
  city_name: string
  city_slug: string
  city_complete: string
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
  category_image: string
  city_image: string
}

export async function explore(category_slug: string, city_slug: string, page: number = 1, itemsPerPage: number = 50) {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage - 1

  const { data, error, count } = await supabase
    .from('vw_places')
    .select('*, category_image, city_image', { count: 'exact' })
    .eq('category_slug', category_slug)
    .eq('city_slug', city_slug)
    .range(start, end)
    .order('name')

  if (error) {
    console.error('Error fetching places:', error)
    throw new Error('Failed to fetch places for explore page')
  }

  console.log('Dados retornados:', data?.[0])

  return {
    places: data as Place[],
    totalCount: count ?? 0
  }
}