import { Metadata } from "next"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const SignupForm = dynamic(() => import("@/components/SignupForm").then(mod => mod.SignupForm as ComponentType), {
  loading: () => <p>Cargando formulario...</p>,
})

export const metadata: Metadata = {
  title: "Crear Cuenta",
  description: "Crea tu cuenta en Sair pro Mundo",
}

export default function SignupPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-normal tracking-tight">
            Crea tu cuenta
          </h1>
          <p className="text-sm text-muted-foreground">
            Completa los campos a continuación para crear tu cuenta
          </p>
        </div>
        <SignupForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/signin"
            className="hover:text-brand underline underline-offset-4"
          >
            ¿Ya tienes una cuenta? Inicia sesión ahora
          </Link>
        </p>
      </div>
    </div>
  )
}

