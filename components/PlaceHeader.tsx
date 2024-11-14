import React from 'react'
import Image from 'next/image'
import { CarouselImages } from '@/components/CarouselImages'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/solid'
import { Button } from "@/components/ui/button"
import PlaceTabs from '@/components/PlaceTabs'

interface Place {
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
}

interface PlaceHeaderProps {
  place: Place
}

export default function PlaceHeader({ place }: PlaceHeaderProps) {
  const carouselImages = [
    place.image_1,
    place.image_2,
    place.image_3,
    place.image_4
  ].filter(Boolean) // This will remove any falsy values (empty strings, null, undefined)

  return (
    <div className="bg-background">
      <CarouselImages images={carouselImages} alt={place.name} />
      <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            {place.logo ? (
              <Image
                src={place.logo}
                alt={`Logo do lugar ${place.name}`}
                width={64}
                height={64}
                className="rounded-2xl"
              />
            ) : (
              <div className="w-16 h-16 bg-lightgreen rounded-full flex items-center justify-center">
                <span className="text-gray-400">📍</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="text-xl md:text-3xl font-regular mr-2">{place.name}</h1>
              {place.claim && <CheckCircleIcon className="text-green w-4 h-4" />}
            </div>
            <div className="flex items-center mt-1">
              {place.rating_average && place.rating_count ? (
                <>
                  <StarIcon className="text-yellow-400 w-4 h-4 mr-1" />
                  <span>{place.rating_average.toFixed(1)}</span>
                  <span className="ml-1">({place.rating_count} avaliações)</span>
                </>
              ) : (
                <span className="text-gray-500 text-xs">Sem avaliações</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0 pt-4">
          <Button variant="outline" className="flex-1 sm:flex-none">Seguir</Button>
          <Button className="flex-1 sm:flex-none">Avaliar</Button>
        </div>
      </div>
      <div className="p-4">
        <PlaceTabs placeName={place.name} placeSlug={place.slug} />
      </div>
    </div>
  )
}