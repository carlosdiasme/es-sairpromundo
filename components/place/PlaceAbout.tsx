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
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left column - Summary */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Resumo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{place.about}</p>
          <div className="flex flex-wrap gap-2">
            {place.tags.split(',').map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Middle column - Information */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Informações</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              <span className="text-sm">{place.address}, {place.zip_code}</span>
            </li>
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
                <a href={`https://www.instagram.com/${place.instagram}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  @{place.instagram}
                </a>
              </li>
            )}
            {place.tiktok && (
              <li className="flex items-center gap-2">
                <TikTok className="text-primary h-5 w-5" />
                <a href={`https://www.tiktok.com/@${place.tiktok}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  @{place.tiktok}
                </a>
              </li>
            )}
            
          </ul>
          {place.google_maps && (
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <a href={place.google_maps} target="_blank" rel="noopener noreferrer">
                  <MapIcon className="mr-2 h-4 w-4" />
                  Ver no Google Maps
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