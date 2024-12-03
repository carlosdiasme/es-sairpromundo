import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle, MapPin, Calendar, LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

async function cerrarSesion() {
  'use server'
  const supabase = createServerComponentClient({ cookies })
  await supabase.auth.signOut()
  redirect('/iniciar-sesion')
}

async function asegurarRegistroUsuario(userId: string, email: string) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase
    .from('users')
    .upsert({ id: userId, email }, { onConflict: 'id' })
    .select()

  if (error) {
    console.error('Error al crear/actualizar el registro del usuario:', error)
  } else {
    console.log('Registro de usuario creado/actualizado con éxito:', data)
  }
}

export default async function PaginaPanel() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    await asegurarRegistroUsuario(session.user.id, session.user.email || '')
  }

  return (
    <div className="px-4 py-10 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Control</h1>
        <form action={cerrarSesion}>
          <Button variant="outline" type="submit">
            <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="mr-2" />
              Cuenta Personal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gestiona tu información personal y las preferencias de tu cuenta.</p>
          </CardContent>
          <CardFooter>
            <Button>Gestionar Cuenta</Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Gestión de Ubicaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Añade, edita o elimina las ubicaciones que gestionas. Próximamente.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Gestionar Ubicaciones</Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Promoción de Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Crea y gestiona eventos para promocionar tus ubicaciones. Próximamente.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Gestionar Eventos</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

