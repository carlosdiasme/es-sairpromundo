'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CarouselImages } from '@/components/CarouselImages'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Place } from '@/app/actions/explore'


interface ExploreCityHighlightProps {
  place: Place
}

export function ExploreCityHighlight({ place }: ExploreCityHighlightProps) {
  const carouselImages = [
    place.image_1,
    place.image_2,
    place.image_3,
    place.image_4
  ].filter(Boolean)

  return (
    <Card className="overflow-hidden rounded-3xl  pt-4 border-0">
      <CarouselImages images={carouselImages} alt={place.name} />
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center">
          <div className="mr-4 flex-shrink-0">
            {place.logo ? (
              <Image
                src={place.logo}
                alt={`${place.name}`}
                width={64}
                height={64}
                className="rounded-2xl"
              />
            ) : (
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-2xl">💚</span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-normal mb-1">{place.name}</h2>
            <p className="text-sm text-muted-foreground flex items-center">
              {place.address}
            </p>
          </div>
        </div>
        <div className="mt-8 flex space-x-2 ">
          <Button variant="outline" asChild className='border-0 bg-green text-white'>
            <Link href={`/${place.slug}`}>

            See more
            </Link>
          </Button>
          <Button variant="outline" asChild className='border-0 bg-green/10 ' >
            <a href={place.google_maps} target="_blank" rel="noopener noreferrer">

              Google Maps
            </a>
          </Button>
          <Button variant="outline" asChild className='border-0 bg-green/10 '>
            <a href={`https://www.instagram.com/${place.instagram}`} target="_blank" rel="noopener noreferrer">

              Instagram
            </a>
          </Button>
        </div>
        <div className="mt-4">
          <p className="text-sm line-clamp-3 pt-4 pb-16 border-b border-neongreen">{place.about}</p>
        </div>
      </CardContent>
    </Card>
  )
}