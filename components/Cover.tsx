import React from 'react'
import Image from 'next/image'
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface CoverProps {
  cover: string | null | undefined
  name: string
}

export function Cover({ cover, name }: CoverProps) {
  return (
    <div className="w-full overflow-hidden px-4">
      <AspectRatio ratio={1360 / 240} className="bg-muted rounded-2xl overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={`Capa da organização ${name}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">No cover image available</span>
          </div>
        )}
      </AspectRatio>
    </div>
  )
}