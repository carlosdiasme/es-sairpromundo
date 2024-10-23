'use client'

import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Script from 'next/script'
import OrganizationList from '@/components/PlaceList'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { fetchPlaces, Place } from '@/app/actions/vw_places'

export default function IconPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [places, setPlaces] = useState<Place[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const itemsPerPage = 10

  useEffect(() => {
    async function loadPlaces() {
      setIsLoading(true)
      setError(null)
      try {
        const { places: fetchedPlaces, totalCount } = await fetchPlaces(currentPage, itemsPerPage)
        setPlaces(fetchedPlaces)
        setTotalCount(totalCount)
      } catch (error) {
        setError('Failed to load places. Please try again later.')
        console.error('Error loading places:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadPlaces()
  }, [currentPage])

  const totalPages = Math.ceil(totalCount / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.sairpromundo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Lugares",
        "item": "https://www.sairpromundo.com/places"
      }
    ]
  }

  const carouselData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": places.map((place, index) => ({
      "@type": "ListItem",
      "position": startIndex + index + 1,
      "item": {
        "@type": "Place",
        "name": place.name,
        "image": place.cover || "https://www.sairpromundo.com/default-place-image.jpg",
        "url": `https://www.sairpromundo.com/places/${place.slug}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": place.city_name,
          "addressRegion": place.region_name,
          "addressCountry": place.country_name
        }
      }
    }))
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <>
      <Head>
        <title>Ranking Geral de Lugares | Sair pro Mundo</title>
        <meta name="description" content={`Explore os ${totalCount} melhores lugares para visitar. Descubra destinos incríveis e planeje sua próxima aventura com o Sair pro Mundo.`} />
        <meta property="og:title" content="Ranking Geral de Lugares | Sair pro Mundo" />
        <meta property="og:description" content={`Explore os ${totalCount} melhores lugares para visitar. Descubra destinos incríveis e planeje sua próxima aventura com o Sair pro Mundo.`} />
        <meta property="og:image" content="https://www.sairpromundo.com/og-image-places.jpg" />
        <meta property="og:url" content="https://www.sairpromundo.com/places" />
        <meta property="og:type" content="website" />
      </Head>
      <Script id="breadcrumb-data" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>
      <Script id="carousel-data" type="application/ld+json">
        {JSON.stringify(carouselData)}
      </Script>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-regular mb-2 self-start px-4 pt-8">Ranking geral</h1>
        <p className="text-sm text-muted-foreground mb-4 self-start px-4">{totalCount} lugares</p>
        <OrganizationList places={places} startIndex={startIndex} />
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.max(1, currentPage - 1))
                }}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index + 1}>
                <PaginationLink 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(index + 1)
                  }}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}