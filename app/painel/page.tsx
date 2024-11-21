import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle, MapPin, Calendar, LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'

export default async function PainelPage() {
  const handleLogout = async () => {
    'use server'
    const supabase = createServerComponentClient({ cookies })
    await supabase.auth.signOut()
    redirect('/entrar')
  }

  return (
    <div className="px-4 py-10 h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold sr-only">Painel de controle</h1>
        <form action={handleLogout}>
          <Button variant="outline" className="ml-auto">
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCircle className="mr-2" />
              Conta pessoal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie suas informações pessoais e preferências de conta.</p>
          </CardContent>
          <CardFooter>
            <Button>Gerenciar conta</Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Gerenciamento de locais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Adicione, edite ou remova locais que você gerencia. Em breve.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Gerenciar locais</Button>
          </CardFooter>
        </Card>

        <Card className="rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Divulgação de eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Crie e gerencie eventos para promover seus locais. Em breve.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Gerenciar eventos</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}