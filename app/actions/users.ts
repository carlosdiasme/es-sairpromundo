'use server'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export async function addUserRecord(name: string, email: string, userId: string) {
  const { error } = await supabase
    .from('users')
    .insert({ name, email, user_id: userId })

  if (error) {
    console.error('Error adding user record:', error)
    throw new Error('Failed to create user record')
  }
}