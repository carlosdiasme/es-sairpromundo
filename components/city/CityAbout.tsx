import React from 'react'
import { City } from '@/app/actions/get-cities'

interface CityAboutProps {
  city: City & { regions: { name: string } }
}

export function CityAbout({ city }: CityAboutProps) {
  return (
    <div className="bg-lightgreen rounded-3xl p-8 mb-8 mt-16">
      <h2 className="text-2xl font-regular mb-4">About {city.complete}</h2>
      <div 
        className="prose prose-lg max-w-none
                   prose-headings:text-primary
                   prose-h1:text-4xl prose-h1:font-normal prose-text-regular prose-h1:mt-8 prose-h1:mb-4 
                   prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3 prose-h2:pt-24
                   prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2
                   prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2
                   prose-h5:text-base prose-h5:font-semibold prose-h5:mt-3 prose-h5:mb-1
                   prose-h6:text-sm prose-h6:font-semibold prose-h6:mt-2 prose-h6:mb-1
                   prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:text-gray-700
                   prose-a:text-green hover:prose-a:text-darkgreen
                   prose-ul:my-4 prose-ul:ml-6 prose-ol:my-4 prose-ol:ml-6
                   prose-li:mb-2
                   prose-button:bg-green prose-button:text-white hover:prose-button:bg-darkgreen
                   prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4"
        dangerouslySetInnerHTML={{ __html: city.description || `Explore ${city.name} com Sair pro Mundo.` }}
      />
      <div className="flex items-center text-sm text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{city.regions?.name || 'Região não especificada'}</span>
      </div>
    </div>
  )
}

