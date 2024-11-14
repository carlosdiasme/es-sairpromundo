'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Place } from '@/app/actions/get_places'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface OrganizationListProps {
  places: Place[];
  itemsPerPage?: number;
}

export default function OrganizationList({ places, itemsPerPage = 10 }: OrganizationListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentPlaces = places.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(places.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-4">
      <ul className="w-full space-y-2 p-4">
        {currentPlaces.map((place, index) => (
          <Link
            key={place.place_id}
            href={`/${place.slug}`}
            className="block"
          >
            <li 
              className="flex items-center justify-between space-x-4 p-4 bg-card rounded-2xl transition-all bg-lightgreen hover:bg-neongreen cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                {place.logo && (
                  <Image
                    src={place.logo}
                    alt={`${place.name} logo`}
                    width={40}
                    height={40}
                    className="rounded-xl border border-neongreen"
                  />
                )}
                <div>
                  <h2 className="text-lg font-regular text-foreground">{place.name}</h2>
                  <p className="text-sm text-muted-foreground">{place.city_name}, {place.region_name}</p>
                </div>
              </div>

              <span className="text-sm font-medium text-muted-foreground">
                {indexOfFirstItem + index + 1}
              </span>
            </li>
          </Link>
        ))}
      </ul>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                onClick={() => handlePageChange(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}