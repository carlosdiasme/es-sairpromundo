'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface PlaceTabsProps {
  placeName: string
  placeSlug: string
}

export default function PlaceTabs({ placeSlug }: PlaceTabsProps) {
  const pathname = usePathname()

  const tabs = [
    { name: `Sobre`, href: `/${placeSlug}` },
    { name: 'Avaliações', href: `/${placeSlug}/reviews` },
  ]

  return (
    <div className="bg-background">
      <div className="max-w-full overflow-x-auto scrollbar-hide">
        <nav className="flex h-10 items-center w-max">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`px-4 h-10 flex items-center whitespace-nowrap border-b-2 ${
                pathname === tab.href
                  ? 'border-green text-green text-sm '
                  : 'border-transparent text-gray-600  text-sm hover:text-gray-800 hover:border-neongreen hover:border-b'
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="h-px bg-darkbege"></div>
    </div>
  )
}