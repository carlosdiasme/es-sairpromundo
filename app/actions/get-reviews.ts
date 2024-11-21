'use server'

import { supabase } from '@/lib/supabase-client'

interface PlaceReview {
  place_review_id: number
  created_at: string
  user_id: string
  user_name: string
  place_id: number
  good: string
  bad: string
  feedback: string
  rating: number
}

export async function getReviews(placeId: number, page: number = 1, pageSize: number = 10): Promise<{ success: boolean; data?: PlaceReview[]; totalReviews?: number; error?: string }> {
  try {
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1

    const { data, error, count } = await supabase
      .from('vw_place_reviews')
      .select('*', { count: 'exact' })
      .eq('place_id', placeId)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Error fetching reviews:', error)
      return { success: false, error: 'Não foi possível carregar as avaliações.' }
    }

    return { 
      success: true, 
      data: data as PlaceReview[], 
      totalReviews: count !== null ? count : undefined 
    }
  } catch (error) {
    console.error('Unexpected error in getReviews:', error)
    return { success: false, error: 'Ocorreu um erro inesperado ao carregar as avaliações.' }
  }
}