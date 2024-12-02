import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CityHeader } from '@/components/city/CityHeader'
import { CityImages } from '@/components/city/CityImages'
import { CategoryCard } from '@/components/city/CategoryCard'
import { CategoryBadge } from '@/components/city/CategoryBadge'
import { CityAbout } from '@/components/city/CityAbout'
import { getCityBySlug } from '@/app/actions/get-cities'
import { getCategories } from '@/app/actions/get-categories'

interface CityPageProps {
  params: {
    cidade: string
  }
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = await getCityBySlug(params.cidade)

  if (!city) {
    return {
      title: 'City not found',
    }
  }

  return {
    title: `What to do in ${city.complete}? Discover places and reviews`,
    description: city.description || `Explore ${city.name} with Sair pro Mundo.`,
    openGraph: {
      title: `What to do in ${city.complete}? Discover places and reviews`,
      description: city.description || `Explore ${city.name} with Sair pro Mundo.`,
      images: [city.image_1 || '/default-city-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `What to do in ${city.complete}? Discover places and reviews`,
      description: city.description || `Explore ${city.name} with Sair pro Mundo.`,
      images: [city.image_1 || '/default-city-image.jpg'],
    },
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const city = await getCityBySlug(params.cidade)
  const categories = await getCategories()

  if (!city) {
    notFound()
  }

  const mainCategories = categories.slice(0, 4)
  const otherCategories = categories.slice(4)

  return (
    <div className="min-h-screen bg-background">
      <CityHeader 
        cityName={city.name}
        logo={city.logo || "/placeholder.svg"}
      />
      <CityImages 
        cityName={city.name}
        image_1={city.image_1}
        image_2={city.image_2}
        image_3={city.image_3}
        image_4={city.image_4}
      />
      <div className="px-4 py-8">
        <h2 className="text-xl font-semibold mb-6">By category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainCategories.map((category) => (
            <CategoryCard 
              key={category.category_id} 
              category={category} 
              citySlug={city.slug}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {otherCategories.map((category) => (
            <CategoryBadge 
              key={category.category_id} 
              category={category} 
              citySlug={city.slug}
            />
          ))}
        </div>
        <CityAbout city={city} />
      </div>
    </div>
  )
}

