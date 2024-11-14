'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X } from 'lucide-react'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    if (!cookiesAccepted) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <Card className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50">
      <CardContent className="p-4 flex items-center justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300 mr-4">
          Nós usamos cookies para melhorar sua experiência no Sair pro Mundo. Ao continuar navegando, você concorda com nossa política de cookies.
        </p>
        <Button onClick={handleAccept} variant="outline" size="sm" className="shrink-0">
          <X className="h-4 w-4 mr-2" />
          Fechar
        </Button>
      </CardContent>
    </Card>
  )
}