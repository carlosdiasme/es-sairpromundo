import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Place } from '@/app/actions/get_places'

interface PlaceCardCoverProps {
  place: Place
}

const PlaceCardCover: React.FC<PlaceCardCoverProps> = ({ place }) => {
  return (
    <Link href={`/${place.slug}`} className="block">
      <Card className="overflow-hidden border-0 bg-lightgreen rounded-3xl hover:border hover:border-green">
        <div className="relative aspect-[16/9]">
          {place.image_1 ? (
            <Image
              src={place.image_1}
              alt={place.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-lightgreen flex items-center justify-center">
              <span className="text-muted-foreground">Sin imagen</span>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle>{place.name}</CardTitle>
          <CardDescription>{place.city_name}, {place.country_name}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default PlaceCardCover