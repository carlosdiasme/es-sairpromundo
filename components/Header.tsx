'use client'

import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import Icon from './Icon'
import Link from 'next/link'
import SearchInput from './SearchInput'
import { Button } from '@/components/ui/button'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import GeolocationButton from './GeolocationButton'
import { useAuth } from '@/contexts/AuthContext'

export default function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    document.body.style.paddingTop = '64px'
    return () => {
      document.body.style.paddingTop = '0'
    }
  }, [])

  const AuthButtons = () => {
    if (user) {
      return (
        <Button variant="default" onClick={() => window.location.href = "/painel"}>Painel</Button>
      )
    }
    return (
      <>
        <Button variant="outline" onClick={() => window.location.href = "/entrar"}>Entrar</Button>
        <Button variant="default" onClick={() => window.location.href = "/criar-conta"}>Criar conta</Button>
      </>
    )
  }

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="w-full">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center h-full">
            <div className="h-2 w-auto flex items-center">
              <Logo />
            </div>
          </Link>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/explorar" className="text-gray-800 hover:text-green transition-colors">
              Explorar
            </Link>
          </nav>
          <SearchInput placeholder="Procure por lugares" className="max-w-md" />
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/blog" className="text-gray-800 hover:text-green transition-colors">
              Blog
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <GeolocationButton />
            <AuthButtons />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between h-16 px-4 space-x-4">
            <Link href="/" className="flex items-center h-full">
              <div className="h-6 w-auto flex items-center">
                <Icon />
              </div>
            </Link>
            <SearchInput placeholder="Procure por lugares" className="flex-1 max-w-[240px]" />
            <GeolocationButton />
            <button onClick={toggleMenu} className="p-2 ml-4" aria-label={isOpen ? "Close menu" : "Open menu"}>
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars2Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="pt-2 pb-4 w-full bg-white">
              <nav className="flex flex-col w-full">
                <hr className="border-gray-200" />
                <Link href="/explorar" className="text-gray-500 hover:green transition-colors py-3 text-center">
                  Explorar
                </Link>
                <hr className="border-gray-200" />
                <Link href="/blog" className="text-gray-500 hover:text-green transition-colors py-3 text-center">
                  Blog
                </Link>
                <hr className="border-gray-200" />
              </nav>
              <div className="mt-4 space-y-2 px-4">
                {user ? (
                  <Button variant="default" className="w-full" onClick={() => window.location.href = "/painel"}>Painel</Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = "/entrar"}>Entrar</Button>
                    <Button variant="default" className="w-full" onClick={() => window.location.href = "/criar-conta"}>Criar conta</Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}