import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover how Sair pro Mundo inspires outdoor adventures, discoveries, and a life beyond routine. Explore the world and live authentic experiences.',
  keywords: 'adventure, outdoors, discoveries, get out, explore, nature, travel',
  openGraph: {
    title: 'About Sair pro Mundo',
    description: 'Discover how Sair pro Mundo inspires outdoor adventures, discoveries, and a life beyond routine. Explore the world and live authentic experiences.',
    url: 'https://en.sairpromundo.com/about',
    siteName: 'Sair pro Mundo',
    images: [
      {
        url: 'https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png',
        width: 1200,
        height: 630,
        alt: 'Sair pro Mundo Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Sair pro Mundo',
    description: 'Discover how Sair pro Mundo inspires outdoor adventures, discoveries, and a life beyond routine. Explore the world and live authentic experiences.',
    images: ['https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png'],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sair pro Mundo",
  "url": "https://en.sairpromundo.com",
  "logo": "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png",
  "sameAs": [
    "https://www.facebook.com/sairpromundo",
    "https://www.instagram.com/sairpromundo",
    "https://twitter.com/sairpromundo"
  ],
  "description": "Sair pro Mundo is a platform that inspires outdoor adventures, discoveries, and an active life exploring the world.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contact@sairpromundo.com"
  }
}

export default function AboutPage() {
  return (
    <>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Sair pro Mundo</h1>
          
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Sair pro Mundo</span> is a platform dedicated to inspiring people to explore the world around them, stepping out of their homes to experience outdoor adventures, discover new horizons, and connect with nature.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Whether it&apos;s hiking trails, cycling through unknown roads, or simply exploring your own city, we believe that life is richer when we embrace discovery and allow ourselves to break from routine.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            <a href="https://en.sairpromundo.com" className="text-blue-600 hover:underline">Sair pro Mundo</a> encourages you to live authentic experiences, finding freedom and inspiration in every new journey. Our mission is to help you discover the transformative power of both small and grand adventures.
          </p>

          <div className="mt-8 flex justify-center">
            <a 
              href="https://en.sairpromundo.com" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Visit the website
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

