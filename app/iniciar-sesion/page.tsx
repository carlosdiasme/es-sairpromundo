import { Metadata } from "next"
import Link from "next/link"
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

const SigninForm = dynamic(() => import("@/components/SigninForm").then(mod => mod.SigninForm as ComponentType), {
  loading: () => <p>Cargando formulario...</p>,
})

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión en tu cuenta de Sair pro Mundo",
}

export default function SigninPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center p-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-normal tracking-tight">
            Bienvenido de nuevo
          </h1>
          <p className="text-sm text-muted-foreground">
            Inicia sesión en tu cuenta para continuar
          </p>
        </div>
        <SigninForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/create-account"
            className="hover:text-brand underline underline-offset-4"
          >
            ¿No tienes una cuenta? Crea una ahora
          </Link>
        </p>
      </div>
    </div>
  )
}

