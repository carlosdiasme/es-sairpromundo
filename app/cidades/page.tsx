'use client'

import React, { useState, useEffect } from 'react'
import { CityList } from '@/components/city/CityList'
import { getCities, City } from '@/app/actions/get-cities'

const ITEMS_PER_PAGE = 16

export default function CitiesPage() {
  const [cities, setCities] = useState<(City & { regions: { name: string } })[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true)
      try {
        const result = await getCities(currentPage, ITEMS_PER_PAGE)
        setCities(result.cities)
        setTotalPages(Math.ceil(result.totalCount / ITEMS_PER_PAGE))
      } catch (error) {
        console.error('Error fetching cities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className=" px-4 py-8">
      <h1 className="text-4xl font-regular mb-8">Explore as Cidades</h1>
      <CityList
        cities={cities}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
      />
    </div>
  )
}

