import { ComingSoonEmptyState } from "@/components/ComingSoonEmptyState"

export default function PainelPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Painel de Controle</h1>
      <div className="flex justify-center items-center min-h-[50vh]">
        <ComingSoonEmptyState />
      </div>
    </div>
  )
}