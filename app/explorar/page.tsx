import RankingFilter from '@/components/ExploreFilter'
import { fetchPlaces } from '@/app/actions/get_places'

export default async function RankingPage() {
  const { places } = await fetchPlaces(1, 100) // Fetches top 100 places or adjust as needed

  return (
    <div className="px-4 py-8">
      <RankingFilter places={places} />
    </div>
  )
}

