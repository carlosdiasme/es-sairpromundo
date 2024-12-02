"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { postPlaceReview } from '@/app/actions/post-place-review'
import { useAuth } from '@/contexts/AuthContext'

interface ReviewDialogProps {
  placeId: number
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ReviewDialog({ placeId, isOpen, onOpenChange }: ReviewDialogProps) {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [good, setGood] = useState('')
  const [bad, setBad] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      console.error('User is not logged in');
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to submit a review.",
      })
      return;
    }
    setIsSubmitting(true)

    const reviewData = {
      user_id: user.id,
      place_id: placeId,
      rating,
      good,
      bad,
      feedback
    };

    console.log('Trying to submit review:', reviewData);

    try {
      const result = await postPlaceReview(reviewData)
      console.log('Submission result:', result);
      
      if (result.success) {
        toast({
          title: "Review sent",
          description: "Your review has been sent successfully. Thank you!",
        })
        onOpenChange(false)
        setRating(0)
        setGood('')
        setBad('')
        setFeedback('')
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao enviar review:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível enviar sua avaliação. Por favor, tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = rating > 0 && (good.length >= 8 || bad.length >= 8 || feedback.length >= 8)

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate this place</DialogTitle>
          <DialogDescription>
          Share your experience about this place.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-start space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <Heart
                key={value}
                className={`cursor-pointer ${value <= rating ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
                onClick={() => setRating(value)}
              />
            ))}
          </div>
          {['good', 'bad', 'feedback'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
                {field === 'good' ? 'What did you like?' : field === 'bad' ? 'What did not you like?' : 'What does it indicate to management?'}
              </label>
              <Textarea
                id={field}
                placeholder={`${field === 'good' ? 'What did you like?' : field === 'bad' ? 'What did not you like?' : 'What does it indicate to management?'} (8-200 words)`}
                value={eval(field)}
                onChange={(e) => {
                  const value = e.target.value
                  if (value.length <= 200) {
                    eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}(value)`)
                  }
                }}
                className="w-full"
                minLength={8}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {eval(field).length}/200 characters
              </p>
            </div>
          ))}
          <Button
            type="submit"
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting ? "Sending..." : "Submit review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDialog