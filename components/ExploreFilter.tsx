'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, ChevronDown } from 'lucide-react'
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

interface RankingFilterProps {
  places: Place[]
}

function OrganizationList({ places, startIndex }: { places: Place[], startIndex: number }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
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
                {startIndex + indexOfFirstItem + index + 1}
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

export default function RankingFilter({ places }: RankingFilterProps) {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>(places)
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas as Categorias")
  const [selectedCity, setSelectedCity] = useState<string>("Todas as Cidades")
  const [categories, setCategories] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])

  useEffect(() => {
    const uniqueCategories = Array.from(new Set(places.map(place => place.category_title)))
    const uniqueCities = Array.from(new Set(places.map(place => place.city_name)))
    setCategories(["All Categories", ...uniqueCategories])
    setCities(["Todas as Cidades", ...uniqueCities])
  }, [places])

  useEffect(() => {
    let filtered = places
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(place => place.category_title === selectedCategory)
    }
    if (selectedCity !== "All Cities") {
      filtered = filtered.filter(place => place.city_name === selectedCity)
    }
    setFilteredPlaces(filtered)
  }, [selectedCategory, selectedCity, places])

  const FilterDialog = ({ title, items, selectedItem, onSelect }: { title: string, items: string[], selectedItem: string, onSelect: (item: string) => void }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="font-normal text-3xl p-6 hover:no-underline bg-lightgreen">
          <span className="text-green">{selectedItem}</span>
          <ChevronDown className="ml-1 h-4 w-4 text-green" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione {title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          {items.map(item => (
            <Button
              key={item}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onSelect(item)}
            >
              {item}
              {selectedItem === item && <Check className="ml-auto h-4 w-4" />}
            </Button>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-8 ">
      <h2 className="text-3xl font-normal text-center my-24">
        Explorar{' '}
        <FilterDialog
          title="Categoria"
          items={categories}
          selectedItem={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {' '}em{' '}
        <FilterDialog
          title="Cidade"
          items={cities}
          selectedItem={selectedCity}
          onSelect={setSelectedCity}
        />
      </h2>
      <OrganizationList places={filteredPlaces} startIndex={0} />
    </div>
  )
}