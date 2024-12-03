import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Place } from '@/app/actions/explore'

interface ExploreCityMainProps {
  places: Place[]
}

export function ExploreCityMain({ places }: ExploreCityMainProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {places.map((place) => (
        <Link key={place.place_id} href={`/${place.slug}`}>
          <Card className="overflow-hidden hover:border hover:border-green rounded-3xl bg-lightgreen border-0">
            <div className="relative h-48">
              <Image
                src={place.image_1 || '/imagen-predeterminada.jpg'}
                alt={place.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2">{place.name}</CardTitle>
              <CardDescription className="line-clamp-2">{place.about}</CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

