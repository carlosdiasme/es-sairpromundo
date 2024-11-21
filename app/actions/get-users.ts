'use server'

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  user_id: string;
  created_at: string;
  email: string;
  name: string | null;
  linkedin: string | null;
  birthday: string | null;
  gender: string | null;
  preference: string | null;
}

export async function getUsers(): Promise<{ users: User[], totalCount: number }> {
  const { data, error, count } = await supabase
    .from('users')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }

  const users: User[] = data ?? [];

  return { 
    users,
    totalCount: count ?? 0
  };
}

