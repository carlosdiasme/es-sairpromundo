'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/contexts/AuthContext'

export function SigninForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { signIn } = useAuth()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      await signIn(email, password)
      router.push('/')
    } catch (error) {
      console.error('Signin error:', error)
      setError('Falha ao entrar. Verifique suas credenciais.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
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
              autoComplete="current-password"
              disabled={isLoading}
              name="password"
              required
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
        </div>
      </form>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}