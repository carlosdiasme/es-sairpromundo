'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface City {
  city_id: number
  created_at: string
  name: string
  region_id: number | null
  complete: string | null
  slug: string | null
  image: string | null
}

export async function getCities(page: number = 1, itemsPerPage: number = 12) {
  const start = (page - 1) * itemsPerPage
  const end = start + itemsPerPage - 1

  const { data, error, count } = await supabase
    .from('cities')
    .select('*, regions(name)', { count: 'exact' })
    .range(start, end)
    .order('name')

  if (error) {
    console.error('Error fetching cities:', error)
    throw new Error('Failed to fetch cities')
  }

  return { 
    cities: data as (City & { regions: { name: string } })[],
    totalCount: count ?? 0
  }
}