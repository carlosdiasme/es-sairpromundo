'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export interface NewUser {
  email: string;
  name?: string;
  linkedin?: string;
  birthday?: string;
  gender?: string;
  preference?: string;
}

export interface User {
  user_id: string;
  email: string;
  name?: string;
  linkedin?: string;
  birthday?: string;
  gender?: string;
  preference?: string;
  created_at: string;
}

export async function postUser(newUser: NewUser): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const supabase = createServerComponentClient({ cookies })

    console.log('Attempting to create new user:', newUser);

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      console.error('No active session found');
      return { success: false, error: 'No active session found' };
    }

    const userId = session.user.id;

    // Check if the user already exists in the users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is the error code for "no rows returned"
      console.error('Error checking existing user:', checkError);
      return { success: false, error: 'Failed to check existing user' };
    }

    if (existingUser) {
      console.log('User already exists:', existingUser);
      return { success: true, user: existingUser as User };
    }

    // Insert the user data into the public.users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        user_id: userId,
        email: newUser.email,
        name: newUser.name,
        linkedin: newUser.linkedin,
        birthday: newUser.birthday,
        gender: newUser.gender,
        preference: newUser.preference,
      })
      .select()
      .single();

    if (userError) {
      console.error('Error inserting user data:', userError);
      return { success: false, error: 'Failed to insert user data' };
    }

    console.log('User created successfully:', userData);
    return { success: true, user: userData as User };
  } catch (error) {
    console.error('Unexpected error in postUser action:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

