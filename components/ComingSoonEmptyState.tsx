import { Card, CardContent } from "@/components/ui/card"
import { Clock } from 'lucide-react'

export function ComingSoonEmptyState() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Clock className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Shortly</h2>
        <p className="text-muted-foreground">
        We are working to bring you amazing news. 
        Stay tuned for future updates.
        </p>
      </CardContent>
    </Card>
  )
}