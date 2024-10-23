'use server'

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogView {
  blog_id: number;
  created_at: string;
  updated_at: string;
  slug: string;
  title: string;
  image: string;
  content: string;
  tag_id: number;
  tag_title: string;
  tag_slug: string;
  user_id: string;
  user_name: string;
  user_linkedin: string;
}

export async function Blog (page: number, itemsPerPage: number, tagSlug?: string): Promise<{ blogs: BlogView[], totalCount: number }> {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage - 1;

  let query = supabase
    .from('vw_blogs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(start, end);

  if (tagSlug) {
    query = query.eq('tag_slug', tagSlug);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('Error fetching blogs view:', error);
    throw new Error('Failed to fetch blogs view');
  }

  const blogs: BlogView[] = data ?? [];

  return { 
    blogs,
    totalCount: count ?? 0
  };
}
