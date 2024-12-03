"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CarouselImages } from '@/components/CarouselImages'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PlaceTabs from '@/components/place/PlaceTabs'
import NavPlace from '@/components/nav/NavPlace'
import { LoginRequired } from '@/components/place/LoginRequired'
import { ReviewDialog } from '@/components/place/ReviewDialog'
import { useAuth } from '@/contexts/AuthContext'
import { getReviews } from '@/app/actions/get-reviews'

interface Place {
  place_id: number
  image_1: string
  image_2: string
  image_3: string
  image_4: string
  logo: string
  name: string
  claim: boolean
  slug: string
  rating_average?: number
  rating_count?: number
  city_name: string
  city_slug: string
  category_name: string
  category_slug: string
  category_title: string
}

interface PlaceHeaderProps {
  place: Place
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function PlaceHeader({ place, activeTab, onTabChange }: PlaceHeaderProps) {
  const { user, loading } = useAuth()
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [ratingAverage, setRatingAverage] = useState<number | undefined>(undefined)
  const [ratingCount, setRatingCount] = useState<number | undefined>(undefined)
  const [hasUserReviewed, setHasUserReviewed] = useState(false)
  const carouselImages = [
    place.image_1,
    place.image_2,
    place.image_3,
    place.image_4
  ].filter(Boolean)

  useEffect(() => {
    async function fetchRatings() {
      const result = await getReviews(place.place_id)
      if (result.success && result.data) {
        const totalRating = result.data.reduce((sum, review) => sum + review.rating, 0)
        setRatingAverage(result.data.length > 0 ? totalRating / result.data.length : undefined)
        setRatingCount(result.totalReviews)
        
        // Verificar si el usuario actual ya ha hecho una reseña
        if (user) {
          const userReview = result.data.find(review => review.user_id === user.id)
          setHasUserReviewed(!!userReview)
        }
      }
    }
    fetchRatings()
  }, [place.place_id, user])

  const handleReviewClick = () => {
    if (user && !hasUserReviewed) {
      setIsReviewDialogOpen(true)
    }
  }

  const handleShareClick = () => {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl).then(() => {
      setIsShareDialogOpen(true)
      setTimeout(() => setIsShareDialogOpen(false), 2000)
    }).catch((err) => {
      console.error('Error al copiar el enlace: ', err)
    })
  }

  const renderHearts = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Heart
        key={index}
        className={`w-4 h-4 mr-1 ${
          index < Math.round(ratingAverage || 0)
            ? "text-red-500 fill-red-500"
            : "fill-foreground/10 text-background/0"
        }`}
      />
    ))
  }

  return (
    <div className="bg-background">
      <NavPlace 
        cityName={place.city_name}
        citySlug={place.city_slug}
        categoryName={place.category_title}
        categorySlug={place.category_slug}
      />
      <CarouselImages images={carouselImages} alt={place.name} />
      <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            {place.logo ? (
              <Image
                src={place.logo}
                alt={`Logo del lugar ${place.name}`}
                width={64}
                height={64}
                className="rounded-2xl"
              />
            ) : (
              <div className="w-16 h-16 bg-lightgreen rounded-full flex items-center justify-center">
                <span className="text-gray-400">💚</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="text-xl md:text-3xl font-regular mr-2 mb-2">{place.name}</h1>
              {place.claim && <CheckCircleIcon className="text-green w-4 h-4" />}
            </div>
            <div className="flex items-center mt-1">
              {ratingAverage !== undefined && ratingCount !== undefined ? (
                <>
                  <div className="flex mr-2">{renderHearts()}</div>
                  <span className='text-foreground/60 text-xs'>{ratingAverage.toFixed(1)}</span>
                  <span className="ml-1 text-foreground/60 text-xs">({ratingCount} reseñas)</span>
                </>
              ) : (
                <span className="text-foreground/60 text-xs">Sin reseñas</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0 pt-4">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={handleShareClick}>
            Compartir
          </Button>
          {loading ? (
            <Button disabled className="flex-1 sm:flex-none">Cargando...</Button>
          ) : user ? (
            <Button 
              className="flex-1 sm:flex-none" 
              onClick={handleReviewClick}
              disabled={hasUserReviewed}
            >
              {hasUserReviewed ? "Calificado" : "Calificar"}
            </Button>
          ) : (
            <LoginRequired />
          )}
        </div>
      </div>
      <div className="p-4">
        <PlaceTabs activeTab={activeTab} onTabChange={onTabChange} />
      </div>
      {user && !hasUserReviewed && (
        <ReviewDialog 
          placeId={place.place_id}
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
        />
      )}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Enlace copiado!</DialogTitle>
            <DialogDescription>
              El enlace ha sido copiado al portapapeles.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

