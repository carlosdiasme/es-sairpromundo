import RankingFilter from '@/components/RankingFilter'
import { fetchPlaces } from '@/app/actions/get_places'

export default async function RankingPage() {
  const { places } = await fetchPlaces(1, 100) // Busca os top 100 lugares ou ajuste conforme necessário

  return (
    <div className="px-4 py-8">
      <RankingFilter places={places} />
    </div>
  )
}