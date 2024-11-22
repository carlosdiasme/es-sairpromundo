"use client"

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import PlaceHeader from '@/components/place/PlaceHeader'
import PlaceAbout from '@/components/place/PlaceAbout'
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
  created_at: string
  name: string
  title: string
  tags: string
  category_id: number
  size: number
  slug: string
  user_id: string
  updated_at: string
  about: string
  website: string
  instagram: string
  tiktok: string
  google_maps: string
  zip_code: string
  address: string
  cnpj: string
  admin: string
  city_id: number
  region_id: number
  country_id: number
  logo: string
  image_1: string
  image_2: string
  image_3: string
  image_4: string
  category_slug: string
  category_title: string
  category_plural: string
  category_description: string
  category_image: string
  city_name: string
  city_slug: string
  city_complete: string
  city_image: string
  city_region_id: number
  region_name: string
  region_country_id: number
  country_name: string
  country_continent_id: number
  continent_name: string
  admin_id: string
  admin_name: string
  admin_email: string
  admin_linkedin: string
  claim: boolean
  specialty_title: string
  specialty_slug: string
  activity_slug: string
  activity_title: string
  description?: string
  city?: string
  state?: string
  zip?: string
  country?: string
  phone?: string
  email?: string
  latitude?: number
  longitude?: number
  priceRange?: string
  image?: string
  rating_average?: number
  rating_count?: number
  category_name: string
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
    "description": place.description || `Explore ${place.name} com Sair pro Mundo`
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
          {activeTab === 'about' && <PlaceAbout place={place} />}
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