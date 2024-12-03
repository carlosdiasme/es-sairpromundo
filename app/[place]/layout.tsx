import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface LayoutProps {
  children: React.ReactNode
  params: { place: string }
}

async function getPlaceData(slug: string) {
  const { data, error } = await supabase
    .from('vw_places')
    .select('*, place_id')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error al obtener el lugar:', error)
    return null
  }

  return data
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const place = await getPlaceData(params.place)

  if (!place) {
    return {
      title: 'Lugar no encontrado',
    }
  }

  return {
    title: `Descubre y califica ${place.name}, en ${place.city_complete}`,
    description: place.about ? place.about.slice(0, 160) : `Explora ${place.name} con Sair pro Mundo.`,
    openGraph: {
      title: `Descubre y califica ${place.name}, en ${place.city_complete}`,
      description: place.about ? place.about.slice(0, 160) : `Explora ${place.name} con Sair pro Mundo.`,
      images: [place.image_1 || 'https://es.sairpromundo.com/imagen-lugar-predeterminada.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Descubre y califica ${place.name}, en ${place.city_complete}`,
      description: place.about ? place.about.slice(0, 160) : `Explora ${place.name} con Sair pro Mundo.`,
      images: [place.image_1 || 'https://es.sairpromundo.com/imagen-lugar-predeterminada.jpg'],
    },
  }
}

export default function Layout({ children }: LayoutProps) {
  return <>{children}</>
}

