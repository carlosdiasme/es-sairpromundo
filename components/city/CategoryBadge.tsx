import React from 'react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

interface Category {
  category_id: number
  es_slug: string
  es_title: string
}

interface CategoryBadgeProps {
  category: Category
  citySlug: string | null
}

export function CategoryBadge({ category, citySlug }: CategoryBadgeProps) {
  const href = citySlug
    ? `/ciudades/${citySlug}/categorias/${category.es_slug}`
    : `/categorias/${category.es_slug}`

  return (
    <Link href={href}>
      <Badge variant="outline" className='rounded-full px-4 py-2 border-neongreen hover:border-green hover:bg-green hover:text-white'>
        {category.es_title}
      </Badge>
    </Link>
  )
}

