import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Place } from '@/app/actions/get_places'

interface PlaceCardLogoProps {
  place: Place
}

const PlaceCardLogo: React.FC<PlaceCardLogoProps> = ({ place }) => {
  return (
    <Link href={`/${place.slug}`} className="block">
      <Card className="overflow-hidden hover:border hover:border-green rounded-3xl bg-lightgreen border-0">
        <div className="flex items-center p-4">
          <div className="relative w-16 h-16 mr-4 flex-shrink-0">
            {place.logo ? (
              <Image
                src={place.logo}
                alt={`${place.name} logo`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            ) : (
              <div className="w-full h-full bg-muted rounded-full flex items-center justify-center">
                <span className="text-muted-foreground text-xs">Sin logotipo</span>
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-lg">{place.name}</CardTitle>
            <CardDescription>{place.city_name}, {place.country_name}</CardDescription>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default PlaceCardLogo