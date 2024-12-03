import { supabase } from '@/lib/supabase-client'

// Define the Category type based on the table structure
type Category = {
  category_id: number
  created_at: string
  slug: string
  en_slug: string
  es_slug: string
  title: string
  en_title: string
  es_title: string
  plural: string | null
  en_plural: string | null
  es_plural: string | null
  description: string | null
  en_description: string | null
  es_description: string | null
  image: string | null
}


export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('title', { ascending: true })

    if (error) {
      console.error('Error fetching categories:', error)
      throw new Error('Failed to fetch categories')
    }

    return data as Category[]
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('An unexpected error occurred')
  }
}