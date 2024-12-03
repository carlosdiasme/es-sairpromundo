'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'

const tabs = [
  { name: 'Lugares', value: 'lugares' },
]

export default function SearchTabs() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'lugares'

  return (
    <div className="bg-background">
      <div className="max-w-full overflow-x-auto scrollbar-hide">
        <nav className="flex h-10 items-center w-max">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`px-4 h-10 flex items-center whitespace-nowrap border-b-2 ${
                activeTab === tab.value
                  ? 'border-green text-green text-sm '
                  : 'border-transparent text-gray-600 text-sm hover:text-gray-800 hover:border-neongreen hover:border-b'
              }`}
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams.toString())
                newSearchParams.set('tab', tab.value)
                window.history.pushState(null, '', `?${newSearchParams.toString()}`)
              }}
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

