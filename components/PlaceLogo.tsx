'use state';

import Image from 'next/image'

interface OrganizationLogoProps {
  src: string
  alt: string
  size?: number
}

export default function OrganizationLogo({ src, alt, size = 64 }: OrganizationLogoProps) {
  return (
    <div 
      className="relative overflow-hidden bg-bege rounded-2xl border border-gray-200"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="fill "
        className="transition-opacity duration-300 ease-in-out hover:opacity-80 p-3 "
      />
    </div>
  )
}