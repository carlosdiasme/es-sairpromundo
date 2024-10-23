import React from 'react'
import Image from 'next/image'
import { Cover } from '@/components/Cover'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { StarIcon } from '@heroicons/react/24/solid'
import { Button } from "@/components/ui/button"
import PlaceTabs from '@/components/PlaceTabs'

interface Organization {
  cover: string
  logo: string
  name: string
  claim: boolean
  slug: string
  rating_average?: number
  rating_count?: number
}

interface OrganizationHeaderProps {
  organization: Organization
}

export default function OrganizationHeader({ organization }: OrganizationHeaderProps) {
  return (
    <div className="bg-background">
      <Cover cover={organization.cover} name={organization.name} />
      <div className="px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            {organization.logo ? (
              <Image
                src={organization.logo}
                alt={`Logo da organização ${organization.name}`}
                width={64}
                height={64}
                className="rounded-xl"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-400">No logo</span>
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl font-regular mr-2">{organization.name}</h1>
              {organization.claim && <CheckCircleIcon className="text-green w-4 h-4" />}
            </div>
            <div className="flex items-center mt-1">
              {organization.rating_average && organization.rating_count ? (
                <>
                  <StarIcon className="text-yellow-400 w-4 h-4 mr-1" />
                  <span>{organization.rating_average.toFixed(1)}</span>
                  <span className="ml-1">({organization.rating_count} avaliações)</span>
                </>
              ) : (
                <span className="text-gray-500 text-xs">Sem avaliações</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0 pt-4">
          <Button variant="outline" className="flex-1 sm:flex-none">Seguir</Button>
          <Button className="flex-1 sm:flex-none">Avaliar</Button>
        </div>
      </div>
      <div className="p-4">
        <PlaceTabs placeName={organization.name} placeSlug={organization.slug} />
      </div>
    </div>
  )
}