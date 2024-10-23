import React from 'react';
import Head from 'next/head';

const AboutPage = () => {
  const seo = {
    title: 'Sobre',
    description: 'Descubra como o Sair pro Mundo inspira aventuras ao ar livre, descobertas e uma vida fora da rotina. Explore o mundo e viva experiências autênticas.',
    keywords: 'aventura, ar livre, descobertas, sair de casa, explorar, natureza, viagem',
    openGraph: {
      title: 'Sobre o Sair pro Mundo',
      description: 'Descubra como o Sair pro Mundo inspira aventuras ao ar livre, descobertas e uma vida fora da rotina. Explore o mundo e viva experiências autênticas.',
      url: 'https://sairpromundo.com/sobre',
      images: [
        {
          url: 'https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png',
          alt: 'Logo do Sair pro Mundo',
          width: 1200,
          height: 630,
        },
      ],
      site_name: 'Sair pro Mundo',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Sobre o Sair pro Mundo',
      description: 'Descubra como o Sair pro Mundo inspira aventuras ao ar livre, descobertas e uma vida fora da rotina. Explore o mundo e viva experiências autênticas.',
      image: 'https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png',
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sair pro Mundo",
    "url": "https://sairpromundo.com",
    "logo": "https://pmiomzmwjvbnvfkdgivd.supabase.co/storage/v1/object/public/sairpromundo/spm/Profile%20SPM%20Filled%20-%20SPM.png",
    "sameAs": [
      "https://www.facebook.com/sairpromundo",
      "https://www.instagram.com/sairpromundo",
      "https://twitter.com/sairpromundo"
    ],
    "description": "O Sair pro Mundo é uma plataforma que inspira aventuras ao ar livre, descobertas e uma vida ativa explorando o mundo.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "contato@sairpromundo.com"
    }
  };

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords} />
        <meta property="og:title" content={seo.openGraph.title} />
        <meta property="og:description" content={seo.openGraph.description} />
        <meta property="og:url" content={seo.openGraph.url} />
        <meta property="og:image" content={seo.openGraph.images[0].url} />
        <meta property="og:image:alt" content={seo.openGraph.images[0].alt} />
        <meta property="og:image:width" content={seo.openGraph.images[0].width.toString()} />
        <meta property="og:image:height" content={seo.openGraph.images[0].height.toString()} />
        <meta property="og:site_name" content={seo.openGraph.site_name} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={seo.twitter.card} />
        <meta name="twitter:title" content={seo.twitter.title} />
        <meta name="twitter:description" content={seo.twitter.description} />
        <meta name="twitter:image" content={seo.twitter.image} />
        <link rel="canonical" href={seo.openGraph.url} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full bg-white rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Sobre o Sair pro Mundo</h1>
          
          <p className="text-lg text-gray-600 mb-4">
            O <span className="font-semibold">Sair pro Mundo</span> é uma plataforma dedicada a inspirar pessoas a explorar o mundo ao seu redor, saindo de casa para viver aventuras ao ar livre, descobrir novos horizontes e se conectar com a natureza. 
          </p>

          <p className="text-lg text-gray-600 mb-4">
            Seja caminhando por trilhas, pedalando por estradas desconhecidas ou simplesmente explorando a própria cidade, acreditamos que a vida é mais rica quando abraçamos a descoberta e nos permitimos sair da rotina. 
          </p>

          <p className="text-lg text-gray-600 mb-4">
            O <a href="https://sairpromundo.com" className="text-blue-600 hover:underline">Sair pro Mundo</a> incentiva você a viver experiências autênticas, encontrando liberdade e inspiração em cada nova jornada. Nossa missão é ajudar você a descobrir o poder transformador das pequenas e grandes aventuras.
          </p>

          <div className="mt-8 flex justify-center">
            <a 
              href="https://sairpromundo.com" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Visitar o site
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;