'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchTabs from '@/components/SearchTabs'
import PlaceListCover from '@/components/PlaceListCover'
import { fetchPlaces, Place } from '@/app/actions/get_places'

const ITEMS_PER_PAGE = 15

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [places, setPlaces] = useState<Place[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const loadPlaces = async () => {
      const { places: fetchedPlaces, totalCount } = await fetchPlaces(currentPage, ITEMS_PER_PAGE, query)
      setPlaces(fetchedPlaces)
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE))
    }

    loadPlaces()
  }, [currentPage, query])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 sr-only">Resultados da busca</h1>
      <div className="mb-6">
        <SearchTabs />
      </div>
      <PlaceListCover
        places={places}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}