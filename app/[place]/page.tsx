"use client"

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import PlaceHeader from '@/components/place/PlaceHeader'
import { createClient } from '@supabase/supabase-js'
import Script from 'next/script'
import { useAuth } from '@/contexts/AuthContext'
import { ReviewList } from '@/components/place/ReviewList'
import { getReviews } from '@/app/actions/get-reviews'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface PlacePageProps {
  params: {
    place: string
  }
}

interface Place {
  place_id: number
  slug: string
  name: string
  description?: string
  address?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  phone?: string
  email?: string
  website?: string
  latitude?: number
  longitude?: number
  priceRange?: string
  image?: string
  image_1: string
  image_2: string
  image_3: string
  image_4: string
  logo: string
  claim: boolean
  rating_average?: number
  rating_count?: number
  city_name: string
  city_slug: string
  category_name: string
  category_slug: string
  category_title: string
}

interface Review {
  place_review_id: number
  created_at: string
  user_id: string
  user_name: string
  place_id: number
  good: string
  bad: string
  feedback: string
  rating: number
}

async function getPlaceData(slug: string): Promise<Place | null> {
  const { data, error } = await supabase
    .from('vw_places')
    .select('*, place_id')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching place:', error)
    return null
  }

  return data
}

export default function PlacePage({ params }: PlacePageProps) {
  const { loading } = useAuth()
  const [place, setPlace] = useState<Place | null>(null)
  const [activeTab, setActiveTab] = useState('about')
  const [reviews, setReviews] = useState<Review[]>([])
  const [totalReviews, setTotalReviews] = useState<number | undefined>(undefined)

  useEffect(() => {
    async function fetchPlace() {
      const placeData = await getPlaceData(params.place)
      if (placeData) {
        setPlace(placeData)
        // Fetch initial reviews
        const reviewsResult = await getReviews(placeData.place_id)
        if (reviewsResult.success && reviewsResult.data) {
          setReviews(reviewsResult.data)
          setTotalReviews(reviewsResult.totalReviews)
        }
      } else {
        notFound()
      }
    }
    fetchPlace()
  }, [params.place])

  if (!place || loading) {
    return <div>Loading...</div>
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
        <PlaceHeader place={place} activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="px-4 py-8">
          {activeTab === 'about' && (
            <>
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
            </>
          )}
          {activeTab === 'reviews' && (
            <ReviewList
              placeId={place.place_id}
              initialReviews={reviews}
              totalReviews={totalReviews}
            />
          )}
        </main>
      </div>
    </>
  )
}