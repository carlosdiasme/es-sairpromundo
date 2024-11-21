import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { postUser } from '@/app/actions/post-users'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user data
    const { data: { user } } = await supabase.auth.getUser()

    if (user && user.email) {
      // Create user profile in the background
      try {
        const result = await postUser({ 
          email: user.email,
          name: user.user_metadata.full_name
        })
        if (!result.success) {
          console.error('Error creating user profile:', result.error)
        }
      } catch (error) {
        console.error('Error creating user profile:', error)
      }
    }
  }

  // Redirect to the home page after successful authentication
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}

