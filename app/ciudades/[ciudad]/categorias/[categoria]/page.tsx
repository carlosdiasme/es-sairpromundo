import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ExploreCityDetails } from '@/components/city/CategoryDetails'
import { ExploreCityHighlight } from '@/components/city/CategoryHighlight'
import { explore, Place } from '@/app/actions/explore'
import { SectionTitle } from '@/components/SectionTitle'

const ExploreCityMain = dynamic(() => import('@/components/city/CategoryCityMain').then(mod => mod.ExploreCityMain), {
  loading: () => <p>Cargando lugares aclamados...</p>
}) as React.ComponentType<{ places: Place[] }>

const ExploreCityRest = dynamic(() => import('@/components/city/CategoryRest').then(mod => mod.ExploreCityRest), {
  loading: () => <p>Cargando más lugares...</p>
}) as React.ComponentType<{ places: Place[] }>

interface PageProps {
  params: {
    categoria: string
    ciudad: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, ciudad } = params
  const { places } = await explore(categoria, ciudad, 1, 1)
  
  if (places.length === 0) {
    return {
      title: 'Categoría no encontrada',
      description: `No se pudo encontrar información para ${categoria} en ${ciudad}.`,
    }
  }

  const placeName = places[0]?.name || ''
  const categoryPlural = places[0]?.es_category_plural || categoria
  const cityComplete = places[0]?.city_complete || ciudad

  return {
    title: `Descubre ${categoryPlural} en ${cityComplete}, con reseñas`,
    description: `Descubre los mejores ${categoryPlural} en ${cityComplete}. Explora ${placeName} y otros lugares increíbles con Sair pro Mundo.`,
    openGraph: {
      title: `Descubre ${categoryPlural} en ${cityComplete}, con reseñas`,
      description: `Descubre los mejores ${categoryPlural} en ${cityComplete}. Explora ${placeName} y otros lugares increíbles con Sair pro Mundo.`,
      images: [places[0]?.image_1 || '/imagen-og-predeterminada.jpg'],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { categoria, ciudad } = params
  const { places, totalCount } = await explore(categoria, ciudad)

  if (places.length === 0) {
    return (
      <main className="px-4 py-8 container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
        <p className="mb-4">No se pudo encontrar información para {categoria} en {ciudad}.</p>
        <p className="mb-4">Esto puede suceder por las siguientes razones:</p>
        <ul className="list-disc list-inside mb-4">
          <li>La categoría no existe en nuestra base de datos</li>
          <li>No hay lugares registrados en esta categoría para esta ciudad</li>
          <li>Hubo un error al escribir el nombre de la categoría o la ciudad en la URL</li>
        </ul>
        <p className="mb-4">Sugerencias:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Verifica si los nombres de la categoría y la ciudad son correctos en la URL</li>
          <li>Intenta buscar otras categorías en esta ciudad</li>
          <li>Explora otras ciudades en nuestra plataforma</li>
        </ul>
        <Link href="/explorar" className="text-blue-600 hover:underline">
          Volver a la página de exploración
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
        "name": "Explorar",
        "item": "https://es.sairpromundo.com/explorar"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": highlightedPlace.category_title,
        "item": `https://es.sairpromundo.com/explorar`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": highlightedPlace.city_complete,
        "item": `https://es.sairpromundo.com/ciudades/${ciudad}/categorias/${categoria}`
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
        defaultImages={[
          "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/destaques/template-5.png",
          "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/destaques/template-6.png"
        ]}
      />

      <div className="my-12">
        <SectionTitle>Los más queridos de la ciudad</SectionTitle>
        <ExploreCityHighlight place={highlightedPlace} />
      </div>

      <SectionTitle>Aclamados por el público</SectionTitle>
      <ExploreCityMain places={otherPlaces} />

      {restOfPlaces.length > 0 && (
        <div className="mt-12">
          <SectionTitle>Otros</SectionTitle>
          <ExploreCityRest places={restOfPlaces} />
        </div>
      )}
    </main>
  )
}

