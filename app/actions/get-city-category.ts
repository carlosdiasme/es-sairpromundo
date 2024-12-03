'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface CityCategory {
  city_id: number
  city_slug: string
  category_id: number
  category_slug: string
  category_en_slug: string
  category_es_slug: string
}

export async function getCityCategories(page: number = 1, itemsPerPage: number = 100): Promise<{ cityCategories: CityCategory[], totalCount: number }> {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage - 1

  try {
    const { data, error, count } = await supabase
      .from('vw_city_category')
      .select('*', { count: 'exact' })
      .range(start, end)

    if (error) {
      console.error('Error fetching city categories:', error)
      throw new Error('Failed to fetch city categories')
    }

    return { 
      cityCategories: data as CityCategory[],
      totalCount: count ?? 0
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('An unexpected error occurred while fetching city categories')
  }
}

export async function getAllCityCategories(): Promise<CityCategory[]> {
  let allCityCategories: CityCategory[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const { cityCategories, totalCount } = await getCityCategories(page, 1000)
    allCityCategories = allCityCategories.concat(cityCategories)
    hasMore = allCityCategories.length < totalCount
    page++
  }

  return allCityCategories
}

