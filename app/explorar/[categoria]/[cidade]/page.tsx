import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ExploreCityDetails } from '@/components/ExploreCityDetails'
import { ExploreCityHighlight } from '@/components/ExploreCityHighlight'
import { explore, Place } from '@/app/actions/explore'
import { SectionTitle } from '@/components/SectionTitle'

const ExploreCityMain = dynamic<{ places: Place[] }>(() => import('@/components/ExploreCityMain').then(mod => mod.ExploreCityMain), { ssr: false })
const ExploreCityRest = dynamic<{ places: Place[] }>(() => import('@/components/ExploreCityRest').then(mod => mod.ExploreCityRest), { ssr: false })

interface PageProps {
  params: {
    categoria: string
    cidade: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, cidade } = params
  const data = await explore(categoria, cidade)
  const placeName = data?.places[0]?.name || ''
  const categoryPlural = data?.places[0]?.category_plural || categoria
  const cityComplete = data?.places[0]?.city_complete || cidade

  return {
    title: `Explore ${categoryPlural} em ${cityComplete} | Sair pro Mundo`,
    description: `Descubra os melhores ${categoryPlural} em ${cityComplete}. Explore ${placeName} e outros locais incríveis com o Sair pro Mundo.`,
    openGraph: {
      title: `Explore ${categoryPlural} em ${cityComplete} | Sair pro Mundo`,
      description: `Descubra os melhores ${categoryPlural} em ${cityComplete}. Explore ${placeName} e outros locais incríveis com o Sair pro Mundo.`,
      images: [data?.places[0]?.image_1 || '/default-og-image.jpg'],
    },
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Explorar",
        "item": "https://sairpromundo.com/explorar"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": highlightedPlace.category_title,
        "item": `https://sairpromundo.com/explorar`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": highlightedPlace.city_complete,
        "item": `https://sairpromundo.com/explorar/${categoria}/${cidade}`
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
        placesCount={data.totalCount}
      />

      <div className="my-12">
        <SectionTitle>O mais amado da cidade</SectionTitle>
        <ExploreCityHighlight place={highlightedPlace} />
      </div>

      <SectionTitle>Aclamados pelo público</SectionTitle>
      <Suspense fallback={<div>Carregando lugares aclamados...</div>}>
        <ExploreCityMain places={otherPlaces} />
      </Suspense>

      {restOfPlaces.length > 0 && (
        <div className="mt-12">
          <SectionTitle>Outros</SectionTitle>
          <Suspense fallback={<div>Carregando mais lugares...</div>}>
            <ExploreCityRest places={restOfPlaces} />
          </Suspense>
        </div>
      )}
    </main>
  )
}