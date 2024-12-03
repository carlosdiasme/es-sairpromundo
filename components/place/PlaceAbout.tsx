import React from 'react'
import { MapPin, Globe, Instagram, TwitterIcon as TikTok, MapIcon } from 'lucide-react'
import SquareAds from '@/components/ads/SquareAds'
import { Place } from '@/app/actions/get_places'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PlaceAboutProps {
  place: Place
}

export default function PlaceAbout({ place }: PlaceAboutProps) {
  const hasTags = place.tags && place.tags.trim().length > 0
  const hasAbout = place.about && place.about.trim().length > 0
  const hasInformation = place.address || place.website || place.instagram || place.tiktok || place.google_maps

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left column - Summary */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Resumen</CardTitle>
        </CardHeader>
        <CardContent>
          {hasAbout ? (
            <p className="text-muted-foreground mb-4">{place.es_about}</p>
          ) : (
            <p className="text-muted-foreground mb-4">No hay resumen disponible.</p>
          )}
          {hasTags ? (
            <div className="flex flex-wrap gap-2">
              {place.tags.split(',').map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No hay etiquetas disponibles.</p>
          )}
        </CardContent>
      </Card>

      {/* Middle column - Information */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Información</CardTitle>
        </CardHeader>
        <CardContent>
          {hasInformation ? (
            <ul className="space-y-4">
              {place.address && (
                <li className="flex items-center gap-2">
                  <MapPin className="text-primary h-5 w-5" />
                  <span className="text-sm">{place.address}, {place.zip_code}</span>
                </li>
              )}
              {place.website && (
                <li className="flex items-center gap-2">
                  <Globe className="text-primary h-5 w-5" />
                  <a href={place.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    {place.website}
                  </a>
                </li>
              )}
              {place.instagram && (
                <li className="flex items-center gap-2">
                  <Instagram className="text-primary h-5 w-5" />
                  <a href={`${place.instagram}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    @{place.instagram}
                  </a>
                </li>
              )}
              {place.tiktok && (
                <li className="flex items-center gap-2">
                  <TikTok className="text-primary h-5 w-5" />
                  <a href={`${place.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                    @{place.tiktok}
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <p className="text-muted-foreground">No hay información disponible.</p>
          )}
          {place.google_maps && (
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href={place.google_maps} target="_blank" rel="noopener noreferrer">
                  <MapIcon className="mr-2 h-4 w-4" />
                  Ver en Google Maps
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Right column - SquareAds */}
      <div className="md:col-span-1">
        <SquareAds />
      </div>
    </div>
  )
}

