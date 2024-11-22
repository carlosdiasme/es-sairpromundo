import React from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ExploreCityDetails } from '@/components/city/CategoryDetails'
import { ExploreCityHighlight } from '@/components/city/CategoryHighlight'
import { explore, Place } from '@/app/actions/explore'
import { SectionTitle } from '@/components/SectionTitle'

const ExploreCityMain = dynamic(() => import('@/components/city/CategoryCityMain').then(mod => mod.ExploreCityMain), {
  loading: () => <p>Carregando lugares aclamados...</p>
}) as React.ComponentType<{ places: Place[] }>

const ExploreCityRest = dynamic(() => import('@/components/city/CategoryRest').then(mod => mod.ExploreCityRest), {
  loading: () => <p>Carregando mais lugares...</p>
}) as React.ComponentType<{ places: Place[] }>

interface PageProps {
  params: {
    categoria: string
    cidade: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria, cidade } = params
  const { places } = await explore(categoria, cidade, 1, 1)
  
  if (places.length === 0) {
    return {
      title: 'Categoria não encontrada',
      description: `Não foi possível encontrar informações para ${categoria} em ${cidade}.`,
    }
  }

  const placeName = places[0]?.name || ''
  const categoryPlural = places[0]?.category_plural || categoria
  const cityComplete = places[0]?.city_complete || cidade

  return {
    title: `Descubra ${categoryPlural} em ${cityComplete}, com avaliações`,
    description: `Descubra os melhores ${categoryPlural} em ${cityComplete}. Explore ${placeName} e outros locais incríveis com o Sair pro Mundo.`,
    openGraph: {
      title: `Descubra ${categoryPlural} em ${cityComplete}, com avaliações`,
      description: `Descubra os melhores ${categoryPlural} em ${cityComplete}. Explore ${placeName} e outros locais incríveis com o Sair pro Mundo.`,
      images: [places[0]?.image_1 || '/default-og-image.jpg'],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { categoria, cidade } = params
  const { places, totalCount } = await explore(categoria, cidade)

  if (places.length === 0) {
    return (
      <main className="px-4 py-8 container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Categoria não encontrada</h1>
        <p className="mb-4">Não foi possível encontrar informações para {categoria} em {cidade}.</p>
        <p className="mb-4">Isso pode acontecer pelos seguintes motivos:</p>
        <ul className="list-disc list-inside mb-4">
          <li>A categoria não existe em nossa base de dados</li>
          <li>Não há lugares cadastrados nesta categoria para esta cidade</li>
          <li>Houve um erro na digitação do nome da categoria ou da cidade na URL</li>
        </ul>
        <p className="mb-4">Sugestões:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Verifique se o nome da categoria e da cidade estão corretos na URL</li>
          <li>Tente buscar por outras categorias nesta cidade</li>
          <li>Explore outras cidades em nossa plataforma</li>
        </ul>
        <Link href="/explorar" className="text-blue-600 hover:underline">
          Voltar para a página de exploração
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
        placesCount={totalCount}
      />

      <div className="my-12">
        <SectionTitle>O mais amado da cidade</SectionTitle>
        <ExploreCityHighlight place={highlightedPlace} />
      </div>

      <SectionTitle>Aclamados pelo público</SectionTitle>
      <ExploreCityMain places={otherPlaces} />

      {restOfPlaces.length > 0 && (
        <div className="mt-12">
          <SectionTitle>Outros</SectionTitle>
          <ExploreCityRest places={restOfPlaces} />
        </div>
      )}
    </main>
  )
}

