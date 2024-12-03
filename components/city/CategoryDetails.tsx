import React from 'react'
import Image from 'next/image'
import { Place } from '@/app/actions/explore'

interface ExploreCityDetailsProps {
  place: Place;
  placesCount: number;
  defaultImages: string[];
}

export function ExploreCityDetails({ place, placesCount, defaultImages = ['/categoria-predeterminada.jpg', '/ciudad-predeterminada.jpg'] }: ExploreCityDetailsProps) {
  console.log('Lugar recibido:', place)

  const categoryImage = place.category_image || defaultImages[0]
  const cityImage = place.city_image || defaultImages[1]

  console.log('Imagen de Categoría:', categoryImage)
  console.log('Imagen de Ciudad:', cityImage)

  return (
    <div className="mb-8 py-8 bg-darkgreen rounded-3xl border ">
      <div className="flex flex-col lg:flex-row lg:space-x-8 p-4 sm:p-16">
        <div className="lg:w-1/2 mb-8 lg:mb-0 p-4 mr-8 ">
          <h1 className="text-4xl text-white font-normal mb-12 leading-snug">
            Descubre {place.es_category_plural} en {place.city_complete}
          </h1>
          <p className="text-base text-white/60 mb-6">{place.es_category_description}</p>
          <p className="text-md text-white/60">
            Encontramos {placesCount} {placesCount === 1 ? 'lugar' : 'lugares'}
          </p>
        </div>
        <div className="flex lg:w-1/2 space-x-4">
          <div className="w-1/2 relative aspect-[3/4]">
            <Image
              src={categoryImage}
              alt={`Imagen de ${place.es_category_plural}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover rounded-full "
              priority
            />
          </div>
          <div className="w-1/2 relative aspect-[3/4]">
            <Image
              src={cityImage}
              alt={`Imagen de ${place.city_complete}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

