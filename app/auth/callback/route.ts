import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getUsers } from '@/app/actions/get-users'
import { postUser } from '@/app/actions/post-users'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)

    // Check if user exists and create if not
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { users } = await getUsers()
      const existingUser = users.find(u => u.user_id === user.id)
      
      if (!existingUser) {
        await postUser({
          email: user.email || '',
          // You can add more fields here if needed
        })
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}

