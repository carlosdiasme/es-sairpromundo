import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ExploreCityDetails } from '@/components/city/CategoryDetails'
import { ExploreCityHighlight } from '@/components/city/CategoryHighlight'
import { explore, Place } from '@/app/actions/explore'
import { SectionTitle } from '@/components/SectionTitle'

const ExploreCityMain = dynamic(() => import('@/components/city/CategoryCityMain').then(mod => mod.ExploreCityMain), {
  loading: () => <p>Loading acclaimed places...</p>
}) as React.ComponentType<{ places: Place[] }>

const ExploreCityRest = dynamic(() => import('@/components/city/CategoryRest').then(mod => mod.ExploreCityRest), {
  loading: () => <p>Loading more places...</p>
}) as React.ComponentType<{ places: Place[] }>

interface PageProps {
  params: {
    category: string
    city: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, city } = params
  const { places } = await explore(category, city, 1, 1)
  
  if (places.length === 0) {
    return {
      title: 'Category not found',
      description: `Unable to find information for ${category} in ${city}.`,
    }
  }

  const placeName = places[0]?.name || ''
  const categoryPlural = places[0]?.category_plural || category
  const cityComplete = places[0]?.city_complete || city

  return {
    title: `Discover ${categoryPlural} in ${cityComplete}, with reviews`,
    description: `Discover the best ${categoryPlural} in ${cityComplete}. Explore ${placeName} and other amazing locations with Sair pro Mundo.`,
    openGraph: {
      title: `Discover ${categoryPlural} in ${cityComplete}, with reviews`,
      description: `Discover the best ${categoryPlural} in ${cityComplete}. Explore ${placeName} and other amazing locations with Sair pro Mundo.`,
      images: [places[0]?.image_1 || '/default-og-image.jpg'],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { category, city } = params
  const { places, totalCount } = await explore(category, city)

  if (places.length === 0) {
    return (
      <main className="px-4 py-8 container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Category not found</h1>
        <p className="mb-4">Unable to find information for {category} in {city}.</p>
        <p className="mb-4">This may happen for the following reasons:</p>
        <ul className="list-disc list-inside mb-4">
          <li>The category does not exist in our database</li>
          <li>There are no places registered in this category for this city</li>
          <li>There was an error in typing the category or city name in the URL</li>
        </ul>
        <p className="mb-4">Suggestions:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Check if the category and city names are correct in the URL</li>
          <li>Try searching for other categories in this city</li>
          <li>Explore other cities on our platform</li>
        </ul>
        <Link href="/explore" className="text-blue-600 hover:underline">
          Return to the exploration page
        </Link>
      </main>
    )
  }

  const highlightedPlace = places[0]
  const otherPlaces = places.slice(1, 4)
  const restOfPlaces = places.slice(4)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Explore",
        "item": "https://en.sairpromundo.com/explore"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": highlightedPlace.category_title,
        "item": `https://en.sairpromundo.com/explore`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": highlightedPlace.city_complete,
        "item": `https://en.sairpromundo.com/cities/${city}/categories/${category}`
      }
    ]
  }

  return (
    <main className="px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <ExploreCityDetails
        place={highlightedPlace}
        placesCount={totalCount}
      />

      <div className="my-12">
        <SectionTitle>Most loved in the city</SectionTitle>
        <ExploreCityHighlight place={highlightedPlace} />
      </div>

      <SectionTitle>Acclaimed by the public</SectionTitle>
      <ExploreCityMain places={otherPlaces} />

      {restOfPlaces.length > 0 && (
        <div className="mt-12">
          <SectionTitle>Others</SectionTitle>
          <ExploreCityRest places={restOfPlaces} />
        </div>
      )}
    </main>
  )
}

