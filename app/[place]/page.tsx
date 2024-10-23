import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import PlaceHeader from '@/components/PlaceHeader'
import { createClient } from '@supabase/supabase-js'
import Script from 'next/script'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface PlacePageProps {
  params: {
    place: string
  }
}

async function getPlaceData(slug: string) {
  const { data, error } = await supabase
    .from('vw_places')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching place:', error)
    return null
  }

  return data
}

export async function generateMetadata({ params }: PlacePageProps): Promise<Metadata> {
  const place = await getPlaceData(params.place)

  if (!place) {
    return {
      title: 'Place Not Found',
    }
  }

  return {
    title: `${place.name}`,
    description: place.description || `Explore ${place.name} with Sair pro Mundo`,
    openGraph: {
      title: `${place.name}`,
      description: place.description || `Explore ${place.name} com Sair pro Mundo`,
      images: [{ url: place.image || '/default-place-image.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${place.name}`,
      description: place.description || `Explore ${place.name} com Sair pro Mundo`,
      images: [place.image || '/default-place-image.jpg'],
    },
  }
}

export default async function PlacePage({ params }: PlacePageProps) {
  const place = await getPlaceData(params.place)

  if (!place) {
    notFound()
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.sairpromundo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Places",
        "item": "https://www.sairpromundo.com/places"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": place.name,
        "item": `https://www.sairpromundo.com/${place.slug}`
      }
    ]
  }

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": place.name,
    "image": place.image || 'https://www.sairpromundo.com/default-place-image.jpg',
    "address": {
      "@type": "PostalAddress",
      "streetAddress": place.address || "Address not available",
      "addressLocality": place.city || "City not available",
      "addressRegion": place.state || "State not available",
      "postalCode": place.zip || "Postal code not available",
      "addressCountry": place.country || "Country not available"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": place.latitude || 0,
      "longitude": place.longitude || 0
    },
    "url": `https://www.sairpromundo.com/${place.slug}`,
    "telephone": place.phone || "Phone not available",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "priceRange": place.priceRange || "$$",
    "description": place.description || `Explore ${place.name} with Sair pro Mundo`
  }

  return (
    <>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>
      <Script id="local-business-structured-data" type="application/ld+json">
        {JSON.stringify(localBusinessData)}
      </Script>
      <div className="min-h-screen bg-background">
        <PlaceHeader organization={place} />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">{place.name}</h1>
          <p className="text-lg mb-6">{place.description || `Explore ${place.name} with Sair pro Mundo`}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Location</h2>
              <p>{place.address || "Address not available"}</p>
              <p>{place.city || "City not available"}, {place.state || "State not available"} {place.zip || "Postal code not available"}</p>
              <p>{place.country || "Country not available"}</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p>Phone: {place.phone || "Phone not available"}</p>
              <p>Email: {place.email || "Email not available"}</p>
              <p>Website: {place.website ? (
                <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{place.website}</a>
              ) : (
                "Website not available"
              )}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}