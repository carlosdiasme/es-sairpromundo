import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Place } from '@/app/actions/get_places' // Importando o tipo correto

interface OrganizationListProps {
  places: Place[]; // Alterado para 'places'
  startIndex: number;
}

export default function OrganizationList({ places, startIndex }: OrganizationListProps) { // Alterado para 'places'
  return (
    <ul className="w-full space-y-2 p-4">
      {places.map((place, index) => ( // Alterado para 'place'
        <Link
          key={place.place_id} // Alterado para 'place_id'
          href={`/${place.slug}`} // Alterado para 'place'
          className="block"
        >
          <li 
            className="flex items-center justify-between space-x-4 p-4 bg-card rounded-2xl transition-all bg-lightbege bg-lightgreen  hover:bg-neongreen cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              {place.logo && ( // Alterado para 'place'
                <Image
                  src={place.logo}
                  alt={`${place.name} logo`} // Alterado para 'place'
                  width={40}
                  height={40}
                  className="rounded-xl border border-neongreen"
                />
              )}
              <div>
                <h2 className="text-lg font-regular text-foreground">{place.name}</h2>
                <p className="text-sm text-muted-foreground">{place.city_name}, {place.region_name}</p>
              </div>
            </div>

            <span className="text-sm font-medium text-muted-foreground">
              {startIndex + index + 1}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  )
}
