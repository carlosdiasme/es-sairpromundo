'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function addUserRecord(
  name: string,
  email: string,
  userId: string,
  birthday: string,
  gender: string,
  preference: string
) {
  const supabase = createServerActionClient({ cookies })

  console.log('Attempting to add user record with data:', { name, email, userId, birthday, gender, preference })

  try {
    // Primeiro, verifique se o usuário já existe
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single()

    if (fetchError) {
      console.error('Error checking for existing user:', fetchError)
      throw fetchError
    }

    if (existingUser) {
      console.log('User already exists, updating record')
      const { data, error } = await supabase
        .from('users')
        .update({ name, email, birthday, gender, preference })
        .eq('id', userId)
        .single()

      if (error) throw error

      return { success: true, data, message: 'User record updated' }
    } else {
      console.log('User does not exist, inserting new record')
      const { data, error } = await supabase
        .from('users')
        .insert({ 
          id: userId, 
          name, 
          email, 
          birthday, 
          gender, 
          preference 
        })
        .single()

      if (error) throw error

      return { success: true, data, message: 'New user record created' }
    }
  } catch (error) {
    console.error('Error adding/updating user record:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error
    }
  }
}