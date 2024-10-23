'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import { Blog, BlogView } from '@/app/actions/vw_blogs'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlogHome() {
  const [blogs, setBlogs] = useState<BlogView[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 15

  useEffect(() => {
    fetchBlogs(currentPage)
  }, [currentPage])

  const fetchBlogs = async (page: number) => {
    try {
      const { blogs, totalCount } = await Blog(page, itemsPerPage)
      setBlogs(blogs)
      setTotalPages(Math.ceil(totalCount / itemsPerPage))
    } catch (error) {
      console.error('Error fetching blogs:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (currentPage + delta < totalPages) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Sair pro Mundo Blog",
    "description": "Explore travel stories, tips, and experiences from around the world.",
    "url": "https://www.sairpromundo.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Sair pro Mundo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.sairpromundo.com/logo.png"
      }
    },
    "blogPost": blogs.map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "datePublished": blog.created_at,
      "author": {
        "@type": "Person",
        "name": blog.user_name || "Redação"
      },
      "image": blog.image || "https://www.sairpromundo.com/default-blog-image.jpg",
      "url": `https://www.sairpromundo.com/blog/${blog.slug}`
    }))
  }

  return (
    <>
      <Head>
        <title>Blog | Sair pro Mundo</title>
        <meta name="description" content="Explore travel stories, tips, and experiences from around the world." />
        <meta property="og:title" content="Sair pro Mundo Blog" />
        <meta property="og:description" content="Travel stories, tips, and experiences from around the world" />
        <meta property="og:image" content="https://www.sairpromundo.com/images/blog-og.jpg" />
        <meta property="og:url" content="https://www.sairpromundo.com/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sair pro Mundo Blog" />
        <meta name="twitter:description" content="Travel stories, tips, and experiences from around the world" />
        <meta name="twitter:image" content="https://www.sairpromundo.com/images/blog-og.jpg" />
      </Head>
      <Script
        id="structured-data-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="w-full p-4">
        <h1 className="text-3xl sm:text-4xl font-regular mb-4 sm:mb-8 px-4 sm:px-0">Blog</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.blog_id} className="group">
              <Card className="flex flex-col h-full transition-transform duration-200 ease-in-out transform hover:scale-105">
                <CardHeader className="p-0">
                  <Image
                    src={blog.image || '/placeholder.svg'}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="flex-grow p-4">
                  <CardTitle className="mb-2">
                    <span className="text-lg sm:text-xl text-regular hover:text-darkgreen group-hover:underline">
                      {blog.title}
                    </span>
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                    Por {blog.user_name || 'Redação'} | {formatDate(blog.created_at)}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-start items-center p-4">
                  <span className="text-xs sm:text-sm font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                    {blog.tag_title}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        <Pagination className="mt-6 sm:mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.max(prev - 1, 1))
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                aria-disabled={currentPage === 1}
              >
                Anterior
              </PaginationPrevious>
            </PaginationItem>
            {getPaginationRange().map((pageNumber, index) => (
              <PaginationItem key={index} className="hidden sm:inline-block">
                {pageNumber === '...' ? (
                  <PaginationEllipsis>...</PaginationEllipsis>
                ) : (
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(Number(pageNumber))
                    }}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                aria-disabled={currentPage === totalPages}
              >
                Próxima
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}