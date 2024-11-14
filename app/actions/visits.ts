'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function checkVisitStatus(userId: string, placeId: number): Promise<boolean> {
  const { data, error } = await supabase
    .from('visits')
    .select('visit_id')
    .eq('user_id', userId)
    .eq('place_id', placeId)
    .single()

  if (error) {
    console.error('Error checking visit status:', error)
    return false
  }

  return !!data
}

export async function addVisit(userId: string, placeId: number): Promise<boolean> {
  const { error } = await supabase
    .from('visits')
    .insert({ user_id: userId, place_id: placeId })

  if (error) {
    console.error('Error adding visit:', error)
    return false
  }

  revalidatePath(`/${placeId}`)
  return true
}

export async function removeVisit(userId: string, placeId: number): Promise<boolean> {
  const { error } = await supabase
    .from('visits')
    .delete()
    .eq('user_id', userId)
    .eq('place_id', placeId)

  if (error) {
    console.error('Error removing visit:', error)
    return false
  }

  revalidatePath(`/${placeId}`)
  return true
}

export async function toggleVisitStatus(userId: string, placeId: number): Promise<boolean> {
  const hasVisited = await checkVisitStatus(userId, placeId)

  if (hasVisited) {
    return removeVisit(userId, placeId)
  } else {
    return addVisit(userId, placeId)
  }
}