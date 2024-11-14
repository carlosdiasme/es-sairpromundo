'use client'

import React from 'react'
import SearchTabs from '@/components/SearchTabs'

export default function SearchPage() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 sr-only">Resultados da busca</h1>
      <div className="mb-6">
      </div>
      <SearchTabs />
    </div>
  )
}