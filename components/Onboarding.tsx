'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, UserIcon, User } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { addUserRecord } from '@/app/actions/users'

type FormData = {
  name: string
  birthDate: string
  gender: string
  preference: string
}

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    birthDate: '',
    gender: '',
    preference: ''
  })
  const router = useRouter()
  const { user } = useAuth()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      console.error('No user found')
      return
    }

    try {
      const result = await addUserRecord(
        formData.name,
        user.email || '',
        user.id,
        formData.birthDate,
        formData.gender,
        formData.preference
      )

      if (result.success) {
        console.log('User record added successfully')
        router.push('/painel')
      } else {
        console.error('Failed to add user record:', result.error)
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error during onboarding:', error)
      // Handle error (e.g., show error message to user)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
              required
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="birthDate">Data de Nascimento</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange}
              required
            />
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Label>Sexo</Label>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onValueChange={(value) => handleRadioChange('gender', value)}
              className="flex flex-col space-y-2"
            >
              {[
                { value: 'masculino', label: 'Masculino', icon: UserIcon },
                { value: 'feminino', label: 'Feminino', icon: UserIcon },
                { value: 'outro', label: 'Outro', icon: User },
              ].map(({ value, label, icon: Icon }) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={value} />
                  <Label htmlFor={value} className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <Label>Qual você prefere?</Label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'sol', label: 'Sol', icon: Sun, description: 'Dias ensolarados, praia, atividades ao ar livre' },
                { value: 'lua', label: 'Lua', icon: Moon, description: 'Noites estreladas, ambiente tranquilo, reflexão' },
              ].map(({ value, label, icon: Icon, description }) => (
                <Card 
                  key={value} 
                  className={`cursor-pointer transition-all ${
                    formData.preference === value 
                      ? 'ring-2 ring-primary bg-primary/10' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => handleRadioChange('preference', value)}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <Icon className={`w-16 h-16 mb-4 ${
                      formData.preference === value 
                        ? 'text-primary' 
                        : 'text-muted-foreground'
                    }`} />
                    <h3 className={`text-lg font-semibold mb-2 ${
                      formData.preference === value 
                        ? 'text-primary' 
                        : ''
                    }`}>{label}</h3>
                    <p className="text-sm text-center text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Bem-vindo ao Sair pro Mundo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1/4 h-2 rounded-full ${
                  i <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Etapa {step} de 4
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStepContent()}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={handlePrevious} variant="outline">
            Anterior
          </Button>
        )}
        {step < 4 ? (
          <Button onClick={handleNext} className="ml-auto">
            Próximo
          </Button>
        ) : (
          <Button type="submit" className="ml-auto">
            Concluir
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}