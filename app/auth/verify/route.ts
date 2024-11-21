import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { postUser } from '@/app/actions/post-users'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    
    try {
      await supabase.auth.exchangeCodeForSession(code)

      // Get the user data
      const { data: { user } } = await supabase.auth.getUser()

      if (user && user.email) {
        // Create user profile after email verification
        const result = await postUser({ 
          email: user.email,
          name: user.user_metadata.name
        })
        
        if (!result.success) {
          console.error('Error creating user profile:', result.error)
          // You might want to handle this error, perhaps by redirecting to an error page
        }
      }
    } catch (error) {
      console.error('Error during email verification:', error)
      // Handle the error, perhaps by redirecting to an error page
    }
  }

  // Redirect to the home page or a welcome page after successful verification
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}

