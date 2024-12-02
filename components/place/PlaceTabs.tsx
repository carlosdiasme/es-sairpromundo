'use client'

import React from 'react'

interface PlaceTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function PlaceTabs({ activeTab, onTabChange }: PlaceTabsProps) {
  const tabs = [
    { name: 'About', id: 'about' },
    { name: 'Reviews', id: 'reviews' },
  ]

  return (
    <div className="bg-background">
      <div className="max-w-full overflow-x-auto scrollbar-hide">
        <nav className="flex h-10 items-center w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 h-10 flex items-center whitespace-nowrap border-b-2 ${
                activeTab === tab.id
                  ? 'border-green text-green text-sm '
                  : 'border-transparent text-gray-600  text-sm hover:text-gray-800 hover:border-neongreen hover:border-b'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="h-px bg-darkbege"></div>
    </div>
  )
}