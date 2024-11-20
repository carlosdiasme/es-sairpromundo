import { supabase } from '@/lib/supabase-client'

// Define the Activity type based on the table structure
type Activity = {
  activity_id: number
  created_at: string
  title: string
  slug: string
  plural: string | null
  description: string | null
  image: string | null
}


export async function getActivities(): Promise<Activity[]> {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('title', { ascending: true })

    if (error) {
      console.error('Error fetching activities:', error)
      throw new Error('Failed to fetch activities')
    }

    return data as Activity[]
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('An unexpected error occurred')
  }
}