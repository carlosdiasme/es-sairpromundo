"use client"

import { useState } from 'react'
import ReviewCard from '@/components/place/ReviewCard'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getReviews } from '@/app/actions/get-reviews'

interface Review {
  place_review_id: number
  created_at: string
  user_id: string
  user_name: string
  place_id: number
  good: string
  bad: string
  feedback: string
  rating: number
}

interface ReviewListProps {
  placeId: number
  initialReviews: Review[]
  totalReviews: number | undefined
}

export function ReviewList({ placeId, initialReviews, totalReviews }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const itemsPerPage = 10
  const totalPages = totalReviews ? Math.ceil(totalReviews / itemsPerPage) : 1

  const fetchReviews = async (page: number) => {
    if (page < 1 || page > totalPages) return;
    setIsLoading(true)
    setError(null)
    try {
      const result = await getReviews(placeId, page, itemsPerPage)
      if (result.success && result.data) {
        setReviews(result.data)
        setCurrentPage(page)
      } else {
        setError('Não foi possível carregar as avaliações.')
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setError('Ocorreu um erro ao carregar as avaliações.')
    } finally {
      setIsLoading(false)
    }
  }

  const renderPaginationItems = () => {
    const items = []
    const maxItems = 3
    const start = Math.max(currentPage - 1, 1)
    const end = Math.min(start + maxItems - 1, totalPages)

    for (let i = start; i <= end; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => fetchReviews(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-regular text-foreground/60">
        {totalReviews !== undefined
          ? `${totalReviews} ${totalReviews === 1 ? 'avaliação' : 'avaliações'}`
          : 'avaliações'}
      </h2>

      {isLoading ? (
        <p>Carregando avaliações...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {reviews.map((review) => (
            <ReviewCard key={review.place_review_id} review={review} />
          ))}
          {totalReviews !== undefined && totalReviews > itemsPerPage && (
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => fetchReviews(currentPage - 1)} />
                  </PaginationItem>
                )}
                {currentPage > 2 && (
                  <>
                    <PaginationItem>
                      <PaginationLink onClick={() => fetchReviews(1)}>1</PaginationLink>
                    </PaginationItem>
                    {currentPage > 3 && <PaginationEllipsis />}
                  </>
                )}
                {renderPaginationItems()}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <PaginationEllipsis />}
                    <PaginationItem>
                      <PaginationLink onClick={() => fetchReviews(totalPages)}>{totalPages}</PaginationLink>
                    </PaginationItem>
                  </>
                )}
                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext onClick={() => fetchReviews(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  )
}