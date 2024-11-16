import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { City } from '@/app/actions/get-cities'

interface CityCardProps {
  city: City & { regions: { name: string } }
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  return (
    <Link href={`/explorar/${city.slug || city.city_id}`} className="block">
      <Card className="overflow-hidden border-0 bg-lightgreen rounded-3xl hover:border hover:border-green">
        <div className="relative aspect-[8/9]">
          {city.image ? (
            <Image
              src={city.image}
              alt={city.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-lightgreen flex items-center justify-center">
              <span className="text-muted-foreground">Sem imagem</span>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle>{city.name}</CardTitle>
          <CardDescription>{city.regions.name}</CardDescription>
          <CardDescription>{city.complete}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

export default CityCard