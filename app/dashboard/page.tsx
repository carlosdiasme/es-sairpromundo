import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle, MapPin, Calendar, LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

async function logout() {
  'use server'
  const supabase = createServerComponentClient({ cookies })
  await supabase.auth.signOut()
  redirect('/login')
}

async function ensureUserRecord(userId: string, email: string) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase
    .from('users')
    .upsert({ id: userId, email }, { onConflict: 'id' })
    .select()

  if (error) {
    console.error('Error creating/updating user record:', error)
  } else {
    console.log('User record created/updated successfully:', data)
  }
}

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    await ensureUserRecord(session.user.id, session.user.email || '')
  }

  return (
    <div className="px-4 py-10 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <form action={logout}>
          <Button variant="outline" type="submit">
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="mr-2" />
              Personal Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your personal information and account preferences.</p>
          </CardContent>
          <CardFooter>
            <Button>Manage Account</Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Location Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add, edit, or remove locations you manage. Coming soon.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Locations</Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Event Promotion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create and manage events to promote your locations. Coming soon.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Manage Events</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

