'use client'

import React, { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

export default function GeolocationButton() {
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
          title: "Location obtained successfully!",
          description: "We can now show places near you.",
        })
      },
      () => {
        setIsLoading(false)
        setHasLocation(false)
        toast({
          title: "Error obtaining location",
          description: "We couldn't access your location. Please try again.",
          variant: "destructive",
        })
      },
      { timeout: 10000 }
    )
  }, [toast])


  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => requestGeolocation()}
        disabled={isLoading}
        aria-label="Use my location"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900" />
        ) : (
          <MapPin className={`h-5 w-5 ${hasLocation ? 'text-green' : ''}`} />
        )}
      </Button>
    </>
  )
}

