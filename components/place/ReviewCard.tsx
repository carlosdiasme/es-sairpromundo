import { Heart, Frown, Info, Smile } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

interface ReviewCardProps {
  review: {
    place_review_id: number
    created_at: string
    user_id: string
    user_name: string
    place_id: number
    good: string
    bad: string
    feedback: string
    rating: number
  }
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('D [de] MMMM [de] YYYY')
  }

  return (
    <Card className="w-full bg-foreground/5 hover:bg-foreground/5 border-0">
      <CardHeader className="space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-regular leading-none tracking-tight mb-2 sm:mb-0">{review.user_name}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-1">
            <span className="text-xs text-muted-foreground mr-4">{formatDate(review.created_at)}</span>

              {[...Array(5)].map((_, i) => (
                <Heart
                  key={i}
                  className={`h-4 w-4 ${i < review.rating ? "text-red-500 fill-red-500" : "text-foreground/10 fill-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="good">
            <AccordionTrigger>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Smile className="h-4 w-4 text-foreground/60" />
                  <span>¿Qué te gustó?</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{review.good}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="bad">
            <AccordionTrigger>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Frown className="h-4 w-4 text-foreground/60" />
                  <span>Lo que no te gustó</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{review.bad}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="feedback">
            <AccordionTrigger>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-foreground/60" />
                  <span>Comentarios para el lugar</span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground">{review.feedback}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

