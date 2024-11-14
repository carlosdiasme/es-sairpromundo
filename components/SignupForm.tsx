'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/contexts/AuthContext'
import { addUserRecord } from '@/app/actions/users'

export function SignupForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signUp } = useAuth()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { user, error } = await signUp(email, password)
      if (error) throw error

      if (user) {
        await addUserRecord(name, email, user.id)
        router.push('/verificar-email')
      } else {
        throw new Error('Failed to create user')
      }
    } catch (error) {
      setError('Falha ao criar conta. Tente novamente.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Seu nome"
              type="text"
              autoCapitalize="words"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              name="name"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              required
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="Senha"
              type="password"
              autoCapitalize="none"
              autoComplete="new-password"
              disabled={isLoading}
              name="password"
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? "Carregando..." : "Criar conta"}
          </Button>
        </div>
      </form>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}