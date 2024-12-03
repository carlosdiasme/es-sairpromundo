import { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Acerca de',
  description: 'Descubre cómo Sair pro Mundo inspira aventuras al aire libre, descubrimientos y una vida más allá de la rutina. Explora el mundo y vive experiencias auténticas.',
  keywords: 'aventura, aire libre, descubrimientos, salir, explorar, naturaleza, viaje',
  openGraph: {
    title: 'Acerca de Sair pro Mundo',
    description: 'Descubre cómo Sair pro Mundo inspira aventuras al aire libre, descubrimientos y una vida más allá de la rutina. Explora el mundo y vive experiencias auténticas.',
    url: 'https://es.sairpromundo.com/acerca-de',
    siteName: 'Sair pro Mundo',
    images: [
      {
        url: 'https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png',
        width: 1200,
        height: 630,
        alt: 'Logo de Sair pro Mundo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acerca de Sair pro Mundo',
    description: 'Descubre cómo Sair pro Mundo inspira aventuras al aire libre, descubrimientos y una vida más allá de la rutina. Explora el mundo y vive experiencias auténticas.',
    images: ['https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png'],
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Sair pro Mundo",
  "url": "https://es.sairpromundo.com",
  "logo": "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png",
  "sameAs": [
    "https://www.facebook.com/sairpromundo",
    "https://www.instagram.com/sairpromundo",
    "https://twitter.com/sairpromundo"
  ],
  "description": "Sair pro Mundo es una plataforma que inspira aventuras al aire libre, descubrimientos y una vida activa explorando el mundo.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "atención al cliente",
    "email": "contacto@sairpromundo.com"
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
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Acerca de Sair pro Mundo</h1>
          
          <p className="text-lg text-gray-600 mb-4">
            <span className="font-semibold">Sair pro Mundo</span> es una plataforma dedicada a inspirar a las personas a explorar el mundo que les rodea, saliendo de sus hogares para experimentar aventuras al aire libre, descubrir nuevos horizontes y conectar con la naturaleza.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Ya sea haciendo senderismo, ciclismo por caminos desconocidos o simplemente explorando tu propia ciudad, creemos que la vida es más rica cuando abrazamos el descubrimiento y nos permitimos romper con la rutina.
          </p>

          <p className="text-lg text-gray-600 mb-4">
            <a href="https://es.sairpromundo.com" className="text-blue-600 hover:underline">Sair pro Mundo</a> te anima a vivir experiencias auténticas, encontrando libertad e inspiración en cada nuevo viaje. Nuestra misión es ayudarte a descubrir el poder transformador de las pequeñas y grandes aventuras.
          </p>

          <div className="mt-8 flex justify-center">
            <a 
              href="https://es.sairpromundo.com" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Visita el sitio web
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

