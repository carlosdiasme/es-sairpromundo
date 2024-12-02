'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

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
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
        We use cookies to improve your experience. By continuing, you agree to our cookie policy.
        </p>
        <Button onClick={handleAccept} variant="default" size="sm">
          Close
        </Button>
      </div>
    </div>
  )
}