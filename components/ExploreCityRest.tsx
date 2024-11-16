'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Place } from '@/app/actions/explore'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ExploreCityRestProps {
  places: Place[]
  itemsPerPage?: number
}

export function ExploreCityRest({ places, itemsPerPage = 6 }: ExploreCityRestProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [mounted, setMounted] = useState(false)
  const totalPages = Math.ceil(places.length / itemsPerPage)

  useEffect(() => {
    setMounted(true)
  }, [])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPlaces = places.slice(startIndex, endIndex)

  if (!mounted) {
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {currentPlaces.map((place) => (
          <Link key={place.place_id} href={`/lugar/${place.slug}`} className="block">
            <Card className="overflow-hidden hover:border hover:border-green rounded-3xl bg-lightgreen border-0">
              <div className="flex items-center p-4">
                <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                  {place.logo ? (
                    <Image
                      src={place.logo}
                      alt={`${place.name} logo`}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-green/20 rounded-full flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">💚</span>
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg">{place.name}</CardTitle>
                  <CardDescription>{place.address}</CardDescription>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationPrevious>
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(pageNumber)
                    }}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            } else if (
              pageNumber === currentPage - 2 ||
              pageNumber === currentPage + 2
            ) {
              return <PaginationEllipsis key={index} />
            }
            return null
          })}
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault()
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}