'use client'

import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import Icon from './Icon'
import Link from 'next/link'
import SearchInput from './SearchInput'
import { Button } from '@/components/ui/button'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function ResponsiveNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    // Add padding to the body to prevent content from being hidden behind the navbar
    document.body.style.paddingTop = '64px' // Adjust this value if your navbar height changes
    return () => {
      document.body.style.paddingTop = '0'
    }
  }, [])

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="w-full">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between h-16 px-4">
          <Link href="/">
            <Logo className="h-5 w-auto" />
          </Link>
          <nav className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/ranking" className="text-gray-800 hover:text-green transition-colors">
              Ranking
            </Link>
          </nav>
          <SearchInput placeholder="Procure por lugares" className="max-w-md" />
          <nav className="flex flex-wrap justify-center gap-4 text-sm">

            <Link href="/blog" className="text-gray-800 hover:text-green transition-colors">
              Blog
            </Link>
          </nav>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => window.location.href = "#signin"}>Entrar</Button>
            <Button variant="default" onClick={() => window.location.href = "#signup"}>Criar conta</Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden w-full">
          <div className="flex items-center justify-between h-16 px-4 space-x-4">
            <Link href="/">
              <Icon className="h-6 w-auto" />
            </Link>
            <SearchInput placeholder="Procure por lugares" className="flex-1 max-w-[240px]" />
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
                <Link href="/ranking" className="text-gray-500 hover:green transition-colors py-3 text-center">
                  Ranking
                </Link>
                <hr className="border-gray-200" />
                <Link href="/blog" className="text-gray-500 hover:text-green transition-colors py-3 text-center">
                  Blog
                </Link>
                <hr className="border-gray-200" />
              </nav>
              <div className="mt-4 space-y-2 px-4">
                <Button variant="outline" className="w-full" onClick={() => window.location.href = "#signin"}>Entrar</Button>
                <Button variant="default" className="w-full" onClick={() => window.location.href = "#signup"}>Criar conta</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}