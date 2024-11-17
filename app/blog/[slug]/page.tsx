import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Script from 'next/script'
import dynamic from 'next/dynamic'
import { insertAdsInContent } from '@/lib/insertAds'

// Lazy load ad components
const DisplayLeft = dynamic(() => import('@/components/ads/DisplayLeft'), {
  loading: () => <div className="min-h-[600px]" />,
  ssr: false
})

const DisplayRight = dynamic(() => import('@/components/ads/DisplayRight'), {
  loading: () => <div className="min-h-[600px]" />,
  ssr: false
})

const DisplayAdsHorizontal = dynamic(() => import('@/components/ads/DisplayAdsHorizontal'), {
  loading: () => <div className="min-h-[200px]" />,
  ssr: false
})

const Multiplex = dynamic(() => import('@/components/ads/Multiplex'), {
  loading: () => <div className="min-h-[250px]" />,
  ssr: false
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getBlogPostData(slug: string) {
  const { data, error } = await supabase
    .from('vw_blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching blog post:', error)
    return null
  }

  return data
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostData(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const defaultImage = 'https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/image/defaut-image-spm.jpg'

  return {
    title: `${post.title}`,
    description: post.excerpt || `${post.title} `,
    openGraph: {
      title: post.title,
      description: post.excerpt || `${post.title}`,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.user_name || 'Redação'],
      images: [
        {
          url: post.image || defaultImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || `${post.title}`,
      images: [post.image || defaultImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  const post = await getBlogPostData(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const defaultImage = 'https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/image/defaut-image-spm.jpg'

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.sairpromundo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.sairpromundo.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.sairpromundo.com/blog/${post.slug}`
      }
    ]
  }

  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
      post.image || defaultImage
    ],
    "datePublished": post.created_at,
    "dateModified": post.updated_at || post.created_at,
    "author": [{
      "@type": "Person",
      "name": post.user_name || "Redação",
      "url": post.user_linkedin || "https://www.sairpromundo.com/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Sair pro Mundo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.sairpromundo.com/logo.png"
      }
    },
    "description": post.excerpt || `Read ${post.title} on Sair pro Mundo Blog`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.sairpromundo.com/blog/${post.slug}`
    }
  }

  const contentWithAds = insertAdsInContent(post.content, 8)

  return (
    <>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>
      <Script id="article-structured-data" type="application/ld+json">
        {JSON.stringify(articleData)}
      </Script>
      <div className="flex justify-center">
        <div className="hidden lg:block lg:w-1/6">
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <DisplayLeft />
          </Suspense>
        </div>
        <article className="container mx-auto px-4 py-8 max-w-3xl lg:w-4/6">
          <Link href="/blog">
            <Button variant="ghost" className="mb-16 font-normal text-sm">
              ← Voltar para o Blog
            </Button>
          </Link>
          
          <h1 className="text-4xl sm:text-5xl font-regular mb-12 text-primary">{post.title}</h1>
          
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <span>Por {post.user_name || 'Redação'}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
          </div>

          <div className="mb-8">
            <Image
              src={post.image || defaultImage}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-3xl object-cover mb-24 mt-16"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>

          {/* DisplayAdsHorizontal para mobile */}
          <div className="lg:hidden my-8">
            <Suspense fallback={<div className="min-h-[200px]" />}>
              <DisplayAdsHorizontal />
            </Suspense>
          </div>

          <div 
            className="prose prose-lg max-w-none
                       prose-headings:text-primary
                       prose-h1:text-4xl prose-h1:font-normal prose-text-regular prose-h1:mt-8 prose-h1:mb-4 
                       prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3 prose-h2:pt-24
                       prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2
                       prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2
                       prose-h5:text-base prose-h5:font-semibold prose-h5:mt-3 prose-h5:mb-1
                       prose-h6:text-sm prose-h6:font-semibold prose-h6:mt-2 prose-h6:mb-1
                       prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:text-gray-700
                       prose-a:text-green hover:prose-a:text-darkgreen
                       prose-ul:my-4 prose-ul:ml-6 prose-ol:my-4 prose-ol:ml-6
                       prose-li:mb-2
                       prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4"
          >
            {contentWithAds}
          </div>

          <Card className="mt-12 bg-lightgreen border-0">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Sobre o autor</h2>
                <p className="text-muted-foreground">{post.user_name || 'Redação'}</p>
              </div>
              {post.user_linkedin && (
                <Link href={post.user_linkedin} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">Ver perfil no LinkedIn</Button>
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Multiplex component added below the article */}
          <div className="mt-12">
            <Suspense fallback={<div className="min-h-[250px]" />}>
              <Multiplex />
            </Suspense>
          </div>
        </article>
        <div className="hidden lg:block lg:w-1/6">
          <Suspense fallback={<div className="min-h-[600px]" />}>
            <DisplayRight />
          </Suspense>
        </div>
      </div>
    </>
  )
}