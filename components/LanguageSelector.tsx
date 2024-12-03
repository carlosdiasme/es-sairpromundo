'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Languages } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'

const languages = [
  {
    name: 'Português',
    url: 'https://sairpromundo.com'
  },
  {
    name: 'English',
    url: 'https://en.sairpromundo.com'
  },
  {
    name: 'Español',
    url: 'https://es.sairpromundo.com'
  }
]

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLanguageSelect = (url: string) => {
    setIsOpen(false)
    router.push(url)
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Select language"
      >
        <Languages className="h-5 w-5" />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              Choose a language
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {languages.map((language) => (
              <Button
                key={language.url}
                variant="outline"
                className="w-full justify-start h-auto p-4"
                onClick={() => handleLanguageSelect(language.url)}
              >
                <span className="font-medium">{language.name}</span>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

