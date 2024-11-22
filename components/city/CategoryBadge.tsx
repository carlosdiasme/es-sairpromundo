import React from 'react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

interface Category {
  category_id: number
  slug: string
  title: string
}

interface CategoryBadgeProps {
  category: Category
  citySlug: string | null
}

export function CategoryBadge({ category, citySlug }: CategoryBadgeProps) {
  const href = citySlug
    ? `/cidades/${citySlug}/categorias/${category.slug}`
    : `/categorias/${category.slug}`

  return (
    <Link href={href}>
      <Badge variant="outline" className='rounded-full px-4 py-2 border-neongreen hover:border-green hover:bg-green hover:text-white'>
        {category.title}
      </Badge>
    </Link>
  )
}

