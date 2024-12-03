import React from 'react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"

interface Category {
  category_id: number
  en_slug: string
  en_title: string
}

interface CategoryBadgeProps {
  category: Category
  citySlug: string | null
}

export function CategoryBadge({ category, citySlug }: CategoryBadgeProps) {
  const href = citySlug
    ? `/cities/${citySlug}/categories/${category.en_slug}`
    : `/categories/${category.en_slug}`

  return (
    <Link href={href}>
      <Badge variant="outline" className='rounded-full px-4 py-2 border-neongreen hover:border-green hover:bg-green hover:text-white'>
        {category.en_title}
      </Badge>
    </Link>
  )
}

