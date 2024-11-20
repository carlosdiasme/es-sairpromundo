import { supabase } from '@/lib/supabase-client'

// Define the Specialty type based on the table structure
type Specialty = {
  specialty_id: number
  created_at: string
  title: string
  slug: string
  plural: string | null
  description: string | null
  image: string | null
}

export async function getSpecialties(): Promise<Specialty[]> {
  try {
    const { data, error } = await supabase
      .from('specialties')
      .select('*')
      .order('title', { ascending: true })

    if (error) {
      console.error('Error fetching specialties:', error)
      throw new Error('Failed to fetch specialties')
    }

    return data as Specialty[]
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('An unexpected error occurred')
  }
}