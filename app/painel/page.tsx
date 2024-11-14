import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserCircle, MapPin, Calendar } from 'lucide-react'
import { addUserRecord } from "@/app/actions/users"

export default async function PainelPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('Não autorizado')
  }

  const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('id', session.user.id)
    .single()

  if (!existingUser) {
    await addUserRecord(session.user.user_metadata.name || '', session.user.email || '', session.user.id)
  }

  return (
    <div className="px-4 py-10 h-screen">
      <h1 className="text-3xl font-bold mb-6 sr-only">Painel de controle</h1>
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