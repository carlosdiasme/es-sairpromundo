import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Aprende cómo Sair pro Mundo maneja tu información y protege tu privacidad.',
  keywords: 'privacidad, política de privacidad, protección de datos, sair pro mundo',
  openGraph: {
    title: 'Política de Privacidad',
    description: 'Aprende cómo Sair pro Mundo maneja tu información y protege tu privacidad.',
    url: 'https://es.sairpromundo.com/privacidad',
    images: [
      {
        url: 'https://es.sairpromundo.com/images/sair-pro-mundo-og.jpg',
        alt: 'Sair pro Mundo',
      },
    ],
    siteName: 'Sair pro Mundo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Política de Privacidad - Sair pro Mundo',
    description: 'Aprende cómo Sair pro Mundo maneja tu información y protege tu privacidad.',
    images: ['https://es.sairpromundo.com/images/sair-pro-mundo-og.jpg'],
  },
}

export default function PaginaPoliticaPrivacidad() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Política de Privacidad</h1>
        
        <p className="text-lg text-gray-600 mb-4">
          Tu privacidad es importante para nosotros. Es política de <span className="font-semibold">Sair pro Mundo</span> respetar tu privacidad con respecto a cualquier información que podamos recopilar de ti a través de nuestro sitio web, <Link href="https://es.sairpromundo.com" className="text-blue-600 hover:underline">Sair pro Mundo</Link>, y otros sitios que poseemos y operamos.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Solo solicitamos información personal cuando realmente la necesitamos para brindarte un servicio. La recopilamos por medios justos y legales, con tu conocimiento y consentimiento. También te informamos por qué la estamos recopilando y cómo se utilizará.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Solo retenemos la información recopilada durante el tiempo necesario para proporcionarte el servicio solicitado. Los datos que almacenamos los protegemos dentro de los medios comercialmente aceptables para evitar pérdidas y robos, así como acceso, divulgación, copia, uso o modificación no autorizados.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          No compartimos ninguna información de identificación personal públicamente o con terceros, excepto cuando la ley lo requiera.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Nuestro sitio web puede enlazar a sitios externos que no son operados por nosotros. Ten en cuenta que no tenemos control sobre el contenido y las prácticas de estos sitios, y no podemos aceptar responsabilidad por sus respectivas políticas de privacidad.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Eres libre de rechazar nuestra solicitud de tu información personal, entendiendo que es posible que no podamos proporcionarte algunos de los servicios que deseas.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Tu uso continuado de nuestro sitio web se considerará como aceptación de nuestras prácticas en torno a la privacidad y la información personal. Si tienes alguna pregunta sobre cómo manejamos los datos de los usuarios y la información personal, no dudes en contactarnos.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          El servicio Google AdSense que utilizamos para publicar anuncios usa una cookie de DoubleClick para mostrar anuncios más relevantes en toda la web y limitar el número de veces que se muestra un anuncio determinado.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Para obtener más información sobre Google AdSense, consulta las preguntas frecuentes oficiales sobre privacidad de Google AdSense.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Utilizamos anuncios para compensar los costos de funcionamiento de este sitio y proporcionar financiación para futuros desarrollos. Las cookies de publicidad conductual utilizadas por este sitio han sido diseñadas para garantizar que te proporcionemos los anuncios más relevantes siempre que sea posible, rastreando anónimamente tus intereses y presentando cosas similares que puedan ser de tu interés.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Varios socios anuncian en nuestro nombre y las cookies de seguimiento de afiliados simplemente nos permiten ver si nuestros clientes han llegado al sitio a través de uno de nuestros sitios asociados para que podamos acreditarlos adecuadamente y, cuando corresponda, permitir que nuestros socios afiliados proporcionen cualquier bonificación que puedan ofrecerte por realizar una compra.
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Compromiso del Usuario</h2>

        <p className="text-lg text-gray-600 mb-4">
          El usuario se compromete a hacer un uso adecuado de los contenidos e información que Sair pro Mundo ofrece en el sitio y con carácter enunciativo, pero no limitativo:
        </p>

        <ul className="list-disc list-inside text-lg text-gray-600 mb-4">
          <li>No realizar actividades que sean ilegales o contrarias a la buena fe y al orden público;</li>
          <li>No difundir propaganda o contenido de carácter racista, xenófobo, bbebbet o apuestas, cualquier tipo de pornografía ilegal, de apología del terrorismo o contra los derechos humanos;</li>
          <li>No causar daños a los sistemas físicos (hardware) y lógicos (software) de Sair pro Mundo, de sus proveedores o de terceras personas, introducir o difundir en la red virus informáticos o cualesquiera otros sistemas físicos o lógicos que sean susceptibles de provocar los daños anteriormente mencionados.</li>
        </ul>

        <p className="text-lg text-gray-600 mb-4">
          Más información: Esperamos que esto sea claro y, como se mencionó anteriormente, si hay algo de lo que no estás seguro si necesitas o no, generalmente es más seguro dejar las cookies habilitadas en caso de que interactúen con una de las funciones que utilizas en nuestro sitio.
        </p>

        <p className="text-lg text-gray-600 mb-4">
          Esta política es efectiva a partir del 17/10/2024.
        </p>
      </div>
    </div>
  )
}

