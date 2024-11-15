'use client'

import React from 'react'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const defaultImages = [
  "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/destaques/template-5.png",
  "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/destaques/template-6.png",
  "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/destaques/template-7.png",
  "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/destaques/template-8.png"
]

interface CarouselImagesProps {
  images?: string[]
  alt: string
}

export function CarouselImages({ images = [], alt }: CarouselImagesProps) {
  const carouselImages = images.length === 4 ? images : defaultImages

  return (
    <div className="w-full relative overflow-hidden pl-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {carouselImages.map((src, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-4/5 md:basis-3/4 lg:basis-3/5">
              <div className="relative aspect-[16/9]">
                <Image
                  src={src}
                  alt={`${alt} - Imagem ${index + 1}`}
                  fill
                  className="object-cover rounded-2xl md:rounded-3xl"
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 75vw, 60vw"
                  priority={index === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute md:left-[5%] left-[12%] top-1/2 -translate-y-1/2 z-10">
          <CarouselPrevious />
        </div>
        <div className="absolute md:right-[5%] right-[12%] top-1/2 -translate-y-1/2 z-10">
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  )
}