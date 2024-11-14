'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function GeolocationButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasLocation, setHasLocation] = useState(false)
  const { toast } = useToast()

  const requestGeolocation = useCallback(() => {
    setIsLoading(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(false)
        setHasLocation(true)
        // Here you would typically send the location to your server or update your app's state
        console.log(position.coords.latitude, position.coords.longitude)
        toast({
          title: "Localização obtida com sucesso!",
          description: "Agora podemos mostrar lugares próximos a você.",
        })
      },
      () => {
        setIsLoading(false)
        setHasLocation(false)
        toast({
          title: "Erro ao obter localização",
          description: "Não foi possível acessar sua localização. Por favor, tente novamente.",
          variant: "destructive",
        })
      },
      { timeout: 10000 }
    )
  }, [toast])

  useEffect(() => {
    const hasRequestedBefore = localStorage.getItem('locationRequested')
    if (!hasRequestedBefore) {
      setIsOpen(true)
      localStorage.setItem('locationRequested', 'true')
    }
  }, [])

  const handleAllowLocation = () => {
    setIsOpen(false)
    requestGeolocation()
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        disabled={isLoading}
        aria-label="Usar minha localização"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
        ) : (
          <MapPin className={`h-5 w-5 ${hasLocation ? 'text-green' : ''}`} />
        )}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Podemos saber sua localização?</DialogTitle>
            <DialogDescription>
              Gostaríamos de usar sua localização para mostrar lugares próximos a você. 
              Isso ajudará a personalizar sua experiência no Sair pro Mundo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Não, obrigado</Button>
            <Button onClick={handleAllowLocation}>
              Permitir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}