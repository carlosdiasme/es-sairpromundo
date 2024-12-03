import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Script from 'next/script'
import { getBlogPost } from '@/app/actions/vw_blogs'


interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const defaultImage = 'https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/image/defaut-image-spm.jpg'

  return {
    title: `${post.title}`,
    description: post.content.substring(0, 160) || `${post.title}`,
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 160) || `${post.title}`,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.user_name || 'Editorial Team'],
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
      description: post.content.substring(0, 160) || `${post.title}`,
      images: [post.image || defaultImage],
    },
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-3/4" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="w-full h-[400px] rounded-3xl" />
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  )
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
        "item": "https://en.sairpromundo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://en.sairpromundo.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://en.sairpromundo.com/blog/${post.slug}`
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
      "name": post.user_name || "Editorial Team",
      "url": post.user_linkedin || "https://en.sairpromundo.com/about"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Sair pro Mundo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://en.sairpromundo.com/logo.png"
      }
    },
    "description": post.content.substring(0, 160) || `Read ${post.title} on Sair pro Mundo Blog`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://en.sairpromundo.com/blog/${post.slug}`
    }
  }

  return (
    <>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>
      <Script id="article-structured-data" type="application/ld+json">
        {JSON.stringify(articleData)}
      </Script>
      <>
        <article className="container mx-auto px-4 py-8 max-w-3xl">
          <Link href="/blog">
            <Button variant="ghost" className="mb-16 font-normal text-sm">
              ← Back to Blog
            </Button>
          </Link>
          
          <Suspense fallback={<LoadingSkeleton />}>
            <h1 className="text-4xl sm:text-5xl font-regular mb-12 text-primary">{post.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground mb-8">
              <span>By {post.user_name || 'Editorial Team'}</span>
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
                         prose-button:bg-green prose-button:text-white hover:prose-button:bg-darkgreen
                         prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Card className="mt-12 bg-lightgreen border-0">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">About the author</h2>
                  <p className="text-muted-foreground">{post.user_name || 'Editorial Team'}</p>
                </div>
                {post.user_linkedin && (
                  <Link href={post.user_linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">View LinkedIn Profile</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          </Suspense>
        </article>
      </>
    </>
  )
}

