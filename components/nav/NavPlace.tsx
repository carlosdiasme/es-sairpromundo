"use client"

import * as React from "react"
import Link from "next/link"
import { MapPin, AudioWaveform, ListFilter, ChevronDown } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { getCategories } from "@/app/actions/get-categories"
import { getSpecialties } from "@/app/actions/get-specialties"
import { getActivities } from "@/app/actions/get-activities"

// Import or define the types
type Category = {
  category_id: number
  en_title: string
  en_slug: string
  // Add other fields as necessary
}

type Specialty = {
  specialty_id: number
  title: string
  slug: string
  // Add other fields as necessary
}

type Activity = {
  activity_id: number
  title: string
  slug: string
  // Add other fields as necessary
}

interface NavPlaceProps {
  cityName: string
  citySlug: string
  categoryName: string
  categorySlug: string
}

export default function NavPlace({ cityName, citySlug, categoryName, categorySlug }: NavPlaceProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [categoryFilter, setCategoryFilter] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("")
  const [activityFilter, setActivityFilter] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getCategories()
      const specialtiesData = await getSpecialties()
      const activitiesData = await getActivities()
      setCategories(categoriesData)
      setSpecialties(specialtiesData)
      setActivities(activitiesData)
    }
    fetchData()
  }, [])

  return (
    <div className="w-full border-0 mb-2">
      <div className="overflow-x-auto scrollbar-hide">
        <nav className="flex h-14 items-center gap-4 px-4 min-w-max">
          <Link
            href={`/ciudades/${citySlug}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <MapPin className="h-3 w-3" />
            <span>{cityName}</span>
          </Link>
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <Link 
            href={`/ciudades/${citySlug}/categorias/${categorySlug}`}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"
          >
            <AudioWaveform className="h-3 w-3" />
            <span>{categoryName}</span>
          </Link>
      
          <div className="h-4 w-px bg-border" aria-hidden="true" />
          <div className="flex items-center gap-6">
            <ListFilter className="h-3 w-3" />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary p-0 h-auto hover:bg-background">
                  <span>Categorías</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Categorías en {cityName}</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder="Filtrar categorías..."
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="mb-4"
                />
                <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
                  {categories
                    .filter((category) =>
                      category.en_title.toLowerCase().includes(categoryFilter.toLowerCase())
                    )
                    .map((category) => (
                      <Button
                        key={category.category_id}
                        variant="ghost"
                        className="justify-start"
                        asChild
                      >
                        <Link href={`/ciudades/${citySlug}/categorias/${category.en_slug}`}>
                          {category.en_title}
                        </Link>
                      </Button>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary p-0 h-auto hover:bg-background sr-only">
                  <span>Especialidades</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Especialidades en {cityName}</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder="Filtrar especialidades..."
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="mb-4"
                />
                <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
                  {specialties
                    .filter((specialty) =>
                      specialty.title.toLowerCase().includes(specialtyFilter.toLowerCase())
                    )
                    .map((specialty) => (
                      <Button
                        key={specialty.specialty_id}
                        variant="ghost"
                        className="justify-start"
                        asChild
                      >
                        <Link href={`/ciudades/${citySlug}/especialidades/${specialty.slug}`}>
                          {specialty.title}
                        </Link>
                      </Button>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary p-0 h-auto hover:bg-background sr-only">
                  <span>Actividades</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Actividades en {cityName}</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder="Filtrar actividades..."
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  className="mb-4"
                />
                <div className="grid gap-4 py-4 max-h-[300px] overflow-y-auto">
                  {activities
                    .filter((activity) =>
                      activity.title.toLowerCase().includes(activityFilter.toLowerCase())
                    )
                    .map((activity) => (
                      <Button
                        key={activity.activity_id}
                        variant="ghost"
                        className="justify-start"
                        asChild
                      >
                        <Link href={`/ciudades/${citySlug}/actividades/${activity.slug}`}>
                          {activity.title}
                        </Link>
                      </Button>
                    ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

