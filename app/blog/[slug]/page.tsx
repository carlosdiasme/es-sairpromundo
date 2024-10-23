import React from 'react'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Script from 'next/script'

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
          url: post.image || 'https://www.sairpromundo.com/default-blog-image.jpg',
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
      images: [post.image || 'https://www.sairpromundo.com/default-blog-image.jpg'],
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
      post.image || "https://www.sairpromundo.com/default-blog-image.jpg"
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

  return (
    <>
      <Script id="breadcrumb-structured-data" type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </Script>
      <Script id="article-structured-data" type="application/ld+json">
        {JSON.stringify(articleData)}
      </Script>
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/blog">
          <Button variant="outline" className="mb-6">
            ← Voltar para o Blog
          </Button>
        </Link>
        
        {post.tag_title && (
          <Link href={`/blog/tag/${post.tag_slug}`} className="mb-4 inline-block">
            <Badge variant="secondary">{post.tag_title}</Badge>
          </Link>
        )}
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">{post.title}</h1>
        
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <span>Por {post.user_name || 'Redação'}</span>
          <span className="mx-2">•</span>
          <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
        </div>

        {post.image && (
          <div className="mb-8">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-auto rounded-lg object-cover shadow-lg"
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none
                     prose-headings:text-primary
                     prose-h1:text-4xl prose-h1:font-normal prose-text-regular prose-h1:mt-8 prose-h1:mb-4
                     prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-6 prose-h2:mb-3
                     prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-5 prose-h3:mb-2
                     prose-h4:text-lg prose-h4:font-semibold prose-h4:mt-4 prose-h4:mb-2
                     prose-h5:text-base prose-h5:font-semibold prose-h5:mt-3 prose-h5:mb-1
                     prose-h6:text-sm prose-h6:font-semibold prose-h6:mt-2 prose-h6:mb-1
                     prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-p:text-gray-700
                     prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-a:underline
                     prose-ul:my-4 prose-ul:ml-6 prose-ol:my-4 prose-ol:ml-6
                     prose-li:mb-2
                     prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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
      </article>
    </>
  )
}