'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchPlaces, Place } from '@/app/actions/get_places'
import Link from 'next/link'
import Script from 'next/script'
import PlaceCardCover from '@/components/PlaceCardCover'

const AnimatedLines: React.FC = () => {
  return (
    <div className="lines absolute inset-0 w-[90vw] mx-auto pointer-events-none">
      <div className="line absolute h-full w-[1px] top-0 left-[25%] bg-green/10 overflow-hidden">
        <div className="line-inner absolute h-[15vh] w-full -top-1/2 left-0 animate-drop" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="line absolute h-full w-[1px] top-0 left-1/2 bg-green/10 overflow-hidden">
        <div className="line-inner absolute h-[15vh] w-full -top-1/2 left-0 animate-drop"></div>
      </div>
      <div className="line absolute h-full w-[1px] top-0 left-[75%] bg-green/10 overflow-hidden">
        <div className="line-inner absolute h-[15vh] w-full -top-1/2 left-0 animate-drop" style={{ animationDelay: '2.5s' }}></div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [places, setPlaces] = useState<Place[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPlaces() {
      try {
        const { places } = await fetchPlaces(1, 6)
        setPlaces(places)
      } catch (error) {
        console.error('Failed to fetch places:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPlaces()
  }, [])

  return (
    <div className="container mx-auto px-4 py-12 space-y-16">
      <div className="fixed inset-0 -z-10 bg-white">
        <AnimatedLines />
      </div>
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-regular tracking-tighter pt-8 sm:text-5xl">Discover amazing places</h1>
        <p className="text-sm text-muted-foreground max-w-[600px] mx-auto">
          Explore unique destinations and create unforgettable memories with Sair pro Mundo.
        </p>
        <Button size="lg" className="bg-green hover:bg-darkgreen rounded-full" asChild>
          <Link href="/explore">
            Start exploring <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Featured Places */}
      <section className="space-y-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-[16/9] w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCardCover key={place.place_id} place={place} />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-regular tracking-tighter">Ready for your next adventure?</h2>
        <p className="text-sm text-muted-foreground max-w-[600px] mx-auto">
          Join thousands of travelers and start exploring the world.
        </p>
        <Button size="lg" variant="outline" className="font-regular rounded-full" asChild>
          <Link href="/explore">
            See all places <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
      <Script id="sitelinks-searchbox" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://en.sairpromundo.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://en.sairpromundo.com/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </Script>
    </div>
  )
}

