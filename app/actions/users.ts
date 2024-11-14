'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function addUserRecord(name: string, email: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert({ id: userId, name, email })
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error adding user record:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' }
  }
}