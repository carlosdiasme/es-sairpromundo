import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

interface Category {
  category_id: number
  slug: string
  title: string
  description: string | null
  image: string | null
}

interface CategoryCardProps {
  category: Category
  citySlug: string | null
}

export function CategoryCard({ category, citySlug }: CategoryCardProps) {
  const href = citySlug 
    ? `/cidades/${citySlug}/categorias/${category.slug}`
    : `/categorias/${category.slug}`

  return (
    <Link href={href} className="block flex-shrink-0">
      <Card className="overflow-hidden border-0 bg-lightgreen rounded-3xl hover:border hover:border-green h-full">
        <div className="relative aspect-[8/9]">
          {category.image ? (
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-lightgreen flex items-center justify-center">
              <span className="text-muted-foreground">Sem imagem</span>
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle>{category.title}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

