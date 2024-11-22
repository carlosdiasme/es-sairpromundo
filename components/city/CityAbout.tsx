import React from 'react'
import Image from 'next/image'
import { City } from '@/app/actions/get-cities'

interface CityAboutProps {
  city: City
}

const CityAbout: React.FC<CityAboutProps> = ({ city }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-6">
      <h1 className="text-5xl font-bold text-white">{city.name}</h1>
      {city.logo && (
        <div className="relative w-64 h-64 rounded-2xl overflow-hidden">
          <Image
            src={city.logo}
            alt={`Imagem de ${city.name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 256px"
            priority
          />
        </div>
      )}
    </div>
  )
}

export default CityAbout

