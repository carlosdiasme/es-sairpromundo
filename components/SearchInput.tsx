'use client'

import React, { useState, useCallback } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchInputProps {
  placeholder?: string
  className?: string
}

export default function SearchInput({ placeholder = 'Buscar...', className = '' }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }, [searchTerm, router])

  return (
    <form onSubmit={handleSubmit} className={`relative w-full max-w-[400px] ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        className="w-full h-10 pl-4 pr-10 text-[16px] sm:text-xs bg-white border border-neongreen rounded-full focus:outline-none focus:border-green focus:ring-1 focus:ring-green"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        aria-label="Buscar"
      >
        <Search className="w-4 h-4 text-gray-400" />
      </button>
    </form>
  )
}

