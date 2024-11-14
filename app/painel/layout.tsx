'use client'

import { useAuth } from '@/contexts/AuthContext'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PainelLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/entrar')
    }
  }, [user, loading, router])

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!user) {
    return null // Isso evita um flash de conteúdo não autenticado
  }

  return <>{children}</>
}