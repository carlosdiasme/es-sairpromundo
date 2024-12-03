import React, { Suspense } from 'react'
import SearchPageContent from '@/components/SearchPageContent'

export default function PaginaBusqueda() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}

