import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Place } from '@/app/actions/explore'

interface ExploreCityMainProps {
  places: Place[]
}

export function ExploreCityMain({ places }: ExploreCityMainProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place, index) => (
        <Link key={place.place_id} href={`/${place.slug}`} className="block">
          <Card className="overflow-hidden border-0 bg-lightgreen rounded-3xl hover:border hover:border-green">
            <div className="relative aspect-[16/9]">
              {place.image_1 ? (
                <Image
                  src={place.image_1}
                  alt={place.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0} // Add priority to the first image
                />
              ) : (
                <div className="absolute inset-0 bg-lightgreen flex items-center justify-center">
                  <span className="text-muted-foreground">Sem imagem</span>
                </div>
              )}
            </div>
            <CardHeader>
              <CardTitle>{place.name}</CardTitle>
              <CardDescription className="pb-4">{place.address}</CardDescription>
              <CardFooter className="text-sm text-foreground/60 p-0">
                {place.about && place.about.length > 100
                  ? `${place.about.substring(0, 100)}...`
                  : place.about}
              </CardFooter>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}