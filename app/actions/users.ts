'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function addUserRecord(name: string, email: string, userId: string) {
  const supabase = createServerActionClient({ cookies })

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