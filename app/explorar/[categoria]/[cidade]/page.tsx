import React from 'react'
import { notFound } from 'next/navigation'
import { ExploreCityDetails } from '@/components/ExploreCityDetails'
import { ExploreCityHighlight } from '@/components/ExploreCityHighlight'
import PlaceCardLogo from '@/components/PlaceCardLogo'
import { Button } from "@/components/ui/button"
import { explore, Place } from '@/app/actions/explore'

interface PageProps {
  params: {
    categoria: string
    cidade: string
  }
}

export default async function Page({ params }: PageProps) {
  const { categoria, cidade } = params
  const data = await explore(categoria, cidade)

  if (!data || data.places.length === 0) {
    notFound()
  }

  return (
    <main className=" px-4 py-8">
      <ExploreCityDetails
        place={data.places[0]}
        placesCount={data.totalCount}
      />

      <div className="my-12">
        <ExploreCityHighlight place={data.places[0]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {data.places.map((place: Place) => (
          <PlaceCardLogo key={place.place_id} place={place} />
        ))}
      </div>

      {data.totalCount > data.places.length && (
        <div className="mt-8 text-center">
          <Button variant="outline">Carregar mais</Button>
        </div>
      )}
    </main>
  )
}