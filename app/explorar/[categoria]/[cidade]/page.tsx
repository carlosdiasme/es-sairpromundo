import React from 'react'
import { notFound } from 'next/navigation'
import { ExploreCityDetails } from '@/components/ExploreCityDetails'
import { ExploreCityHighlight } from '@/components/ExploreCityHighlight'
import { ExploreCityMain } from '@/components/ExploreCityMain'
import { ExploreCityRest } from '@/components/ExploreCityRest'
import { explore } from '@/app/actions/explore'

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

  const highlightedPlace = data.places[0]
  const otherPlaces = data.places.slice(1, 4)
  const restOfPlaces = data.places.slice(4)

  return (
    <main className="px-4 py-8">
      <ExploreCityDetails
        place={highlightedPlace}
        placesCount={data.totalCount}
      />

      <div className="my-12">
        <p className='text-xl mb-4 mt-16 bg-lightgreen py-2 px-4 border border-green inline-block rounded-full'>O mais amado da cidade</p>
        <ExploreCityHighlight place={highlightedPlace} />
      </div>

      <p className='text-xl mb-4  bg-lightgreen py-2 px-4 border border-green inline-block rounded-full'>Aclamados pelo público</p>
      <ExploreCityMain places={otherPlaces} />

      {restOfPlaces.length > 0 && (
        <div className="mt-12">
          <p className='text-xl mb-4 mt-16 bg-lightgreen py-2 px-4 border border-green inline-block rounded-full'>Outros</p>
          <ExploreCityRest places={restOfPlaces} />
        </div>
      )}
    </main>
  )
}