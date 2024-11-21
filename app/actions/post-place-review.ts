'use server'

import { supabase } from '@/lib/supabase-client'  // Ajuste o caminho de importação conforme necessário

interface PlaceReview {
  user_id: string
  place_id: number
  rating: number
  good?: string
  bad?: string
  feedback?: string
}

export async function postPlaceReview(review: PlaceReview) {
  console.log('Iniciando postPlaceReview com dados:', review);

  try {
    console.log('Tentando inserir review...');

    const { data, error } = await supabase
      .from('place_reviews')
      .insert([review])

    if (error) {
      console.error('Erro ao inserir review:', error);
      throw error;
    }

    console.log('Review inserida com sucesso:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erro inesperado em postPlaceReview:', error);
    return { success: false, error: JSON.stringify(error) };
  }
}