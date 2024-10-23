'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchPlaces, Place } from '@/app/actions/vw_places'
import Link from 'next/link'
import Script from 'next/script'

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
        <h1 className="text-4xl font-regular tracking-tighter pt-8 sm:text-5xl">Descubra lugares incríveis</h1>
        <p className="text-sm text-muted-foreground max-w-[600px] mx-auto">
          Explore destinos únicos e crie memórias inesquecíveis com o Sair pro Mundo.
        </p>
        <Button size="lg" className="bg-green hover:bg-darkgreen rounded-full" asChild>
          <Link href="/ranking">
            Comece a explorar <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      {/* Featured Places */}
      <section className="space-y-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Card key={place.place_id} className="overflow-hidden">
                <div className="relative h-48">
                  {place.cover ? (
                    <img src={place.highlight_cover} alt={place.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Sem imagem</span>
                    </div>
                  )}
                  {place.logo && (
                    <img 
                      src={place.logo} 
                      alt={`${place.name} logo`} 
                      className="absolute bottom-2 right-2 w-12 h-12 rounded-full border-2 border-background"
                    />
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{place.name}</CardTitle>
                  <CardDescription>{place.city_name}, {place.country_name}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/${place.slug}`}>Ver detalhes</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-6">
        <h2 className="text-2xl font-regular tracking-tighter">Pronto para sua próxima aventura?</h2>
        <p className="text-sm text-muted-foreground max-w-[600px] mx-auto">
          Junte-se a milhares de viajantes e comece a explorar o mundo.
        </p>
        <Button size="lg" variant="outline" className="font-regular rounded-full" asChild>
          <Link href="/ranking">
            Ver Todos os Lugares <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>
      <Script id="sitelinks-searchbox" type="application/ld+json">
  {`
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://sairpromundo.com/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://sairpromundo.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  `}
</Script>
    </div>
  )
}
